import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(): boolean {
    // Verifica se está no ambiente do navegador
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (!token) {
        this.router.navigate(['/home']);
        return false;
      }
      return true;
    }

    // Se não estiver no ambiente do navegador, redireciona para a página inicial
    this.router.navigate(['/home']);
    return false;
  }
}
