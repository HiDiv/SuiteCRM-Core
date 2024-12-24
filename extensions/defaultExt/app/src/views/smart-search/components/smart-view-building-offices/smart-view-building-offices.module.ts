import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'core';

import { SmartViewBuildingOfficesComponent } from './smart-view-building-offices.component';

const smartViewBuildingOfficesRoutes: Routes = [
  {
    path: '',
    component: SmartViewBuildingOfficesComponent,
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always',
  },
];

@NgModule({
  declarations: [SmartViewBuildingOfficesComponent],
  imports: [CommonModule, RouterModule.forChild(smartViewBuildingOfficesRoutes)],
  exports: [RouterModule],
})
export class SmartViewBuildingOfficesModule {}
