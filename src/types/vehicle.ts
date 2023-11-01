import {Icons} from "./icons";
import {Nation} from "./nation";
import {VehicleType} from "./vehicleType";

export interface Vehicle {
    id?: number
    title: string
    type: VehicleType
    description: string
    icons: Icons
    nation: Nation
    level: number

}
