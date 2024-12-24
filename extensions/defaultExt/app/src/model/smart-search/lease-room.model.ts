import { BuildingOffice } from './building-office.model';

export interface LeaseRoom {
  id: string;
  _id: string;
  name: string;
  unitSize: number;
  grossRent: number;
  floor: string;
  deliveryCondition: string;
  typicalFloorLayout: string;
  building: BuildingOffice;
}
