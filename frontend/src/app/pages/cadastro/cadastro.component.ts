import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterRequest, AccountType } from '../../models/register-request.model';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})

export class CadastroComponent implements OnInit {
  cadastroForm!: FormGroup;
  senhaInvalida: boolean = false;
  showPassword = false;
  showConfirmPassword = false;

  accountTypes = Object.values(AccountType).filter(value => typeof value == 'number');

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cadastroForm = this.fb.group({
      userName: ['', Validators.required],
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      cpf: ['', [Validators.minLength(11), Validators.maxLength(11)]],
      cnpj: ['', [Validators.minLength(14), Validators.maxLength(14)]],

      accountType: [AccountType.clientUser, Validators.required]
    }, {
      validators: this.passwordMatchValidator
    });

    this.cadastroForm.get('accountType')?.valueChanges.subscribe((value: AccountType) => {
      const cnpjControl = this.cadastroForm.get('cnpj');
      const cpfControl = this.cadastroForm.get('cpf');

      if (value == AccountType.enterpriseUser) {
        cnpjControl?.setValidators([Validators.required, Validators.minLength(14), Validators.maxLength(14)]);
        cpfControl?.clearValidators();
        cpfControl?.setValue('');
      } else {
        cpfControl?.setValidators([Validators.required, Validators.minLength(11), Validators.maxLength(11)]);
        cnpjControl?.clearValidators();
        cnpjControl?.setValue('');
      }

      cnpjControl?.updateValueAndValidity();
      cpfControl?.updateValueAndValidity();
    });
  }

  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {

    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (!password || !confirmPassword) {
      return null;
    }

    if (password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ mismatch: true });
      return { passwordMismatch: true };
    } else {
      confirmPassword.setErrors(null);
      return null;
    }
  }

  cadastrar(): void {

    this.senhaInvalida = this.cadastroForm.errors?.['passwordMismatch'];

    if (this.cadastroForm.valid) {
      const registerData: RegisterRequest = {
        userName: this.cadastroForm.get('userName')?.value,
        fullName: this.cadastroForm.get('fullName')?.value,
        email: this.cadastroForm.get('email')?.value,
        password: this.cadastroForm.get('password')?.value,
        accountType: Number(this.cadastroForm.get('accountType')?.value),

        cpf: this.cadastroForm.get('accountType')?.value == AccountType.clientUser ? this.cadastroForm.get('cpf')?.value : null,
        cnpj: this.cadastroForm.get('accountType')?.value == AccountType.enterpriseUser ? this.cadastroForm.get('cnpj')?.value : null,
      };

      this.authService.cadastrar(registerData).subscribe({
        next: () => {
          alert('Cadastro realizado com sucesso!');
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Erro no cadastro:', error);
          alert('Erro ao realizar o cadastro. Por favor, tente novamente.');
        }
      });
    } else {
      console.log('Formulário inválido!');
      this.cadastroForm.markAllAsTouched();
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  get f(): { [key: string]: AbstractControl } {
    return this.cadastroForm.controls;
  }

  navegarParaHome(): void {
    this.router.navigate(['/']);
  }
}
