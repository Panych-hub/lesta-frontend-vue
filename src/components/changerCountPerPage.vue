<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

const props = defineProps<{ countPerPage: number }>();

const emit = defineEmits<{ (event: "changeCount", count: number): void }>();
</script>
<template>
  <div class="d-flex justify-content-center m-2">
    <span class="align-content-center me-3">
      Количество техники на странице
    </span>
    <button
      type="button"
      class="btn btn-outline-secondary"
      @click="emit('changeCount', 10)"
      :class="props.countPerPage === 10 ? 'active' : ''"
    >
      10
    </button>
    <button
      type="button"
      class="btn btn-outline-secondary"
      @click="emit('changeCount', 25)"
      :class="props.countPerPage === 25 ? 'active' : ''"
    >
      25
    </button>
    <button
      type="button"
      class="btn btn-outline-secondary"
      @click="emit('changeCount', 50)"
      :class="props.countPerPage === 50 ? 'active' : ''"
    >
      50
    </button>
  </div>
</template>
<style scoped></style>
