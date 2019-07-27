
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TestAlmacenesJapon.Utils
{
    public class ReturnMessageJson
    {
        private String Status;
        private String Code;
        private Object Data;
        private String Message;

        public ReturnMessageJson(string status, string code, Object data, string message)
        {
            this.Status = status;
            this.Code = code;
            this.Data = data;
            this.Message = message;
        }

        public string status { get { return Status; } set { Status = value; } }
        public string code { get { return Code; } set { Code = value; } }
        public Object data { get { return Data; } set { Data = value; } }
        public string message { get { return Message; } set { Message = value; } }
    }
}