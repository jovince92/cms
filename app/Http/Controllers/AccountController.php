<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class AccountController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inertia::render('Accounts',[
            'accounts'=>User::all()
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
            'name'=>['required','string',],            
            'company_id'=>['string','required','unique:users'],
        ]);
        User::create([
            'name'=>$request->name,            
            'company_id'=>$request->company_id,
            'password'=>bcrypt('password')
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
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $request->validate([
            'name'=>['required','string',],            
            'company_id'=>['required',
                'string',
                Rule::unique('users', 'company_id')->ignore($request->id,'id')
            ],
        ]);

        $users = User::findOrFail($request->id);

        $users->update([
            'name'=>$request->name,            
            'company_id'=>$request->company_id,
        ]);
        return Redirect::back();
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

    public function change_password(Request $request){
        $request->validate([
            'current_password'=>['required','current_password'],
            'password'=>['required','confirmed']
        ]);

        $user=User::find(Auth::id());
        $user->update([
            'password'=>bcrypt($request->password)
        ]);

        return Redirect::back();
    }
}
