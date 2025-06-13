import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-eventpage',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './eventpage.component.html',
  styleUrls: ['./eventpage.component.css']
})
export class EventpageComponent {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.checkIfLoggedIn();
  }

  buyTicket(): void {
    this.router.navigate(['/checkout']);
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
