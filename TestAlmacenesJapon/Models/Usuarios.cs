using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace TestAlmacenesJapon.Models
{
    public class UsuariosModel
    {
        private String Usuario;
        private String Contrasenia;

        [Required]
        public string Usuario1 { get { return Usuario; } set { Usuario = value; } }

        [Required]
        public string Contrasenia1 { get { return Contrasenia; } set { Contrasenia = value; } }
    }
}