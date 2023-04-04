import {Floor} from './floor';
import {Section} from './section';

export interface ILocation {

  id?: number;
  name?: string;
  occupied?: boolean;
  width?: number;
  height?: number;
  length?: number;
  permissionCarTypeLocations?: string;
  floor?: Floor;
  section?: Section;


  // id: number;
  // name: number;
  // isOccupied: boolean;
  // width: number;
  // height: number;
  // length: number;
  // permissionCarTypeLocations: string;
  // floor: Floor;
  // section: Section;

}
