import { EnterpriseUserRequest } from './../models/enterprise-user-request.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { EnterpriseUserResponse } from '../models/enterprise-user-response.model';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class EnterpriseUserService {

  private apiUrl = 'http://localhost:5115/api/EnterpriseUser';
  private headers = {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  };

  constructor(private http: HttpClient, private router: Router) { }

  getEnterpriseUsers(): Observable<EnterpriseUserResponse[]> {
    return this.http.get<EnterpriseUserResponse[]>
      (
        `${this.apiUrl}/GetEnterpriseUsers`,
        {
          headers: this.headers
        }
      ).pipe(
        map((res: EnterpriseUserResponse[]) => {
          return res;
        })
      );
  }

  getEnterpriseUserById(id: number): Observable<EnterpriseUserResponse> {
    return this.http.get<EnterpriseUserResponse>(`${this.apiUrl}/GetEnterpriseUserById/${id}`, {
      headers: this.headers
    }).pipe(
      map((res: EnterpriseUserResponse) => {
        return res;
      })
    );
  }

  updateEnterpriseUser(id: number, enterpriseUser: EnterpriseUserRequest): Observable<EnterpriseUserResponse> {
    return this.http.put<EnterpriseUserResponse>(`${this.apiUrl}/UpdateEnterpriseUser/${id}`, enterpriseUser, {
      headers: this.headers
    }).pipe(
      map((res: EnterpriseUserResponse) => {
        return res;
      })
    );
  }
}
