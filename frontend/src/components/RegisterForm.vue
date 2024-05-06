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
  <v-card
    class="mx-auto px-6 py-8"
    max-width="450"
    title="Зарегистрировать пользователя"
  >
    <v-form @submit.prevent="handleRegister">
      <v-text-field
        label="Псевдоним"
        name="login"
        v-model="formData.username"
        hide-details="auto"
        :rules="loginRules"
        required
      ></v-text-field>
      <v-text-field
        label="Пароль"
        name="password"
        v-model="formData.password"
        :append-icon="isPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="isPasswordVisible ? 'text' : 'password'"
        @click:append="togglePasswordVisibility"
        :rules="passwordRules"
      ></v-text-field>
      <v-select
        label="Выберите роль:"
        v-model="formData.roleId"
        :items="roles"
        item-title="role"
        item-value="roleId"
        item-text="role"
        variant="outlined"
        persistent-hint
        single-line
      >
      </v-select>
      <v-btn
        block
        color="primary"
        class="align-center justify-center w-auto"
        @submit="handleRegister"
        type="submit"
        >Зарегистрировать</v-btn
      >
    </v-form>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import User from '../models/user.model';
import { useAppUserStore } from '../stores/app';

let roles = [
  { roleId: 1, role: 'admin' },
  { roleId: 2, role: 'worker' },
];

let componentKey = ref(0);
let alert = ref(false);
let message = ref('');
let color = ref('success');
let user = new User('', '', null);
const formData = ref(user);
const isPasswordVisible = ref(false);

let loginRules = [
  (v) => !!v || 'Поле обязательно для заполнения!',
  (v) => {
    if (v?.length >= 3) return true;
    return 'Имя пользователя должен иметь как минимум 3 символа';
  },
];

let passwordRules = [
  (v) => !!v || 'Поле обязательно для заполнения!',
  (v) => {
    if (v?.length >= 3) return true;
    return 'Пароль должен иметь как минимум 3 символа';
  },
];

const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value;
};

let loginStore = useAppUserStore();

const handleRegister = async () => {
  try {
    await loginStore.register(formData.value);
    alert.value = true;
    color.value = 'success';
    message.value = 'Пользователь успешно создан загружен!';
    componentKey.value += 1;
    setTimeout(() => {
      alert.value = false;
    }, 5000);
  } catch (error) {
    alert.value = true;
    color.value = 'error';
    message.value = message.value = error.response.data.message;
    componentKey.value += 1;
    setTimeout(() => {
      alert.value = false;
    }, 5000);
    return error;
  }
};
</script>

<style scoped lang="sass"></style>
