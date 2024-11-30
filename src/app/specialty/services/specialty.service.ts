import { ApiResponse } from '../../interfaces/api-response';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Specialty } from '../interfaces/specialty';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class SpecialtyService {
  baseUrl: string = environment.apiUrl + 'specialty/';

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  list(): Observable<ApiResponse<Specialty[]>> {
    return this.http.get<ApiResponse<Specialty[]>>(
      `${this.baseUrl}`
      // {
      //   headers: {
      //     Authorization: this.cookieService.get('Authorization'),
      //   },
      // }
    );
  }

  listActive(): Observable<ApiResponse<Specialty[]>> {
    return this.http.get<ApiResponse<Specialty[]>>(`${this.baseUrl}active`);
  }

  create(request: Specialty): Observable<ApiResponse<Specialty>> {
    return this.http.post<ApiResponse<Specialty>>(`${this.baseUrl}`, request);
  }

  update(request: Specialty): Observable<ApiResponse<Specialty>> {
    return this.http.put<ApiResponse<Specialty>>(`${this.baseUrl}`, request);
  }

  delete(id: number): Observable<ApiResponse<Specialty>> {
    return this.http.delete<ApiResponse<Specialty>>(`${this.baseUrl}${id}`);
  }
}
