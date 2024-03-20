import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderpageComponent } from './components/headerpage/headerpage.component';
import { MainComponent } from './components/main/main.component';
import { MedicoCreateComponent } from './components/medico/medico-create/medico-create.component';
import { MedicoListComponent } from './components/medico/medico-list/medico-list.component';
import { MedicoService } from './services/medico.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderpageComponent,
    MainComponent,
    MedicoCreateComponent,
    MedicoListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    MedicoService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
