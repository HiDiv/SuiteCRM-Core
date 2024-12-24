import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, LoadingSpinnerModule } from 'core';

import { SmartViewLeaseFilterModule } from '../smart-view-lease-filter';
import { SmartViewLeaseRoomModule } from '../smart-view-lease-room';
import { SmartViewLeaseToolBarModule } from '../smart-view-lease-tool-bar';
import { SmartViewRoomsComponent } from './smart-view-rooms.component';

const smartViewRoomsRoutes: Routes = [
  {
    path: '',
    component: SmartViewRoomsComponent,
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always',
  },
];

@NgModule({
  declarations: [SmartViewRoomsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(smartViewRoomsRoutes),
    SmartViewLeaseFilterModule,
    SmartViewLeaseRoomModule,
    SmartViewLeaseToolBarModule,
    LoadingSpinnerModule,
  ],
  exports: [RouterModule],
})
export class SmartViewRoomsModule {}
