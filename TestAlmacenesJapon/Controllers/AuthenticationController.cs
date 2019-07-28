using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using TestAlmacenesJapon.DBEntityFW;
using TestAlmacenesJapon.Models;
using TestAlmacenesJapon.Utils;

namespace TestAlmacenesJapon.Controllers
{
    public class AuthenticationController : ApiController
    {
        private DB_A4BC7A_test1Entities dbAlmacen = new DB_A4BC7A_test1Entities();

        // GET: api/Authentication
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Authentication/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Authentication
        public HttpResponseMessage Post([FromBody]UsuariosModel user)
        {
            Debug.WriteLine(this.Request.Headers);

            if (ModelState.IsValid)
            {
                List<Empleados> empleado = dbAlmacen.Empleados.Where((item) => item.Usuario == user.Usuario1).ToList();

                if (empleado.Count > 0)
                {
                    if(Hasher.VerifyPassword(user.Contrasenia1,empleado.First().Contrasenia.ToString(), empleado.First().Contrasenia_Salt))
                    {
                        return Request.CreateResponse(HttpStatusCode.OK,
                        new ReturnMessageJson(
                            "success",
                            "1",
                            TokenManager.GenerateToken(user.Usuario1),
                            "Logged succesfully."
                        ));
                    }
                    else
                    {
                        return Request.CreateResponse(HttpStatusCode.NotFound, new ReturnMessageJson(
                            "fail",
                            "0",
                            null,
                            "Unauthorized user."
                        ));
                    }
                }
                else
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound, new ReturnMessageJson(
                            "fail",
                            "0",
                            null,
                            "Unauthorized user."
                        ));
                }
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            

            
        }

        // PUT: api/Authentication/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Authentication/5
        public void Delete(int id)
        {
        }
    }
}
