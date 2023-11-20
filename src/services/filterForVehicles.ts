import { Vehicle } from "../types/vehicle";

export function filterForList(
  elements: Array<Vehicle>,
  field: string,
  filter: string,
) {
  return elements.filter((element) =>
    String(element[field]).toLowerCase().includes(filter.toLowerCase()),
  );
}
