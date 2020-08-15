import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PageNotFoundComponentComponent } from './page-not-found-component/page-not-found-component.component';
import { HomeComponent } from './home/home.component';
import { SidebarComponent } from './admin/Component/sidebar/sidebar.component';
import { LoginComponent } from './admin/Component/login/login.component';
import { DashboardComponent } from './admin/Component/dashboard/dashboard.component';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalComponent } from './_helper/modal/modal.component';
import { ButtonRendererComponent } from './_helper/button-renderer/button-renderer.component';
import {AgGridModule} from 'ag-grid-angular';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule, MatDialogRef} from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponentComponent,
    HomeComponent,
    SidebarComponent,
    LoginComponent,
    DashboardComponent,
    ModalComponent,
    ButtonRendererComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AgGridModule.withComponents([ButtonRendererComponent]),
    MatFormFieldModule,
    MatSelectModule,
    MatDialogModule
  ],
  entryComponents: [ ModalComponent],
  exports: [ModalComponent],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: []},
    {provide: MatDialogRef, useValue: []}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
