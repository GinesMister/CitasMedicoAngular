import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/pages/not-found/not-found.component';
import { MainComponent } from './components/pages/main/main.component';
import { MedicoListComponent } from './components/pages/medico/medico-list/medico-list.component';
import { MedicoCreateComponent } from './components/pages/medico/medico-create/medico-create.component';
import { MedicoDetailsComponent } from './components/pages/medico/medico-details/medico-details.component';
import { PacienteListComponent } from './components/pages/paciente/paciente-list/paciente-list.component';
import { PacienteCreateComponent } from './components/pages/paciente/paciente-create/paciente-create.component';
import { PacienteDetailsComponent } from './components/pages/paciente/paciente-details/paciente-details.component';
import { CitaListComponent } from './components/pages/cita/cita-list/cita-list.component';
import { CitaCreateComponent } from './components/pages/cita/cita-create/cita-create.component';
import { CitaDetailsComponent } from './components/pages/cita/cita-details/cita-details.component';

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'medicos', component: MedicoListComponent},
  {path: 'medicos/crear', component: MedicoCreateComponent},
  {path: 'medicos/:id', component: MedicoDetailsComponent},
  {path: 'pacientes', component: PacienteListComponent},
  {path: 'pacientes/crear', component: PacienteCreateComponent},
  {path: 'pacientes/:id', component: PacienteDetailsComponent},
  {path: 'citas', component: CitaListComponent},
  {path: 'citas/crear', component: CitaCreateComponent},
  {path: 'citas/:id', component: CitaDetailsComponent},
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
