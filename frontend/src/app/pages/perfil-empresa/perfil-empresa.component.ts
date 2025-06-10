import { EnterpriseUserRequest } from './../../models/enterprise-user-request.model';
import { EnterpriseUserService } from './../../services/enterprise-user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { EnterpriseUserResponse } from '../../models/enterprise-user-response.model';
@Component({
  standalone: true,
  selector: 'app-perfil-empresa',
  templateUrl: './perfil-empresa.component.html',
  styleUrls: ['./perfil-empresa.component.css'],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
})
export class PerfilEmpresaComponent implements OnInit {
  formulario: FormGroup;
  formularioUpdate: FormGroup;
  abaDadosAtiva: string = 'perfil';

  empresa?: EnterpriseUserResponse;
  UpdateEmpresa?: EnterpriseUserRequest;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private enterpriseUserService: EnterpriseUserService
  ) {
    this.formulario = this.fb.group({
      userName: [this.empresa?.userName],
      fullName: [this.empresa?.fullName],
      email: [this.empresa?.email],
      areaCode: [this.empresa?.phones?.[0]?.areaCode],
      phoneNumber: [this.empresa?.phones?.[0]?.phoneNumber],
      cnpj: [this.empresa?.cnpj],
      street: [this.empresa?.address?.street],
      number: [this.empresa?.address?.number],
      complement: [this.empresa?.address?.complement],
      neighborhood: [this.empresa?.address?.neighborhood],
      zipCode: [this.empresa?.address?.zipCode],
      city: [this.empresa?.address?.city],
      state: [this.empresa?.address?.state],
    });
    this.formularioUpdate = this.formulario;
  }

  ngOnInit(): void {
    const empresaId = localStorage.getItem('userId');
    console.log('ID da empresa logada: ' + empresaId);
    if (!empresaId) {
      this.router.navigate(['/home']);
    } else {
      console.log('ID da empresa logada: ' + empresaId);
      this.getEnterpriseLogado(Number(empresaId));
    }
  }

  getEnterpriseLogado(id: number): void {
    this.enterpriseUserService.getEnterpriseUserById(id).subscribe({
      next: (empresa) => {
        this.empresa = empresa;
        this.formulario.patchValue({
          fullName: empresa.fullName,
          userName: empresa.userName,
          email: empresa.email,
          areaCode: empresa.phones?.[0]?.areaCode,
          phoneNumber: empresa.phones?.[0]?.phoneNumber,
          cnpj: empresa.cnpj,
          street: empresa.address?.street,
          number: empresa.address?.number,
          neighborhood: empresa.address?.neighborhood,
          complement: empresa.address?.complement,
          city: empresa.address?.city,
          state: empresa.address?.state,
          zipCode: empresa.address?.zipCode,
        });
        console.log('Empresa logada:', this.empresa);
      },
    });
  }

  mudarAbaDados(aba: string): void {
    this.abaDadosAtiva = aba;
  }

  salvarDados(): void {
    if (this.formularioUpdate.valid) {
      console.log('Dados salvos:', this.formularioUpdate.value);

      this.UpdateEmpresa = this.formularioUpdate.value;
      var id = Number(localStorage.getItem('userId'));

      this.enterpriseUserService
        .updateEnterpriseUser(id, this.UpdateEmpresa!)
        .subscribe({
          next: () => {
            alert('Dados atualizados com sucesso!');
          },
          error: (error) => {
            console.error('Erro ao atualizar usuário:', error);
            alert('Erro ao atualizar dados. Tente novamente mais tarde.');
          },
        });
    }
  }

  editarEvento(id: number) {
    this.router.navigate(['/editar-evento'], { queryParams: { id } });
  }

  eventos = [
    {
      id: 1,
      nome: 'Angular Conf 2024',
      descricao: 'Evento sobre Angular e boas práticas',
      status: 'Concluído',
    },
    {
      id: 2,
      nome: 'Semana Dev Frontend',
      descricao: 'Palestras sobre UI/UX e tendências',
      status: 'Em andamento',
    },
    {
      id: 3,
      nome: 'Hackathon SP',
      descricao: 'Maratona de programação de 48h',
      status: 'Inscrito',
    },
  ];
}
