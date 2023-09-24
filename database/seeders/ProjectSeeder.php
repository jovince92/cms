<?php

namespace Database\Seeders;

use App\Models\Project;
use Faker\Factory;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $project = Factory::create();
        for($i=0;$i<=100;$i++){
            $cost=strval($project->randomNumber(5, false)).'.00';
            Project::create([
                'name'=>$project->streetAddress(),
                'description'=>$project->company(),
                'location'=>$project->address(),
                'manpower'=>$project->randomNumber(2, false),
                'in_house'=>$cost,
                'third_party'=>$cost,
                'date_started'=>$project->dateTimeBetween('-10 week', '-1 week'),
                'target_date'=>$project->dateTimeBetween('+1 week', '+3 week'),
                'status'=>'Not Started',
                'completion_date'=>null,
                'remarks'=>$project->sentence(3)
            ]);
        }
    }
}
