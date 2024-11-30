import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { SignUp } from '../../interfaces/sign-up';

import { UserService } from '../../services/user.service';
import { SharedService } from '../../../shared/shared.service';
import { Role } from '../../interfaces/role';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrl: './user-modal.component.css',
})
export class UserModalComponent implements OnInit {
  formUser: FormGroup;
  title: string = 'Register';
  nameButton: string = 'Save';

  listRoles: Role[] = [];

  constructor(
    private modal: MatDialogRef<UserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public dataUser: SignUp,
    private fb: FormBuilder,
    private _userService: UserService,
    private _sharedService: SharedService
  ) {
    this.formUser = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      lastname: ['', Validators.required],
      firstname: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      role: ['', Validators.required],
    });

    this._userService.listRoles().subscribe({
      next: (data) => {
        if (data.isSuccessfull) this.listRoles = data.result;
      },
      error: (e) => {},
    });

    if (this.dataUser != null) {
      this.title = 'Edit';
      this.nameButton = 'Update';
    }
  }

  ngOnInit(): void {
    if (this.dataUser != null) {
      this.formUser.patchValue({
        username: this.dataUser.username,
        password: this.dataUser.password,
        lastname: this.dataUser.lastname,
        firstname: this.dataUser.firstname,
        email: this.dataUser.email,
        role: this.dataUser.role,
      });
    }
  }

  register() {
    const user: SignUp = {
      username: this.formUser.value.username,
      password: this.formUser.value.password,
      lastname: this.formUser.value.lastname,
      firstname: this.formUser.value.firstname,
      email: this.formUser.value.email,
      role: this.formUser.value.role,
    };

    this._userService.signUp(user).subscribe({
      next: (data) => {
        this._sharedService.showAlert(
          'The user has been successfully registered!',
          'Complete'
        );
        this.modal.close(true);
      },
      error: (e) => {
        this._sharedService.showAlert(e.error.errors, 'Error');
      },
    });
  }

  get email() {
    return this.formUser.get('email');
  }
}
