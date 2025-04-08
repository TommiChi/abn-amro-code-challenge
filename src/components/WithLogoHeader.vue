<script lang="ts" setup>
import Image from '@/components/LazyImage.vue';
</script>

<template>
  <section>
    <Image src="/images/netflix-style-logo.png" alt="ABNFlix logo" class="w-[200px] h-[200px]" />
    <slot></slot>
  </section>
</template>
