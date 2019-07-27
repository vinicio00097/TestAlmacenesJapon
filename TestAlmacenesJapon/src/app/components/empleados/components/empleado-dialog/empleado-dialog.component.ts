import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '../../../../../../node_modules/@angular/material';
@Component({
  selector: 'app-empleado-dialog',
  templateUrl: './empleado-dialog.component.html',
  styleUrls: ['./empleado-dialog.component.css']
})
export class EmpleadoDialogComponent implements OnInit {

  Nombre;
  DPI;
  Cantidad_Hijos;
  Salario_Base;
  Fecha_Nacimiento;
  Fecha;
  Bono_Decreto;
  Email;
  Usuario;
  Contrasenia;

  Iggs;
  Irtra;
  Bono_Paternidad;
  Salario_Total;
  Salario_Liquido


  action;
  title;
  amount=[0,1,2,3,4,5,6,7,8,9,10]

  constructor(private dialogRef:MatDialogRef<EmpleadoDialogComponent>,@Inject(MAT_DIALOG_DATA) public data) {
    this.action=data.usage;
    this.title="Nuevo empleado";
    if(this.action=="edit"){
      this.title="Edicion de empleado";
      this.Nombre=data.empleado.Nombre;
      this.DPI=data.empleado.DPI;
      this.Cantidad_Hijos=data.empleado.Cantidad_Hijos;
      this.Salario_Base=data.empleado.Salario_Base;
      this.Fecha_Nacimiento=data.empleado.Fecha_Nacimiento;
      this.Fecha=data.empleado.Fecha;
      this.Bono_Decreto=data.empleado.Bono_Decreto;
      this.Email=data.empleado.Email;
      this.Usuario=data.empleado.Usuario;
      this.Contrasenia=data.empleado.Contrasenia;
    }
    if(this.action=="see"){
      this.title="Detalles de empleado";
      this.Nombre=data.empleado.Nombre;
      this.DPI=data.empleado.DPI;
      this.Cantidad_Hijos=data.empleado.Cantidad_Hijos;
      this.Salario_Base=data.empleado.Salario_Base;
      this.Fecha_Nacimiento=data.empleado.Fecha_Nacimiento;
      this.Fecha=data.empleado.Fecha;
      this.Bono_Decreto=data.empleado.Bono_Decreto;
      this.Email=data.empleado.Email;
      this.Usuario=data.empleado.Usuario;
      this.Contrasenia=data.empleado.Contrasenia;
    }
    if(this.action=="delete"){
      this.title="Eliminacion";
      this.Nombre=data.Nombre;
    }
  }

  ngOnInit() {
    this.Iggs=this.Salario_Base*0.0483;
    this.Irtra=this.Salario_Base*0.01;
    this.Bono_Paternidad=133*this.Cantidad_Hijos;
    this.Salario_Total=this.Salario_Base+this.Bono_Paternidad+this.Bono_Decreto;
    this.Salario_Liquido=this.Salario_Total-this.Iggs-this.Irtra;
  }

  onNoClick(){
    this.dialogRef.close();
  }

  getNumHijos(event){
    this.Cantidad_Hijos=event.value;
  }

  save(){
    var Fecha_Date=new Date(this.Fecha_Nacimiento);
    let fecha_ready=Fecha_Date.getDate()+"/"+(Fecha_Date.getMonth()+1)+"/"+Fecha_Date.getFullYear();
    this.dialogRef.close({
      Nombre:this.Nombre,
      DPI:this.DPI,
      Cantidad_Hijos:this.Cantidad_Hijos,
      Salario_Base:this.Salario_Base,
      Fecha_Nacimiento:fecha_ready,
      Fecha:this.Fecha,
      Bono_Decreto:this.Bono_Decreto,
      Email:this.Email,
      Usuario:this.Usuario,
      Contrasenia:this.Contrasenia
    });
  }

  getRandomCredentials(){
    this.Usuario=window.crypto.getRandomValues(new Uint16Array(1))[0];
    this.Contrasenia=window.crypto.getRandomValues(new Uint16Array(1))[0];
  }
  delete(){
    this.dialogRef.close({
      confirmacion:true
    });
  }

}
