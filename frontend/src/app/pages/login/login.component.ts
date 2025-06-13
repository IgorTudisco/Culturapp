import { LoginRequest } from './../../models/login-request.model';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { LoginResponse } from '../../models/login-response.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class LoginComponent {

  loginForm: FormGroup;
  loginRequest?: LoginRequest;
  loginResponse?: LoginResponse;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: [''],
      password: ['']
    });
  }

  login() {

    this.loginRequest = this.loginForm.value as LoginRequest;
    console.log(this.loginRequest);
    var credentials = this.loginRequest;

    this.authService.login(credentials).subscribe((res) => {
      this.loginResponse = res;
      console.log(this.loginResponse);
      this.router.navigate(['/home']);
    });
  }
}
