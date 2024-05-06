<template>
  <v-row class="justify-end">
    <v-col cols="4">
      <v-alert
        closable
        :text="props.message"
        variant="tonal"
        :color="color"
      ></v-alert>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
const props = defineProps(['message', 'color']);
</script>

<style scoped lang="sass"></style>
