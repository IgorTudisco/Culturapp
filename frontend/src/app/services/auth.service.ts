import { environment } from './../../environments/environment.development';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { RegisterRequest } from '../models/register-request.model';

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

  login(dados: any): Observable<any> {
    console.log(dados);
    debugger;
    return this.http.post(`${this.apiUrl}/login`, dados).pipe(
      map((res: any) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('userId', res.userId);
        localStorage.setItem('userName', res.userName);
        localStorage.setItem('email', res.email);
        localStorage.setItem('accountType', res.accountType);
        this.router.navigate(['/home']);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/home']);
  }

  estaLogado(): boolean {
    return !!localStorage.getItem('token');
  }
}
