import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '../../../../node_modules/@angular/common/http';
import { MatDialog, MatSnackBar } from '../../../../node_modules/@angular/material';
import { MediaMatcher } from '../../../../node_modules/@angular/cdk/layout';
import { ClienteCredentialsService } from '../../cliente-credentials.service';
import { Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-palindromos',
  templateUrl: './palindromos.component.html',
  styleUrls: ['./palindromos.component.css']
})
export class PalindromosComponent implements OnInit {
  public mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  public isLoaded=false;
  Palindromo:String;
  palindromes=[];

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

  calcular(){
    this.palindromes=[];
    
    if(this.Palindromo.length>0){
      let words=this.Palindromo.split(new RegExp("[\\s]+"));

      for(let count=0;count<words.length;count++){
        let array=[];
        let newArray=[];
  
        for(let count2=0;count2<words[count].length;count2++){
          array.push(words[count][count2]);
        }

        if(array.reverse().join("")==words[count]){
          this.palindromes.push(words[count]);
        }
      }

      console.log(this.palindromes);
    }
  }

}
