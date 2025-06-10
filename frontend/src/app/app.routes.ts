import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { EventpageComponent } from './pages/eventpage/eventpage.component';
import { CriarEventoComponent } from './pages/criar-evento/criar-evento.component';
import { EditarEventoComponent } from './pages/editar-evento/editar-evento.component';
import { FaqComponent } from './pages/faq/faq.component';
import { SobreComponent } from './pages/sobre/sobre.component';
import { PerfilUsuarioComponent } from './pages/perfil-usuario/perfil-usuario.component';
import { PerfilEmpresaComponent } from './pages/perfil-empresa/perfil-empresa.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [

  // rota inicial
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  // Rotas públicas
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'eventpage', component: EventpageComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'sobre', component: SobreComponent },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },

  // Rotas protegidas
  { path: 'criar-evento', component: CriarEventoComponent, canActivate: [AuthGuard] },
  { path: 'editar-evento', component: EditarEventoComponent, canActivate: [AuthGuard] },
  { path: 'perfil-usuario', component: PerfilUsuarioComponent, canActivate: [AuthGuard] },
  { path: 'perfil-empresa', component: PerfilEmpresaComponent, canActivate: [AuthGuard] },

  // Rota curinga
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule { }
