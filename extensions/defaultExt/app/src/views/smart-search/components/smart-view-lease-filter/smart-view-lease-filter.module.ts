import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NumberIsGreaterThanZeroDirective } from './number-is-greater-than-zero.directive';
import { SmartViewLeaseFilterComponent } from './smart-view-lease-filter.component';

@NgModule({
  declarations: [SmartViewLeaseFilterComponent, NumberIsGreaterThanZeroDirective],
  imports: [CommonModule, FormsModule],
  exports: [SmartViewLeaseFilterComponent],
})
export class SmartViewLeaseFilterModule {}
