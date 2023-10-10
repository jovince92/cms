<?php

namespace App\Http\Controllers;

use App\Models\Address;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class AddressController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $per_page=$request->perPage?intval($request->perPage):10;
        $order=$request->order ?? 'desc' ;
        $sort=$request->sort ?? 'created_at';
        $filter=$request->filter ?? '';

        

        $addresses=Address::
            where('email','like','%'.$filter.'%')
            ->orWhere('first_name','like','%'.$filter.'%')            
            ->orWhere('last_name','like','%'.$filter.'%')
            ->when($sort!='project_name',function ($q) use($sort,$order){
                $q->orderBy($sort,$order);
            })
            ->paginate($per_page)->withQueryString();
            
        return Inertia::render('AddressBook',[
            'addresses'=>$addresses,
            'per_page'=>strval($per_page),
            'sort'=>$sort,
            'order'=>$order,
            'filter'=>$filter
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
        $request->validate([
            'first_name'=>['required','string',],            
            'email'=>['email','required','unique:addresses'],
        ]);
        Address::create([
            'first_name'=>$request->first_name,
            'last_name'=>$request->last_name,
            'email'=>$request->email,
        ]);
        return Redirect::back();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show()
    {
        return Address::all();
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
        $request->validate([
            'first_name'=>['required','string'],            
            'email'=>[
                'required',
                'email',
                Rule::unique('addresses', 'email')->ignore($request->email,'email')
            ],
        ]);
        $address=Address::findOrFail($request->id);
        $address->update([
            'first_name'=>$request->first_name,
            'last_name'=>$request->last_name,
            'email'=>$request->email,
        ]);
        return Redirect::back();
    }

    
    public function destroy($id)
    {
        $address=Address::findOrFail($id);
        $address->delete();
        return Redirect::back();
    }
}
