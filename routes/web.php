<?php

use App\Http\Controllers\AccountController;
use App\Http\Controllers\AddressController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\GanttChartController;
use App\Http\Controllers\PhaseController;
use App\Http\Controllers\PictureController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\QuotationController;
use App\Http\Controllers\QuotationRequestController;
use App\Http\Controllers\StageController;
use App\Models\Project;
use App\Models\Quotation;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::middleware(['guest'])->group(function () {
    
    Route::get('login', [AuthenticatedSessionController::class, 'create'])->name('login');
    Route::post('login', [AuthenticatedSessionController::class, 'store'])->name('login.attempt');


});


Route::middleware(['auth'])->group(function(){
    Route::get('/', function () {
        return Inertia::render('Dashboard',[
            'approved_quotes'=>Quotation::where('status','Approved')->get(),
            'projects'=>Project::orderBy('actual_cost','desc')->get(),
            'most_recent'=>Project::orderBy('created_at','desc')->first(),
            'pie_chart_data'=>Project::selectRaw('count(*) as value, status')
                ->groupBy('status')
                ->get(),
        ]);
    })->name('dashboard');

    Route::prefix('/projects')->name('projects.')->group(function(){
        Route::get('/', [ProjectController::class,'index'])->name('index');
        Route::post('/store', [ProjectController::class,'store'])->name('store');
        Route::post('/update', [ProjectController::class,'update'])->name('update');
        Route::post('/destroy', [ProjectController::class,'destroy'])->name('destroy');
    });

    Route::prefix('/pictures/project/{project_id?}')->name('pictures.')->group(function(){
        Route::get('/', [PictureController::class,'index'])->name('index');
        Route::post('/store', [PictureController::class,'store'])->name('store');
        Route::post('/destroy', [PictureController::class,'destroy'])->name('destroy');
    });

    Route::prefix('/gantt_chart/project/{project_id?}')->name('gantt_chart.')->group(function(){
        Route::get('/', [GanttChartController::class,'index'])->name('index');
        Route::get('/show', [GanttChartController::class,'show'])->name('show');
    });

    Route::prefix('/quotations/project/{project_id?}')->name('quotations.')->group(function(){
        Route::get('/', [QuotationController::class,'index'])->name('index');
        Route::post('/store', [QuotationController::class,'store'])->name('store');
        Route::post('/update', [QuotationController::class,'update'])->name('update');
        Route::post('/destroy/{id}', [QuotationController::class,'destroy'])->name('destroy');
        Route::post('/approve/{id}', [QuotationController::class,'approve'])->name('approve');
        Route::post('/mail_request',[QuotationRequestController::class,'mail'])->name('mail_request');
    });

    Route::prefix('/accounts')->name('accounts.')->group(function(){
        Route::get('/', [AccountController::class,'index'])->name('index');
        Route::post('/store', [AccountController::class,'store'])->name('store');
        Route::post('/update', [AccountController::class,'update'])->name('update');
        Route::post('/change_password', [AccountController::class,'change_password'])->name('change_password');
    });

    

    Route::prefix('/phases/project/{project_id?}')->name('phases.')->group(function(){
        Route::get('/', [PhaseController::class,'index'])->name('index');
        Route::post('/store', [PhaseController::class,'store'])->name('store');
        Route::post('/update', [PhaseController::class,'update'])->name('update');
        Route::post('/destroy', [PhaseController::class,'destroy'])->name('destroy');
    });


    Route::prefix('/stages')->name('stages.')->group(function(){
        Route::post('/store', [StageController::class,'store'])->name('store');
        Route::post('/update', [StageController::class,'update'])->name('update');
        Route::post('/destroy', [StageController::class,'destroy'])->name('destroy');
    });

    Route::prefix('/addresses')->name('addresses.')->group(function(){
        Route::get('/', [AddressController::class,'index'])->name('index');
        Route::post('/store', [AddressController::class,'store'])->name('store');
        Route::get('/show', [AddressController::class,'show'])->name('show');
        Route::post('/update', [AddressController::class,'update'])->name('update');
        Route::post('/destroy/{id}', [AddressController::class,'destroy'])->name('destroy');
    });
    
    

    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');
});

//Route::get('test', [ProjectController::class, 'randomize_status'])->name('test');







