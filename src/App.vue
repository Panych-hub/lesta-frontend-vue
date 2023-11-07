<script setup lang="ts">
import api from "./api";
import type {Vehicle} from "./types/vehicle";
import {computed, onMounted, ref} from "vue";
import {SortState} from "./types/sortState";
import {SortType} from "./types/sortType";

const vehicles = ref<Vehicle[]>([]);
function addIdToVehicles() {
  vehicles.value.forEach((vehicle, index) => vehicle['id'] = index)
}

const filterForVehicles = ref<string>('')
const vehiclesToShow = computed<Vehicle[]>(() => {
    const vehiclesFiltered = vehicles.value.filter((vehicle, index) =>
          String(vehicle['title'])
              .toLowerCase()
              .includes(filterForVehicles.value.toLowerCase())
      )

    if (sortingType.value === 'up') {
      if (sortingBy.value === 'title') vehiclesFiltered.sort((a, b) => a.title.localeCompare(b.title))
      else if (sortingBy.value === 'level') vehiclesFiltered.sort((a, b) => a.level - b.level)
      else if (sortingBy.value === 'nation') vehiclesFiltered.sort((a, b) => a.nation.title.localeCompare(b.nation.title))
      else if (sortingBy.value === 'type') vehiclesFiltered.sort((a, b) => a.type.title.localeCompare(b.nation.title))
    }
    else {
      if (sortingBy.value === 'title') vehiclesFiltered.sort((a, b) => b.title.localeCompare(a.title))
      else if (sortingBy.value === 'level') vehiclesFiltered.sort((a, b) => b.level - a.level)
      else if (sortingBy.value === 'nation') vehiclesFiltered.sort((a, b) => b.nation.title.localeCompare(a.nation.title))
      else if (sortingBy.value === 'type') vehiclesFiltered.sort((a, b) => b.type.title.localeCompare(a.nation.title))
    }
    return vehiclesFiltered
  }
)

const isEachVehicleCollapsed = ref<Map<number, boolean>>()
function resetVehicleCollapsed(): void {
  isEachVehicleCollapsed.value = (new Map(vehicles.value.map(el => [el.id, true])))
}
function toggleVehicleCollapsed(index: number): void {
  const isCollapsed = isEachVehicleCollapsed.value.get(index)
  isEachVehicleCollapsed.value.set(index, !isCollapsed)
}


const sortingBy = ref<SortType>('none')
const sortingType = ref<SortState>('none')
function toggleSort(sortedBy: SortType){
  if (sortedBy === sortingBy.value) {
    if (sortingType.value === 'up') sortingType.value = 'down'
    else sortingType.value = 'up'
    return
  }
  sortingBy.value = sortedBy
  sortingType.value = 'up'
}
async function fetchData(){
  vehicles.value = (await api.vehicle.get())
}

onMounted(async () => {
  await fetchData()
  addIdToVehicles()
  resetVehicleCollapsed()
})
</script>

