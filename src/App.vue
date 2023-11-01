<script setup lang="ts">
import api from "./api";
import type {Vehicle} from "./types/vehicle";
import {computed, onMounted, ref} from "vue";
import type { Ref } from "vue";

const vehicles = ref<Vehicle[]>([]);
function addIdToVehicles() {
  vehicles.value.forEach((vehicle, index) => vehicle['id'] = index)
}

const filterForVehicles = ref<string>('')
const vehiclesToShow = computed<Vehicle[]>(() =>
    vehicles.value.filter((vehicle, index) =>
        (index < 10) && String(vehicle['title'])
            .toLowerCase()
            .includes(filterForVehicles.value.toLowerCase())
    )
)

let isEachVehicleCollapsed: Ref<Map<number, boolean>> = ref()
function resetVehicleCollapsed(): void {
  isEachVehicleCollapsed.value = (new Map(vehicles.value.map(el => [el.id, true])))
}
function toggleVehicleCollapsed(index: number): void {
  const isCollapsed = isEachVehicleCollapsed.value.get(index)
  // if (isCollapsed){
  //   document.getElementById(`collapsable-${index}`).setAttribute('style',
  //       'max-height: 700px;\n' +
  //       '  transition:\n' +
  //       '      max-height 1s ease,\n' +
  //       '      opacity 1s ease;\n' +
  //       '  opacity: 1;')
  // }
  // else {
  //   document.getElementById(`collapsable-${index}`).setAttribute('style',
  //       'max-height: 0px !important;\n' +
  //       '  transition:\n' +
  //       '      max-height 1s ease,\n' +
  //       '      opacity 1s ease;\n' +
  //       '  opacity: 0')
  // }
  isEachVehicleCollapsed.value.set(index, !isCollapsed)
}
async function fetchData(){
  vehicles.value = (await api.vehicle.get())
}

onMounted(async () => {
  await fetchData()
  addIdToVehicles()
  resetVehicleCollapsed()
  console.log(vehicles.value)
})
</script>

<template>
  <div>

  </div>
  <div class="vw-100 vh-100 d-flex flex-column overflow-hidden">
    <div class="p-4" >
      <input
          v-model="filterForVehicles"
          class="form-check-input h-100 w-100 mt-0 block-radius"
          placeholder="Фильтр по названию"
      />
      <div />
    </div>
    <div class="w-100 h-100 p-3 overflow-hidden d-flex flex-column">
      <div
          class="w-100 d-grid fw-bold pe-3"
          :style="{ 'grid-template-columns': '1fr 1fr 1fr 1fr 1fr' }"
      >
        <span>Название</span>
        <span>Уровень</span>
        <span>Нация</span>
        <span>Класс</span>
        <span style="width: 200px"/>
      </div>
      <hr class="m-1" />
      <div class="h-100 overflow-y-scroll overflow-x-hidden">
        <div v-for="(vehicle, vehicleIndex) of vehiclesToShow" :key="vehicleIndex" class="w-100 mt-2">
          <div class="vehiclePointer" @click="toggleVehicleCollapsed(vehicle.id)">
            <div
                class="d-grid w-100 r"
                :style="{ 'grid-template-columns': '1fr 1fr 1fr 1fr 1fr' }"
            >
              <div>{{ vehicle.title }}</div>
              <div>{{ vehicle.level }}</div>
              <div :style="{'background-color': `${vehicle.nation.color}`,
              'background-image': `url(${vehicle.nation.icons.small})`}"
                   class="text-center">
                <!--                <img :src="vehicle.nation.icons.small" :alt="vehicle.title" width="200">-->
                {{ vehicle.nation.title }}
              </div>
              <div>
                {{ vehicle.type.title }}
                <img :src="vehicle.type.icons.default" :alt="vehicle.title" >
              </div>
              <img :src="vehicle.icons.medium" :alt="vehicle.title" width="200">

            </div>
            <div v-if="isEachVehicleCollapsed">
              <div v-if="!isEachVehicleCollapsed.get(vehicle.id)" :id="`collapsable-${vehicle.id}`">

                <hr class="m-1 mb-4" />
                <div
                    class="mb-2 w-100 d-grid" style="grid-template-columns: 2fr 1fr"
                >
                  <span> {{vehicle.description}}</span>
                  <img :src="vehicle.icons.large" :alt="vehicle.title" width="700" >
                </div>

              </div>
            </div>

          </div>



          <hr class="m-1" />
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>
.vehiclePointer:hover {
  cursor: pointer;
}


</style>
