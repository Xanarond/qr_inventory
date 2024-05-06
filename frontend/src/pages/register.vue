<template>
  <v-container>
    <RegisterForm />
  </v-container>
</template>

<script setup lang="ts">
import RegisterForm from '../components/RegisterForm.vue';
import { computed, onBeforeMount } from 'vue';
import { useAppUserStore } from '../stores/app';
import router from '../router';

const loggedIn = computed(() => {
  return useAppUserStore().logIn;
});

const hasUser = computed(() => {
  return useAppUserStore().hasUser;
});
const userRole = computed(() => {
  return useAppUserStore().userRole;
});

onBeforeMount(() => {
  if (!loggedIn.value && !hasUser.value) {
    router.push({ name: '/login' });
  }
  if (userRole.value === 2) {
    router.push({ name: '/forbidden' });
  }
});
</script>
