import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SmartViewLeaseFilterComponent } from './smart-view-lease-filter.component';

@NgModule({
  declarations: [SmartViewLeaseFilterComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [SmartViewLeaseFilterComponent],
})
export class SmartViewLeaseFilterModule {}
