<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    protected $fillable = [
        'question',
        'optionA',
        'optionB',
        'optionC',
        'optionD',
        'correctOption'
    ];

    protected $table = 'questions';

    public function getQuestions()
    {
        $question = Question::all();

        return $question;
    }

    public function editQuestions($id)
    {
        $question = Question::find($id);

        return $question;
    }

}
