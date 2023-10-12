<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Phase extends Model
{
    use HasFactory;
    protected $guarded=[];
    protected $with=['stages'];
    
    public function stages(){
        return $this->hasMany(Stage::class);
    }

    public function project(){
        return $this->belongsTo(Project::class);
    }
}
