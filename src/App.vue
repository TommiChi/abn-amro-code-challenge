<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <Transition name="fade" mode="out-in">
    <RouterView />
  </Transition>
</template>

