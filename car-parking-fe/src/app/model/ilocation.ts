import {Floor} from "./floor";
import {Section} from "./section";

export interface ILocation {
  id: number;
  name: number;
  occupied: boolean;
  width: number;
  height: number;
  length: number;
  permissionCarTypeLocations: string[];
  section: Section;
  floor: Floor;

}
