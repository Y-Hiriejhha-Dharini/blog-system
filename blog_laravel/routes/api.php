<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\PostController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/register',[AuthController::class,'register'])->name('register');
Route::post('/login',[AuthController::class,'login'])->name('login');
Route::get('/posts',[PostController::class, 'index']);
Route::put('/posts',[PostController::class, 'update']);
Route::post('/comments',[CommentController::class, 'store']);
Route::get('/comments/{post}',[CommentController::class, 'index']);
Route::post('/download-pdf', [PostController::class, 'downloadPdf']);
Route::get('/viewed/{id}', [PostController::class, 'viewed']);

Route::middleware('auth:sanctum')->group(function(){
    Route::post('/logout',[AuthController::class,'logout'])->name('logout');
    Route::resource('posts',PostController::class)->except(['index', 'update']);
    Route::resource('comments',CommentController::class)->except(['store','index']);
});

