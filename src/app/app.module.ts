import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderpageComponent } from './components/headerpage/headerpage.component';
import { MainComponent } from './components/pages/main/main.component';
import { MedicoCreateComponent } from './components/pages/medico/medico-create/medico-create.component';
import { MedicoListComponent } from './components/pages/medico/medico-list/medico-list.component';
import { HttpClientModule } from '@angular/common/http';
import { DataServerService } from './services/data-server.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { DeleteConfirmationComponent } from './components/pop-ups/delete-confirmation/delete-confirmation.component';
import { MatDialogActions, MatDialogContent, MatDialogModule } from '@angular/material/dialog';
import { InfoMessageComponent } from './components/pop-ups/info-message/info-message.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { LoadingService } from './services/loading.service';
import { MedicoDetailsComponent } from './components/pages/medico/medico-details/medico-details.component';
import { PacienteListComponent } from './components/pages/paciente/paciente-list/paciente-list.component';
import { PacienteCreateComponent } from './components/pages/paciente/paciente-create/paciente-create.component';
import { PacienteDetailsComponent } from './components/pages/paciente/paciente-details/paciente-details.component';
import { CitaListComponent } from './components/pages/cita/cita-list/cita-list.component';
import { CitaCreateComponent } from './components/pages/cita/cita-create/cita-create.component';
import { CitaDetailsComponent } from './components/pages/cita/cita-details/cita-details.component';

@NgModule({
  declarations: [
    AppComponent,
    DeleteConfirmationComponent,
    InfoMessageComponent,
    LoadingSpinnerComponent,
    HeaderpageComponent,
    MainComponent,
    MedicoCreateComponent,
    MedicoDetailsComponent,
    MedicoListComponent,
    PacienteListComponent,
    PacienteCreateComponent,
    PacienteDetailsComponent,
    CitaListComponent,
    CitaCreateComponent,
    CitaDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogActions,
    MatDialogContent,
    MatDialogModule,
    FormsModule,
    CommonModule
  ],
  providers: [
    DataServerService,
    LoadingService,
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
