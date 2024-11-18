import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { Specialty } from '../../interfaces/specialty';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SpecialtyService } from '../../services/specialty.service';
import { SharedService } from '../../../shared/shared.service';

import { SpecialtyModalComponent } from '../../modals/specialty-modal/specialty-modal.component';

import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-list-specialty',
  templateUrl: './list-specialty.component.html',
  styleUrl: './list-specialty.component.css',
})
export class ListSpecialtyComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'nameSpecialty',
    'description',
    'state',
    'actions',
  ];

  initialData: Specialty[] = [];

  dataSource = new MatTableDataSource(this.initialData);

  @ViewChild(MatPaginator) tablePaginator!: MatPaginator;

  constructor(
    private _specialtyService: SpecialtyService,
    private _sharedService: SharedService,
    private dialog: MatDialog
  ) {}

  getSpecialties() {
    this._specialtyService.list().subscribe({
      next: (data) => {
        if (data.isSuccessfull) {
          this.dataSource = new MatTableDataSource(data.result);
          this.dataSource.paginator = this.tablePaginator;
        } else {
          this._sharedService.showAlert('Not data found', 'Warning');
        }
      },
      error: (e) => {},
    });
  }

  newSpecialty() {
    this.dialog
      .open(SpecialtyModalComponent, { disableClose: true, width: '400px' })
      .afterClosed()
      .subscribe((result) => {
        if (result === true) this.getSpecialties();
      });
  }

  editSpecialty(specialty: Specialty) {
    this.dialog
      .open(SpecialtyModalComponent, {
        disableClose: true,
        width: '400px',
        data: specialty,
      })
      .afterClosed()
      .subscribe((result) => {
        if (result === true) this.getSpecialties();
      });
  }

  ngOnInit(): void {
    this.getSpecialties();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.tablePaginator;
  }
}
