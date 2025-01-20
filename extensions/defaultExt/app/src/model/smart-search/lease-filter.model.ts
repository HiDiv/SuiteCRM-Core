export type LeaseSearchRentType =
  | 'per_sq_m_per_month' // за м²/месяц
  | 'per_sq_m_per_year' // за м²/год
  | 'per_month'; // в месяц;

export interface LeaseSearchModel {
  name?: string; // Поиск по улице или названию
  unitSizeFrom?: number; // Площадь От, м²;
  unitSizeTo?: number; // Площадь До, м²
  rentFrom?: number; // Бюджет От, ₽
  rentTo?: number; // Бюджет До, ₽
  rentType: LeaseSearchRentType; // Бюджет За
}

export type LeaseSortByType = 'unit_size' | 'gross_rent';
export type OrderByType = 'asc' | 'desc';

export interface LeaseOrderModel {
  sortBy?: LeaseSortByType;
  orderBy: OrderByType;
}

export interface LeaseFilterModel {
  search?: LeaseSearchModel;
  order?: LeaseOrderModel;
}
