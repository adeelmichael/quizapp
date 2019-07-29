<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::post('register', 'UserController@register');
Route::post('login', 'UserController@authenticate');
Route::get('open', 'DataController@open');
Route::get('getquestions', 'FrontendController@getUserData');
Route::get('getstories', 'FrontendController@getUserStory');

Route::group(['middleware' => ['jwt.verify']], function() {
    Route::get('user', 'UserController@getAuthenticatedUser');
    Route::get('closed', 'DataController@closed');
    Route::get('/', 'QuestionsController@index');
    Route::post('questions', 'QuestionsController@saveQuestions');
    Route::get('edit/{id}', 'QuestionsController@edit');
    Route::post('updateQuestion', 'QuestionsController@update');
    Route::get('destroy/{id}', 'QuestionsController@destroy');
});

//story middleware
Route::group(['middleware' => ['jwt.verify']], function() {
    Route::get('user', 'UserController@getAuthenticatedUser');
    Route::get('closed', 'UserController@closed');
    Route::post('story/create', 'StoryController@store');
    Route::get('story/show', 'StoryController@show');
    Route::get('story/edit/{id}', 'StoryController@edit');
    Route::post('story/update', 'StoryController@update');
    Route::get('story/destroy/{id}', 'StoryController@destroy');
});
