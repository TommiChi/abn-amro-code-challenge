<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useTvMaze } from '@/stores/shows';
import { useRouter } from 'vue-router';

const collapsed = 50;

const showsStore = useTvMaze();
const selectedGenre = ref<string>('All Genres');
const genres = ref<HTMLUListElement | null>(null);
const router = useRouter();
const genreList = computed(() => showsStore.showsByGenre.map((item) => item.genre));
const selectorHeight = ref<number>(collapsed);

const selectGenre = (event: Event) => {
  const target = event.currentTarget as HTMLLIElement;
  const genre = target.dataset.genre;
  selectedGenre.value = genre as string;
  const path = genreList.value.includes(genre as string) ? `/browse/${genre}` : '/browse';
  router.push(path);
};

const toggleSelector = (event: Event) => {
  event.preventDefault();
  if (selectorHeight.value === collapsed) {
    selectorHeight.value = (collapsed + 10) + (genres.value?.getBoundingClientRect().height ?? 0);
  } else {
    selectorHeight.value = collapsed;
  }
};
</script>

<template>
  <section id="selector"
    :class="['border-[2px] border-[rgba(255,255,255,0.5)] rounded-[10px] p-[10px] overflow-hidden inline-block transition-all duration-300 ease-out', { 'bg-[rgba(0,0,0,0.8)]': selectorHeight !== collapsed }]"
    :style="{ height: `${selectorHeight}px` }">
    <label @click="toggleSelector" class="flex flex-row items-center gap-[10px] cursor-pointer">
      <span>{{ selectedGenre }}</span>

      <button class="transition-all duration-200 ease-out"
        :class="selectorHeight === collapsed ? 'scale-[1]' : 'scale-[-1]'">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
        </svg>
      </button>
    </label>
    <ul class="mt-[10px] cursor-pointer" ref="genres">
      <li data-genre="All Genres" @click="selectGenre">
        All Genres
      </li>
      <li v-for="genre in genreList" :key="genre" :data-genre="genre" @click="selectGenre">
        {{ genre }}
      </li>
    </ul>
  </section>
</template>
