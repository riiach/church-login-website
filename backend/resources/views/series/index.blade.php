<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            Series
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <!-- Button -->
            <div class="flex justify-end items-center m-2 p-2">
                <a href="{{ route('admin.series.create') }}" class="px-4 py-2 bg-blue-500 hover:bg-blue-700 rounded-lg text-white">
                    New Series
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
                                Start Date
                            </th>
                            <th scope="col" class="px-6 py-3 font-medium">
                                End Date
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

                        @forelse ($series as $seriesItem)
                            @php
                                $isExpired = $seriesItem->end_date && \Carbon\Carbon::parse($seriesItem->end_date)->isPast();
                            @endphp
                            <tr class="{{ $isExpired ? 'bg-gray-100' : 'bg-white hover:bg-gray-100' }}" x-data="{ editing: false }">
                                <!-- Title -->
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {{ $seriesItem->title }}
                                </th>
                                <!-- Start Date -->
                                <td class="px-6 py-4">
                                    {{ $seriesItem->start_date }}
                                </td>
                                <!-- End Date -->
                                <td class="px-6 py-4">
                                    {{ $seriesItem->end_date }}
                                </td>
                                <!-- Description -->
                                <td class="px-6 py-4 hidden lg:flex">
                                    {{ $seriesItem->description }}
                                </td>
                                <td class="px-6 py-4 text-right">
                                    <div class="flex justify-end gap-3">
                                        <a href=" {{ route('admin.series.edit', $seriesItem->id) }}" class="font-medium text-blue-500 hover:underline">
                                            Edit
                                        </a>
                                        <form method="POST" action="{{ route('admin.series.destroy', $seriesItem->id) }}">
                                            @csrf
                                            @method('DELETE')
                                                <a href=" {{ route('admin.series.destroy', $seriesItem->id) }}" 
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
                                    <h2>No Series</h2>
                                </td>
                            </tr>
                        @endforelse

                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-app-layout>
