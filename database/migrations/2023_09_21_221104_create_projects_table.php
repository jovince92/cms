<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProjectsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('description');
            $table->string('location');
            $table->smallInteger('manpower')->default(0);
            $table->double('in_house',8,2)->default(0.00);
            $table->double('third_party',8,2)->default(0.00);
            $table->double('total_actual_cost',8,2)->default(0.00);
            $table->date('date_started');
            $table->date('target_date');
            $table->string('status');
            $table->date('completion_date')->nullable();
            $table->text('remarks');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('projects');
    }
}
