import {TicketType} from "./ticket-type";
import {Car} from "./car";
import {Employee} from "./employee";
import {ILocation} from "./ilocation";

export interface Ticket {
  id: number;
  effectiveDate: string;
  expiryDate: string;
  isDeleted:boolean
  price: number;
  totalPrice: number;
  ticketType: TicketType;
  location: ILocation;
  car: Car;
  employee: Employee;
}
