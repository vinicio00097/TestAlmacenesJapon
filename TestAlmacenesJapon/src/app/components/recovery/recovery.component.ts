import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '../../../../node_modules/@angular/router';
import { HttpClient, HttpHeaders } from '../../../../node_modules/@angular/common/http';
import { ClienteCredentialsService } from '../../cliente-credentials.service';
import { MatSnackBar, MatDialog } from '../../../../node_modules/@angular/material';
import { DecoderJWT } from '../../utils/DecoderJWT';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.css']
})
export class RecoveryComponent implements OnInit {

  constructor(private router:Router,private http:HttpClient,
    private webService:ClienteCredentialsService,
    private snackbar:MatSnackBar,
    public dialog:MatDialog,
  public route:ActivatedRoute) { }

  JWT:String;
  Contrasenia1:String;
  Contrasenia2:String;
  hide1=true;
  hide2=true;
  isLoading=false;

  ngOnInit() {
    this.JWT=this.route.snapshot.queryParamMap.get("identificator");
  }

  restaurar(){

    if(!RegExp("^[\\s]$").test(this.Contrasenia1.toString())&&!RegExp("^[\\s]$").test(this.Contrasenia2.toString())){
      if(this.Contrasenia1==this.Contrasenia2){
        var changeParams={
          JWT1:this.JWT,
          Contrasenia1:this.Contrasenia1
        };
    
        this.isLoading=true;
        
        this.http.post(this.webService.URLRecoveryChange,changeParams,{
          headers: new HttpHeaders().set('Content-Type','application/json')
        }).subscribe((response)=>{
          console.log(response);
          if(response["code"]==41){
            this.snackbar.open("Contraseña restaurada.","",{
              duration:3000,
              panelClass:["exito_snackbar"]
            });
          }

          this.isLoading=false;
        },(error)=>{
          if(error["error"]!=null){
            if(error["error"]["code"]!=null){
              if(error["error"]["code"]==0){
                this.snackbar.open("Token invalido.","",{
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
  }

}
