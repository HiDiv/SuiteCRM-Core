export type LeaseSearchRentType = 'per_sq_m_per_month' | 'per_sq_m_per_year' | 'per_month';

export interface LeaseSearchModel {
  name?: string;
  unitSizeFrom?: number;
  unitSizeTo?: number;
  rentFrom?: number;
  rentTo?: number;
  rentType: LeaseSearchRentType;
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
