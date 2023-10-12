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
                $start_phase_max= -35;
                $start_phase_min= -33;
                $end_phase_start= -31;                    
                $end_phase_min= -29;
                for($j=0;$j<=$stages;$j++){
                    $stage_no=$j+1;
                    $start_phase_max= $start_phase_max+3;
                    $start_phase_min= $start_phase_min+4;
                    $end_phase_start= $end_phase_start+3;
                    $end_phase_min= $end_phase_min+4;

                    $start_week_max = strval($start_phase_max). ' week';
                    $start_week_min = strval($start_phase_min). ' week';
                    $end_week_max = strval($end_phase_start). ' week';
                    $end_week_min = strval($end_phase_min). ' week';

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
