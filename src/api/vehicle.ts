import axios from "axios";
import { QUERY_FOR_ALL_SHIPS } from "../constant/queryForAllShips";
import { Vehicle } from "../types/vehicle";
import { baseURL } from "../constant/baseURL";

export class VehicleApi {
  async get(): Promise<Vehicle[]> {
    return await axios
      .post(baseURL + "glossary", {
        query: QUERY_FOR_ALL_SHIPS,
      })
      .then((res) => res.data.data.vehicles)
      .catch((error) => console.error(error));
  }
}
