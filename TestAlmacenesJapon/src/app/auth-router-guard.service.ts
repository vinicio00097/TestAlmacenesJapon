import { Injectable } from '@angular/core';
import { ClienteCredentialsService } from './cliente-credentials.service';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '../../node_modules/@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthRouterGuardService {

  constructor(private webService:ClienteCredentialsService,private router:Router) { }
  
  canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot){
    if(this.webService.getAuthToken()!=null||localStorage.getItem("token")!=null
      ||sessionStorage.getItem("token")!=null
    ){
      if(localStorage.getItem("token")!=null){
        this.webService.setAuthToken(localStorage.getItem("token"));
        return true;
      }
      if(sessionStorage.getItem("token")!=null){
        this.webService.setAuthToken(sessionStorage.getItem("token"));
        return true;
      }
    }else{
      this.router.navigate(['login']);
    }
  }
}
