using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Web.Http;
using TestAlmacenesJapon.DBEntityFW;
using TestAlmacenesJapon.Models;
using TestAlmacenesJapon.Utils;

namespace TestAlmacenesJapon.Controllers
{
    public class PasswordRecoveryController : ApiController
    {
        private DB_A4BC7A_test1Entities dbAlmacen = new DB_A4BC7A_test1Entities();

        // GET: api/PasswordRecovery
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
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
                return Request.CreateResponse(HttpStatusCode.NotFound,new ReturnMessageJson(
                    "fail",
                    "0",
                    null,
                    "Email or born date wrong."));
            }
        }

        [Route("api/PasswordRecovery/Change")]
        public HttpResponseMessage Post([FromBody]RequestChange paramsC)
        {
            Tokens_Recuperacion verify = dbAlmacen.Tokens_Recuperacion.Find(paramsC.JWT1);


            if (TokenManager.ValidateToken(paramsC.JWT1)&&verify!=null)
            {
                if (verify.Valido)
                {
                    String username = TokenManager.getUsername(paramsC.JWT1);
                    Empleados empleado = dbAlmacen.Empleados.Where((item) => item.Usuario == username).FirstOrDefault();

                    if (empleado != null)
                    {
                        HashSalt hashSalt = Hasher.GenerateSaltedHash(32, paramsC.Contrasenia1);

                        empleado.Contrasenia = hashSalt.Hash;
                        empleado.Contrasenia_Salt = hashSalt.Salt;

                        dbAlmacen.Entry(empleado).State = EntityState.Modified;
                        dbAlmacen.SaveChanges();

                        Tokens_Recuperacion tokens_Recuperacion = dbAlmacen.Tokens_Recuperacion.Find(paramsC.JWT1);
                        dbAlmacen.Tokens_Recuperacion.Remove(tokens_Recuperacion);
                        dbAlmacen.SaveChanges();

                        return Request.CreateResponse(HttpStatusCode.OK, new ReturnMessageJson(
                            "success",
                            "41",
                            null,
                            "Password changed."
                        ));
                    }
                    else
                    {
                        return Request.CreateResponse(HttpStatusCode.OK, new ReturnMessageJson(
                            "fail",
                            "45",
                            null,
                            "Has occurred un error."
                        ));
                    }
                }
                else
                {
                    return Request.CreateResponse(HttpStatusCode.OK, new ReturnMessageJson(
                        "fail",
                        "40",
                        null,
                        "Invalid token."
                    ));
                }
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
