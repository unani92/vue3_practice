<script setup lang="ts">
// props label type string, children type template
import { defineProps } from 'vue'
defineProps<{
  label: string
}>()
</script>

<template>
  <v-row>
    <v-col cols="12" sm="6">
      <span>{{ label }}</span>
    </v-col>
    <v-col cols="12" sm="6">
      <slot></slot>
    </v-col>
  </v-row>
</template>

<style scoped></style>
