
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-criar-evento',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  templateUrl: './criar-evento.component.html',
  styleUrls: ['./criar-evento.component.css']
})
export class CriarEventoComponent  {
  eventoForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.eventoForm = this.fb.group({
      titulo: [''],
      tipo: [''],
      descricao: [''],
      capacidade: [''],
      valorIngresso: [''],
      pontos: [''],
      cep: [''],
      numero: [''],
      estado: [''],
      cidade: [''],
      rua: [''],
      bairro: [''],
      complemento: [''],
      dataInicioEvento: [''],
      dataFimEvento: [''],
      inicioVenda: [''],
      fimVenda: [''],
      status: ['ATIVO']
    });
  }

  salvarEvento(): void {
    if (this.eventoForm.valid) {
      console.log(this.eventoForm.value);
      // aqui você pode enviar os dados para a API
    }
  }
}
