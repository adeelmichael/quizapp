<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Question;
use App\Story;

class FrontendController extends Controller
{
    //get questions
    public function getUserData()
    {
        $question = Question::orderByRaw("RAND()")->take(10)->get();

        return response()->json(compact('question'));
    }

    //get stories
    public function getUserStory()
    {
        $stories = Story::orderByRaw("RAND()")->take(10)->get();

        return response()->json(compact('stories'));
    }
}
