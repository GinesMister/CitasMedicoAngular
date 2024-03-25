import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MainComponent } from './components/pages/main/main.component';
import { MedicoListComponent } from './components/pages/medico/medico-list/medico-list.component';
import { MedicoCreateComponent } from './components/pages/medico/medico-create/medico-create.component';
import { MedicoDetailsComponent } from './components/pages/medico/medico-details/medico-details.component';

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'medicos', component: MedicoListComponent},
  {path: 'medicos/crear', component: MedicoCreateComponent},
  {path: 'medicos/:id', component: MedicoDetailsComponent},
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