<template>
  <div class="vw-100 vh-100 d-flex flex-column overflow-hidden">
      <div class="p-4">
        <input
            v-model="filterForVehicles"
            class="form-check-input h-100 w-100 mt-0 block-radius input-filter"
            placeholder="Фильтр по названию"
        />
        <div />
      </div>
      <div class="w-100 h-100 p-3 overflow-hidden d-flex flex-column">
        <div
            class="w-100 d-grid fw-bold pe-3"
            :style="{ 'grid-template-columns': '1fr 1fr 1fr 1fr 1fr' }"
        >
          <div class="d-flex w-100 pointer" @click="toggleSort('title')">
            <span class="me-2">Название</span>
            <div v-if="sortingBy === 'title'">
              <font-awesome-icon icon="fa-sort-up"  v-if="sortingType === 'up'"/>
              <font-awesome-icon icon="fa-sort-down" v-if="sortingType === 'down'"/>
            </div>
            <div v-else>
              <font-awesome-icon icon="fa-sort" />
            </div>
          </div>
          <div class="d-flex w-100 pointer" @click="toggleSort('level')">
            <span class="me-2">Уровень</span>
            <div v-if="sortingBy === 'level'">
              <font-awesome-icon icon="fa-sort-up"  v-if="sortingType === 'up'"/>
              <font-awesome-icon icon="fa-sort-down" v-if="sortingType === 'down'"/>
            </div>
            <div v-else>
              <font-awesome-icon icon="fa-sort" />
            </div>
          </div>
          <div class="d-flex w-100 pointer" @click="toggleSort('nation')">
            <span class="me-2">Нация</span>
            <div v-if="sortingBy === 'nation'">
              <font-awesome-icon icon="fa-sort-up"  v-if="sortingType === 'up'"/>
              <font-awesome-icon icon="fa-sort-down" v-if="sortingType === 'down'"/>
            </div>
            <div v-else>
              <font-awesome-icon icon="fa-sort" />
            </div>
          </div>
          <div class="d-flex w-100 pointer" @click="toggleSort('type')">
            <span class="me-2">Класс</span>
            <div v-if="sortingBy === 'type'">
              <font-awesome-icon icon="fa-sort-up"  v-if="sortingType === 'up'"/>
              <font-awesome-icon icon="fa-sort-down" v-if="sortingType === 'down'"/>
            </div>
            <div v-else>
              <font-awesome-icon icon="fa-sort" />
            </div>
          </div>
          <span style="width: 200px"/>
        </div>
        <div class="h-100 overflow-y-scroll overflow-x-hidden">
          <div v-for="(vehicle, vehicleIndex) of vehiclesToShow" :key="vehicleIndex" class="w-100 mt-2 ">
            <div class="pointer hr-line pt-3" @click="toggleVehicleCollapsed(vehicle.id)" >
              <div
                  class="d-grid w-100 "
                  :style="{ 'grid-template-columns': '1fr 1fr 1fr 1fr 1fr',
                    'background-image': `linear-gradient(
                    transparent 80%, ${vehicle.nation.color} 100%
                  )` }"
              >
                <div>{{ vehicle.title }}</div>
                <div>{{ vehicle.level }}</div>
                <div>
                  <img :src="vehicle.nation.icons.small" :alt="vehicle.title" width="50">
                  {{ vehicle.nation.title }}
                </div>
                <div>
                  <img :src="vehicle.type.icons.default" :alt="vehicle.title" >
                  {{ vehicle.type.title }}
                </div>
                <img :src="vehicle.icons.medium" :alt="vehicle.title" width="200">

              </div>
              <div v-if="isEachVehicleCollapsed" >
                <div v-if="!isEachVehicleCollapsed.get(vehicle.id)" :id="`collapsable-${vehicle.id}`" >

                  <div
                      class="mb-2 w-100 d-grid" style="grid-template-columns: 2fr 1fr"
                      :style="{'background-image': `linear-gradient(
                    ${vehicle.nation.color} 0%, transparent 20%
                  )` }"
                  >
                    <span class="pt-5 ps-3"> {{vehicle.description}}</span>
                    <div :style="{'background-size': 'cover',
                      'background-image': `url(${vehicle.nation.icons.large})`}">
                      <img :src="vehicle.icons.large" :alt="vehicle.title" width="700" >
                    </div>

                  </div>

                </div>
              </div>

            </div>

          </div>
        </div>
      </div>


  </div>

</template>

<style scoped>
.pointer:hover {
  cursor: pointer;
}
* {
  color: white;
  font-family: "Roboto Condensed",Arial,"Helvetica Neue",Helvetica,sans-serif;
  font-size: 1em;
  font-weight: 500;
}
.hr-line {
  border-top: 1px solid rgba(255,255,255,.08);

  box-shadow: 0 -1px rgba(0,0,0,.2);
}
.input-filter {
  font-family: "Roboto Condensed",Arial,"Helvetica Neue",Helvetica,sans-serif;
  font-size: 16px;
  position: relative;
  z-index: 98;
  box-sizing: border-box;
  height: 34px;
  background: rgba(19,22,22,.5);
  box-shadow: inset 0 0 10px rgba(0,0,0,.3);
  border: 1px solid rgba(255,255,255,.15);
  border-radius: 2px;
  color: #ddd;
  padding: 0 65px 0 10px;
  backdrop-filter: blur(8px);
}
</style>
