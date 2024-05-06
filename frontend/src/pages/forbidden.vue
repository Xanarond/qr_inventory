<template>
  <v-container fluid>
    <h1 class="text-center">403 Status</h1>
    <h2 class="text-center">Вам отказано в доступе к данной странице!</h2>
    <v-row class="mt-2 justify-center">
      <v-col cols="3">
        <v-btn
          block
          color="primary"
          class="align-center justify-center w-auto"
          to="/"
          type="submit"
          >На главную</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts"></script>

<style scoped lang="sass"></style>
