import { AddressService } from './../../services/address.service';
import { PhoneService } from './../../services/phone.service';
import { PhoneRequest } from './../../models/phone-request.model';
import { EnterpriseUserRequest } from './../../models/enterprise-user-request.model';
import { EnterpriseUserService } from './../../services/enterprise-user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { EnterpriseUserResponse } from '../../models/enterprise-user-response.model';
import { AuthService } from '../../services/auth.service';
import { AddressRequest } from '../../models/address-request.model';
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

  phoneEmpresa?: PhoneRequest;
  addressEmpresa?: AddressRequest

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private enterpriseUserService: EnterpriseUserService,
    private authService: AuthService,
    private phoneService: PhoneService,
    private addressService: AddressService
  ) {
    this.formulario = this.fb.group({
      userName: [this.empresa?.userName],
      fullName: [this.empresa?.fullName],
      email: [this.empresa?.email],
      areaCode: [this.empresa?.phones?.[0]?.areaCode],
      phoneNumber: [this.empresa?.phones?.[0]?.phoneNumber],
      cnpj: [this.empresa?.cnpj],
      street: [this.empresa?.address?.street],
      addressNumber: [this.empresa?.address?.addressNumber],
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
    if (!empresaId) {
      this.router.navigate(['/home']);
    } else {
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
          addressNumber: empresa.address?.addressNumber,
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

      this.phoneEmpresa = {
        areaCode: this.formularioUpdate.value.areaCode,
        phoneNumber: this.formularioUpdate.value.phoneNumber,
      };

      this.phoneService.createPhone(this.phoneEmpresa).subscribe({
        next: (phone) => {
          console.log('Telefone criado:', phone);
        },
        error: (error) => {
          console.error('Erro ao criar telefone:', error);
        }
      });

      this.phoneService.getPhoneIdByNumber(
        this.formularioUpdate.value.phoneNumber
      ).subscribe({
        next: (phoneId) => {
          this.UpdateEmpresa!.phoneId = phoneId;
        },
        error: (error) => {
          console.error('Erro ao buscar telefone:', error);
        }
      });

      this.addressEmpresa = {
        street: this.formularioUpdate.value.street,
        addressNumber: this.formularioUpdate.value.number,
        complement: this.formularioUpdate.value.complement,
        neighborhood: this.formularioUpdate.value.neighborhood,
        city: this.formularioUpdate.value.city,
        state: this.formularioUpdate.value.state,
        zipCode: this.formularioUpdate.value.zipCode,
      };

      this.addressService.createAddress(this.addressEmpresa).subscribe({
        next: (address) => {
          console.log('Endereço criado:', address);
        },
        error: (error) => {
          console.error('Erro ao criar endereço:', error);
        }
      });

      this.addressService.getAddressIdByZipCode(
        this.formularioUpdate.value.zipCode
      ).subscribe({
        next: (addressId) => {
          this.UpdateEmpresa!.addressId = addressId;
        },
        error: (error) => {
          console.error('Erro ao buscar endereço:', error);
        }
      });

      var EmpresaId = Number(localStorage.getItem('userId'));

      this.enterpriseUserService
        .updateEnterpriseUser(EmpresaId, this.UpdateEmpresa!)
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
