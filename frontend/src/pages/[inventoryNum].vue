<template>
  <v-container fluid>
    <v-row class="mb-5 justify-center">
      <v-col cols="6">
        <h1>Код обьекта учета: {{ route.params.inventoryNum }}</h1>
        <h3>Наименование обьекта: {{ naming }}</h3>
        <h2>Кол-во по данным Бух. учета: {{ nominalCount }}</h2>
        <h2 v-show="countNow !== null">
          Количество на данный момент: {{ countNow }}
        </h2>
      </v-col>
    </v-row>
    <v-row class="justify-center">
      <v-col cols="6">
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
                <v-text-field
                  :label="'Номер обьекта учета'"
                  v-model="inventoryNum"
                />
              </v-row>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
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
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { computed, onBeforeMount, ref } from 'vue';
import { useAppUserStore } from '../stores/app';
import router from '../router';

let route = useRoute();
let param = route.params.inventoryNum.toString();
let inventoryNum = ref(param);
let count = ref(0);
let nominalCount = ref(0);
let naming = ref('');
let countNow = ref(0);

let appStore = useAppUserStore();

const loggedIn = computed(() => {
  return useAppUserStore().logIn;
});

const hasUser = computed(() => {
  return useAppUserStore().hasUser;
});

const clearForm = () => {
  nominalCount.value = 0;
};

onBeforeMount(async () => {
  if (!loggedIn.value && !hasUser.value) {
    router.push({ name: '/login' });
  } else {
    let item = await appStore.getSingleInventory(param).then((el) => el.data);
    nominalCount.value = item.countNominal;
    count.value = item.countNominal;
    naming.value = item.objectName;
    countNow.value = item.count;
  }
});

const updateItems = async () => {
  let formData = {
    count: count.value,
    codes: [null, param],
  };
  await appStore.updateCode(formData);
  router.push({ name: '/' });
};
</script>

<style scoped lang="sass"></style>
