<script setup lang="ts">
import WithLogoHeader from '@/components/WithLogoHeader.vue';

</script>

<template>
  <main class="flex flex-col items-center justify-center w-screen h-screen">
    <h1 class="text-logo-yellow text-2xl">Welcome to</h1>
    <WithLogoHeader class="flex flex-col items-center justify-center">
      <RouterLink to="/login" class="text-logo-green text-2xl underline">Sign in</RouterLink>
    </WithLogoHeader>
  </main>
</template>

<style scoped>
main {
  background-image: radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 1) 75%), url('/images/abnamro-bank.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
