import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { LeaseOrderModel, LeaseSortByType, OrderByType } from '../../../../model';

@Component({
  selector: 'scrm-smart-view-lease-order',
  templateUrl: './smart-view-lease-order.component.html',
  styleUrls: ['./smart-view-lease-order.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SmartViewLeaseOrderComponent {
  @Input() sortBy?: LeaseSortByType;
  @Input() orderBy?: OrderByType;
  @Output() changeSortOrder = new EventEmitter<LeaseOrderModel>();

  public sortFields = [
    { value: '', label: 'По умолчанию' },
    { value: 'unit_size', label: 'По площади' },
    { value: 'gross_rent', label: 'По ставке аренды' },
  ];

  public getSortBy(): string {
    return this.sortBy ?? '';
  }

  public getOrderBy(): string {
    return this.orderBy === 'desc' ? 'desc' : 'asc';
  }

  public getOrderByVisible(): boolean {
    return this.getSortBy() !== '';
  }

  public getOrderByTooltip(): string {
    return this.getOrderBy() === 'asc' ? 'По возрастанию' : 'По убыванию';
  }

  public getOrderBySymbol(): string {
    return this.getOrderBy() === 'asc' ? '▲' : '▼';
  }

  public onSortChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const newSortBy = typeof target.value === 'string' ? target.value : '';
    this.sendSortChange(newSortBy, this.getOrderBy());
  }

  public onOrderByClick(): void {
    const newOrderBy = this.getOrderBy() === 'asc' ? 'desc' : 'asc';
    this.sendSortChange(this.getSortBy(), newOrderBy);
  }

  public sendSortChange(newSortBy: string, newOrderBy: string): void {
    const sortBy: LeaseSortByType | undefined = newSortBy === '' ? undefined : (newSortBy as LeaseSortByType);
    const orderBy: OrderByType = newOrderBy as OrderByType;
    if (this.sortBy !== sortBy || this.orderBy !== orderBy) {
      this.changeSortOrder.emit({ sortBy, orderBy });
    }
  }
}
