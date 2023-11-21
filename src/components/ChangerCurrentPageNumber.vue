<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

const props = defineProps<{ pageNumber: number; lastPage: number }>();

const emit = defineEmits<{ (event: "changeNumber", count: number): void }>();
</script>
<template>
  <div class="d-flex justify-content-center m-2 w-100">
    <div class="d-grid" style="grid-template-columns: repeat(3, 1fr)">
      <div v-if="props.pageNumber > 2" class="d-flex justify-content-end">
        <button
          type="button"
          class="btn btn-outline-secondary"
          @click="emit('changeNumber', 1)"
        >
          1
        </button>
        <span> . . . </span>
      </div>
      <div v-else />
      <div class="d-grid" style="grid-template-columns: repeat(3, 1fr)">
        <button
          type="button"
          class="btn btn-outline-secondary"
          @click="emit('changeNumber', props.pageNumber - 1)"
          v-if="props.pageNumber > 1"
        >
          {{ props.pageNumber - 1 }}
        </button>
        <div v-else />
        <button type="button" class="btn btn-outline-secondary active">
          {{ props.pageNumber }}
        </button>
        <button
          type="button"
          class="btn btn-outline-secondary"
          @click="emit('changeNumber', props.pageNumber + 1)"
          v-if="props.pageNumber < props.lastPage"
        >
          {{ props.pageNumber + 1 }}
        </button>
        <div v-else />
      </div>
      <div v-if="props.pageNumber < props.lastPage - 1" class="d-flex justify-content-start">
        <span> . . . </span>
        <button
          type="button"
          class="btn btn-outline-secondary"
          @click="emit('changeNumber', props.lastPage)"
        >
          {{ props.lastPage }}
        </button>
      </div>
      <div v-else />
    </div>
  </div>
</template>
<style scoped></style>
