import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '../../../../../../node_modules/@angular/material';
import { HttpClient } from '../../../../../../node_modules/@angular/common/http';
import { ClienteCredentialsService } from '../../../../cliente-credentials.service';

@Component({
  selector: 'app-modal-recovery',
  templateUrl: './modal-recovery.component.html',
  styleUrls: ['./modal-recovery.component.css']
})
export class ModalRecoveryComponent implements OnInit {

  title:String;
  Email;
  Fecha_Nacimiento;

  constructor(private dialogRef:MatDialogRef<ModalRecoveryComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private http:HttpClient,
    private webService:ClienteCredentialsService
  ) { }

  ngOnInit() {

  }

  onCancelClick(){
    this.dialogRef.close();
  }

  onDoClick(){
    this.dialogRef.close({
      confirmacion:true,
      Email:this.Email,
      Fecha_Nacimiento:this.Fecha_Nacimiento
    });
  }
}
