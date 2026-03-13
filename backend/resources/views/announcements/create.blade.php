<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            Create Announcement
        </h2>
    </x-slot>

    <div class="py-8 px-8">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 bg-white shadow-md rounded-md">
            <!-- Form -->
            <form method="POST" action="{{ route('announcements.store') }}" class="p-4" enctype="multipart/form-data">
                @csrf

                <!-- Title -->
                <div>
                    <x-input-label for="title" :value="__('* Title')" />
                    <x-text-input id="title" class="block mt-1 w-full" type="text" name="title" :value="old('title')" autofocus />
                    <x-input-error :messages="$errors->get('title')" class="mt-2" />
                </div>

                <!-- Category -->
                <div>
                    <x-input-label for="category" :value="__('* Category')" class="mt-2"/>
                    <select id="category" name="category"
                    class="block mt-1 w-full border border-gray-300 rounded-md shadow-sm
                    focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-900 p-2.5">

                        <option disabled {{ old('category') ? '' : 'selected' }}>Select a category</option>

                        <option value="regular_announcement"
                            {{ old('category') == 'regular_announcement' ? 'selected' : '' }}>
                            Regular Announcement
                        </option>

                        <option value="childrens_ministry"
                            {{ old('category') == 'childrens_ministry' ? 'selected' : '' }}>
                            Children's Ministry
                        </option>

                    </select>
                    <x-input-error :messages="$errors->get('category')" class="mt-2" />
                </div>
                

                <!-- Date -->
                <x-input-label for="event_date" value="Event Date" class="mt-2" />

                <x-text-input
                    id="event_date"
                    class="block mt-1 w-full"
                    type="date"
                    name="event_date"
                    :value="old('event_date')"
                />

                <!-- Location -->
                <x-input-label for="location" value="Location" class="mt-2"/>

                <x-text-input
                    id="location"
                    class="block mt-1 w-full"
                    type="text"
                    name="location"
                    :value="old('location')"
                />

                <!-- Description -->
                <x-input-label for="description" value="Description" class="mt-2"/>

                <textarea
                    id="description"
                    name="description"
                    rows="8"
                    class="block mt-1 w-full border border-gray-300 rounded-md shadow-sm
                    focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-900 p-2.5"
                    placeholder="This field can be empty."
                >{{ old('description') }}</textarea>

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
                <x-input-label for="image_url" value="OR Image URL" class="mt-2" />

                <x-text-input
                    id="image_url"
                    class="block mt-1 w-full"
                    type="text"
                    name="image_url"
                    :value="old('image_url')"
                    placeholder="https://example.com/image.jpg"
                />

                <!-- Button -->
                <div class="flex items-center justify-end mt-4">
                    <x-primary-button class="ms-3">
                        Store
                    </x-primary-button>
                </div>
            </form>
        </div>
    </div>
</x-app-layout>
