import { ClientUserRequest } from './../models/client-user-request.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ClientUserResponse } from '../models/client-user-response.model';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ClientUserService {

  private apiUrl = 'http://localhost:5115/api/ClientUser';
  private headers = {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  };

  constructor(private http: HttpClient, private router: Router) { }

  getClientUsers(): Observable<ClientUserResponse[]> {
    return this.http.get<ClientUserResponse[]>(`${this.apiUrl}/GetClientUsers`, {
      headers: this.headers
    }).pipe(
      map((res: ClientUserResponse[]) => {
        return res;
      })
    );
  }

  getClientUserById(id: number): Observable<ClientUserResponse> {
    console.log(this.headers);
    console.log(`Fetching user with ID: ${environment.userId}`);
    return this.http.get<ClientUserResponse>(`${this.apiUrl}/GetClientUserById/${id}`, {
      headers: this.headers
    }).pipe(
      map((res: ClientUserResponse) => {
        return res;
      })
    );
  }

  updateClientUser(id: number, clientUser: ClientUserRequest): Observable<ClientUserRequest> {
    return this.http.put<ClientUserRequest>(`${this.apiUrl}/PutClientUser/${id}`, clientUser, {
      headers: this.headers
    }).pipe(
      map((res: ClientUserRequest) => {
        return res;
      })
    );
  }

}
