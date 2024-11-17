import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { SpecialtyComponent } from './pages/specialty/specialty.component';

import { SpecialtyService } from './services/specialty.service';



@NgModule({
  declarations: [
    SpecialtyComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
  ],
  providers: [
    SpecialtyService,
  ]
})
export class SpecialtyModule { }
