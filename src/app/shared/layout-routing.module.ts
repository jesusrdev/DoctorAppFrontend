import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutComponent } from './layout/layout.component';
import { ListSpecialtyComponent } from '../specialty/pages/list-specialty/list-specialty.component';

import {} from '../specialty/specialty.module';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent, pathMatch: 'full' },
      { path: 'specialties', component: ListSpecialtyComponent, pathMatch: 'full' },
      { path: '**', redirectTo: '', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [
    RouterModule,
  ]
})
export class LayoutRoutingModule {}
