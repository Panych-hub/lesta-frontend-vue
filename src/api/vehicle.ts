import axios from "axios";
import {QUERY_FOR_ALL_SHIPS} from "../constant/queryForAllShips";
import {Vehicle} from "../types/vehicle";
export class VehicleApi {
    async get(): Promise<Vehicle[]>{
        return await axios.post(
            'https://vortex.korabli.su/api/graphql/glossary/',
            {
                query: QUERY_FOR_ALL_SHIPS,
            }).then((res) => res.data.data.vehicles)
    }
}

//@ts-ignore
