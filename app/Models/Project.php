<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;
    protected $guarded=[];

    public function pictures(){
        return $this->hasMany(Picture::class);
    }

    public function quotations(){
        return $this->hasMany(Quotation::class);
    }

    public function phases(){
        return $this->hasMany(Phase::class);
    }

}
