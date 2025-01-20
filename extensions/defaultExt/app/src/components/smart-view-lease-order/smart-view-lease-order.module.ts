import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SmartViewLeaseOrderComponent } from './smart-view-lease-order.component';

@NgModule({
  declarations: [SmartViewLeaseOrderComponent],
  imports: [CommonModule, FormsModule],
  exports: [SmartViewLeaseOrderComponent],
})
export class SmartViewLeaseOrderModule {}
