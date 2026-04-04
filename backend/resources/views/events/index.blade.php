<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            Events
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <!-- button -->
            <div class="flex justify-end m-2 p-2">
                <a href="{{ route('admin.events.create') }}" class="px-4 py-2 bg-blue-500 hover:bg-blue-700 rounded-lg text-white">
                    New Event
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
                            <th scope="col" class="px-6 py-3 font-medium hidden lg:flex">
                                Description
                            </th>
                            <th scope="col" class="px-6 py-3 font-medium">
                                Spots
                            </th>
                            <th scope="col" class="px-6 py-3 font-medium">
                                People
                            </th>
                            <th scope="col" class="px-6 py-3 font-medium">
                                <span class="sr-only">Edit</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody x-data="{ activeRowId: null, showRegistrations: {} }">

                        @forelse ($events as $event)
                            @php
                                $isExpired = $event->due_date && \Carbon\Carbon::parse($event->due_date)->isPast();
                            @endphp
                            <tr class="{{ $isExpired ? 'bg-gray-100' : 'bg-white hover:bg-gray-100' }}">
                                <!-- Title -->
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {{ $event->title }}
                                </th>
                                <!-- Image -->
                                <td class="px-6 py-4">
                                    <img 
                                        src="{{ $event->image_url }}"
                                        class="w-12 h-12 object-cover {{ $event->image_url ? '' : 'hidden' }}"
                                    />
                                </td>
                                <!-- Date -->
                                <td class="px-6 py-4">
                                    {{ $event->event_date }}
                                </td>
                                <!-- Due Date -->
                                <td class="px-6 py-4">
                                    {{ $event->due_date }}  
                                </td>
                                <!-- Location -->
                                <td class="px-6 py-4">
                                    {{ $event->location }}
                                </td>
                                <!-- Description -->
                                <td class="px-6 py-4 hidden lg:flex">
                                    {{ $event->description }}
                                </td>
                                <td class="px-6 py-4">
                                    {{ $event->max_slots }}
                                </td>
                                <!-- Registration DropDown Button -->
                                <td class="px-6 py-4">
                                    <button 
                                        type="button"
                                        @click="showRegistrations[{{ $event->id }}] = !showRegistrations[{{ $event->id }}]"
                                        class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
                                    >
                                        <span x-text="showRegistrations[{{ $event->id }}] ? '⌃' : '⌄'"></span>
                                    </button>
                                </td>
                                <td class="px-6 py-4 text-right">
                                    <div class="flex justify-end gap-3">
                                        <a href=" {{ route('admin.events.edit', $event->id) }}" class="font-medium text-blue-500 hover:underline">
                                            Edit
                                        </a>
                                        <form method="POST" action="{{ route('admin.events.destroy', $event->id) }}">
                                            @csrf
                                            @method('DELETE')
                                                <a href=" {{ route('admin.events.destroy', $event->id) }}" 
                                                    class="font-medium text-red-500 hover:underline"
                                                    onClick="event.preventDefault(); this.closest('form').submit();"
                                                >Delete
                                                </a>
                                        </form>
                                    </div>
                                </td>
                            </tr>
                            <tr x-show="showRegistrations[{{ $event->id }}]" x-transition>
                                <td colspan="7" class="px-6 py-4 bg-white">

                                    @if (($registrations[$event->id] ?? collect())->isEmpty())
                                        <p class="text-sm text-gray-500">No Registration</p>
                                    @else
                                        <ul class="max-w-full divide-y divide-default">
                                            @foreach ($registrations[$event->id] as $registration)
                                                <li class="py-3">
                                                    <div class="flex items-center justify-between space-x-4">
                                                        <div class="flex items-center flex-row flex-1">
                                                            <div class="shrink-0 mr-2">
                                                                <img 
                                                                    class="w-8 h-8 rounded-full"
                                                                    src="{{ $registration->profile_photo === null || $registration->profile_photo === ''
                                                                        ? asset('storage/images/profile_photo_null_blue.png') 
                                                                        : $registration->profile_photo
                                                                    }}"
                                                                    alt="profile"
                                                                >
                                                            </div>
                                                            <div>
                                                                <p class="text-sm font-medium text-heading truncate">
                                                                    {{ $registration->name }}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div class="flex-1 min-w-0 text-right">
                                                            <p class="text-sm text-body truncate">
                                                                {{ $registration->email }}
                                                            </p>
                                                            <p class="text-sm text-body truncate">
                                                                {{ $registration->phone }}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </li>
                                            @endforeach
                                        </ul>
                                    @endif
                                </td>
                            </tr>
                        @empty
                            <tr>
                                <td class="px-6 py-4">
                                    <h2>No Event</h2>
                                </td>
                            </tr>
                        @endforelse

                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-app-layout>
