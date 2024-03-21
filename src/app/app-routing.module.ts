import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MainComponent } from './components/main/main.component';
import { MedicoListComponent } from './components/medico/medico-list/medico-list.component';
import { MedicoCreateComponent } from './components/medico/medico-create/medico-create.component';

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'medicos', component: MedicoListComponent},
  {path: 'medicos/crear', component: MedicoCreateComponent},
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
