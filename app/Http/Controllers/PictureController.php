<?php

namespace App\Http\Controllers;

use App\Models\Picture;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Illuminate\Support\Str;

class PictureController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($project_id=null)
    {
        return Inertia::render('Pictures',[
            //'projects'=>Project::all(),
            'selected_project'=>$project_id?Project::with(['pictures'])->where('id',$project_id)->firstOrFail():null
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
        $request->validate([
            'image' => 'mimes:jpeg,png,jpg,webp,pdf'
        ]);
        $project=Project::findOrFail($project_id);
        $image = $request->file('image') ;
        $picture=Picture::create([
            'project_id'=>$project_id,
            'name'=>"",
            'location'=>""
        ]);
        $image_name=strval($picture->id).'_'.$image->getClientOriginalName();
        $location='uploads/projects/project_'.strval($project_id).'/';
        $path=public_path($location);
        if (!file_exists($path)) {
            File::makeDirectory($path,0777,true);
        }
        $new_image = $location.$image_name;
        $request->file('image')->move($path, $new_image);
        $picture->update([
            'name'=>$image_name,
            'location'=>$new_image
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
    public function destroy(Request $request,$project_id)
    {
        $img=Picture::findOrFail($request->id);
        
        @unlink(public_path($img->getAttributes()['location']));
        $img->delete();
        return Redirect::back();
    }
}
