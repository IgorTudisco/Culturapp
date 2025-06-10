import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css'],
})
export class FaqComponent {
  constructor(private router: Router) {}

  verCadastro() {
    this.router.navigate(['/cadastro']);
  }
  verLogin() {
    this.router.navigate(['/login']);
  }
}
