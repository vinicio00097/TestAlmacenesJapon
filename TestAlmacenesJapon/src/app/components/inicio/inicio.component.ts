import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '../../../../node_modules/@angular/common/http';
import { MatDialog, MatSnackBar } from '../../../../node_modules/@angular/material';
import { MediaMatcher } from '../../../../node_modules/@angular/cdk/layout';
import { ClienteCredentialsService } from '../../cliente-credentials.service';
import * as FileSaver from 'file-saver';
import { Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  public mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  public isLoaded=false;

  constructor(private http:HttpClient,public dialog:MatDialog,
    public snackbar:MatSnackBar,changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,private webService:ClienteCredentialsService,
    public router:Router) { 

      this.mobileQuery = media.matchMedia('(max-width: 600px)');
      this._mobileQueryListener = () => changeDetectorRef.detectChanges();
      this.mobileQuery.addListener(this._mobileQueryListener);
    }

  ngOnInit() {
    
  }

}
