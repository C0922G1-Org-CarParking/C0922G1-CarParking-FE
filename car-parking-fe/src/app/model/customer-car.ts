import {Customer} from "./customer";
import {Car} from "./car";

export interface CustomerCar {
  customerDto: Customer;
  carDtos: Car[];
}
