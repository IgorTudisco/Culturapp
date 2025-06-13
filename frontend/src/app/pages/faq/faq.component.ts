import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css'],
})
export class FaqComponent {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.checkIfLoggedIn();
  }

  goToCadastro(): void {
    this.router.navigate(['/cadastro']);
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  seeProfile(): void {
    const accountType = this.authService.getAccountType();
    if (accountType === 'ClientUser') {
      this.router.navigate(['/perfil-usuario']);
    } else if (accountType === 'CompanyUser') {
      this.router.navigate(['/perfil-empresa']);
    } else {
      alert('Tipo de conta inválido ou não autenticado.');
      this.router.navigate(['/login']);
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  checkIfLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
