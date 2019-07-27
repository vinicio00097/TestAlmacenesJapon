import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
  MAT_DATE_LOCALE,
  MAT_DATE_FORMATS,
} from '@angular/material';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import { HttpClientModule } from '../../node_modules/@angular/common/http';
import { FormsModule } from '../../node_modules/@angular/forms';
import { LocationStrategy, HashLocationStrategy } from '../../node_modules/@angular/common';
import { LogOutDialogComponent } from './components/home/components/log-out-dialog/log-out-dialog.component';
import { ModalRecoveryComponent } from './components/login/components/modal-recovery/modal-recovery.component';
import { EmpleadosComponent } from './components/empleados/empleados.component';
import { PalindromosComponent } from './components/palindromos/palindromos.component';
import { EmpleadoDialogComponent } from './components/empleados/components/empleado-dialog/empleado-dialog.component';
import { RecoveryComponent } from './components/recovery/recovery.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    InicioComponent,
    LoginComponent,
    LogOutDialogComponent,
    ModalRecoveryComponent,
    EmpleadosComponent,
    PalindromosComponent,
    EmpleadoDialogComponent,
    RecoveryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CdkTableModule,
    CdkTreeModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule
  ],
  entryComponents:[
    LogOutDialogComponent,
    ModalRecoveryComponent,
    EmpleadoDialogComponent
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
