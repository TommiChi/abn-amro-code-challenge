<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useTvMaze } from '@/stores/shows';
import Image from '@/components/LazyImage.vue';
import WithLogoHeader from '@/components/WithLogoHeader.vue';
import BackButton from '@/components/BackButton.vue';

const getMoreGenreData = () => {
  showsStore.getMoreByGenre(genre)
    .then(() => {
      setTimeout(() => {
        const buffer = 225;
        const isAtBottom = document.documentElement.scrollHeight <= window.innerHeight + window.scrollY + buffer;

        if (isAtBottom && showsStore.showsBySingleGenre.hasNextPage) {
          getMoreGenreData();
        }
      }, 100);
    });
};

const showsStore = useTvMaze();
const route = useRoute();
const router = useRouter();
const genre = route.path.split('/').pop() as string;
const sentinel = ref<HTMLSpanElement | null>(null);
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      getMoreGenreData();
    }
  });
}, { threshold: 0.1 });

onMounted(() => {
  if (sentinel.value) {
    observer.observe(sentinel.value);
  }
});

onBeforeUnmount(() => {
  if (sentinel.value) {
    observer.unobserve(sentinel.value);
  }
});
</script>

<template>
  <main>
    <header class="banner fixed top-0 left-0 w-[100%] z-[10] flex flex-row items-center">
      <BackButton class="transform-[translate(20px,-150%)]" />
      <WithLogoHeader class="flex flex-col gap-[20px] justify-center items-center h-[150px] grow-[1]">
        <h1 class="capitalize transform-[translateY(-70px)] font-bold text-[24px]">{{ genre }}</h1>
      </WithLogoHeader>
    </header>
    <ul class="flex flex-row flex-wrap gap-[50px] p-[20px] justify-center mt-[150px]">
      <li v-for="show in showsStore.showsBySingleGenre.shows" :key="show.id" class="poster border-[1px]">
        <RouterLink :to="`/shows/${show.id}`"
          class="relative overflow-hidden h-[225px] w-[150px] object-cover cursor-pointer inline-block overflow-auto">
          <Image :src="show.image?.original ?? ''" :alt="`Poster of ${show.name}`"
            class="object-cover min-w-[100%] min-h-[100%]" />
          <h3
            class="absolute top-0 left-0 w-[100%] h-[100%] bg-[rgba(0,0,0,0.5)] font-bold text-center content-center opacity-[0] hover:opacity-[1] transition duration-300 ease-out">
            {{ show.name }}
          </h3>
        </RouterLink>
      </li>
    </ul>

    <span ref="sentinel" class="sentinel w-[0] h-[0] opacity-[0]"></span>
  </main>
</template>

<style scoped>
.banner {
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0));
}

.poster {
  animation: appear 0.5s ease-out forwards;
}

@keyframes appear {
  from {
    transform: translateY(120%);
    border-color: rgba(245, 245, 245, 1);
  }

  to {
    transform: translateY(0);
    border-color: rgba(245, 245, 245, 0);
  }
}
</style>
