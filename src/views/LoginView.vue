<template>
  <WithLogoHeader class="flex flex-col items-center justify-center mt-[58px] ml-[50vw] transform-[translateX(-50%)]">
    <h1 class="text-2xl text-logo-yellow">Sign in with:</h1>
    <ul class="list-disc list-inside">
      <li class="text-2xl text-logo-green"><button @click="signInWithGoogle"
          class="underline cursor-pointer transition duration-300 ease-out hover:transform-[scale(1.1)]">Google</button>
      </li>
    </ul>
  </WithLogoHeader>

</template>

<script setup lang="ts">
import WithLogoHeader from '@/components/WithLogoHeader.vue';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useRouter } from 'vue-router';

const router = useRouter();

const signInWithGoogle = () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  signInWithPopup(auth, provider).then(() => {
    router.replace('/browse');
  }).catch((error) => {
    console.error(`/!\\ AUTHENTICATION ERROR /!\\\n`, { error });
  });
};
</script>
