<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import {SortingServices} from "../services/sortingServices";
import type {Vehicle} from "../types/vehicle";
import {filterForList} from "../services/filterForVehicles";

const sortIcon = new URL('/src/images/sort.svg', import.meta.url).href
const props = defineProps<{
  vehicleList: Vehicle[]
  filterField: string
  sortOptions: { [key: string]: string }
}>()
const emit = defineEmits<{
  (event: 'changeVehiclesToShow', newVehicles: Vehicle[]): void
}>()
const filterForVehicles = ref<string>('')
const vehiclesAfterFilter = computed<Vehicle[]>(() =>
    filterForList(props.vehicleList, props.filterField, filterForVehicles.value)
)
const sortingServices = ref(new SortingServices())
const vehiclesToShow = ref<Vehicle[]>([])
const sortingFieldName = ref<string>(Object.values(props.sortOptions)[0])
const sortingField = computed<string>(() => {
  return (
      Object.entries(props.sortOptions).find(option => {
        if (option[1] === sortingFieldName.value) return option[0]
      })?.[0] || 'none'
  )
})
watch(
    sortingServices,
    () => {
      vehiclesToShow.value = sortingServices.value.sort(vehiclesAfterFilter.value)
      emit('changeVehiclesToShow', vehiclesToShow.value)
    },
    { deep: true }
)
watch(vehiclesAfterFilter, () => {
  vehiclesToShow.value = sortingServices.value.sort(vehiclesAfterFilter.value)
  emit('changeVehiclesToShow', vehiclesToShow.value)
})
</script>
<template>
  <div class="d-flex flex-row w-100 align-items-center">
    <input
        v-model="filterForVehicles"
        class="form-check-input w-75 p-3 block-radius m-2"
        placeholder="Фильтр по названию"
    />

    <div id="v-model-select " class="p-3 block-radius">
      <select v-model="sortingFieldName" class="form-select form-select-sm">
        <option v-for="option in props.sortOptions" :key="option">{{ option }}</option>
      </select>
    </div>
    <button
        type="button"
        class="btn btn-secondary btn-sm btn-light m-2"
        @click="sortingServices.toggleFieldAndOrder(sortingField)"
    >
      <img
          :src="sortIcon"
          width="22"
          height="22"
          :style="sortingServices.sortingOrder === 'descending' ? { transform: 'scaleY(-1)' } : ''"
      />
    </button>
  </div>
</template>

<style scoped></style>
