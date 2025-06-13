import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AddressResponse } from '../models/address-response.model';
import { AddressRequest } from '../models/address-request.model';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private apiUrl = 'http://localhost:5115/api/Address';
  private headers = {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  };

  constructor(private http: HttpClient, private router: Router) { }

  getAddresses(): Observable<AddressResponse[]> {
    return this.http.get<AddressResponse[]>
      (
        `${this.apiUrl}/GetAllAddresses`,
        {
          headers: this.headers
        }
      ).pipe(
        map((res: AddressResponse[]) => {
          return res;
        })
      );
  }

  getAddressById(id: number): Observable<AddressResponse> {
    return this.http.get<AddressResponse>(`${this.apiUrl}/GetAddress/${id}`, {
      headers: this.headers
    }).pipe(
      map((res: AddressResponse) => {
        return res;
      })
    );
  }

  updateAddress(id: number, address: AddressRequest): Observable<AddressResponse> {
    return this.http.put<AddressResponse>(`${this.apiUrl}/PutAddress/${id}`, address, {
      headers: this.headers
    }).pipe(
      map((res: AddressResponse) => {
        return res;
      })
    );
  }

  createAddress(address: AddressRequest): Observable<AddressResponse> {
    return this.http.post<AddressResponse>(`${this.apiUrl}/PostAddress`, address, {
      headers: this.headers
    }).pipe(
      map((res: AddressResponse) => {
        return res;
      })
    );
  }

  deleteAddress(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/DeleteAddress/${id}`, {
      headers: this.headers
    });
  }

  getAddressIdByZipCode(zipCode: string): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/GetAddressIdByZipCode/${zipCode}`, {
      headers: this.headers
    }).pipe(
      map((res: number) => {
        return res || 0;
      })
    );
  }

}
