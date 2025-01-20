import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { AuthGuard } from 'core';

import { SmartViewRoomsComponent, SmartViewRoomsModule } from './views';

const smartSearchRoutes: Routes = [
  {
    path: 'rooms/smart-search',
    component: SmartViewRoomsComponent,
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always',
  },
];

@NgModule({
  declarations: [],
  exports: [],
  imports: [CommonModule, HttpClientModule, SmartViewRoomsModule],
  providers: [],
})
export class ExtensionModule {
  constructor(private router: Router) {
    const oldRoutes = this.router.config;
    this.router.resetConfig([...smartSearchRoutes, ...oldRoutes]);
  }

  public init(): void {
  }
}
