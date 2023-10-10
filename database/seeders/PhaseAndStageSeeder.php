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
                for($j=0;$j<=$stages;$j++){
                    $stage_no=$j+1;
                    Stage::create([
                        'phase_id'=>$phase->id,
                        'name'=>'Stage '.strval($stage_no),
                        'start'=>$faker->dateTimeBetween('-5 week', '-1 week'),
                        'end'=>$faker->dateTimeBetween('+1 week', '+3 week'),
                    ]);
                }
            }
        }
    }
}
