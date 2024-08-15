using MISA.Core.DTOs;
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
        ServiceResult EmployeeInsertionValidation(Employee employee);
        ServiceResult EmployeeUpdateiValidation(Employee employee);
        ServiceResult EmployeeDeleteValidation(string employeeCode);

        //object ImportService(iFormFile excelFile);
    }
}
