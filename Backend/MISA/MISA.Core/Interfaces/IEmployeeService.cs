using MISA.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Core.Interfaces
{
    public interface IEmployeeService
    {
        int EmployeeInsertionValidation(Employee employee);
        int EmployeeUpdateiValidation(Employee employee);
        int EmployeeDeleteValidation(string employeeCode);

        //object ImportService(iFormFile excelFile);
    }
}
