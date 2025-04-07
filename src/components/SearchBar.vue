<script lang="ts" setup>
import { useTvMaze } from '@/stores/shows';
import WithLogoHeader from '@/components/WithLogoHeader.vue';

const showsStore = useTvMaze();

const debouncedSearch = (() => {
  let timeout: ReturnType<typeof setTimeout>;
  return (event: Event) => {
    const input = event.currentTarget as HTMLInputElement;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      if (input.value === '') {
        showsStore.resetSearch();
        return;
      }
      showsStore.searchShows({ q: input.value })
    }, 500);
  };
})();
</script>

<template>
  <section class="flex flex-row h-[70px]">
    <span class="grow-[1] "></span>
    <WithLogoHeader class="flex flex-row items-center grow-[2] relative">
      <input type="text" placeholder="Search for a show..."
        class="w-[50px] h-[50px] border border-red-500 grow-[1] p-[10px]" @input="debouncedSearch" />
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"
        class="absolute left-[calc(100%-40px)] top-[19px] z-10 w-8 -scale-x-100" fill="#ffffff">
        <path
          d="M 19 3 C 13.488281 3 9 7.488281 9 13 C 9 15.394531 9.839844 17.589844 11.25 19.3125 L 3.28125 27.28125 L 4.71875 28.71875 L 12.6875 20.75 C 14.410156 22.160156 16.605469 23 19 23 C 24.511719 23 29 18.511719 29 13 C 29 7.488281 24.511719 3 19 3 Z M 19 5 C 23.429688 5 27 8.570313 27 13 C 27 17.429688 23.429688 21 19 21 C 14.570313 21 11 17.429688 11 13 C 11 8.570313 14.570313 5 19 5 Z">
        </path>
      </svg>
    </WithLogoHeader>
    <span class="grow-[1]"></span>
  </section>
</template>
