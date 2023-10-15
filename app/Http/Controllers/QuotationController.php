<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Models\Project;
use App\Models\Quotation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class QuotationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request,$project_id=null)
    {
        $per_page=$request->perPage?intval($request->perPage):10;
        $order=$request->order ?? 'desc' ;
        $sort=$request->sort ?? 'created_at';
        $requisition_number=$request->filter ?? '';

        

        $quotations=Quotation::
            where('requisition_number','like','%'.$requisition_number.'%')
            ->when($project_id,function ($q) use($project_id){
                $q->where('project_id',$project_id);
            })
            ->when($sort!='project_name',function ($q) use($sort,$order){
                $q->orderBy($sort,$order);
            })
            ->with(['items','project'=>function($q) use ($order){
                $q->orderBy('name',$order);                
            }])
            ->paginate($per_page)->withQueryString();
            
        return Inertia::render('Quotation',[
            'selected_project'=>$project_id?Project::where('id',$project_id)->firstOrFail():null,
            'quotations'=>$quotations,
            'per_page'=>strval($per_page),
            'sort'=>$sort,
            'order'=>$order,
            'requisition_number'=>$requisition_number
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
    public function store(Request $request,$project_id){
        DB::transaction(function () use($request,$project_id){
            $project=Project::findOrfail($project_id);
            $quotation = Quotation::create([
                'project_id'=>$project_id,
                'requisition_number'=>$request->requisition_number,
                'grand_total'=>0
            ]);
            $grand_total=0;
            foreach($request->items as $item){
                $price=floatval($item['price']);
                $qty=intval($item['qty']);
                $total=$price*$qty;
                Item::create([
                    'quotation_id'=>$quotation->id,
                    'name'=>$item['name'],
                    'description'=>$item['description'],
                    'supplier'=>$item['supplier'],
                    'estimated_delivery_date'=>$item['estimated_delivery_date'],
                    'price'=>$price,
                    'qty'=>$qty,
                    'total'=>$total,
                    'mode_of_payment'=>$item['mode_of_payment']
                ]);
                $grand_total=$grand_total+$total;
            }
            $quotation->update(['grand_total'=>$grand_total]);

            //UPDATE ACTUAL COST!!!!
            $quotations = Quotation::with(['items'])->where('status','not like', "%cancel%")->where('project_id',$project_id)->get();
            $actual_cost=0;
            foreach($quotations as $quotation_item){
                $actual_cost=$actual_cost+Item::where('quotation_id',$quotation_item->id)->sum('total');
            }
            $project->update([
                'actual_cost'=>$actual_cost
            ]);

        });
        
        

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
        
    }

    
    
    public function update(Request $request,$project_id){
        DB::transaction(function () use($request,$project_id){
            
            $project=Project::findOrfail($project_id);
            $quotation=Quotation::where('id',$request->quotation_id)->where('project_id',$project_id)->firstOrFail();
            Item::where('quotation_id',$request->quotation_id)->delete();
            
            $grand_total=0;
            foreach($request->items as $item){
                $price=floatval($item['price']);
                $qty=intval($item['qty']);
                $total=$price*$qty;
                Item::create([
                    'quotation_id'=>$request->quotation_id,
                    'name'=>$item['name'],
                    'description'=>$item['description'],
                    'supplier'=>$item['supplier'],
                    'estimated_delivery_date'=>$item['estimated_delivery_date'],
                    'price'=>$price,
                    'qty'=>$qty,
                    'total'=>$total,
                    'mode_of_payment'=>$item['mode_of_payment']
                ]);
                $grand_total=$grand_total+$total;
                
            }
            $quotation->update(['grand_total'=>$grand_total]);

            //UPDATE ACTUAL COST!!!!
            $quotations = Quotation::with(['items'])->where('status','not like', "%cancel%")->where('project_id',$project_id)->get();
            $actual_cost=0;
            foreach($quotations as $quotation_item){
                $actual_cost=$actual_cost+Item::where('quotation_id',$quotation_item->id)->sum('total');
            }
            $project->update([
                'actual_cost'=>$actual_cost
            ]);
        });
        
        return Redirect::back();
    }

    
    public function destroy($project_id,$id)
    {
        $project = Project::find($project_id);
        $quotation = Quotation::where('project_id',$project_id)->where('id',$id)->firstOrFail();
        $quotation->update([
            'status'=>'Cancelled'
        ]);

        //UPDATE ACTUAL COST!!!!
        $quotations = Quotation::with(['items'])->where('status','not like', "%cancel%")->where('project_id',$project_id)->get();
        $actual_cost=0;
        foreach($quotations as $quotation_item){
            $actual_cost=$actual_cost+Item::where('quotation_id',$quotation_item->id)->sum('total');
        }
        $project->update([
            'actual_cost'=>$actual_cost
        ]);

        return Redirect::back();
    }

}
