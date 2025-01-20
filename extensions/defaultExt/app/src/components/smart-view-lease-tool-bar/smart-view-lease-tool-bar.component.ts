import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { LeaseOrderModel, Pagination } from '../../model';

@Component({
  selector: 'scrm-smart-view-lease-tool-bar',
  templateUrl: './smart-view-lease-tool-bar.component.html',
  styleUrls: ['./smart-view-lease-tool-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SmartViewLeaseToolBarComponent {
  @Input() order: LeaseOrderModel = { sortBy: undefined, orderBy: 'asc' };
  @Input() pagination: Pagination = { page: 0, itemsPerPage: 10, lastPage: 0, totalCount: 0 };
  @Output() changeSortOrder = new EventEmitter<LeaseOrderModel>();
  @Output() changePage = new EventEmitter<number>();

  public onOrderChange(newOrder: LeaseOrderModel): void {
    this.changeSortOrder.emit(newOrder);
  }

  public onPageChange(newPage: number): void {
    this.changePage.emit(newPage);
  }
}
