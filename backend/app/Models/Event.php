<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\EventRegistration;

class Event extends Model
{
    protected $fillable = [
        'title',
        'event_date',
        'due_date',
        'location',
        'description',
        'max_slots',
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

    public function registrations()
    {
        return $this->hasMany(EventRegistration::class);
    }
}
