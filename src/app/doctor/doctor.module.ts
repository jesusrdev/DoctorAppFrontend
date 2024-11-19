import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { ListDoctorComponent } from './pages/list-doctor/list-doctor.component';

import { DoctorService } from './services/doctor.service';


@NgModule({
  declarations: [
    ListDoctorComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
  ],
  providers: [
    DoctorService,
  ]
})
export class DoctorModule { }
