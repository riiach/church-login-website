<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            Create Series
        </h2>
    </x-slot>

    <div class="py-8 px-8">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 bg-white shadow-md rounded-md">
            <p class="pt-4 px-4 text-sm text-gray-500">
                * Required Field
            </p>
            <!-- Form -->
            <form method="POST" action="{{ route('admin.series.store') }}" class="p-4" enctype="multipart/form-data">
                @csrf

                <!-- Title -->
                <div>
                    <x-input-label for="title" :value="__('* Title')" />
                    <x-text-input id="title" class="block mt-1 w-full" type="text" name="title" :value="old('title')" autofocus />
                    <x-input-error :messages="$errors->get('title')" class="mt-2" />
                </div>

                <!-- Order -->
                <div class="mt-4">
                    <x-input-label for="order" :value="__('Order')" />
                    <x-text-input id="order" class="block mt-1 w-full" type="number" name="order" :value="old('order', 0)" />
                    <x-input-error :messages="$errors->get('order')" class="mt-2" />
                </div>

                <!-- Start Date -->
                <x-input-label for="start_date" :value="__('* Start Date')" class="mt-2" />

                <x-text-input
                    id="start_date"
                    class="block mt-1 w-full"
                    type="date"
                    name="start_date"
                    :value="old('start_date')"
                />

                <!-- End Date -->
                <x-input-label for="end_date" :value="__('End Date')" class="mt-2" />
                <x-text-input
                    id="end_date"
                    class="block mt-1 w-full"
                    type="date"
                    name="end_date"
                    :value="old('end_date')"
                />

                <!-- Description -->
                <x-input-label for="description" :value="__('Description')" class="mt-2"/>

                <textarea
                    id="description"
                    name="description"
                    rows="8"
                    class="block mt-1 w-full border border-gray-300 rounded-md shadow-sm
                    focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-900 p-2.5"
                    placeholder="This field can be empty."
                >{{ old('description') }}</textarea>

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
