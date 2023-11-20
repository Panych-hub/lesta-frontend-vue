import { Ref } from "vue";
import { Vehicle } from "../types/vehicle";

export class VehicleCollapsed {
  static reset(
    isEachVehicleCollapsed: Ref<Map<number, boolean>>,
    vehicles: Ref<Vehicle[]>,
  ) {
    return () => {
      isEachVehicleCollapsed.value = new Map(
        vehicles.value.map((el) => [el.id, true]),
      );
    };
  }
  static toggle(isEachVehicleCollapsed: Ref<Map<number, boolean>>) {
    return (index: number) => {
      const isCollapsed = isEachVehicleCollapsed.value.get(index);
      isEachVehicleCollapsed.value.set(index, !isCollapsed);
    };
  }
}
