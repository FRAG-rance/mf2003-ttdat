using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Core.Exceptions
{
    public class ValidationExp : Exception
    {
        string? MsgError = null;
        public ValidationExp(string msg)
        {
            this.MsgError = msg;
        }

        public override string Message
        {
            get
            {
                return MsgError;
            }
        }
    }
}
