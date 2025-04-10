<script lang="ts" setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { useTvMaze } from '@/stores/shows';
import { useRouter } from 'vue-router';

const collapsed = 50;

const showsStore = useTvMaze();
const selectedGenre = ref<string>('All Genres');
const genres = ref<HTMLUListElement | null>(null);
const router = useRouter();
const genreList = computed(() => showsStore.showsByGenre.map((item) => item.genre));
const selectorHeight = ref<number>(collapsed);
const expanded = ref(false);
const selectedItem = ref(-1);
const genreSelector = ref<HTMLDivElement | null>(null);
const innerContainer = ref<HTMLDivElement | null>(null);

const selectGenre = (event: Event) => {
  const target = event.currentTarget as HTMLLIElement;
  if (target.dataset.genre === 'All Genres') {
    selectedGenre.value = 'All Genres';
    selectedItem.value = -1;
    expanded.value = false;
    toggleSelector(event);
    return;
  }

  const genre = target.dataset.genre;
  selectedGenre.value = genre as string;
  selectedItem.value = Number(target.dataset.index);
  const path = genreList.value.includes(genre as string) ? `/browse/${genre}` : '/browse';
  router.push(path);
};

const toggleSelector = (event: Event) => {
  event.preventDefault();
  if (selectorHeight.value === collapsed) {
    selectorHeight.value = (collapsed + 10) + (genres.value?.getBoundingClientRect().height ?? 0);
    expanded.value = true;
  } else {
    selectorHeight.value = collapsed;
    expanded.value = false;
  }
};

const keyboardNavigation = (direction: number) => {
  if (!expanded.value) {
    return;
  }

  const benchmarkNumber = direction < 0 ? -1 : genreList.value.length - 1;
  const method = direction < 0 ? Math.max : Math.min;

  selectedItem.value = method(selectedItem.value + direction, benchmarkNumber);

  (document.querySelector(`li[data-index="${selectedItem.value}"]`) as HTMLLIElement)?.focus();
};

const detectOutsideEvent = (event: KeyboardEvent | MouseEvent | TouchEvent) => {
  const isEscape = event.type === 'keydown' && (event as KeyboardEvent).key === 'Escape';
  const isClick = event.type === 'click';
  const isTouch = event.type === 'touchstart';

  if ((((isClick || isTouch) && !genreSelector.value?.contains(event.target as Node)) || isEscape) && expanded.value === true) {
    innerContainer.value?.focus();
    selectedGenre.value = 'All Genres';
    selectedItem.value = -1;
    expanded.value = false;
    toggleSelector(event);
  }
};

onMounted(() => {
  window.addEventListener('click', detectOutsideEvent);
  window.addEventListener('touchstart', detectOutsideEvent);
  window.addEventListener('keydown', detectOutsideEvent);
});

onBeforeUnmount(() => {
  window.removeEventListener('click', detectOutsideEvent);
  window.removeEventListener('touchstart', detectOutsideEvent);
  window.removeEventListener('keydown', detectOutsideEvent);
});
</script>

<template>
  <div id="selector"
    :class="['border-[2px] border-[rgba(255,255,255,0.5)] rounded-[10px] p-[10px] overflow-hidden inline-block transition-all duration-300 ease-out', { 'bg-[rgba(0,0,0,0.8)]': selectorHeight !== collapsed }]"
    :style="{ height: `${selectorHeight}px` }" aria-label="Genre Selector" @keydown.up.prevent="keyboardNavigation(-1)"
    @keydown.down.prevent="keyboardNavigation(1)" ref="genreSelector">
    <div @click="toggleSelector" class="flex flex-row items-center gap-[10px] cursor-pointer" :aria-expanded="expanded"
      aria-controls="genre-list" role="button" tabindex="0" @keydown.enter="toggleSelector"
      @keydown.space.prevent="toggleSelector" aria-labelledby="inner-text" ref="innerContainer">
      <span tabindex="-1" id="inner-text">{{ selectedGenre }}</span>

      <div class="transition-all duration-200 ease-out"
        :class="selectorHeight !== collapsed ? 'scale-[1]' : 'scale-[-1]'" tabindex="-1">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="size-6" tabindex="-1" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
        </svg>
      </div>
    </div>
    <ul id="genre-list" class="mt-[10px] cursor-pointer" ref="genres" role="listbox" aria-label="Genre List">
      <li data-genre="All Genres" @click="selectGenre" @keydown.enter.prevent="selectGenre"
        :aria-selected="selectedItem === -1" data-index="-1" role="option" tabindex="0">
        All Genres
      </li>
      <li v-for="(genre, index) in genreList" :key="genre" :data-genre="genre" @click="selectGenre"
        @keydown.enter.prevent="selectGenre" @keydown.space.prevent="selectGenre"
        :aria-selected="selectedItem === index" :data-index="index" role="option" tabindex="0">
        {{ genre }}
      </li>
    </ul>
  </div>
</template>
