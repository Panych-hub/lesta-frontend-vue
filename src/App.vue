<script setup lang="ts">
import type { Vehicle } from "./types/vehicle";
import { computed, onMounted, ref, watch } from "vue";
import { fetchVehiclesList } from "./services/fetchVehicles";
import ChangerCountPerPage from "./components/ChangerCountPerPage.vue";
import ChangerCurrentPageNumber from "./components/ChangerCurrentPageNumber.vue";
import FilterAndSort from "./components/FilterAndSort.vue";
import { tableHeader } from "./services/tableHeader";
import VehiclesToShow from "./components/VehiclesToShow.vue";

const vehicles = ref<Vehicle[]>([]);
const fetchVehicles = fetchVehiclesList(vehicles);

const countPerPage = ref<number>(10);
function changeCountPerPage(toggleNumber: number) {
  countPerPage.value = toggleNumber;
}

const currentPageNumber = ref<number>(1);
function changeCurrentPageNumber(numberOfPage: number) {
  currentPageNumber.value = numberOfPage;
}

const lastPage = computed<number>(() => {
  return Math.floor(vehiclesAfterFilter.value.length / countPerPage.value) + 1;
});

const vehiclesAfterFilter = ref<Vehicle[]>([]);
function changeVehiclesToShow(newValue: Vehicle[]) {
  vehiclesAfterFilter.value = newValue;
  currentPageNumber.value = 1;
}
const vehiclesToShow = computed<Vehicle[]>(() => {
  const startNumber =
    <number>countPerPage.value * (currentPageNumber.value - 1);
  const endNumber = <number>countPerPage.value * currentPageNumber.value;
  return vehiclesAfterFilter.value.slice(startNumber, endNumber);
});

onMounted(async () => {
  await fetchVehicles();
});
watch(lastPage, () => {
  if (currentPageNumber.value > lastPage.value) currentPageNumber.value = 1;
});
</script>

<template>
  <div class="big-background-image vw-100 vh-100">
    <div class="vw-100 vh-100 d-flex flex-column overflow-hidden">
      <div>Header</div>
      <div
        class="w-100 h-100 d-flex flex-column justify-content-between overflow-hidden"
      >
        <div class="w-100 d-flex justify-content-center overflow-hidden">
          <div class="w-75 h-100 p-3 overflow-hidden d-flex flex-column">
            <FilterAndSort
              :sort-options="tableHeader"
              :filter-field="'title'"
              :vehicle-list="vehicles"
              @change-vehicles-to-show="changeVehiclesToShow"
            />
            <div
              class="w-100 d-grid fw-bold pe-3"
              :style="{ 'grid-template-columns': 'repeat(5, 1fr)' }"
            >
              <div
                v-for="(fieldName, fieldIndex) of tableHeader"
                :key="fieldIndex"
                class="d-flex w-100"
              >
                <span class="me-2">{{ fieldName }}</span>
              </div>
              <!-- This block for grid -->
              <span style="max-width: 100%" />
            </div>
            <VehiclesToShow
              :vehicles="vehicles"
              :vehicles-to-show="vehiclesToShow"
              v-if="vehiclesToShow.length"
            />
            <div v-else class="text-center mt-4">Список пуст</div>
          </div>
        </div>
        <div>
          <changer-current-page-number
            :page-number="currentPageNumber"
            :last-page="lastPage"
            @change-number="changeCurrentPageNumber"
          />
          <changer-count-per-page @change-count="changeCountPerPage" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.big-background-image {
  background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
    url("/src/images/background.webp");
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: -1;
  background-size: cover;
  background-position: 50% 0;
  background-attachment: fixed;
}

* {
  color: white;
  font-family: "Roboto Condensed", Arial, "Helvetica Neue", Helvetica,
    sans-serif;
  font-size: 1em;
  font-weight: 500;
  scrollbar-width: thin;
  scrollbar-color: blue orange;
}

</style>
