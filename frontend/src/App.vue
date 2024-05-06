<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { onBeforeMount } from 'vue';
import { useAppUserStore } from './stores/app';
import router from './router';

const loginStore = useAppUserStore();
onBeforeMount(async () => {
  let status = await loginStore.checkToken();
  if (status === 401) {
    router.push({ name: '/login' });
  }
});
</script>
