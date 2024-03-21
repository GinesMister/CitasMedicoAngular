import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderpageComponent } from './components/headerpage/headerpage.component';
import { MainComponent } from './components/main/main.component';
import { MedicoCreateComponent } from './components/medico/medico-create/medico-create.component';
import { MedicoListComponent } from './components/medico/medico-list/medico-list.component';
import { HttpClientModule } from '@angular/common/http';
import { DataServerService } from './services/data-server.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { DeleteConfirmationComponent } from './components/pop-ups/delete-confirmation/delete-confirmation.component';
import { MatDialogActions, MatDialogContent, MatDialogModule } from '@angular/material/dialog';
import { InfoMessageComponent } from './components/pop-ups/info-message/info-message.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderpageComponent,
    MainComponent,
    MedicoCreateComponent,
    MedicoListComponent,
    DeleteConfirmationComponent,
    InfoMessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogActions,
    MatDialogContent,
    MatDialogModule
  ],
  providers: [
    DataServerService,
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
