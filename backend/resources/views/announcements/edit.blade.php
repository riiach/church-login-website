<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            Edit Announcement
        </h2>
    </x-slot>

    <div class="py-8 px-8">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 bg-white shadow-md rounded-md">
            <!-- Form -->
            <form method="POST" action="{{ route('announcements.update', $announcement->id) }}" class="p-4" enctype="multipart/form-data">
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

                        <option value="childrens_ministry"
                            {{ old('category', $announcement->category) == 'childrens_ministry' ? 'selected' : '' }}>
                            Children's Ministry
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

                <!-- Image -->
                <div class="mt-4">
                    <x-input-label for="image" :value="__('* Image')" />

                    <x-text-input id="image" class="block mt-1 w-full"
                                    type="file"
                                    name="image"
                    />

                    <x-input-error :messages="$errors->get('image')" class="mt-2" />
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
