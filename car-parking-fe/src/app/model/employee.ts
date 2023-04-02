import {IPosition} from "./iposition";

export interface Employee {
  id?: number;
  name?: string;
  dateOfBirth?: string;
  gender?: boolean;
  email?: string;
  idCard?: string;
  position?: IPosition;
  province?: number;
  district?: number;
  commune?: number;
  street?: string;
  phoneNumber?: string;
}
