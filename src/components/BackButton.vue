<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const backUrl = ref<string>(router.options.history.state.back as string);
const fallbackUrl = '/browse';

const goBack = () => {
  console.warn('@Go back\n', { backUrl: backUrl.value });
  if (!backUrl.value) {
    router.push(fallbackUrl);
  } else {
    router.back();
  }
};
</script>

<template>
  <button class="cursor-pointer text-left" @click="goBack">
    <svg class="h-[15px] w-[15px] inline transform-[translateY(-2px)]" xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32" fill="#ffffff">
      <path
        d="M 19.03125 4.28125 L 8.03125 15.28125 L 7.34375 16 L 8.03125 16.71875 L 19.03125 27.71875 L 20.46875 26.28125 L 10.1875 16 L 20.46875 5.71875 Z">
      </path>
    </svg>
    BACK
  </button>
</template>

<style scoped></style>
