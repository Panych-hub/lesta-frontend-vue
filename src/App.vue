<script setup lang="ts">
import type { Vehicle } from "./types/vehicle";
import { computed, onMounted, ref, watch } from "vue";
import { SortState } from "./types/sortState";
import { SortType } from "./types/sortType";
import { fetchVehiclesList } from "./sevices/fetchVehicles";
import ChangerCountPerPage from "./components/changerCountPerPage.vue";
import ChangerPageNumber from "./components/changerPageNumber.vue";

const vehicles = ref<Vehicle[]>([]);

const filterForVehicles = ref<string>("");

function clearFilterForVehicles() {
  filterForVehicles.value = "";
}

const countPerPage = ref<number>(10);
function changeCountPerPage(toggleNumber: number) {
  countPerPage.value = toggleNumber;
}

const pageNumber = ref<number>(1);

function changePageNumber(numberOfPage: number) {
  pageNumber.value = numberOfPage;
}

const lastPage = computed<number>(() => {
  return Math.floor(vehiclesFiltered.value.length / countPerPage.value) + 1;
});

const vehiclesFiltered = computed<Vehicle[]>(() => {
  return vehicles.value.filter((vehicle) =>
    String(vehicle["title"])
      .toLowerCase()
      .includes(filterForVehicles.value.toLowerCase()),
  );
});

const vehiclesToShow = computed<Vehicle[]>(() => {
  const vehiclesAfterFilter = JSON.parse(
    JSON.stringify(vehiclesFiltered.value),
  );
  if (sortingType.value === "up") {
    if (sortingBy.value === "title") {
      vehiclesAfterFilter.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortingBy.value === "level") {
      vehiclesAfterFilter.sort((a, b) => a.level - b.level);
    } else if (sortingBy.value === "nation") {
      vehiclesAfterFilter.sort((a, b) =>
        a.nation.title.localeCompare(b.nation.title),
      );
    } else if (sortingBy.value === "type") {
      vehiclesAfterFilter.sort((a, b) =>
        a.type.title.localeCompare(b.type.title),
      );
    }
  } else {
    if (sortingBy.value === "title") {
      vehiclesAfterFilter.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortingBy.value === "level") {
      vehiclesAfterFilter.sort((a, b) => b.level - a.level);
    } else if (sortingBy.value === "nation") {
      vehiclesAfterFilter.sort((a, b) =>
        b.nation.title.localeCompare(a.nation.title),
      );
    } else if (sortingBy.value === "type") {
      vehiclesAfterFilter.sort((a, b) =>
        b.type.title.localeCompare(a.type.title),
      );
    }
  }
  const startNumber = <number>countPerPage.value * (pageNumber.value - 1);
  const endNumber = <number>countPerPage.value * pageNumber.value;
  return vehiclesAfterFilter.slice(startNumber, endNumber);
});

const isEachVehicleCollapsed = ref<Map<number, boolean>>(new Map());

function resetVehicleCollapsed(): void {
  isEachVehicleCollapsed.value = new Map(
    vehicles.value.map((el) => [el.id, true]),
  );
}
function toggleVehicleCollapsed(index: number): void {
  const isCollapsed = isEachVehicleCollapsed.value.get(index);
  isEachVehicleCollapsed.value.set(index, !isCollapsed);
}

const sortingBy = ref<SortType>("none");
const sortingType = ref<SortState>("none");

function toggleSort(sortedBy: SortType) {
  if (sortedBy === sortingBy.value) {
    if (sortingType.value === "up") {
      sortingType.value = "down";
    } else {
      sortingType.value = "up";
    }
    return;
  }
  sortingBy.value = sortedBy;
  sortingType.value = "up";
}

const fetchVehicles = fetchVehiclesList(vehicles);

onMounted(async () => {
  await fetchVehicles();
  resetVehicleCollapsed();
});
watch(lastPage, () => {
  if (pageNumber.value > lastPage.value) pageNumber.value = 1;
});
</script>

