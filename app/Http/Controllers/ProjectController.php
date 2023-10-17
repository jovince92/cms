<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Models\Project;
use App\Models\Quotation;
use Faker\Factory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $per_page=$request->perPage?intval($request->perPage):5;
        $order=$request->order ?? 'desc' ;
        $status=$request->status ?? '' ;
        $sort=$request->sort ?? 'created_at';
        $filter=$request->filter ?? '';
        $projects=Project::where('name','like','%'.$filter.'%')->where('status','like','%'.$status.'%')->orderBy($sort,$order)->paginate($per_page)->withQueryString();
        return Inertia::render('Projects',[
            'projects'=>$projects,
            'per_page'=>strval($per_page),
            'sort'=>$sort,
            'order'=>$order,
            'filter'=>$filter,
            'status'=>$status
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        Project::create([
            'name'=>$request->name,
            'description'=>$request->description,
            'location'=>$request->location,
            'manpower'=>$request->manpower,
            'in_house'=>$request->in_house,
            'third_party'=>$request->third_party,
            'date_started'=>$request->date_started,
            'target_date'=>$request->target_date,
            'status'=>$request->status,
            'completion_date'=>$request->completion_date,
            'remarks'=>$request->remarks,
        ]);

        return Redirect::back();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $project = Project::findOrFail($request->id);
        $project->update([
            'name'=>$request->name,
            'description'=>$request->description,
            'location'=>$request->location,
            'manpower'=>$request->manpower,
            'in_house'=>$request->in_house,
            'third_party'=>$request->third_party,
            'date_started'=>$request->date_started,
            'target_date'=>$request->target_date,
            'status'=>$request->status,
            'completion_date'=>$request->completion_date,
            'remarks'=>$request->remarks,
        ]);

        return Redirect::back();
    }

    
    public function destroy(Request $request)
    {
        $project = Project::findOrFail($request->id);
        $project->delete();
        return Redirect::back();
    }

    public function set_actual_cost(){
        $projects=Project::all();

        foreach($projects as $project){
            $actual_cost=0;
            $quotations = Quotation::with(['items'])->where('status','not like', "%cancel%")->where('project_id',$project->id)->get();

            foreach($quotations as $quotation){
                $actual_cost=$actual_cost+Item::where('quotation_id',$quotation->id)->sum('total');
            }
            $project->update([
                'actual_cost'=>$actual_cost
            ]);
        }
        return 'DONE!';

    }

    public function randomize_status(){
        $faker = Factory::create();
        $projects=Project::all();

        foreach($projects as $project){
            $project->update([
                'status'=>$faker->randomElement(["Done","Ongoing","On-hold","Cancelled","Not Started","Planning"])
            ]);
        }
        $dones=Project::where('status','Done')->get();
        foreach($dones as $done){
            $done->update(['completion_date'=>now()]);
        }
        
        return 'DONE!';

    }
}
