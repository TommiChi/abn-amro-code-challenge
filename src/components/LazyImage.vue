<script lang="ts" setup>
import { ref } from 'vue';

const fallbackImage = '/images/abn-amro_logo.jpeg';
const fallbackText = 'fallback image';

const props = defineProps<{
  fallback?: string;
  src: string;
  alt: string;
}>();

const imageSrc = props.src || props.fallback || fallbackImage;
const imageAlt = props.alt || fallbackText;
const loaded = ref(false);

const handleLoadingError = (event: Event) => {
  const element = event.currentTarget as HTMLImageElement;
  element.src = props.fallback || fallbackImage;
  element.setAttribute('alt', fallbackText);
};

const handleLoaded = (event: Event) => {
  loaded.value = true;
};
</script>

<template>
  <img :src="imageSrc" :alt="imageAlt" loading="lazy"
    :class="['object-cover', 'transition-all', 'duration-300', loaded ? 'opacity-[1]' : 'opacity-[0]']"
    @error="handleLoadingError" @load="handleLoaded" />
</template>
<style scoped></style>
