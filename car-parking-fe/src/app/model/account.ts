import {Employee} from "./employee";

export interface Account {
  id: number;
  employee: Employee;
  password: string;
}
