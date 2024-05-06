<template>
  <div class="text-center mr-2">
    <v-dialog v-model="dialog" max-width="400" persistent>
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn v-bind="activatorProps" variant="outlined">
          {{ props.btnText }}
        </v-btn>
      </template>

      <v-card :text="props.cardText">
        <template v-slot:actions>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="dialog = false"> Нет</v-btn>
          <v-btn color="success" @click="actionHandle"> Да</v-btn>
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useAppUserStore } from '../stores/app';
import router from '../router';

let props = defineProps({
  btnText: String,
  cardText: String,
});

const dialog = ref(false);

onMounted(async () => {});
const store = useAppUserStore();

const actionHandle = () => {
  if (props.btnText === 'Очистить таблицы') {
    try {
      dialog.value = false;
      store.clearTables();
      router.push({ name: '/export' });
    } catch (error) {
      return error;
    }
  }
  if (props.btnText == 'Выйти') {
    try {
      dialog.value = false;
      store.logout();
      router.push({ name: '/login' });
    } catch (error) {
      return error;
    }
  }
};
</script>

<style scoped lang="sass"></style>
