<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            Edit Banner
        </h2>
    </x-slot>

    <div class="py-8 px-8">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 bg-white shadow-md rounded-md">
            <p class="pt-4 px-4 text-sm text-gray-500">
                * Required Field
            </p>

            <form method="POST" action="{{ route('admin.banners.update', $banner->id) }}" class="p-4" enctype="multipart/form-data">
                @csrf
                @method('PUT')

                <div>
                    <x-input-label for="category" :value="__('* Category')" />
                    <select
                        id="category"
                        name="category"
                        class="block mt-1 w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-900 p-2.5"
                        autofocus
                    >
                        <option value="" disabled {{ old('category', $banner->category) ? '' : 'selected' }}>Select a category</option>
                        <option value="weekly_scripture" {{ old('category', $banner->category) === 'weekly_scripture' ? 'selected' : '' }}>
                            Weekly Scripture
                        </option>
                        <option value="main" {{ old('category', $banner->category) === 'main' ? 'selected' : '' }}>
                            Main
                        </option>
                        <option value="series" {{ old('category', $banner->category) === 'series' ? 'selected' : '' }}>
                            Sermon > Series
                        </option>
                    </select>
                    <x-input-error :messages="$errors->get('category')" class="mt-2" />
                </div>

                <div class="mt-4">
                    <x-input-label for="text_content" :value="__('Text Content')" />
                    <textarea
                        id="text_content"
                        name="text_content"
                        rows="6"
                        class="block mt-1 w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-900 p-2.5"
                        placeholder="This field can be empty."
                    >{{ old('text_content', $banner->text_content) }}</textarea>
                    <x-input-error :messages="$errors->get('text_content')" class="mt-2" />
                </div>

                <div class="mt-4">
                    <x-input-label for="link" :value="__('Link')" />
                    <x-text-input
                        id="link"
                        name="link"
                        rows="6"
                        class="block mt-1 w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-900 p-2.5"
                        placeholder="This field can be empty."
                        :value="old('link', $banner->link)"
                    />
                <x-input-error :messages="$errors->get('link')" class="mt-2" />
                </div>

                <div class="mt-4">
                    <x-input-label for="order" :value="__('Display Order')" />
                    <x-text-input
                        id="order"
                        name="order"
                        type="number"
                        class="block mt-1 w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-900 p-2.5"
                        placeholder="Lower numbers will be displayed first. This field can be empty."
                        :value="old('order', $banner->order)"
                    />
                    <x-input-error :messages="$errors->get('order')" class="mt-2" />
                </div>

                <div class="mt-4">
                    <x-input-label for="image" value="Image Upload" />
                    <x-text-input
                        id="image"
                        class="block mt-1 w-full"
                        type="file"
                        name="image"
                    />
                    <x-input-error :messages="$errors->get('image')" class="mt-2" />
                </div>

                <div class="mt-4">
                    <x-input-label for="image_url" value="OR Image URL" />
                    <x-text-input
                        id="image_url"
                        class="block mt-1 w-full"
                        type="text"
                        name="image_url"
                        :value="old('image_url', str_starts_with($banner->image, 'http') ? $banner->image : '')"
                        placeholder="https://example.com/banner.jpg"
                    />
                    <x-input-error :messages="$errors->get('image_url')" class="mt-2" />
                </div>

                @if ($banner->image_url)
                    <div class="mt-4">
                        <x-input-label value="Current Image" />
                        <img src="{{ $banner->image_url }}" alt="Current banner image" class="mt-2 w-48 h-28 object-cover rounded">
                    </div>
                @endif

                <div class="flex items-center justify-end mt-4">
                    <x-primary-button class="ms-3">
                        Update
                    </x-primary-button>
                </div>
            </form>
        </div>
    </div>
</x-app-layout>