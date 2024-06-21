<template>
  <v-app>
    <v-main>
      <v-container class="fill-height">
        <v-responsive
          class="align-centerfill-height mx-auto"
          max-width="900"
        >
          <router-view />
        </v-responsive>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
  //
</script>
