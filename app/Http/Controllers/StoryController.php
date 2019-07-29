<?php

namespace App\Http\Controllers;

use App\Story;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;

class StoryController extends Controller
{
    //saving story
    public function store(Request $request)
    {
        $story = Story::create([
            'title' => $request->title,
            'description' => $request->description,
            'moral' => $request->moral
        ]);

        if(!$story)
        {
            return response()->json([ 'message' => 'Something went wrong'], 500);
        }

        return response()->json(['message' => 'Successfully created new story'], 200);
    }

    //view stories
    public function show(Story $story)
    {
        return $story->showStories()
                ->toArray();
    }

    //get stories for edit
    public function edit($id)
    {
        $story = Story::where('id', $id)->first();

        return $story
            ->toArray();
    }

    //update stories
    public function update(Request $request)
    {
        $data = Input::all();
        $id = $request->input('Id');
        $story = Story::where('id', $id)->first();

        foreach($data as $res)
        {
            $story->title = $res['title'];
            $story->description = $res['description'];
            $story->moral = $res['moral'];

            $array = $story;
        }

        if($array->update())
        {
            return response()->json(['message' => 'successfully updated story'], 200);
        }else{
            return response()->json(['message' => 'something went wrong'], 500);
        }

    }

    //delete story
    public function destroy($id)
    {
        $story = Story::where('id', $id)->first();

        if($story->delete())
        {
            return response()->json(['message' => 'successfully deleted story'], 200);
        }else{
            return response()->json(['message' => 'something went wrong'], 500);
        }
    }
}
