<script setup lang="ts">
import {defineProps, defineEmits, ref, watch} from "vue";

const props = defineProps<{ countPerPage: number }>();
const emit = defineEmits<{ (event: "changeCount", count: number): void }>();

const possibleCountPerPage = [10, 25, 50];
const selectedCount = ref(`Показать ${possibleCountPerPage[0]} единиц`)
watch(selectedCount, (newCount) => emit("changeCount", Number(newCount.split(' ')[1])))
</script>
<template>
  <div id="v-model-select " class="p-3 block-radius w-25">
    <select v-model="selectedCount" class="form-select form-select-sm bg-dark select-white">
      <option v-for="option in possibleCountPerPage" :key="option">
        {{ `Показать ${option} единиц`}}
      </option>
    </select>
  </div>
</template>
<style scoped>
.select-white {
  font-family: "Roboto Condensed", Arial, "Helvetica Neue", Helvetica,
  sans-serif;
  font-size: 16px;
  color: #9b9c9d;
  height: 34px;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 2px;
  backdrop-filter: blur(8px);
}
</style>
