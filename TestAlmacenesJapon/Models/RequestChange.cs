using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TestAlmacenesJapon.Models
{
    public class RequestChange
    {
        private String JWT;
        private String Contrasenia;

        public string JWT1 { get { return JWT; } set { JWT = value; } }
        public string Contrasenia1 { get { return Contrasenia; } set { Contrasenia = value; } }
    }
}