import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { LeaseOrderModel, LeaseSortByType, OrderByType } from '../../model';

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

  public sortOptions = [
    { value: '', label: 'По умолчанию' },
    { value: 'unit_size', label: 'По площади' },
    { value: 'gross_rent', label: 'По ставке аренды' },
  ];

  public get currentSortBy(): string {
    return this.sortBy ?? '';
  }

  public set currentSortBy(value: string) {
    this.sortBy = value === '' ? undefined : (value as LeaseSortByType);
    this.emitChange();
  }

  public toggleOrderBy(): void {
    if (this.sortBy) {
      this.orderBy = this.orderBy === 'asc' ? 'desc' : 'asc';
      this.emitChange();
    }
  }

  private emitChange(): void {
    this.changeSortOrder.emit({
      sortBy: this.sortBy,
      orderBy: this.orderBy,
    });
  }
}
