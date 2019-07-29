<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Story extends Model
{
    protected $fillable = [
      'title',
      'description',
      'moral'
    ];

    protected $table = 'story';

    //show stories
    public function showStories()
    {
        $stories = Story::all();

        return $stories;
    }
}
