import { ApiResponse } from '../../interfaces/api-response';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Specialty } from '../interfaces/specialty';

@Injectable({
  providedIn: 'root'
})
export class SpecialtyService {

  baseUrl: string = environment.apiUrl + 'specialty/';

  constructor(private http: HttpClient) { }

  list(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.baseUrl}`);
  }

  create(request: Specialty): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.baseUrl}`, request);
  }

  update(request: Specialty): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${this.baseUrl}`, request);
  }

  delete(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.baseUrl}${id}`);
  }

}
