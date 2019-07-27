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

  isVerified=false;

  constructor(private router:Router,private http:HttpClient,
    private webService:ClienteCredentialsService,
    private snackbar:MatSnackBar,
    public dialog:MatDialog,
  public route:ActivatedRoute) { }

  ngOnInit() {

  }

  verifyJWT(){
    this.http.get(this.webService.URLRecoveryVerify+this.route.snapshot.queryParamMap.get("identificator"),{
      headers: new HttpHeaders().set('Content-Type','application/json')
    }).subscribe((response)=>{
      this.isVerified=true;
      console.log(response);
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
    });
  }

}
