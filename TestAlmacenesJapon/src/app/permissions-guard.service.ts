import { Injectable } from '@angular/core';
import { ClienteCredentialsService } from './cliente-credentials.service';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '../../node_modules/@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PermissionsGuardService {
  constructor(private webService:ClienteCredentialsService,private router:Router) { }
  canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot){
    switch(route.routeConfig.path){
      case "Empleados":{
        if(this.webService.getRange()<=1){
          return true;
        }else{
          this.router.navigate(['home/Inicio']);
        }
      }break;
      case "Medicamentos":{
        if(this.webService.getRange()<=1){
          return true;
        }else{
          this.router.navigate(['home/Inicio']);
        }
      }break;
      case "Abastecimientos":{
        if(this.webService.getRange()<=1){
          return true;
        }else{
          this.router.navigate(['home/Inicio']);
        }
      }break;
    }
  }
}
