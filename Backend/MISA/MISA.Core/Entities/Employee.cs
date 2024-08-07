using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Core.Entities
{
    public class Employee
    {
        public string EmployeeId { get; set; }

        public string FullName { get; set; }

        public string Email { get; set; }

        public string PhoneNumber { get; set; }

        public string EmployeeSocials { get; set; }

        public DateTime? EmployeeSDate { get; set; }

        public DateTime? EmployeeBirthdate { get; set; }
    }
}
