<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            Edit Announcement
        </h2>
    </x-slot>

    <div class="py-8 px-8">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 bg-white shadow-md rounded-md">
            <p class="pt-4 px-4 text-sm text-gray-500">
                * Required Field
            </p>
            <!-- Form -->
            <form method="POST" action="{{ route('admin.announcements.update', $announcement->id) }}" class="p-4" enctype="multipart/form-data">
                @csrf
                @method('PUT')

                <!-- Title -->
                <div>
                    <x-input-label for="title" :value="__('* Title')" />
                    <x-text-input id="title" class="block mt-1 w-full" type="text" name="title" :value="old('title', $announcement->title)" autofocus />
                    <x-input-error :messages="$errors->get('title')" class="mt-2" />
                </div>

                <!-- Category -->
                <div>
                    <x-input-label for="category" :value="__('* Category')" class="mt-2"/>

                    <select id="category" name="category"
                        class="block mt-1 w-full border border-gray-300 rounded-md shadow-sm
                            focus:ring-blue-500 focus:border-blue-500
                            text-sm text-gray-900 p-2.5">

                        <option value="" disabled>Select a category</option>

                        <option value="regular_announcement"
                            {{ old('category', $announcement->category) == 'regular_announcement' ? 'selected' : '' }}>
                            Regular Announcement
                        </option>

                        <option value="childrens_ministry_announcement"
                            {{ old('category', $announcement->category) == 'childrens_ministry' ? 'selected' : '' }}>
                            Children's Ministry Announcement
                        </option>

                        <option value="childrens_ministry_general"
                            {{ old('category', $announcement->category) == 'childrens_ministry_general' ? 'selected' : '' }}>
                            Children's Ministry General
                        </option>

                    </select>

                    <x-input-error :messages="$errors->get('category')" class="mt-2" />
                </div>

                <!-- Date -->
                <div class="mt-4">
                    <x-input-label for="event_date" :value="__('Event Date')" />
                    <x-text-input id="event_date" class="block mt-1 w-full"
                                    type="date"
                                    name="event_date"
                                    :value="old('event_date', $announcement->event_date)"
                    />
                </div>

                <div class="mt-4">
                    <x-input-label for="due_date" :value="__('Due Date')" />
                    <x-text-input id="due_date" class="block mt-1 w-full"
                                    type="date"
                                    name="due_date"
                                    :value="old('due_date', $announcement->due_date)"
                    />
                </div>

                <x-input-label for="end_date" :value="__('End Date')" class="mt-2" />

                <x-text-input
                    id="end_date"
                    class="block mt-1 w-full"
                    type="date"
                    name="end_date"
                    :value="old('end_date', $announcement->end_date)"
                />

                <!-- Time -->
                <x-input-label for="start_time" :value="__('Start Time')" class="mt-2" />

                <x-text-input
                    id="start_time"
                    class="block mt-1 w-full"
                    type="time"
                    name="start_time"
                    :value="old('start_time', $announcement->start_time)"
                />

                <x-input-label for="end_time" :value="__('End Time')" class="mt-2" />

                <x-text-input
                    id="end_time"
                    class="block mt-1 w-full"
                    type="time"
                    name="end_time"
                    :value="old('end_time', $announcement->end_time)"
                />

                <!-- Location -->
                <div class="mt-4">
                    <x-input-label for="location" :value="__('Location')" />

                    <x-text-input id="location" class="block mt-1 w-full"
                                    type="text"
                                    name="location"
                                    :value="old('location', $announcement->location)"
                    />
                </div>

                <!-- Description -->
                <div class="mt-4">
                    <x-input-label for="description" :value="__('Description')" />

                    <textarea id="description"
                        name="description"
                        rows="8"
                        class="block mt-1 w-full border border-gray-300 rounded-md shadow-sm
                            focus:ring-blue-500 focus:border-blue-500
                            text-sm text-gray-900 p-2.5
                            placeholder:text-gray-400"
                        placeholder="This field can be empty.">{{ old('description', $announcement->description) }}</textarea>
                </div>

                <!-- Image Upload -->
                <div class="mt-4">
                    <x-input-label for="image" value="Image Upload" />

                    <x-text-input 
                        id="image"
                        class="block mt-1 w-full"
                        type="file"
                        name="image"
                    />
                </div>

                <!-- Image URL -->
                <div class="mt-4">
                    <x-input-label for="image_url" value="OR Image URL" />

                    <x-text-input
                        id="image_url"
                        class="block mt-1 w-full"
                        type="text"
                        name="image_url"
                        :value="old('image_url')"
                        placeholder="https://example.com/image.jpg"
                    />
                </div>

                <!-- Button -->
                <div class="flex items-center justify-end mt-4">
                    <x-primary-button class="ms-3">
                        Update
                    </x-primary-button>
                </div>
            </form>
        </div>
    </div>
</x-app-layout>
