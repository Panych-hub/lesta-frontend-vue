<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { SortingServices } from "../services/sortingServices";
import type { Vehicle } from "../types/vehicle";
import { filterForList } from "../services/filterForVehicles";

const sortIcon = new URL("/src/images/sort.svg", import.meta.url).href;
const props = defineProps<{
  vehicleList: Vehicle[];
  filterField: string;
  sortOptions: { [key: string]: string };
}>();
const emit = defineEmits<{
  (event: "changeVehiclesToShow", newVehicles: Vehicle[]): void;
}>();
const filterForVehicles = ref<string>("");
function clearFilterForVehicles() {
  filterForVehicles.value = "";
}
const vehiclesAfterFilter = computed<Vehicle[]>(() =>
  filterForList(props.vehicleList, props.filterField, filterForVehicles.value),
);
const sortingServices = ref(new SortingServices());
const vehiclesToShow = ref<Vehicle[]>([]);
const sortingFieldName = ref<string>(Object.values(props.sortOptions)[0]);
const sortingField = computed<string>(() => {
  return (
    Object.entries(props.sortOptions).find((option) => {
      if (option[1] === sortingFieldName.value) return option[0];
    })?.[0] || "none"
  );
});
watch(
  sortingServices,
  () => {
    vehiclesToShow.value = sortingServices.value.sort(
      vehiclesAfterFilter.value,
    );
    emit("changeVehiclesToShow", vehiclesToShow.value);
  },
  { deep: true },
);
watch(vehiclesAfterFilter, () => {
  vehiclesToShow.value = sortingServices.value.sort(vehiclesAfterFilter.value);
  emit("changeVehiclesToShow", vehiclesToShow.value);
});
</script>
<template>
  <div class="d-flex flex-row w-100 align-items-center justify-content-center">
    <div class="w-50 d-flex flex-row h-100 align-items-center">
      <input
          v-model="filterForVehicles"
          class="w-75 form-check-input block-radius input-filter mt-0 me-2"
          placeholder="Фильтр по названию"
      />
      <button
          type="button"
          class="btn-close btn-close-white"
          aria-label="clear"
          @click="clearFilterForVehicles"
      ></button>
    </div>


    <div id="v-model-select " class="p-3 block-radius ">
      <select v-model="sortingFieldName" class="form-select form-select-sm bg-dark select-white">
        <option v-for="option in props.sortOptions" :key="option">
          {{ option }}
        </option>
      </select>
    </div>
    <button
      type="button"
      class="btn btn-secondary btn-sm btn-light m-2 bg-dark select-white"
      @click="sortingServices.toggleFieldAndOrder(sortingField)"
    >
      <img
        :src="sortIcon"
        width="22"
        height="22"
        :style="
          sortingServices.sortingOrder === 'descending'
            ? { transform: 'scaleY(-1)' }
            : ''
        "
      />
    </button>
  </div>
</template>

<style scoped>
.input-filter {
  font-family: "Roboto Condensed", Arial, "Helvetica Neue", Helvetica,
  sans-serif;
  font-size: 16px;
  position: relative;
  z-index: 98;
  box-sizing: border-box;
  height: 34px;
  background: rgba(19, 22, 22, 0.5);
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 2px;
  color: #ddd;
  padding: 0 65px 0 10px;
  backdrop-filter: blur(8px);
}
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
