<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EventResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'event_date' => $this->event_date,
            'due_date' => $this->due_date,
            'location' => $this->location,
            'description' => $this->description,
            'image' => $this->image_url,
        ];
    }
}
