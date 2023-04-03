import {Customer} from './customer';
import {CarType} from './car-type';

export interface Car {
  id: number;
  name: string;
  plateNumber: string;
  carType: CarType;
  customer: Customer;
  brand: string;
}
