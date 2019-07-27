import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '../../../../node_modules/@angular/common/http';
import { MatDialog, MatSnackBar, MatTable } from '../../../../node_modules/@angular/material';
import { MediaMatcher } from '../../../../node_modules/@angular/cdk/layout';
import { ClienteCredentialsService } from '../../cliente-credentials.service';
import { Router, ActivatedRoute } from '../../../../node_modules/@angular/router';
import { EmpleadoDialogComponent } from './components/empleado-dialog/empleado-dialog.component';
@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {

  public mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  public isLoaded=false;
  empleadosData=[];
  displayedColumns: string[] = ['Nombre', 'DPI','Cantidad_Hijos','Email',
  'Bono_Decreto','Salario_Base','Usuario','Fecha','Fecha_Nacimiento','Accion'];

  @ViewChild('empleadosTable') table: MatTable<any>;

  constructor(private http:HttpClient,public dialog:MatDialog,
    public snackbar:MatSnackBar,changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,private webService:ClienteCredentialsService,
    public router:Router) { 

      this.mobileQuery = media.matchMedia('(max-width: 600px)');
      this._mobileQueryListener = () => changeDetectorRef.detectChanges();
      this.mobileQuery.addListener(this._mobileQueryListener);
    }

  ngOnInit() {
    this.getEmpleados();
  }

  getEmpleados(){
    this.http.get(this.webService.URLEmpleadosRead,{
      headers: new HttpHeaders().set('Content-Type','application/json')
      .set('Authorization','AUTH_TOKEN '+this.webService.getAuthToken())
    }).subscribe((response)=>{
      console.log(response);
      if(response["code"]==21){
        this.empleadosData=response["data"]
      }
    },(error)=>{
      localStorage.clear();
      sessionStorage.clear();
      this.router.navigate(['login']);
    });
  }

  agregar(){
    const dialogRef = this.dialog.open(EmpleadoDialogComponent, {
      width: '300px',
      height: '500px',
      data: {
        usage:"add"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result!=null){
        this.http.post(this.webService.URLEmpleadosWrite,result,{
          headers: new HttpHeaders().set('Content-Type','application/json')
          .set('Authorization','AUTH_TOKEN '+this.webService.getAuthToken())
        }).subscribe((response)=>{
          console.log(response);
          if(response["code"]==11){
            result["Id_Empleado"]=response["data"]["Id_Empleado"];
            this.empleadosData.push(result);

            this.table.renderRows();
          }
        },(error)=>{
          localStorage.clear();
          sessionStorage.clear();
          this.router.navigate(['login']);
        });
      }
    });
  }

  eliminar(empleado){
    const dialogRef=this.dialog.open(EmpleadoDialogComponent,{
      width:'250px',
      data:{
        usage:"delete",
        Nombre:empleado.Nombre
      }
    });

    dialogRef.afterClosed().subscribe(result=>{
      if(result!=null){
        if(result.confirmacion){
          this.http.delete(this.webService.URLEmpleadosWrite+"/"+empleado.Id_Empleado,{
            headers: new HttpHeaders().set('Content-Type','application/json')
            .set('Authorization','AUTH_TOKEN '+this.webService.getAuthToken())
          }).subscribe((response)=>{
            console.log(response);
            if(response["code"]==12){
              var index=this.empleadosData.indexOf(empleado);
              this.empleadosData.splice(index,1);
      
              this.table.renderRows();
            }
          },(error)=>{
            localStorage.clear();
            sessionStorage.clear();
            this.router.navigate(['login']);
          });
        }
      }
    });

    
  }

  ver(empleado){
    const dialogRef = this.dialog.open(EmpleadoDialogComponent, {
      width: '300px',
      height: '500px',
      data: {
        usage:"see",
        empleado:empleado,
      }
    });
  }

  editar(empleado){
    const dialogRef = this.dialog.open(EmpleadoDialogComponent, {
      width: '300px',
      height: '500px',
      data: {
        usage:"edit",
        empleado:empleado,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result!=null){
        result.Id_Empleado=empleado.Id_Empleado;
        console.log(result);
        
        this.http.put(this.webService.URLEmpleadosWrite+"/"+empleado.Id_Empleado,result,{
          headers: new HttpHeaders().set('Content-Type','application/json')
          .set('Authorization','AUTH_TOKEN '+this.webService.getAuthToken())
        }).subscribe((response)=>{
          if(response["code"]==13){
            empleado.Nombre=result.Nombre;
            empleado.DPI=result.DPI;
            empleado.Cantidad_Hijos=result.Cantidad_Hijos;
            empleado.Fecha_Nacimiento=result.Fecha_Nacimiento;
            empleado.Sueldo_Base=result.Sueldo_Base;
            empleado.Bono_Decreto=result.Bono_Decreto;
            empleado.Usuario=result.Usuario;
            this.snackbar.open("Empleado \""+result.Nombre+"\" editado.","",{
              duration:3000,
              panelClass:["exito_snackbar"]
            });
          }
        },(error)=>{
          localStorage.clear();
          sessionStorage.clear();
          this.router.navigate(['login']);
        });
      }
    });
  }
}
