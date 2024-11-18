import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Specialty } from '../../interfaces/specialty';

import { SpecialtyService } from '../../services/specialty.service';
import { SharedService } from '../../../shared/shared.service';

@Component({
  selector: 'app-specialty-modal',
  templateUrl: './specialty-modal.component.html',
  styleUrl: './specialty-modal.component.css',
})
export class SpecialtyModalComponent implements OnInit {
  formSpecialty: FormGroup;
  title: string = 'Add';
  nameButton: string = 'Save';

  constructor(
    private modal: MatDialogRef<SpecialtyModalComponent>,
    @Inject(MAT_DIALOG_DATA) public dataSpecialty: Specialty,
    private fb: FormBuilder,
    private _specialtyService: SpecialtyService,
    private _sharedService: SharedService
  ) {
    this.formSpecialty = this.fb.group({
      nameSpecialty: ['', Validators.required],
      description: ['', Validators.required],
      state: ['1', Validators.required],
    });

    if (this.dataSpecialty != null) {
      this.title = 'Edit';
      this.nameButton = 'Update';
    }
  }

  ngOnInit(): void {
    if (this.dataSpecialty != null) {
      this.formSpecialty.patchValue({
        nameSpecialty: this.dataSpecialty.nameSpecialty,
        description: this.dataSpecialty.description,
        state: this.dataSpecialty.state.toString(),
      });
    }
  }

  saveSpecialty() {
    const specialty: Specialty = {
      id: this.dataSpecialty?.id ?? 0,
      nameSpecialty: this.formSpecialty.value.nameSpecialty,
      description: this.formSpecialty.value.description,
      state: parseInt(this.formSpecialty.value.state),
    };

    if (this.dataSpecialty == null) {
      // Create new Specialty
      this._specialtyService.create(specialty).subscribe({
        next: (data) => {
          if (data.isSuccessfull) {
            this._sharedService.showAlert(
              'The Specialty has been successfully recorded!',
              'Complete'
            );
            this.modal.close(true);
          } else {
            this._sharedService.showAlert(
              'Specialty could not be created',
              'Error'
            );
          }
        },
        error: (e) => {
          this._sharedService.showAlert(
            e.error.errors,
            'Error'
          );
        },
      });
    } else {
      // Update Specialty
      this._specialtyService.update(specialty).subscribe({
        next: (data) => {
          if (data.isSuccessfull) {
            this._sharedService.showAlert(
              'The Specialty has been successfully updated!',
              'Complete'
            );
            this.modal.close(true);
          } else {
            this._sharedService.showAlert(
              'Specialty could not be updated',
              'Error'
            );
          }
        },
        error: (e) => {},
      });
    }
  }
}
