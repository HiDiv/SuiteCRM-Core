import { BuildingOffice } from './building-office.model';

export interface LeaseRoom {
  id: string; // id
  _id: string; // id записи
  name: string; // № помещения
  unitSize: number; // Площадь, м²
  grossRent: number; // Ставка аренды, руб. за м² в год
  floor: string; // Этаж
  deliveryCondition: string; // Состояние помещения
  typicalFloorLayout: string; // Планировка помещения
  building: BuildingOffice; // Данные о здании
}
