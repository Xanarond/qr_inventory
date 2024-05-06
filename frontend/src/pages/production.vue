<template>
  <v-container fluid>
    <h1>Страница обьектов</h1>
    <QrTable :logg-in="loggedIn" />
  </v-container>
</template>

<script setup lang="ts">
import { computed, onBeforeMount } from 'vue';
import { useAppUserStore } from '../stores/app';
import router from '../router';

const loggedIn = computed(() => {
  return useAppUserStore().logIn;
});

const hasUser = computed(() => {
  return useAppUserStore().hasUser;
});

onBeforeMount(() => {
  if (!loggedIn.value && !hasUser.value) {
    router.push({ name: '/login' });
  }
});
</script>

<style scoped lang="sass"></style>
