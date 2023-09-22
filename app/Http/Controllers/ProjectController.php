<?php

namespace App\Http\Controllers;

use App\Models\Project;
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
    public function index()
    {
        return Inertia::render('Projects',['projects'=>Project::orderBy('created_at','desc')->get()]);
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
}
