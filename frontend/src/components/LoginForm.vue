<template>
  <AlertMessage
    :key="componentKey"
    v-show="alert"
    :message="message"
    :color="color"
  />
  <v-card
    class="mx-auto px-6 py-8"
    max-width="500"
    title="Добро пожаловать в Inventory"
  >
    <v-form method="post" @submit.prevent="handleSubmit">
      <v-text-field
        label="Логин"
        name="username"
        v-model="formData.username"
        hide-details="auto"
        :rules="loginRules"
        required
      ></v-text-field>
      <v-text-field
        v-model="formData.password"
        autocomplete="current-password"
        label="Password"
        :append-icon="isPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="isPasswordVisible ? 'text' : 'password'"
        @click:append="togglePasswordVisibility"
        name="password"
        :rules="passwordRules"
      ></v-text-field>
      <v-btn
        block
        color="primary"
        class="align-center justify-center w-auto"
        type="submit"
        @click="handleSubmit"
      >
        Войти
      </v-btn>
    </v-form>
  </v-card>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import User from '../models/user.model';
import { useAppUserStore } from '../stores/app';
import router from '../router';

let user = new User('', '');
let loading = ref(false);
const formData = ref(user);
const message = ref('');
const alert = ref(false);
let componentKey = ref(0);
let color = ref('error');

const isPasswordVisible = ref(false);

let loginRules = [(v) => !!v || 'Поле обязательно для заполнения!'];

let passwordRules = [
  (v) => !!v || 'Поле обязательно для заполнения!',
  (v) => {
    if (v?.length >= 3) return true;
    return 'Пароль должен иметь как минимум 3 символа';
  },
];

const loginStore = useAppUserStore();

const loggedIn = computed(() => {
  return useAppUserStore().logIn;
});

const refreshAlert = () => {
  alert.value = false;
  message.value = '';
};

const handleSubmit = async () => {
  try {
    await loginStore.login(formData.value);
    loading.value = true;
    if (loggedIn.value === true) {
      router.push({ name: '/' });
    }
  } catch (error) {
    alert.value = true;
    message.value = error.response.data.message;
    componentKey.value += 1;
  }
};

const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value;
};

watch(formData, (newVal, oldVal) => {}, { deep: true });
</script>

<style scoped lang="scss">
.card {
  padding: 40px 40px;
}

.login_img {
  border-radius: 50%;
  height: 120px;
  width: 120px;
}
</style>
