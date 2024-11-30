import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { User } from '../../interfaces/user';

import { SharedService } from '../../../shared/shared.service';
import { UserService } from '../../services/user.service';
import { UserModalComponent } from '../../modals/user-modal/user-modal.component';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrl: './list-user.component.css',
})
export class ListUserComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'username',
    'lastname',
    'firstname',
    'email',
    'role',
    // 'actions',
  ];

  initialData: User[] = [];

  dataSource = new MatTableDataSource(this.initialData);

  @ViewChild(MatPaginator) tablePaginator!: MatPaginator;

  constructor(
    private _userService: UserService,
    private _sharedService: SharedService,
    private dialog: MatDialog
  ) {}

  getUsers() {
    this._userService.list().subscribe({
      next: (data) => {
        if (data.isSuccessfull) {
          this.dataSource = new MatTableDataSource(data.result);
          this.dataSource.paginator = this.tablePaginator;
        } else {
          this._sharedService.showAlert('Not data found', 'Warning');
        }
      },
      error: (e) => {
        this._sharedService.showAlert(e.error.message, 'Error!');
      },
    });
  }

  newUser() {
    this.dialog
      .open(UserModalComponent, { disableClose: true, width: '400px' })
      .afterClosed()
      .subscribe((result) => {
        if (result === true) this.getUsers();
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
    this.getUsers();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.tablePaginator;
  }
}
