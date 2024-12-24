import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SmartViewLeaseRoomComponent } from './smart-view-lease-room.component';

@NgModule({
  declarations: [SmartViewLeaseRoomComponent],
  imports: [CommonModule, RouterLink],
  exports: [SmartViewLeaseRoomComponent],
})
export class SmartViewLeaseRoomModule {}
