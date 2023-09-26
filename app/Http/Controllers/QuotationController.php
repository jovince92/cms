<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Models\Project;
use App\Models\Quotation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class QuotationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($project_id=null)
    {
        return Inertia::render('Quotation',[
            //'projects'=>Project::all(),
            'selected_project'=>$project_id?Project::with(['quotations'])->where('id',$project_id)->firstOrFail():null
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
    public function store(Request $request,$project_id)
    {
        $quotation = Quotation::create([
            'project_id'=>$project_id,
            'requisition_number'=>$request->requisition_number
        ]);

        foreach($request->items as $item){
            Item::create([
                'quotation_id'=>$quotation->id,
                'name'=>$request->name,
                'description'=>$request->description,
                'supplier'=>$request->supplier,
                'estimated_delivery_date'=>$request->estimated_delivery_date,
                'price'=>$request->price,
                'qty'=>$request->qty,
                'mode_of_payment'=>$request->mode_of_payment
            ]);
        }

        

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
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
