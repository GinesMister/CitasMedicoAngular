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
import { DataLocalService } from './services/data-local.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderpageComponent,
    MainComponent,
    MedicoCreateComponent,
    MedicoListComponent,
    DeleteConfirmationComponent,
    InfoMessageComponent,
    LoadingSpinnerComponent
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
    DataLocalService,
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
