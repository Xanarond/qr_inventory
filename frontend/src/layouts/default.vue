<template>
  <v-app id="app">
    <v-layout>
      <v-app-bar density="compact">
        <v-app-bar-title>Inventory</v-app-bar-title>
        <template v-slot:append>
          <UpdateDialog
            v-if="page_route === '/' && hasUser !== null && role === 1"
          />
          <SuggestDialog
            v-if="
              (page_route === '/' || page_route === '/production') &&
              hasUser !== null &&
              role === 1
            "
            :btn-text="clearTableBtn"
            :card-text="clearTableCardTitle"
          />
          <v-btn v-show="hasUser !== null" variant="outlined" class="mr-2">
            Меню
            <v-menu activator="parent">
              <v-list>
                <v-list-item
                  v-for="(item, index) in links"
                  :key="index"
                  :value="index"
                  :to="item.route"
                >
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-btn>

          <v-btn
            v-show="hasUser !== null && role === 1"
            variant="outlined"
            class="mr-2"
          >
            Админ меню

            <v-menu activator="parent">
              <v-list>
                <v-list-item
                  v-for="(item, index) in adminLinks"
                  :key="index"
                  :value="index"
                  :to="item.route"
                >
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-btn>

          <v-btn v-show="!loggedIn" class="ml-1" to="/login" variant="outlined"
            >Login
          </v-btn>

          <SuggestDialog
            v-show="loggedIn"
            :btn-text="logoutBtn"
            :card-text="logoutTitle"
          />
        </template>
      </v-app-bar>
      <v-main>
        <router-view />
      </v-main>
    </v-layout>
  </v-app>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useAppUserStore } from '../stores/app';
import { useRoute } from 'vue-router';

let route = useRoute();
const page_route = computed(() => {
  return route.name;
});

const loggedIn = computed(() => {
  return useAppUserStore().logIn;
});

const hasUser = computed(() => {
  return useAppUserStore().hasUser;
});

const role = computed(() => {
  return useAppUserStore().userRole;
});

const links = ref([
  { title: 'Общая таблица', route: '/' },
  { title: 'Страница обьектов', route: '/production' },
]);

const adminLinks = ref([
  { title: 'Экcпорт данных', route: '/export' },
  { title: 'Регистрация пользователей', route: '/register' },
  { title: 'Изменение пользователей', route: '/usermod' },
]);

const clearTableBtn = 'Очистить таблицы';
const clearTableCardTitle = 'Вы точно хотите очистить таблицы?';
const logoutBtn = 'Выйти';
const logoutTitle = 'Вы уверены что хотите выйти?';
</script>
