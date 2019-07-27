import { Component, OnInit } from '@angular/core';
import { Router } from '../../../../node_modules/@angular/router';
import { HttpClient, HttpHeaders } from '../../../../node_modules/@angular/common/http';
import { ClienteCredentialsService } from '../../cliente-credentials.service';
import { MatSnackBar, MatDialog } from '../../../../node_modules/@angular/material';
import { DecoderJWT } from '../../utils/DecoderJWT';
import { ModalRecoveryComponent } from './components/modal-recovery/modal-recovery.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide=true;
  Usuario;
  Contrasenia;
  Recordar;
  isLoading=false;

  Fecha_Nacimiento;

  constructor(private router:Router,private http:HttpClient,
    private webService:ClienteCredentialsService,
    private snackbar:MatSnackBar,
    public dialog:MatDialog
  ) { }

  ngOnInit() {
    if(localStorage.getItem("token")!=null){
      this.router.navigate(['home/Inicio']);
    }
  }

  login(){
    if(RegExp("^[\\s]*$").exec(this.Usuario)||this.Usuario==null){
      this.snackbar.open("El campo Usuario es obligatorio.","",{
        panelClass:['error_snackbar'],
        duration:3000
      });
      return;
    }
    if(RegExp("^[\\s]*$").exec(this.Contrasenia)||this.Contrasenia==null){
      this.snackbar.open("El campo Contraseña es obligatorio.","",{
        panelClass:['error_snackbar'],
        duration:3000
      });
      return;
    }

    this.isLoading=true;
    let user={
      Usuario1:this.Usuario,
      Contrasenia1:this.Contrasenia
    };

    this.http.post(this.webService.URLLogin,user,{
      headers: new HttpHeaders().set('Content-Type','application/json')
    }).subscribe((response)=>{
      var confirmacion=Object(response);
    
      if(confirmacion["code"]==1){
        var userClaims=DecoderJWT.decodeToken(confirmacion["data"]);

        if(this.Recordar==undefined||!this.Recordar){
          this.webService.setAuthToken(confirmacion["data"]);
          this.webService.setUser(userClaims["unique_name"]);
          sessionStorage.setItem("token",this.webService.getAuthToken());
        }else{
          this.webService.setAuthToken(confirmacion["data"]);
          this.webService.setUser(userClaims["unique_name"]);
          localStorage.setItem("token",this.webService.getAuthToken());
        }

        this.router.navigate(["home/Inicio"]);
      }

      this.isLoading=false;
    },(error)=>{
      if(error["error"]!=null){
        if(error["error"]["code"]!=null){
          if(error["error"]["code"]==0){
            this.snackbar.open("Usuario o contraseña incorrectos.","",{
              panelClass:['error_snackbar'],
              duration:3000
            });
          }
        }
      }

      this.isLoading=false;
    });
  }

  onRecovery(){
    const dialogRef = this.dialog.open(ModalRecoveryComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result!=null){
        if(result){

          console.log(result);
          var paramrecovery={
            Email1:result.Email,
            Fecha_Nacimiento1:result.Fecha_Nacimiento
          }
          this.http.post(this.webService.URLRecovery,paramrecovery,{
            headers: new HttpHeaders().set('Content-Type','application/json')
          }).subscribe((response)=>{
            var confirmacion=Object(response);
          
            if(confirmacion["code"]==1){
              var userClaims=DecoderJWT.decodeToken(confirmacion["data"]);
      
              if(this.Recordar==undefined||!this.Recordar){
                this.webService.setAuthToken(confirmacion["data"]);
                this.webService.setUser(userClaims["unique_name"]);
                sessionStorage.setItem("token",this.webService.getAuthToken());
              }else{
                this.webService.setAuthToken(confirmacion["data"]);
                this.webService.setUser(userClaims["unique_name"]);
                localStorage.setItem("token",this.webService.getAuthToken());
              }
      
              this.router.navigate(["home/Inicio"]);
            }
      
            this.isLoading=false;
          },(error)=>{
            if(error["error"]!=null){
              if(error["error"]["code"]!=null){
                if(error["error"]["code"]==0){
                  this.snackbar.open("Email o fecha de nacimiento incorrectos.","",{
                    panelClass:['error_snackbar'],
                    duration:3000
                  });
                }
              }
            }
      
            this.isLoading=false;
          });
        }
      }
    });
  }

}
