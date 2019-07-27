import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '../../../../node_modules/@angular/cdk/layout';
import { Router } from '../../../../node_modules/@angular/router';
import { ClienteCredentialsService } from '../../cliente-credentials.service';
import { MatDialog, MatSnackBar } from '../../../../node_modules/@angular/material';
import { LogOutDialogComponent } from './components/log-out-dialog/log-out-dialog.component';
import { HttpClient, HttpHeaders } from '../../../../node_modules/@angular/common/http';
import { DecoderJWT } from '../../utils/DecoderJWT';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  mobileQuery: MediaQueryList;

  fillerNav = [
    {icon:"home",fragment:"Inicio",title:"Inicio",level:2},
    {icon:"people",fragment:"Empleados",title:"Empleados",level:2},
    {icon:"speaker_notes",fragment:"Palindromos",title:"Palíndromos",level:2},
  ];
  title;
  Usuario;
  Nombres;
  Foto;

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
  public router:Router,private webService:ClienteCredentialsService,
  public dialog:MatDialog,private http:HttpClient,public snackbar:MatSnackBar
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.router.url.split("/")[2].toUpperCase();
  }

  selectOptionMobile(snav,title){
    snav.toggle();
    this.title=title;
  }

  selectOptionDesktop(title){
    this.title=title;
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngOnInit(): void{
    var userClaims=DecoderJWT.decodeToken(this.webService.getAuthToken());
    this.Usuario=userClaims["unique_name"];
  }

  logOut(snav){
    if(snav!=null){
      snav.toggle();
    }
    const dialogRef=this.dialog.open(LogOutDialogComponent,{
      width:'300px',
    });

    dialogRef.afterClosed().subscribe(result=>{
      if(result!=null){
        if(result.confirmacion){
          localStorage.clear();
          sessionStorage.clear();
          this.router.navigate(['login']);
        }
      }
    });
  }

}
