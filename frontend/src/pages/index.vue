<template>
  <v-container fluid>
    <h1>Главная</h1>
    <v-row justify="end">
      <v-btn class="mr-3" variant="outlined" @click="updateTable"
        >Обновить таблицу</v-btn
      >
    </v-row>
    <InventoryTable :key="componentKey" :logg-in="loggedIn" />
  </v-container>
</template>

<script lang="ts" setup>
import { computed, ref, onBeforeMount } from 'vue';
import { useAppUserStore } from '../stores/app';
import router from '../router';

const componentKey = ref(0);

const loggedIn = computed(() => {
  return useAppUserStore().logIn;
});

const hasUser = computed(() => {
  return useAppUserStore().hasUser;
});

const updateTable = async () => {
  await useAppUserStore().getAllInventory();
  componentKey.value += 1;
};

onBeforeMount(() => {
  if (!loggedIn.value && !hasUser.value) {
    router.push({ name: '/login' });
  }
});
</script>
