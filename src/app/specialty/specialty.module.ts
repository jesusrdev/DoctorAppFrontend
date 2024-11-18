import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { SpecialtyService } from './services/specialty.service';

import { ListSpecialtyComponent } from './pages/list-specialty/list-specialty.component';



@NgModule({
  declarations: [
    ListSpecialtyComponent
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
