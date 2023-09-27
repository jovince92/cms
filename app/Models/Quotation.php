<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Quotation extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $guarded=[];
    
    //protected $appends = ['total'];
    public function items(){
        return $this->hasMany(Item::class);
    }

    public function project(){
        return $this->belongsTo(Project::class)->orderBy('name','desc');
    }

    // public function getTotalAttribute() {
    //     $items=$this->items;
    //     $total = $items->sum('total');
    //     return $total;
    // }

}
