<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            Announcements
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <!-- Filter and button -->
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
                <a href="{{ route('admin.announcements.create') }}" class="px-4 py-2 bg-blue-500 hover:bg-blue-700 rounded-lg text-white">
                    New Announcement
                </a>
            </div>
            <!-- table -->
            <div class="relative overflow-x-auto bg-white shadow-sm rounded-lg border border-gray-200">
                <table class="w-full text-sm text-left rtl:text-right text-gray-600">
                    <thead class="text-sm text-gray-600 bg-gray-100 border-b border-gray-300">
                        <tr>
                            <th scope="col" class="px-6 py-3 font-medium">
                                Title
                            </th>
                            <th scope="col" class="px-6 py-3 font-medium">
                                Image
                            </th>
                            <th scope="col" class="px-6 py-3 font-medium">
                                Date
                            </th>
                            <th scope="col" class="px-6 py-3 font-medium">
                                Due Date
                            </th>
                            <th scope="col" class="px-6 py-3 font-medium">
                                Location
                            </th>
                            <th scope="col" class="px-6 py-3 font-medium">
                                Category
                            </th>
                            <th scope="col" class="px-6 py-3 font-medium hidden lg:flex">
                                Description
                            </th>
                            <th scope="col" class="px-6 py-3 font-medium">
                                <span class="sr-only">Edit</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                        @forelse ($announcements as $announcement)
                            @php
                                $isExpired = $announcement->due_date && \Carbon\Carbon::parse($announcement->due_date)->isPast();
                            @endphp
                            <tr class="{{ $isExpired ? 'bg-gray-100' : 'bg-white hover:bg-gray-100' }}" x-data="{ editing: false }">
                                <!-- Title -->
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {{ $announcement->title }}
                                </th>
                                <!-- Image -->
                                <td class="px-6 py-4">
                                    <img 
                                        src="{{ $announcement->image_url }}"
                                        class="w-12 h-12 object-cover {{ $announcement->image_url ? '' : 'hidden' }}"
                                    />
                                </td>
                                <!-- Date -->
                                <td class="px-6 py-4">
                                    {{ $announcement->event_date }}
                                </td>
                                <!-- Due Date -->
                                <td class="px-6 py-4">
                                    {{ $announcement->due_date }}
                                </td>
                                <!-- Location -->
                                <td class="px-6 py-4">
                                    {{ $announcement->location }}
                                </td>
                                <!-- Category -->
                                <td class="px-6 py-4">
                                    {{ ucwords(str_replace('_', ' ', $announcement->category)) }}
                                </td>
                                <!-- Description -->
                                <td class="px-6 py-4 hidden lg:flex">
                                    {{ $announcement->description }}
                                </td>
                                <td class="px-6 py-4 text-right">
                                    <div class="flex justify-end gap-3">
                                        <a href=" {{ route('admin.announcements.edit', $announcement->id) }}" class="font-medium text-blue-500 hover:underline">
                                            Edit
                                        </a>
                                        <form method="POST" action="{{ route('admin.announcements.destroy', $announcement->id) }}">
                                            @csrf
                                            @method('DELETE')
                                                <a href=" {{ route('admin.announcements.destroy', $announcement->id) }}" 
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
                                    <h2>No Announcement</h2>
                                </td>
                            </tr>
                        @endforelse

                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-app-layout>
