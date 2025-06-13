import { PhoneService } from './../../services/phone.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { ClientUserResponse } from '../../models/client-user-response.model';
import { ClientUserService } from '../../services/client-user.service';
import { environment } from '../../../environments/environment.development';
import { ClientUserRequest } from '../../models/client-user-request.model';
import { PhoneRequest } from '../../models/phone-request.model';
import { AddressRequest } from '../../models/address-request.model';
import { AddressService } from '../../services/address.service';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css'],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
})
export class PerfilUsuarioComponent implements OnInit {
  formulario: FormGroup;
  formularioUpdate: FormGroup;
  abaDadosAtiva: string = 'perfil';

  usuario?: ClientUserResponse;
  usuarioUpdate?: ClientUserRequest;

  phoneUsuario?: PhoneRequest;
  addressUsuario?: AddressRequest;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private clientUserService: ClientUserService,
    private authService: AuthService,
    private phoneService: PhoneService,
    private addressService: AddressService
  ) {
    this.formulario = this.fb.group({
      fullName: [this.usuario?.fullName],
      userName: [this.usuario?.userName],
      areaCode: [this.usuario?.phone?.areaCode],
      phoneNumber: [this.usuario?.phone?.phoneNumber],
      cpf: [this.usuario?.cpf],
      street: [this.usuario?.address?.street],
      addressNumber: [this.usuario?.address?.addressNumber],
      neighborhood: [this.usuario?.address?.neighborhood],
      complement: [this.usuario?.address?.complement],
      city: [this.usuario?.address?.city],
      state: [this.usuario?.address?.state],
      zipCode: [this.usuario?.address?.zipCode],
    });
    this.formularioUpdate = this.formulario;
  }

  ngOnInit(): void {
    const usuarioId = localStorage.getItem('userId');
    if (!usuarioId) {
      this.router.navigate(['/home']);
    } else {
      this.getUsuarioLogado(Number(usuarioId));
    }
  }

  getUsuarioLogado(id: number): void {
    this.clientUserService.getClientUserById(id).subscribe({
      next: (usuario) => {
        this.usuario = usuario;
        this.formulario.patchValue({
          fullName: usuario.fullName,
          userName: usuario.userName,
          areaCode: usuario.phone?.areaCode,
          phoneNumber: usuario.phone?.phoneNumber,
          cpf: usuario.cpf,
          street: usuario.address?.street,
          addressNumber: usuario.address?.addressNumber,
          neighborhood: usuario.address?.neighborhood,
          complement: usuario.address?.complement,
          city: usuario.address?.city,
          state: usuario.address?.state,
          zipCode: usuario.address?.zipCode,
        });
      },
    });
  }

  mudarAbaDados(aba: string): void {
    this.abaDadosAtiva = aba;
  }

  salvarDados(): void {
    if (this.formularioUpdate.valid) {
      console.log('Dados salvos:', this.formularioUpdate.value);

      this.usuarioUpdate = this.formularioUpdate.value;

      this.phoneUsuario = {
        areaCode: this.formularioUpdate.value.areaCode,
        phoneNumber: this.formularioUpdate.value.phoneNumber,
      };

      this.phoneService.createPhone(this.phoneUsuario).subscribe({
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
          this.usuarioUpdate!.phoneId = phoneId;
        },
        error: (error) => {
          console.error('Erro ao buscar telefone:', error);
        }
      });

      this.addressUsuario = {
        street: this.formularioUpdate.value.street,
        addressNumber: this.formularioUpdate.value.addressNumber,
        complement: this.formularioUpdate.value.complement,
        neighborhood: this.formularioUpdate.value.neighborhood,
        city: this.formularioUpdate.value.city,
        state: this.formularioUpdate.value.state,
        zipCode: this.formularioUpdate.value.zipCode,
      };

      this.addressService.createAddress(this.addressUsuario).subscribe({
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
          this.usuarioUpdate!.addressId = addressId;
        },
        error: (error) => {
          console.error('Erro ao buscar endereço:', error);
        }
      });

      var id = Number(localStorage.getItem('userId'));

      this.clientUserService
        .updateClientUser(id, this.usuarioUpdate!)
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

  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }

  eventos = [
    {
      nome: 'Angular Conf 2024',
      descricao: 'Evento sobre Angular e boas práticas',
      status: 'Concluído',
    },
    {
      nome: 'Semana Dev Frontend',
      descricao: 'Palestras sobre UI/UX e tendências',
      status: 'Em andamento',
    },
    {
      nome: 'Hackathon SP',
      descricao: 'Maratona de programação de 48h',
      status: 'Inscrito',
    },
  ];
}
