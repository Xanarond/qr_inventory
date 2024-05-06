<template>
  <v-row class="justify-end">
    <v-col>
      <AlertMessage
        v-show="alert"
        :key="componentKey"
        :color="color"
        :message="message"
      />
    </v-col>
  </v-row>
  <v-file-input
    style="z-index: 1"
    accept=".xlsx, .xlsb, .xlsm"
    label="Внесите форму отчета в одном из форматов (.xlsx, .xlsb, .xlsm)"
    @change="onChange"
    z-index="1"
  ></v-file-input>
  <div style="z-index: 1" class="d-flex align-center justify-center w-auto">
    <v-btn
      color="blue-darken-4"
      size="x-large"
      @click="sendFile()"
      :loading="loading"
    >
      Экспорт данных в БД
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import instance from '../services/api';
import { ref } from 'vue';

const file = ref(null);
let loading = ref(false);
let color = ref('');
let componentKey = ref(0);
let alert = ref(false);
let message = ref('');

let onChange = async (event) => {
  file.value = event.target.files[0];
};

async function sendFile() {
  const formData = new FormData();
  formData.append('file', file.value);
  loading.value = true;
  instance
    .post('/excel/import', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => {
      console.log('Файл успешно загружен', response);
      loading.value = false;
      alert.value = true;
      color.value = 'success';
      message.value = 'Файл успешно загружен!';
      file.value = null;
      componentKey.value += 1;
    })
    .catch((error) => {
      loading.value = false;
      alert.value = true;
      color.value = 'error';
      componentKey.value += 1;
      message.value = 'Ошибка при загрузке файла!';
      file.value = null;
      console.error('Ошибка при загрузке файла', error);
    });
}
</script>

<style scoped lang="sass"></style>
