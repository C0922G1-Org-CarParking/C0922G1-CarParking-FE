import {Customer} from "./customer";
import {Car} from "./car";

export interface CustomerAndCar {
  customer:Customer,
  cars: Car[]
}
