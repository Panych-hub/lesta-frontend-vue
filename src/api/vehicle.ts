import axios from "axios";
import { QUERY_FOR_ALL_SHIPS } from "../constant/queryForAllShips";
import { Vehicle } from "../types/vehicle";
import { baseURL } from "../constant/baseURL";
export class VehicleApi {
  async get(): Promise<Vehicle[]> {
    return await axios
      .post(
        baseURL + "glossary",
        {
          query: QUERY_FOR_ALL_SHIPS,
        },
        {
          headers: {},
        },
      )
      .then((res) => res.data.data.vehicles)
      .catch(async (error) => {
        console.error(error);
      });
  }
  async readFromFile(): Promise<Vehicle[]> {
    return await fetch("src/constant/allShipsData.txt")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
      })
      .then((data) => JSON.parse(data))
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }
}
