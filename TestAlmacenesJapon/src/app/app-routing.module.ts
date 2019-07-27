import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AuthRouterGuardService } from './auth-router-guard.service';
import { PermissionsGuardService } from './permissions-guard.service';
import {InicioComponent} from './components/inicio/inicio.component';
import {EmpleadosComponent} from './components/empleados/empleados.component';
import {PalindromosComponent} from './components/palindromos/palindromos.component';
import { RecoveryComponent } from './components/recovery/recovery.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path: 'recovery',
    component:RecoveryComponent
  },
  {
    path: 'home',
      component: HomeComponent,
      canActivate: [AuthRouterGuardService],
      children: [
        {
          path: 'Inicio',
            component: InicioComponent
        },
        {
          path: 'Empleados',
            component: EmpleadosComponent
        },
        {
          path: 'Palindromos',
            component: PalindromosComponent
        },
      ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
