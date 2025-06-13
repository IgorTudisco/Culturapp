import { environment } from './../../environments/environment.development';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { RegisterRequest } from '../models/register-request.model';
import { LoginResponse } from '../models/login-response.model';
import { LoginRequest } from '../models/login-request.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:5115/api/Auth';

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  cadastrar(dados: RegisterRequest): Observable<RegisterRequest> {
    debugger
    console.log(dados);
    return this.http.post(`${this.apiUrl}/register`, dados);
  }

  login(dados: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, dados).pipe(
      map((res: LoginResponse) => {
        this.setValue(res);
        return res;
      })
    );
  }

  setValue(res: LoginResponse | null): void {
    localStorage.setItem('token', res!.token || '');
    localStorage.setItem('userId', res!.userId?.toString() || '');
    localStorage.setItem('userName', res!.userName || '');
    localStorage.setItem('email', res!.email || '');
    localStorage.setItem('accountType', res!.accountType || '');
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/home']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
  getToken(): string | null {
    return localStorage.getItem('token');
  }
  getAccountType(): string | null {
    return localStorage.getItem('accountType');
  }

}
