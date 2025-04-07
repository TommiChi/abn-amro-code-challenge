<script lang="ts" setup>
import { onMounted, watch } from 'vue';
import { useTvMaze } from '@/stores/shows';
import Stars from '@/components/Stars.vue';
import WithLogoHeader from '@/components/WithLogoHeader.vue';
import NetflixAnimation from '@/components/NetflixAnimation.vue';

const showsStore = useTvMaze();

const debounce = (() => {
  let timeout: ReturnType<typeof setTimeout>;
  return (event: Event) => {
    const input = event.currentTarget as HTMLInputElement;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      showsStore.searchShows({ q: input.value })
    }, 500);
  };
})();

onMounted(() => {
  showsStore.getShows();
});
</script>

<template>
  <main class="w-[100vw] overflow-hidden"
    v-if="showsStore.randomShowCast && showsStore.randomShow && showsStore.randomShowBanner">
    <section class="flex flex-row h-[70px]">
      <span class="grow-[1] "></span>
      <WithLogoHeader class="flex flex-row items-center grow-[2] relative">
        <input type="text" placeholder="Search for a show..."
          class="w-[50px] h-[50px] border border-red-500 grow-[1] p-[10px]" @input="debounce" />
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"
          class="absolute left-[calc(100%-40px)] top-[19px] z-10 w-8 -scale-x-100" fill="#ffffff">
          <path
            d="M 19 3 C 13.488281 3 9 7.488281 9 13 C 9 15.394531 9.839844 17.589844 11.25 19.3125 L 3.28125 27.28125 L 4.71875 28.71875 L 12.6875 20.75 C 14.410156 22.160156 16.605469 23 19 23 C 24.511719 23 29 18.511719 29 13 C 29 7.488281 24.511719 3 19 3 Z M 19 5 C 23.429688 5 27 8.570313 27 13 C 27 17.429688 23.429688 21 19 21 C 14.570313 21 11 17.429688 11 13 C 11 8.570313 14.570313 5 19 5 Z">
          </path>
        </svg>
      </WithLogoHeader>
      <span class="grow-[1]"></span>
    </section>
    <div class="relative w-[100%] h-[400px] overflow-hidden">
      <img :src="showsStore.randomShowBanner ?? ''" :alt="`Poster of ${showsStore.randomShow.name}`"
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
    </div>
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
                <img :src="show.image.original" :alt="`Poster of ${show.name}`"
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

    <div class="fixed top-[70px] left-0 w-[100vw] h-[calc(100vh-70px)] bg-[rgba(0,0,0,0.8)] z-[100] p-[10px] pl-[50px]"
      v-if="showsStore.searchResults">
      <ul class="flex flex-col flex-wrap h-[100%] gap-[50px]">
        <li v-for="item in showsStore.searchResults.data" :key="item.show.id">
          <RouterLink :to="`/shows/${item.show.id}`" class="flex flex-row gap-[20px] items-center">
            <img :src="item.show.image?.medium || '/images/abn-amro_logo.jpeg'" :alt="`Poster of ${item.show.name}`"
              class="w-[75px] h-[calc(75px*3/2)] object-cover" />
            <h3 class="font-bold">{{ item.show.name }}</h3>
          </RouterLink>
        </li>
      </ul>
    </div>
  </main>
  <NetflixAnimation></NetflixAnimation>
</template>

<style scoped>
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
