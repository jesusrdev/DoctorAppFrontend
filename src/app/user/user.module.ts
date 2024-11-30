import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { UserService } from './services/user.service';

import { LoginComponent } from './login/login.component';
import { ListUserComponent } from './pages/list-user/list-user.component';
import { UserModalComponent } from './modals/user-modal/user-modal.component';


@NgModule({
  declarations: [
    LoginComponent,
    ListUserComponent,
    UserModalComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
  ],
  exports: [
    LoginComponent,
  ],
  providers: [
    UserService,
  ]
})
export class UserModule { }
