import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Login } from '../interfaces/login';
import { Sesion } from '../interfaces/sesion';

import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class UserService {

  baseUrl: string = environment.apiUrl + 'user/';

  constructor(private http: HttpClient) {}

  signIn(request: Login): Observable<Sesion> {
    return this.http.post<Sesion>(`${this.baseUrl}login`, request)
  }
}
