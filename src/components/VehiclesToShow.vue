<script setup lang="ts">
import { defineProps, onMounted, ref } from "vue";
import { VehicleCollapsed } from "../services/vehicleCollapsed";
import { Vehicle } from "../types/vehicle";
const props = defineProps<{ vehiclesToShow: Vehicle[] }>();

const isEachVehicleCollapsed = ref<Map<number, boolean>>(new Map());
const resetVehicleCollapsed = VehicleCollapsed.reset(
  isEachVehicleCollapsed,
  props.vehiclesToShow,
);
const toggleVehicleCollapsed = VehicleCollapsed.toggle(isEachVehicleCollapsed);
onMounted(async () => {
  resetVehicleCollapsed();
});
</script>

<template>
  <div
    class="h-100 overflow-y-scroll overflow-x-hidden"
    v-if="vehiclesToShow.length"
  >
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
            <img :src="vehicle.type.icons.default" :alt="vehicle.title" />
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
</template>

<style scoped>
.pointer:hover {
  cursor: pointer;
}
</style>
