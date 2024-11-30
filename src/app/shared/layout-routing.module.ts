import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutComponent } from './layout/layout.component';
import { ListDoctorComponent } from '../doctor/pages/list-doctor/list-doctor.component';
import { ListSpecialtyComponent } from '../specialty/pages/list-specialty/list-specialty.component';
import { ListUserComponent } from '../user/pages/list-user/list-user.component';

import { authGuard } from '../_guards/auth.guard';

import {} from '../specialty/specialty.module';
import {} from '../doctor/doctor.module';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    runGuardsAndResolvers: 'always',
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        pathMatch: 'full',
        // canActivate: [authGuard],
      },
      {
        path: 'specialties',
        component: ListSpecialtyComponent,
        pathMatch: 'full',
      },
      { path: 'doctors', component: ListDoctorComponent, pathMatch: 'full' },
      { path: 'users', component: ListUserComponent, pathMatch: 'full' },
      { path: '**', redirectTo: '', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
