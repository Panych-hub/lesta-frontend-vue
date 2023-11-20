<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

const props = defineProps<{ countPerPage: number }>();

const emit = defineEmits<{ (event: "changeCount", count: number): void }>();

const possibleCountPerPage = [10, 25, 50];
</script>
<template>
  <div class="d-flex justify-content-center m-2">
    <span class="align-content-center me-3">
      Количество техники на странице
    </span>
    <button
      v-for="(count, countIndex) of possibleCountPerPage"
      :key="countIndex"
      type="button"
      class="btn btn-outline-secondary"
      @click="emit('changeCount', count)"
      :class="props.countPerPage === count ? 'active' : ''"
    >
      {{ count }}
    </button>
  </div>
</template>
<style scoped></style>
