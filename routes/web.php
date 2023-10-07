<?php

use App\Http\Controllers\AccountController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\GanttChartController;
use App\Http\Controllers\PhaseController;
use App\Http\Controllers\PictureController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\QuotationController;
use App\Http\Controllers\QuotationRequestController;
use App\Http\Controllers\StageController;
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
        return Inertia::render('Dashboard');
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
    });

    Route::prefix('/quotations/project/{project_id?}')->name('quotations.')->group(function(){
        Route::get('/', [QuotationController::class,'index'])->name('index');
        Route::post('/store', [QuotationController::class,'store'])->name('store');
        Route::post('/update', [QuotationController::class,'update'])->name('update');
        Route::post('/mail_request', QuotationRequestController::class)->name('mail_request');
    });

    Route::prefix('/accounts')->name('accounts.')->group(function(){
        Route::get('/', [AccountController::class,'index'])->name('index');
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
    
    

    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');
});

Route::get('test', [QuotationController::class, 'test'])->name('test');







