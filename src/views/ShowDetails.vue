<script lang="ts" setup>
import { onMounted, watch } from 'vue';
import { useTvMaze } from '@/stores/shows';
import Stars from '@/components/Stars.vue';
import { useRoute } from 'vue-router';

const showsStore = useTvMaze();
const route = useRoute();

onMounted(() => {
  showsStore.getDetails(Number(route.path.split('/').pop()))
});
</script>
<template>
  <main class="w-[100vw] overflow-hidden flex flex-col gap-[20px] min-h-[100vh]"
    v-if="showsStore.showDetails && showsStore.detailsBanner">
    <section class="relative w-[100%] h-[400px] overflow-hidden">
      <img :src="showsStore.detailsBanner ?? ''" :alt="`Poster of ${showsStore.showDetails.show.name}`"
        class="relative object-cover min-w-[100%] min-h-[100%] top-[50%] left-[50%] transform-[translate(-50%,-50%)]" />
      <article class="absolute left-0 top-0 bg-[rgba(0,0,0,0.5)] p-[10px] w-[250px] h-[100%] flex flex-col gap-[10px]">
        <RouterLink to="/browse">
          <svg class="h-[15px] w-[15px] inline transform-[translateY(-1px)]" xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32" fill="#ffffff">
            <path
              d="M 19.03125 4.28125 L 8.03125 15.28125 L 7.34375 16 L 8.03125 16.71875 L 19.03125 27.71875 L 20.46875 26.28125 L 10.1875 16 L 20.46875 5.71875 Z">
            </path>
          </svg>
          BACK
        </RouterLink>
        <h1 class="font-bold text-[24px] whitespace-nowrap">{{ showsStore.showDetails.show.name }}</h1>
        <img :src="showsStore.showDetails.show.image?.medium" :alt="`Poster of ${showsStore.showDetails.show.name}`"
          class="h-[200px] w-[calc(200px*2/3)]" />
        <Stars :rating="showsStore.showDetails.show.rating.average" />
        <div>
          {{ showsStore.showDetails.show.runtime }} minutes - {{ showsStore.showDetails.show.genres.join(', ') }}
        </div>
      </article>
    </section>
    <section class="grow-[2] p-[20px]">
      <span class="block pb-[40px]">
        <h2 class="font-bold text-[24px] mb-[20px]">Synopsis</h2>
        <div v-html="showsStore.showDetails.show.summary"></div>
      </span>

      <span class="block pb-[40px]">
        <h2 class="font-bold text-[24px] mb-[20px]">Cast</h2>
        <ul class="flex flex-row flex-wrap gap-[50px]">
          <li v-for="cast in showsStore.showDetails.cast" :key="cast.person.id"
            class="flex flex-row gap-[10px] mb-[10px]">
            <img :src="cast.person.image?.medium" :alt="`Poster of ${cast.person.name}`"
              class="w-[75px] h-[75px] object-cover rounded-full" />
            <div class="flex flex-col justify-center">
              <h3 class="font-bold">{{ cast.person.name }}</h3>
              <p>({{ cast.character.name }})</p>
            </div>
          </li>
        </ul>
      </span>
    </section>
  </main>
</template>

<style scoped>
.ellipsis-text {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 10;
  overflow: hidden;
}
</style>
