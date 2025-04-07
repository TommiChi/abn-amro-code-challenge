<script lang="ts" setup>
const props = defineProps<{
  rating: number | null;
}>();

const roundedRating = Math.round((props.rating ?? 0) / 2);
</script>

<template>
  <div class="flex flex-row gap-[5px]">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" data-test="star"
      :fill="index > roundedRating - 1 ? '#d2d5da' : '#f0e40c'" class="w-6" v-for="(_, index) in Array(5).fill(null)"
      :key="index">
      <path
        d="M 30.335938 12.546875 L 20.164063 11.472656 L 16 2.132813 L 11.835938 11.472656 L 1.664063 12.546875 L 9.261719 19.394531 L 7.140625 29.398438 L 16 24.289063 L 24.859375 29.398438 L 22.738281 19.394531 Z">
      </path>
    </svg>
  </div>
</template>
