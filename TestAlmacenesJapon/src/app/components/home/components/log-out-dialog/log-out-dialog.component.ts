import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '../../../../../../node_modules/@angular/material';

@Component({
  selector: 'app-log-out-dialog',
  templateUrl: './log-out-dialog.component.html',
  styleUrls: ['./log-out-dialog.component.css']
})
export class LogOutDialogComponent implements OnInit {

  constructor(private dialogRef:MatDialogRef<LogOutDialogComponent>,@Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
  }

  confirmacion(){
    this.dialogRef.close({
      confirmacion:true
    });
  }

}
