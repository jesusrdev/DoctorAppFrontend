import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { Doctor } from '../../interfaces/Doctor';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { DoctorService } from '../../services/doctor.service';
import { SharedService } from '../../../shared/shared.service';

import { DoctorModalComponent } from '../../modals/doctor-modal/doctor-modal.component';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-doctor',
  templateUrl: './list-doctor.component.html',
  styleUrl: './list-doctor.component.css',
})
export class ListDoctorComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'lastname',
    'firstname',
    'phone',
    'genre',
    'nameSpecialty',
    'state',
    'actions',
  ];

  initialData: Doctor[] = [];
  dataSource = new MatTableDataSource(this.initialData);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private _doctorService: DoctorService,
    private _sharedService: SharedService,
    private dialog: MatDialog
  ) {}

  getDoctors() {
    this._doctorService.list().subscribe({
      next: (data) => {
        if (data.isSuccessfull) {
          this.dataSource = new MatTableDataSource(data.result);
          this.dataSource.paginator = this.paginator;
        } else {
          this._sharedService.showAlert('Not data found', 'Warning!');
        }
      },
      error: (e) => {
        this._sharedService.showAlert(e.error.message, 'Error!');
      },
    });
  }

  newDoctor() {
    this.dialog
      .open(DoctorModalComponent, { disableClose: true, width: '400px' })
      .afterClosed()
      .subscribe((result) => {
        if (result === true) this.getDoctors();
      });
  }

  editDoctor(doctor: Doctor) {
    this.dialog
      .open(DoctorModalComponent, {
        disableClose: true,
        width: '400px',
        data: doctor,
      })
      .afterClosed()
      .subscribe((result) => {
        if (result === true) this.getDoctors();
      });
  }

  removeDoctor(doctor: Doctor) {
    Swal.fire({
      title: 'Do you want to remove the doctor?',
      text: doctor.lastname + ' ' + doctor.firstname,
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Yes, remove',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this._doctorService.delete(doctor.id).subscribe({
          next: (data) => {
            if (data.isSuccessfull) {
              this._sharedService.showAlert(
                'The doctor was deleted',
                'Complete'
              );
              this.getDoctors();
            } else {
              this._sharedService.showAlert(
                'Doctor could not be eliminated',
                'Error!'
              );
            }
          },
          error: (e) => {
            this._sharedService.showAlert(e.error.message, 'Error!');
          },
        });
      }
    });
  }

  applyFilterList(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {
    this.getDoctors();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
}
