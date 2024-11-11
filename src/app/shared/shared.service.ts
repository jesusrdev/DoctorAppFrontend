import { Injectable } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';

import { Session } from '../user/interfaces/session';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor(private _snackBar: MatSnackBar) {}

  showAlert(message: string, type: string): void {
    this._snackBar.open(message, type, {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000,
    });
  }

  setSession(session: Session): void {
    localStorage.setItem('userSession', JSON.stringify(session));
  }

  getSession(): Session {
    const sessionString = localStorage.getItem('userSession');
    const userToken = JSON.parse(sessionString!);

    return userToken;
  }

  deleteSession(): void {
    localStorage.removeItem('userSession');
  }
}
