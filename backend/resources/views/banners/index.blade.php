<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            Banners
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="flex justify-between items-center m-2 p-2">
                <div class="flex items-center gap-2">
                    <label for="category-filter" class="text-sm font-medium text-gray-700">Filter by Category:</label>
                    <form method="GET" id="category-form" class="flex gap-2">
                        <select id="category-filter" name="category" class="px-3 py-2 border border-gray-300 rounded-lg text-sm" onchange="document.getElementById('category-form').submit();">
                            <option value="all" {{ $category === null || $category === 'all' ? 'selected' : '' }}>All Categories</option>
                            @foreach($categories as $cat)
                                <option value="{{ $cat }}" {{ $category === $cat ? 'selected' : '' }}>
                                    {{ ucwords(str_replace('_', ' ', $cat)) }}
                                </option>
                            @endforeach
                        </select>
                    </form>
                </div>
                <a href="{{ route('admin.banners.create') }}" class="px-4 py-2 bg-blue-500 hover:bg-blue-700 rounded-lg text-white">
                    New Banner
                </a>
            </div>

            <div class="relative overflow-x-auto bg-white shadow-sm rounded-lg border border-gray-200">
                <table class="w-full text-sm text-left rtl:text-right text-gray-600">
                    <thead class="text-sm text-gray-600 bg-gray-100 border-b border-gray-300">
                        <tr>
                            <th scope="col" class="px-6 py-3 font-medium">
                                Image
                            </th>
                            <th scope="col" class="px-6 py-3 font-medium">
                                Category
                            </th>
                            <th scope="col" class="px-6 py-3 font-medium hidden lg:flex">
                                Text Content
                            </th>
                            <th scope="col" class="px-6 py-3 font-medium">
                                <span class="sr-only">Edit</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        @forelse ($banners as $banner)
                            <tr class="bg-white hover:bg-gray-100">
                                <td class="px-6 py-4">
                                    <img
                                        src="{{ $banner->image_url }}"
                                        class="w-24 h-14 object-cover rounded {{ $banner->image_url ? '' : 'hidden' }}"
                                        alt="Banner image"
                                    />
                                </td>
                                <td class="px-6 py-4">
                                    {{ ucwords(str_replace('_', ' ', $banner->category)) }}
                                </td>
                                <td class="px-6 py-4 hidden lg:flex">
                                    {{ $banner->text_content }}
                                </td>
                                <td class="px-6 py-4 text-right">
                                    <div class="flex justify-end gap-3">
                                        <a href="{{ route('admin.banners.edit', $banner->id) }}" class="font-medium text-blue-500 hover:underline">
                                            Edit
                                        </a>
                                        <form method="POST" action="{{ route('admin.banners.destroy', $banner->id) }}">
                                            @csrf
                                            @method('DELETE')
                                            <a href="{{ route('admin.banners.destroy', $banner->id) }}"
                                                class="font-medium text-red-500 hover:underline"
                                                onClick="event.preventDefault(); this.closest('form').submit();"
                                            >Delete
                                            </a>
                                        </form>
                                    </div>
                                </td>
                            </tr>
                        @empty
                            <tr>
                                <td class="px-6 py-4">
                                    <h2>No Banner</h2>
                                </td>
                            </tr>
                        @endforelse
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-app-layout>