<template>
  <v-btn variant="outlined" @click="dialog = true" class="mr-2">
    Обновить состояние
  </v-btn>

  <v-dialog v-model="dialog" max-width="600">
    <v-card title="Обновить состояние продукции">
      <form @submit.prevent="clearForm">
        <v-card-text>
          <v-row dense>
            <v-col cols="12">
              <v-text-field
                label="Количество"
                v-model="count"
                type="number"
                required
              ></v-text-field>
            </v-col>
            <v-divider class="pb-2"></v-divider>
            <v-virtual-scroll
              :height="200"
              :items="Array.from({ length: 100 }, (_, i) => i + 1)"
            >
              <template v-slot:default="{ item }">
                <v-text-field
                  :label="'Номер обьекта учета'"
                  v-model="codeData[item]"
                />
              </template>
            </v-virtual-scroll>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text="Закрыть" variant="plain" @click="dialog = false"></v-btn>

          <v-btn
            color="primary"
            text="Отправить"
            variant="tonal"
            type="submit"
            @click="updateItems"
          ></v-btn>
        </v-card-actions>
      </form>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from 'vue';
import { useAppUserStore } from '../stores/app';

let dialog = ref(false);
let codeData = ref([]);
let count = ref([]);

const clearForm = () => {
  dialog.value = false;
  count.value = '';
  codeData.value = [];
};

let appStore = useAppUserStore();

const updateItems = async () => {
  let formData = {
    count: count.value,
    codes: codeData.value,
  };
  await appStore.updateCode(formData);
  count.value = await appStore.getAllInventory().then((el) => el.data);
};
</script>

<style scoped lang="sass"></style>
