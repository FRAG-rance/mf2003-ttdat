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
        int InsertionValidation(Employee employee);

        int UpdateionValidation(Employee employee);

        int SearchValidation(Employee employee);

        //object ImportService(iFormFile excelFile);
    }
}
