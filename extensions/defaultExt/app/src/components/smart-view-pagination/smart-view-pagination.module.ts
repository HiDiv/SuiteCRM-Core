import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbPagination, NgbPaginationPages } from '@ng-bootstrap/ng-bootstrap';

import { SmartViewPaginationComponent } from './smart-view-pagination.component';

@NgModule({
  declarations: [SmartViewPaginationComponent],
  imports: [CommonModule, NgbPaginationPages, NgbPagination],
  exports: [SmartViewPaginationComponent],
})
export class SmartViewPaginationModule {}
