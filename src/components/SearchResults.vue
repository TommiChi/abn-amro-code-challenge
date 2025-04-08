<script lang="ts" setup>
import { useTvMaze } from '@/stores/shows';
import Image from '@/components/LazyImage.vue';

const showsStore = useTvMaze();

</script>

<template>
  <div class="fixed top-[70px] left-0 w-[100vw] h-[calc(100vh-70px)] bg-[rgba(0,0,0,0.8)] z-[100] p-[10px] pl-[50px]"
    v-if="showsStore.searchResults">
    <ul class="flex flex-col flex-wrap h-[100%] gap-[50px]">
      <li v-for="item in (showsStore.searchResults.data)" :key="item.show.id">
        <RouterLink :to="`/shows/${item.show.id}`" class="flex flex-row gap-[20px] items-center"
          @click="showsStore.resetSearch">
          <Image :src="item.show.image?.medium ?? ''" :alt="`Poster of ${item.show.name}`"
            class="w-[75px] h-[calc(75px*3/2)] object-cover" />
          <h3 class="font-bold">{{ item.show.name }}</h3>
        </RouterLink>
      </li>
    </ul>
  </div>
</template>
