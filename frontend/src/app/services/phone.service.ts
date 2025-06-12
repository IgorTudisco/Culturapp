import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { PhoneResponse } from '../models/phone-response.model';
import { PhoneRequest } from '../models/phone-request.model';

@Injectable({
  providedIn: 'root'
})
export class PhoneService {

  private apiUrl = 'http://localhost:5115/api/Phone';
  private headers = {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  };

  constructor(private http: HttpClient, private router: Router) { }

  getPhoneById(id: number): Observable<PhoneResponse> {
    return this.http.get<PhoneResponse>(`${this.apiUrl}/GetPhone/${id}`, {
      headers: this.headers
    }).pipe(
      map((res: PhoneResponse) => {
        return res;
      })
    );
  }

  getPhoneByNumber(phoneNumber: string): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/GetPhoneByNumber/${phoneNumber}`, {
      headers: this.headers
    }).pipe(
      map((res: number) => {
        return res || 0;
      })
    );
  }

  createPhone(phone: PhoneRequest): Observable<PhoneResponse> {
    return this.http.post<PhoneResponse>(`${this.apiUrl}/PostPhone`, phone, {
      headers: this.headers
    }).pipe(
      map((res: PhoneResponse) => {
        return res;
      })
    );
  }

  updatePhone(id: number, phone: PhoneRequest): Observable<PhoneResponse> {
    return this.http.put<PhoneResponse>(`${this.apiUrl}/PutPhone/${id}`, phone, {
      headers: this.headers
    }).pipe(
      map((res: PhoneResponse) => {
        return res;
      })
    );
  }

  deletePhone(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/DeletePhone/${id}`, {
      headers: this.headers
    });
  }
}
