<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Announcement extends Model
{
    protected $fillable = [
        'title',
        'category',
        'event_date',
        'due_date',
        'end_date',
        'start_time',
        'end_time',
        'location',
        'description',
        'image'
    ];

    protected $casts = [
        'due_date' => 'date:Y-m-d',
    ];

    // Automatically include image_url in API responses
    protected $appends = ['image_url'];

    public function getImageUrlAttribute()
    {
        if (!$this->image) {
            return null;
        }

        if (str_starts_with($this->image, 'http')) {
            return $this->image;
        }

        return asset('storage/' . $this->image);
    }
}
