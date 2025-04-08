<script lang="ts" setup>
const fallbackImage = '/images/abn-amro_logo.jpeg';
const fallbackText = 'fallback image';

const props = defineProps<{
  fallback?: string;
  src: string;
  alt: string;
}>();

const imageSrc = props.src || props.fallback || fallbackImage;
const imageAlt = props.alt || fallbackText;

const handleLoadingError = (event: Event) => {
  const element = event.currentTarget as HTMLImageElement;
  element.src = props.fallback || fallbackImage;
  element.setAttribute('alt', fallbackText);
};
</script>

<template>
  <img :src="imageSrc" :alt="imageAlt" loading="lazy" class="object-cover" @error="handleLoadingError" />
</template>
<style scoped></style>
