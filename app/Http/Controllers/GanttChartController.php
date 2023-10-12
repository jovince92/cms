<?php

namespace App\Http\Controllers;

use App\Models\Phase;
use App\Models\Project;
use App\Models\Stage;
use Carbon\Carbon;
use DateTime;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GanttChartController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($project_id=null)
    {
        //return Phase::with(['stages'])->get();
        $project=$project_id?Project::where('id',$project_id)->firstOrFail():null;
        $phases = Phase::with(['stages'])->where('project_id',$project_id)->get();

        $data = [];
        
        if($project_id){
            
            
            // Define an empty array for the data

            // Loop through the phases array
            foreach ($phases as $phase) {
                
                if(!$phase->stages){
                    break;
                }
                // Extract the stages array from the phase
                $stages = $phase['stages'];
                // Calculate the parent id as the negative of the phase id
                $parentId = $phase['id'] * -1;
                // Push a new array to the data array with the phase information
                array_push($data, [
                    'id' => $parentId,
                    'open' => true,
                    'parent' => 0,
                    'start_date' => Carbon::parse($stages[0]['start'])->format('Y-m-d'),
                    //'end_date' => Carbon::parse($stages[count($stages)-1]['end'])->format('Y-m-d'),
                    'duration' => date_diff(new DateTime($stages[count($stages) - 1]['end']), new DateTime($stages[0]['start']))->days,
                    'text' => $phase['name'],
                    'progress' => 100,
                    'calculate_duration'=>false,
                    'type' => 'project',
                ]);
                // Loop through the stages array
                foreach ($stages as $stage) {
                    // Push a new array to the data array with the stage information
                    array_push($data, [
                        'id' => $stage['id'],
                        'open' => false,
                        'parent' => $parentId,
                        'start_date' => Carbon::parse($stage['start'])->format('Y-m-d'),
                        //'end_date' => Carbon::parse($stage['end'])->format('Y-m-d'),
                        'duration' => date_diff(new DateTime($stage['end']), new DateTime($stage['start']))->days,
                        'text' => $stage['name'],
                        'progress' => 100,
                        'calculate_duration'=>false,
                        // Uncomment the line below if you want to specify the type of the stage
                        // 'type' => 'project',
                    ]);
                }
            }
        }
        

        return Inertia::render('GanttChart',[
            'selected_project'=>$project,
            'chart_data'=>$data
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
        
    }

    
    public function show($project_id=0)
    {
        
        $project=Project::with(
            ['phases','phases.stages']
        )->where('id',$project_id)->firstOrFail();
        
        $data = [];
        
        $phases=$project->phases;
        
        // Define an empty array for the data

        // Loop through the phases array
        foreach ($phases as $phase) {
            // Extract the stages array from the phase
            $stages = $phase['stages'];
            // Calculate the parent id as the negative of the phase id
            $parentId = $phase['id'] * -1;
            // Push a new array to the data array with the phase information
            array_push($data, [
                'id' => $parentId,
                'open' => true,
                'parent' => 0,
                'start_date' => Carbon::parse($stages[0]['start']),
                //'start_date' => Carbon::parse($stages[0]['start'])->format('Y-m-d'),
                'duration' => date_diff(new DateTime($stages[count($stages) - 1]['end']), new DateTime($stages[0]['start']))->days,
                'text' => $phase['name'],
                'progress' => 100,
                'type' => 'project',
            ]);
            // Loop through the stages array
            foreach ($stages as $stage) {
                // Push a new array to the data array with the stage information
                array_push($data, [
                    'id' => $stage['id'],
                    'open' => false,
                    'parent' => $parentId,
                    'start_date' => Carbon::parse($stage['start']),
                    'duration' => date_diff(new DateTime($stage['end']), new DateTime($stage['start']))->days,
                    'text' => $stage['name'],
                    'progress' => 100,
                    // Uncomment the line below if you want to specify the type of the stage
                    // 'type' => 'project',
                ]);
            }
        }
        return $data;
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
