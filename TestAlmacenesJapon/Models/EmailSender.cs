using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Web;
using TestAlmacenesJapon.DBEntityFW;

namespace TestAlmacenesJapon.Models
{
    public class EmailSender
    {

        public static bool sendEmail(String email,String token)
        {
            try
            {
                MailMessage mail = new MailMessage();
                SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com");

                mail.From = new MailAddress("chefbooking2019@gmail.com");
                mail.To.Add(email);
                mail.Subject = "Recovery request";

                StringBuilder body = new StringBuilder();

                body.Append("Este es un correo para la recuperacion de contraseña, por favor haga click en el siguiente enlace...");
                body.AppendLine("http://localhost:51275/#/recovery?identificator="+token);
                

                mail.Body = body.ToString();

                SmtpServer.Port = 587;
                SmtpServer.Credentials = new System.Net.NetworkCredential("chefbooking2019@gmail.com", "consoladordodo");
                SmtpServer.EnableSsl = true;

                mail.DeliveryNotificationOptions = DeliveryNotificationOptions.OnFailure;
                SmtpServer.Send(mail);

                return true;

            }
            catch (Exception e)
            {
                return false;
            }
        }
    }
}