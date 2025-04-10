<template>
  <main>
    <WithLogoHeader class="flex flex-col items-center justify-center mt-[58px] ml-[50vw] transform-[translateX(-50%)]">
      <h1 class="text-2xl text-logo-yellow">Sign in with:</h1>
      <ul class="list-disc list-inside">
        <li class="text-2xl text-logo-green"><button @click="signInWithFakeUser"
            class="underline cursor-pointer transition duration-300 ease-out hover:transform-[scale(1.1)]">Fake
            User</button>
        </li>
      </ul>
    </WithLogoHeader>
  </main>
</template>

<script setup lang="ts">
import WithLogoHeader from '@/components/WithLogoHeader.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const signInWithFakeUser = () => {
  document.cookie = 'abnFlixUser=FakeUser';
  router.push('/browse');
};
</script>
