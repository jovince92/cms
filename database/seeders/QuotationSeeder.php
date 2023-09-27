<?php

namespace Database\Seeders;

use App\Models\Item;
use App\Models\Project;
use App\Models\Quotation;
use Carbon\Carbon;
use Faker\Factory;
use Illuminate\Database\Seeder;

class QuotationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Factory::create();
        for($i=0;$i<=50;$i++){
            $num=$i+1;
            $project_id = strval(Project::all()->random()->id);
            $req  =  $project_id.'-'.strval(Carbon::now()->isoFormat('YYYYMMDD')).'-'.strval($num);
            $supplier=$faker->company();
            $items_count=intval($faker->randomDigitNotNull());
            $quotation=Quotation::create([
                'project_id'=>$project_id,
                'requisition_number'=>$req,
                'grand_total'=>0
            ]);
            $grand_total=0;
            for($j=0;$j<=$items_count;$j++){
                $item_no=strval($j+1);
                $price=intval($faker->numberBetween(250, 5000));
                $qty=intval($faker->numberBetween(1, 15));
                $total=$price*$qty;
                Item::create([
                    'quotation_id'=>$quotation->id,
                    'name'=>'Item '.$item_no,
                    'description'=>$faker->sentence(),
                    'supplier'=>$supplier,
                    'estimated_delivery_date'=>$faker->dateTimeBetween('+1 week', '+5 week'),
                    'price'=>$price,
                    'qty'=>$qty,
                    'total'=>$total,
                    'mode_of_payment'=>$faker->randomElement(["Cash","Check","Credit Card","Bank Transaction"])
                ]);
                $grand_total=$grand_total+$total;
            }
            $quotation->update(['grand_total'=>$grand_total]);
        }
    }
}
