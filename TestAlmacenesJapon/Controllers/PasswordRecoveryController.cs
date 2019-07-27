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
    public class PasswordRecoveryController : ApiController
    {
        private TestAlmacenesJaponEntities dbAlmacen = new TestAlmacenesJaponEntities();

        // GET: api/PasswordRecovery
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/PasswordRecovery/5
        public HttpResponseMessage Get(String jwt)
        {
            if (TokenManager.ValidateToken(jwt))
            {
                return Request.CreateResponse(HttpStatusCode.OK,new ReturnMessageJson(
                        "success",
                        "41",
                        null,
                        "Valid token."
                    ));
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.NotFound, new ReturnMessageJson(
                        "fail",
                        "40",
                        null,
                        "Invalid token."
                    ));

            }
        }

        // POST: api/PasswordRecovery
        [Route("api/PasswordRecovery/Request")]
        public HttpResponseMessage Post([FromBody]RecoveryParams paramsR)
        {
            DateTime date = DateTime.Parse(paramsR.Fecha_Nacimiento1);

            List<Empleados> empleados= dbAlmacen.Empleados.Where((item) => item.Email == paramsR.Email1 && (DateTime.Compare(date,item.Fecha_Nacimiento)) ==0).ToList();

            if (empleados.Count > 0)
            {
                String token=TokenManager.GenerateToken(empleados.First().Usuario);
                Tokens_Recuperacion tokens_Recuperacion = new Tokens_Recuperacion();

                tokens_Recuperacion.Token = token;
                tokens_Recuperacion.Valido = true;
                dbAlmacen.Tokens_Recuperacion.Add(tokens_Recuperacion);
                dbAlmacen.SaveChanges();

                return Request.CreateResponse(HttpStatusCode.OK,EmailSender.sendEmail(paramsR.Email1,token));
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
        }

        [Route("api/PasswordRecovery/Validate")]
        public HttpResponseMessage Post([FromBody]string value2)
        {
            return Request.CreateResponse(HttpStatusCode.Unauthorized);
        }

        // PUT: api/PasswordRecovery/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/PasswordRecovery/5
        public void Delete(int id)
        {
        }
    }
}
