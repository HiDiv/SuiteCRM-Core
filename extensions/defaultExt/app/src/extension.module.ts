import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { AuthGuard } from 'core';

const smartSearchRoutes: Routes = [
  {
    path: 'building-offices/smart-search',
    loadChildren: async () =>
      (await import('./views/smart-search/components/smart-view-building-offices/smart-view-building-offices.module'))
        .SmartViewBuildingOfficesModule,
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'rooms/smart-search',
    loadChildren: async () =>
      (await import('./views/smart-search/components/smart-view-rooms/smart-view-rooms.module')).SmartViewRoomsModule,
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always',
  },
];

@NgModule({
  declarations: [],
  exports: [],
  imports: [CommonModule, HttpClientModule],
  providers: [],
})
export class ExtensionModule {
  constructor(private router: Router) {
    const oldRoutes = this.router.config;
    this.router.resetConfig([...smartSearchRoutes, ...oldRoutes]);
  }

  init(): void {
  }
}
