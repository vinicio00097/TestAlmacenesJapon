using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Data.Entity;
using TestAlmacenesJapon.DBEntityFW;
using TestAlmacenesJapon.Models;
using TestAlmacenesJapon.Utils;
using System.Diagnostics;

namespace TestAlmacenesJapon.Controllers
{

    public class EmpleadosController : ApiController
    {
        private TestAlmacenesJaponEntities dbAlmacen = new TestAlmacenesJaponEntities();

        // GET: api/Empleados
        public HttpResponseMessage Get()
        {
            if (this.Request.Headers.Authorization != null)
            {
                if (TokenManager.ValidateToken(this.Request.Headers.Authorization.Parameter))
                {
                    var hola = dbAlmacen.Empleados.Select(item => new
                    {
                        item.Id_Empleado,
                        item.Nombre,
                        item.DPI,
                        item.Cantidad_Hijos,
                        item.Salario_Base,
                        item.Fecha,
                        item.Bono_Decreto,
                        item.Fecha_Nacimiento,
                        item.Email,
                        item.Usuario
                    });

                    return Request.CreateResponse(HttpStatusCode.OK, new ReturnMessageJson(
                         "success",
                         "21",
                         hola,
                         "Empleados ready."
                     ));
                }
                else
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound, new ReturnMessageJson(
                         "fail",
                         "-1",
                         null,
                         "Not authorized."
                     ));
                }
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.NotFound, new ReturnMessageJson(
                    "fail",
                    "-1",
                    null,
                    "Not authorized."
                ));
            }
        }

        // GET: api/Empleados/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Empleados
        public HttpResponseMessage Post([FromBody]Empleados value)
        {
            if (value.Usuario != null && value.Contrasenia != null)
            {
                HashSalt hashSalt = Hasher.GenerateSaltedHash(32, value.Contrasenia);

                value.Contrasenia = hashSalt.Hash;
                value.Contrasenia_Salt = hashSalt.Salt;



                dbAlmacen.Empleados.Add(value);
                dbAlmacen.SaveChanges();

                value.Contrasenia = null;
                value.Contrasenia_Salt = null;
                return Request.CreateResponse(HttpStatusCode.OK, new ReturnMessageJson(
                    "success",
                    "11",
                    value,
                    "User saved succesfully."
                ));
            }
            else
            {
                value.Usuario = null;
                value.Contrasenia = null;

                dbAlmacen.Empleados.Add(value);
                dbAlmacen.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.OK, new ReturnMessageJson(
                    "success",
                    "11",
                    value,
                    "User saved succesfully."
                ));
            }
            
        }

        // PUT: api/Empleados/5
        public HttpResponseMessage Put(int id, [FromBody]Empleados value)
        {
            Empleados empleadoToModify = dbAlmacen.Empleados.Find(id);

            if (value.Contrasenia != null)
            {
                empleadoToModify.Nombre = value.Nombre;
                empleadoToModify.DPI = value.DPI;
                empleadoToModify.Cantidad_Hijos = value.Cantidad_Hijos;
                empleadoToModify.Salario_Base = value.Salario_Base;
                empleadoToModify.Fecha_Nacimiento = value.Fecha_Nacimiento;
                empleadoToModify.Bono_Decreto = value.Bono_Decreto;
                empleadoToModify.Email = value.Email;
                empleadoToModify.Usuario = value.Usuario;

                HashSalt hashSalt = Hasher.GenerateSaltedHash(32, value.Contrasenia);

                empleadoToModify.Contrasenia = hashSalt.Hash;
                empleadoToModify.Contrasenia_Salt = hashSalt.Salt;

                dbAlmacen.Entry(empleadoToModify).State = EntityState.Modified;
                dbAlmacen.SaveChanges();

                return Request.CreateResponse(HttpStatusCode.OK, new ReturnMessageJson(
                     "success",
                     "13",
                     empleadoToModify,
                     "User modified succesfully."
                 ));
            }
            else
            {
                empleadoToModify.Nombre = value.Nombre;
                empleadoToModify.DPI = value.DPI;
                empleadoToModify.Cantidad_Hijos = value.Cantidad_Hijos;
                empleadoToModify.Salario_Base = value.Salario_Base;
                empleadoToModify.Fecha_Nacimiento = value.Fecha_Nacimiento;
                empleadoToModify.Bono_Decreto = value.Bono_Decreto;
                empleadoToModify.Email = value.Email;
                empleadoToModify.Usuario = value.Usuario;

                dbAlmacen.Entry(empleadoToModify).State = EntityState.Modified;
                dbAlmacen.SaveChanges();

                return Request.CreateResponse(HttpStatusCode.OK, new ReturnMessageJson(
                     "success",
                     "13",
                     empleadoToModify,
                     "User modified succesfully."
                 ));
            }

        }

        // DELETE: api/Empleados/5
        public HttpResponseMessage Delete(int id)
        {
            Empleados empleado = dbAlmacen.Empleados.Find(id);

            dbAlmacen.Empleados.Remove(empleado);
            dbAlmacen.SaveChanges();

            return Request.CreateResponse(HttpStatusCode.OK, new ReturnMessageJson(
                "success",
                "12",
                null,
                "User deleted succesfully."
            ));
        }
    }
}
