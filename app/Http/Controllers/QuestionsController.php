<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Question;
use Illuminate\Support\Facades\Input;

class QuestionsController extends Controller
{
    //get all questions
    public function index(Question $question)
    {
        return $question->getQuestions()
            ->toArray();
    }

    //save question
    public function saveQuestions(Request $request)
    {
        $questions = Question::create([
            'question' => $request->question,
            'optionA'  => $request->optionA,
            'optionB'  => $request->optionB,
            'optionC'  => $request->optionC,
            'optionD'  => $request->optionD,
            'correctOption'  => $request->correctOption
        ]);

        if($questions)
        {
            return response()->json(['message' => 'Question created successfully'], 200);
        }else{
            return response()->json(['message' => 'Something went wrong'], 500);
        }
    }

    //edit function for questions
    public function edit(Question $question, $id)
    {
         return $question->editQuestions($id)
             ->toArray();
    }

    //update questions
    public function update(Request $request)
    {
        $data = Input::all();
        $id = $request->input('Id');
        $ques = Question::where('id', $id)->first();

        foreach($data as $res)
        {
            $ques->question = $res['question'];
            $ques->optionA = $res['optionA'];
            $ques->optionB = $res['optionB'];
            $ques->optionC = $res['optionC'];
            $ques->optionD = $res['optionD'];
            $ques->correctOption = $res['correctOption'];

            $array = $ques;
        }


        if($array->update())
        {
            return response()->json(['message' => 'Question Update Successfully'], 200);
        }else{
            return response()->json(['message' => 'something went wrong'], 500);
        }
    }

    //delete questions
    public function destroy($id)
    {
        $question = Question::find($id);

        if($question->delete())
        {
            return response()->json(['message' => 'Question Deleted Successfully'], 200);
        }else{
            return response()->json(['message' => 'Something went wrong'], 500);
        }

    }
}
