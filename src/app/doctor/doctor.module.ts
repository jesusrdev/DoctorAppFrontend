import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { ListDoctorComponent } from './pages/list-doctor/list-doctor.component';

import { DoctorService } from './services/doctor.service';
import { DoctorModalComponent } from './modals/doctor-modal/doctor-modal.component';


@NgModule({
  declarations: [
    ListDoctorComponent,
    DoctorModalComponent,
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
