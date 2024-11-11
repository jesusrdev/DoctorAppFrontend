import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Login } from '../interfaces/login';
import { Session } from '../interfaces/session';

import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class UserService {

  baseUrl: string = environment.apiUrl + 'user/';

  constructor(private http: HttpClient) {}

  signIn(request: Login): Observable<Session> {
    return this.http.post<Session>(`${this.baseUrl}login`, request)
  }
}
