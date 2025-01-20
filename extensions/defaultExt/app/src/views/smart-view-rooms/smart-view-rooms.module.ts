import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, LoadingSpinnerModule } from 'core';

import { SmartViewLeaseFilterModule, SmartViewLeaseRoomModule, SmartViewLeaseToolBarModule } from '../../components';
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
