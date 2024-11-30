import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Login } from '../interfaces/login';
import { Session } from '../interfaces/session';
import { SignUp } from '../interfaces/sign-up';

import { environment } from '../../../environments/environment';

import { ApiResponse } from '../../interfaces/api-response';
import { Role } from '../interfaces/role';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl: string = environment.apiUrl + 'user/';

  constructor(private http: HttpClient) {}

  signIn(request: Login): Observable<Session> {
    return this.http.post<Session>(`${this.baseUrl}login`, request);
  }

  signUp(request: SignUp): Observable<Session> {
    return this.http.post<Session>(`${this.baseUrl}sign-up`, request);
  }

  list(): Observable<ApiResponse<SignUp[]>> {
    return this.http.get<ApiResponse<SignUp[]>>(`${this.baseUrl}`);
  }

  listRoles(): Observable<ApiResponse<Role[]>> {
    return this.http.get<ApiResponse<Role[]>>(`${this.baseUrl}list-roles`);
  }
}
