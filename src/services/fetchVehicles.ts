import { Vehicle } from "../types/vehicle";
import type { Ref } from "vue";
import api from "../api";

function addIdToVehicles(vehicles: Ref<Vehicle[]>) {
  return vehicles.value.map((vehicle, index) => {
    vehicle["id"] = index;
    return vehicle;
  });
}
export function fetchVehiclesList(vehicles: Ref<Vehicle[]>) {
  return async () => {
    // vehicles.value = await api.vehicle.get();
    vehicles.value = await api.vehicle.readFromFile();

    vehicles.value = addIdToVehicles(vehicles);
    console.log("123", vehicles.value);
  };
}
