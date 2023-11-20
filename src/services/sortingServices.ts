import { OrderSort } from "../types/orderSort";
import { Vehicle } from "../types/vehicle";

export class SortingServices {
  sortingField: string;
  sortingOrder: OrderSort;
  constructor() {
    this.sortingField = "none";
    this.sortingOrder = "none";
  }
  _comparator<T extends number | string>(a: T, b: T) {
    if (typeof a === "number" && typeof b === "number")
      return this.sortingOrder === "ascending" ? a - b : b - a;
    if (typeof a === "string" && typeof b === "string")
      return this.sortingOrder === "ascending"
        ? a.localeCompare(b)
        : b.localeCompare(a);
  }
  sort(elements: Array<Vehicle>): Array<Vehicle> {
    if (!elements.length) return [];
    const sortedElements = JSON.parse(JSON.stringify(elements));
    return sortedElements.sort((a: Vehicle, b: Vehicle) =>
      this._comparator(a[this.sortingField], b[this.sortingField]),
    );
  }
  toggleFieldAndOrder(newFieldName: string): void {
    if (newFieldName === this.sortingField) {
      this.sortingOrder === "ascending"
        ? (this.sortingOrder = "descending" as OrderSort)
        : (this.sortingOrder = "ascending" as OrderSort);
    } else {
      this.sortingField = newFieldName;
      this.sortingOrder = "ascending" as OrderSort;
    }
  }
}
