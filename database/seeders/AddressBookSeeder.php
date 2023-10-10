<?php

namespace Database\Seeders;

use App\Models\Address;
use Illuminate\Database\Seeder;

use Faker\Factory;


class AddressBookSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Factory::create();
        for($i=0;$i<=25;$i++){
            $fname=$faker->firstName();
            $lname=$faker->lastName();
            Address::create([
                'first_name'=>$fname,
                'last_name'=>$lname,
                'email'=>strtolower($fname).'.'.strtolower($lname).'@testing.com',
            ]);
        }
    }
}
