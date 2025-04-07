<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <Transition name="fade" mode="out-in">
    <RouterView />
  </Transition>
</template>

