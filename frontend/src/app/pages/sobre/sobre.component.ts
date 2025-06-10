import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sobre',
  imports: [],
  templateUrl: './sobre.component.html',
  styleUrl: './sobre.component.css',
})
export class SobreComponent {
  constructor(private router: Router) {}

  verCadastro() {
    this.router.navigate(['/cadastro']);
  }
  verLogin() {
    this.router.navigate(['/login']);
  }
}
