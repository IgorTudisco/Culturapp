import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  eventos = [
    {
      titulo: 'Linkin Park Show: FROM ZERO WORLD TOUR',
      local: 'Allianz Parque, São Paulo',
      data: 'novembro de 2023',
      preco: 'R$ 350,00',
      categoria: 'música',
      imagem: 'https://images.unsplash.com/photo-1468234847176-28606331216a?q=80&w=1000',
    },
    {
      titulo: 'Coldplay Show: MUSIC OF THE SPHERES',
      local: 'Estádio Nilton Santos, Rio de Janeiro',
      data: 'dezembro de 2023',
      preco: 'R$ 450,00',
      categoria: 'música',
      imagem: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=1000',
    },
    {
      titulo: 'Hamlet - Teatro Nacional',
      local: 'Teatro Nacional, Brasília',
      data: 'outubro de 2023',
      preco: 'R$ 180,00',
      categoria: 'teatro',
      imagem: 'https://images.unsplash.com/photo-1503095396549-807759245b35?q=80&w=1000',
    },
    {
      titulo: 'Festival de Jazz',
      local: 'Parque Barigui, Curitiba',
      data: 'setembro de 2023',
      preco: 'R$ 220,00',
      categoria: 'música',
      imagem: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=1000',
    },
  ];

  eventosFiltrados = this.eventos;
  termoPesquisa: string = '';
  categoriaSelecionada: string = 'Todas categorias';

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.checkIfLoggedIn();
  }

  filtrarEventos() {
    const termo = this.termoPesquisa.toLowerCase();
    const categoria = this.categoriaSelecionada.toLowerCase();

    this.eventosFiltrados = this.eventos.filter(evento => {
      const correspondeTermo = termo ? evento.titulo.toLowerCase().includes(termo) : true;
      const correspondeCategoria = categoria !== 'todas categorias'
        ? evento.categoria?.toLowerCase().includes(categoria)
        : true;
      return correspondeTermo && correspondeCategoria;
    });
  }

  verDetalhes(evento: any) {
    alert(`Ver detalhes de: ${evento.titulo}`);
  }

  irParaDetalhes() {
    this.router.navigate(['/eventpage']);
  }

  verTodosEventos() {
    this.router.navigate(['/eventos']);
  }

  verCadastro() {
    this.router.navigate(['/cadastro']);
  }

  verLogin() {
    this.router.navigate(['/login']);
  }

  buscar() {
    this.filtrarEventos();
  }

  seeProfile() {
    const accountType = localStorage.getItem('accountType');
    if (accountType === 'ClientUser') {
      this.router.navigate(['/perfil-usuario']);
    } else {
      this.router.navigate(['/perfil-empresa']);
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  checkIfLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
