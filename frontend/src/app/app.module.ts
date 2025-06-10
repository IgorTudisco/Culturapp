import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FaqComponent } from './pages/faq/faq.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [AppComponent, FaqComponent, ],
  // Note: CriarEventoComponent is declared here, not as a standalone component
  imports: [BrowserModule, CommonModule, ReactiveFormsModule],
  bootstrap: [AppComponent],


})
export class AppModule  {}