<template>
  <div class="background-image vw-100 vh-100">
    <div class="vw-100 vh-100 d-flex flex-column overflow-hidden">
      <div>Header</div>
      <div class="p-4 w-100 d-flex justify-content-center">
        <input
          v-model="filterForVehicles"
          class="form-check-input h-100 w-50 block-radius input-filter mt-0 me-2"
          placeholder="Фильтр по названию"
        />
        <button
          type="button"
          class="btn-close btn-close-white"
          aria-label="clear"
          @click="clearFilterForVehicles"
        ></button>
      </div>
      <div class="w-100 d-flex justify-content-center overflow-hidden">
        <div class="w-75 h-100 p-3 overflow-hidden d-flex flex-column">
          <div
            class="w-100 d-grid fw-bold pe-3"
            :style="{ 'grid-template-columns': 'repeat(5, 1fr)' }"
          >
            <div class="d-flex w-100 pointer" @click="toggleSort('title')">
              <span class="me-2">Название</span>
              <div v-if="sortingBy === 'title'">
                <font-awesome-icon
                  icon="fa-sort-up"
                  v-if="sortingType === 'up'"
                />
                <font-awesome-icon
                  icon="fa-sort-down"
                  v-if="sortingType === 'down'"
                />
              </div>
              <div v-else>
                <font-awesome-icon icon="fa-sort" />
              </div>
            </div>
            <div class="d-flex w-100 pointer" @click="toggleSort('level')">
              <span class="me-2">Уровень</span>
              <div v-if="sortingBy === 'level'">
                <font-awesome-icon
                  icon="fa-sort-up"
                  v-if="sortingType === 'up'"
                />
                <font-awesome-icon
                  icon="fa-sort-down"
                  v-if="sortingType === 'down'"
                />
              </div>
              <div v-else>
                <font-awesome-icon icon="fa-sort" />
              </div>
            </div>
            <div class="d-flex w-100 pointer" @click="toggleSort('nation')">
              <span class="me-2">Нация</span>
              <div v-if="sortingBy === 'nation'">
                <font-awesome-icon
                  icon="fa-sort-up"
                  v-if="sortingType === 'up'"
                />
                <font-awesome-icon
                  icon="fa-sort-down"
                  v-if="sortingType === 'down'"
                />
              </div>
              <div v-else>
                <font-awesome-icon icon="fa-sort" />
              </div>
            </div>
            <div class="d-flex w-100 pointer" @click="toggleSort('type')">
              <span class="me-2">Класс</span>
              <div v-if="sortingBy === 'type'">
                <font-awesome-icon
                  icon="fa-sort-up"
                  v-if="sortingType === 'up'"
                />
                <font-awesome-icon
                  icon="fa-sort-down"
                  v-if="sortingType === 'down'"
                />
              </div>
              <div v-else>
                <font-awesome-icon icon="fa-sort" />
              </div>
            </div>
            <span style="max-width: 100%" />
          </div>
          <div class="h-100 overflow-y-scroll overflow-x-hidden">
            <div
              v-for="(vehicle, vehicleIndex) of vehiclesToShow"
              :key="vehicleIndex"
              class="w-100 mt-2"
            >
              <div
                class="pointer hr-line pt-3"
                @click="toggleVehicleCollapsed(vehicle.id)"
              >
                <div
                  class="d-grid w-100"
                  :style="{
                    'grid-template-columns': '1fr 1fr 1fr 1fr 1fr',
                    'background-image': `linear-gradient(
                    transparent 80%, ${vehicle.nation.color} 100%
                  )`,
                  }"
                >
                  <div>{{ vehicle.title }}</div>
                  <div>{{ vehicle.level }}</div>
                  <div>
                    <img
                      :src="vehicle.nation.icons.small"
                      :alt="vehicle.title"
                      width="50"
                    />
                    {{ vehicle.nation.title }}
                  </div>
                  <div>
                    <img
                      :src="vehicle.type.icons.default"
                      :alt="vehicle.title"
                    />
                    {{ vehicle.type.title }}
                  </div>
                  <img
                    :src="vehicle.icons.medium"
                    :alt="vehicle.title"
                    style="max-width: 100%"
                  />
                </div>
                <div v-if="isEachVehicleCollapsed">
                  <div
                    v-if="!isEachVehicleCollapsed.get(vehicle.id)"
                    :id="`collapsable-${vehicle.id}`"
                  >
                    <div
                      class="mb-2 w-100 d-grid"
                      style="grid-template-columns: 2fr 1fr"
                      :style="{
                        'background-image': `linear-gradient(
                    ${vehicle.nation.color} 0%, transparent 20%
                  )`,
                      }"
                    >
                      <span class="pt-5 p-3"> {{ vehicle.description }}</span>
                      <div
                        class="background m-3"
                        :style="{
                          'background-size': 'cover',
                          'background-image': `url(${vehicle.nation.icons.large})`,
                        }"
                      >
                        <img
                          :src="vehicle.icons.large"
                          :alt="vehicle.title"
                          width="700"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <changer-page-number
        :page-number="pageNumber"
        :last-page="lastPage"
        @change-number="changePageNumber"
      />
      <changer-count-per-page
        @change-count="changeCountPerPage"
        :count-per-page="countPerPage"
      />
    </div>
  </div>
</template>

<style scoped>
.pointer:hover {
  cursor: pointer;
}

.background-image {
  background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
    url("/src/images/background.png");
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

.hr-line {
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 -1px rgba(0, 0, 0, 0.2);
}

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

.background {
  max-height: 400px;
}
</style>
