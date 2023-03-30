import {Car} from "./car";

export interface CarInOut {
  id: number;
  timeIn: string;
  timeOut: string;
  car: Car;
}
