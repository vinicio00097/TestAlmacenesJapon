using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TestAlmacenesJapon.Models
{
    public class EmpleadoCredentials
    {
        private String Nombre;
        private String DPI;
        private String Cantidad_Hijos;
        private String Salario_Base;
        private String Fecha;
        private String Bono_Decreto;
        private String Email;
        private String Fecha_Nacimiento;
        private UsuariosModel Credenciales;

        public string Nombre1 { get { return Nombre; } set { Nombre = value; } }
        public string DPI1 { get { return DPI; } set { DPI = value; } }
        public string Cantidad_Hijos1 { get { return Cantidad_Hijos; } set { Cantidad_Hijos = value; } }
        public string Salario_Base1 { get { return Salario_Base; } set { Salario_Base = value; } }
        public string Fecha1 { get { return Fecha; } set { Fecha = value; } }
        public string Bono_Decreto1 { get { return Bono_Decreto; } set { Bono_Decreto = value; } }
        public UsuariosModel Credenciales1 { get { return Credenciales; } set { Credenciales = value; } }

        public string Email1 { get { return Email; } set { Email = value; } }
        public string Fecha_Nacimiento1 { get { return Fecha_Nacimiento; } set { Fecha_Nacimiento = value; } }
    }
}