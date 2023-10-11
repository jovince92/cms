<?php

namespace Database\Seeders;

use App\Models\Phase;
use App\Models\Project;
use App\Models\Stage;
use Faker\Factory;
use Illuminate\Database\Seeder;

class PhaseAndStageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Factory::create();
        $projects = Project::all();
        foreach($projects as $project){
            $phases_count = intval($faker->numberBetween(2,5));
            for($i=0;$i<=$phases_count;$i++){
                $phase_no=$i+1;
                $phase=Phase::create([
                    'project_id'=>$project->id,
                    'name'=>'Phase '.strval($phase_no)
                ]);
                $stages = intval($faker->numberBetween(2,6));
                $start_max= -17;
                $start_min= -15;
                $end_start= -13;                    
                $end_min= -10;
                for($j=0;$j<=$stages;$j++){
                    $stage_no=$j+1;
                    
                    $start_max= $start_max+1;
                    $start_min= $start_min+1;
                    $end_start= $end_start+1;
                    $end_min= $end_min+1;

                    $start_week_max = strval($start_max). ' week';
                    $start_week_min = strval($start_min). ' week';
                    $end_week_max = strval($end_start). ' week';
                    $end_week_min = strval($end_min). ' week';

                    Stage::create([
                        'phase_id'=>$phase->id,
                        'name'=>'Stage '.strval($stage_no),
                        'start'=>$faker->dateTimeBetween($start_week_max, $start_week_min),
                        'end'=>$faker->dateTimeBetween($end_week_max, $end_week_min),
                    ]);
                }
            }
        }
    }
}
