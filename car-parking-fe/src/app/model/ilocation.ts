import {Floor} from "./floor";
import {Section} from "./section";

export interface ILocation {
  id: number;
  name: string;
  isOccupied: boolean;
  width: number;
  height: number;
  length: number;
  permissionCarTypeLocations: string[];
  section: Section;
  floor: Floor;

}
