using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Core.DTOs
{
    public class ServiceResult
    {
        public bool Success { get; set; }
        public object Data { get; set; }
    }
}
