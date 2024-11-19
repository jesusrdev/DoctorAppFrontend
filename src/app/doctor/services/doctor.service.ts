import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../interfaces/api-response';
import { Doctor } from '../interfaces/Doctor';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  baseUrl: string = environment.apiUrl + 'doctor/';

  constructor(private http: HttpClient) { }

  list(): Observable<ApiResponse<Doctor[]>> {
    return this.http.get<ApiResponse<Doctor[]>>(`${this.baseUrl}`);
  }

  create(request: Doctor): Observable<ApiResponse<Doctor>> {
    return this.http.post<ApiResponse<Doctor>>(`${this.baseUrl}`, request);
  }

  update(request: Doctor): Observable<ApiResponse<Doctor>> {
    return this.http.put<ApiResponse<Doctor>>(`${this.baseUrl}`, request);
  }

  delete(id: number): Observable<ApiResponse<Doctor>> {
    return this.http.delete<ApiResponse<Doctor>>(`${this.baseUrl}${id}`);
  }
}
