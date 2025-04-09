<script lang="ts" setup>
import { onMounted } from 'vue';
import { useTvMaze } from '@/stores/shows';
import Stars from '@/components/RatingStars.vue';
import NetflixAnimation from '@/components/NetflixAnimation.vue';
import SearchBar from '@/components/SearchBar.vue';
import Image from '@/components/LazyImage.vue';
import SearchResults from '@/components/SearchResults.vue';
import GenreSelector from '@/components/GenreSelector.vue';

const showsStore = useTvMaze();

onMounted(() => {
  showsStore.getShows();
});
</script>

<template>
  <main class="w-[100vw] overflow-hidden"
    v-if="showsStore.randomShowCast && showsStore.randomShow && showsStore.randomShowBanner">
    <SearchBar class="search-bar fixed top-0 left-0 w-[100%] z-[10]" />
    <GenreSelector class="fixed top-[10px] right-[10px] z-[10]" />
    <header class="relative w-[100vw] h-[400px] overflow-hidden mt-[70px]">
      <Image :src="showsStore.randomShowBanner" :alt="`Poster of ${showsStore.randomShow.name}`"
        class="relative object-cover min-w-[100%] min-h-[100%] top-[50%] left-[50%] transform-[translate(-50%,-50%)]" />
      <article
        class="absolute left-0 top-0 bg-[rgba(0,0,0,0.5)] p-[10px] w-[250px] h-[100%] flex flex-col gap-[10px] overflow-hidden">
        <h1 class="font-bold text-[24px]">{{ showsStore.randomShow?.name }}</h1>
        <Stars :rating="showsStore.randomShow.rating.average" />
        <div>
          {{ showsStore.randomShow.runtime }} minutes - {{ showsStore.randomShow.genres.join(', ') }}
        </div>
        <div class="grow-[2] ellipsis-text">
          <div class="font-bold">Starring</div>
          {{ showsStore.randomShowCast.join(', ') }}
        </div>
        <RouterLink :to="`/shows/${showsStore.randomShow.id}`"
          class="absolute bottom-0 left-0 w-[100%] h-[30px] bg-[rgba(255,0,0,0.5)] font-bold text-center content-center gradient">
          More info
        </RouterLink>
      </article>
    </header>
    <div class="p-[40px]">
      <section v-for="item in showsStore.showsByGenre" :key="item.genre" class="mb-[40px]">
        <span class="flex flex-row items-center gap-[10px]">
          <h2 class="font-bold text-[24px] genre__title">{{ item.genre }}</h2>
          <span class="h-[2px] grow-[2] bg-[rgba(255,255,255,1)]"></span>
        </span>
        <span class="block w-[100%] overflow-x-auto">
          <ul class="mb-[20px] gap-[10px] grid grid-flow-col overflow-x-auto w-[fit-content]">
            <li v-for="show in item.shows" :key="show.id"
              class="relative overflow-hidden h-[225px] w-[150px] object-cover cursor-pointer inline-block overflow-auto">
              <RouterLink :to="`/shows/${show.id}`" class="absolute top-0 left-0 w-[100%] h-[100%]">
                <Image :src="show.image?.original ?? ''" :alt="`Poster of ${show.name}`"
                  class="object-cover min-w-[100%] min-h-[100%]" />
                <h3
                  class="absolute top-0 left-0 w-[100%] h-[100%] bg-[rgba(0,0,0,0.5)] font-bold text-center content-center opacity-[0] hover:opacity-[1] transition duration-300 ease-out">
                  {{ show.name }}
                </h3>
              </RouterLink>
            </li>
          </ul>
        </span>
      </section>
    </div>

    <SearchResults v-if="showsStore.searchResults" />
  </main>
  <NetflixAnimation />
</template>

<style scoped>
.search-bar {
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0));
}
.ellipsis-text {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 10;
  overflow: hidden;
}

.gradient {
  background: linear-gradient(to bottom, rgba(45, 193, 191, 0.5), rgba(45, 193, 191, 1));
}
</style>
