import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClienteCredentialsService {

  private token=null;
  private range;
  private Nombres;
  private Foto;
  private Usuario;
  public URLLogin="http://localhost:51275/api/Authentication";
  public URLEmpleadosRead="http://localhost:51275/api/Empleados"
  public URLEmpleadosWrite="http://localhost:51275/api/Empleados"
  public URLRecovery="http://localhost:51275/api/PasswordRecovery/Request";
  public URLRecoveryVerify="http://localhost:51275/api/PasswordRecovery/";

  constructor() { }

  public getAuthToken():string{
    return this.token;
  }

  public setAuthToken(token:string){
    this.token=token;
  }

  public setNames(names:string){
    this.Nombres=names;
  }

  public getNames(){
    return this.Nombres;
  }

  public setFoto(foto:string){
    this.Foto=foto;
  }

  public getFoto(){
    return this.Foto;
  }

  public setUser(user:string){
    this.Usuario=user;
  }

  public getUser(){
    return this.Usuario;
  }

  public setRange(rango:string){
    this.range=rango;
  }

  public getRange(){
    return this.range;
  }
  public clearAuthToken(){
    this.token=null;
  }
  public getURLWebService(){
    return this.URLLogin;
  }
}
