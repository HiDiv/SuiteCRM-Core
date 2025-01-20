import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SmartViewLeaseOrderModule } from '../smart-view-lease-order';
import { SmartViewPaginationModule } from '../smart-view-pagination';
import { SmartViewLeaseToolBarComponent } from './smart-view-lease-tool-bar.component';

@NgModule({
  declarations: [SmartViewLeaseToolBarComponent],
  imports: [CommonModule, SmartViewLeaseOrderModule, SmartViewPaginationModule],
  exports: [SmartViewLeaseToolBarComponent],
})
export class SmartViewLeaseToolBarModule {}
