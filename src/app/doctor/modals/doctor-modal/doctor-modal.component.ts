import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Doctor } from '../../interfaces/Doctor';
import { Specialty } from '../../../specialty/interfaces/specialty';

import { DoctorService } from '../../services/doctor.service';
import { SharedService } from '../../../shared/shared.service';
import { SpecialtyService } from '../../../specialty/services/specialty.service';

@Component({
  selector: 'app-doctor-modal',
  templateUrl: './doctor-modal.component.html',
  styleUrl: './doctor-modal.component.css',
})
export class DoctorModalComponent implements OnInit {
  formDoctor: FormGroup;
  title: string = 'Add';
  nameButton: string = 'Save';

  listSpecialties: Specialty[] = [];

  constructor(
    private modal: MatDialogRef<DoctorModalComponent>,
    @Inject(MAT_DIALOG_DATA) public dataDoctor: Doctor,
    private fb: FormBuilder,
    private _specialtyService: SpecialtyService,
    private _doctorService: DoctorService,
    private _sharedService: SharedService
  ) {
    this.formDoctor = this.fb.group({
      lastname: ['', Validators.required],
      firstname: ['', Validators.required],
      direction: ['', Validators.required],
      phone: [''],
      genre: ['M', Validators.required],
      specialtyId: ['', Validators.required],
      state: ['1', Validators.required],
    });

    if (this.dataDoctor != null) {
      this.title = 'Edit';
      this.nameButton = 'Update';
    }

    this._specialtyService.listActive().subscribe({
      next: (data) => {
        if (data.isSuccessfull) this.listSpecialties = data.result;
      },
      error: (e) => {},
    });
  }

  ngOnInit(): void {
    if (this.dataDoctor != null) {
      this.formDoctor.patchValue({
        id: 0,
        lastname: this.dataDoctor.lastname,
        firstname: this.dataDoctor.firstname,
        direction: this.dataDoctor.direction,
        phone: this.dataDoctor.phone,
        genre: this.dataDoctor.genre,
        specialtyId: this.dataDoctor.specialtyId,
        state: this.dataDoctor.state.toString(),
      });
    }
  }

  saveDoctor() {
    const Doctor: Doctor = {
      id: this.dataDoctor?.id ?? 0,
      lastname: this.formDoctor.value.lastname,
      firstname: this.formDoctor.value.firstname,
      direction: this.formDoctor.value.direction,
      phone: this.formDoctor.value.phone,
      genre: this.formDoctor.value.genre,
      specialtyId: parseInt(this.formDoctor.value.specialtyId),
      nameSpecialty: '',
      state: parseInt(this.formDoctor.value.state),
    };

    if (this.dataDoctor == null) {
      // Create new Doctor
      this._doctorService.create(Doctor).subscribe({
        next: (data) => {
          if (data.isSuccessfull) {
            this._sharedService.showAlert(
              'The Doctor has been successfully recorded!',
              'Complete'
            );
            this.modal.close(true);
          } else {
            this._sharedService.showAlert(
              'Doctor could not be created',
              'Error'
            );
          }
        },
        error: (e) => {
          this._sharedService.showAlert(e.error.message, 'Error');
        },
      });
    } else {
      // Update Doctor
      this._doctorService.update(Doctor).subscribe({
        next: (data) => {
          if (data.isSuccessfull) {
            this._sharedService.showAlert(
              'The Doctor has been successfully updated!',
              'Complete'
            );
            this.modal.close(true);
          } else {
            this._sharedService.showAlert(
              'Doctor could not be updated',
              'Error'
            );
          }
        },
        error: (e) => {
          this._sharedService.showAlert(e.error.message, 'Error');
        },
      });
    }
  }
}
{
}
