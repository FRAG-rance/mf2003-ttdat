using MISA.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Core.Interfaces
{
    internal interface IEmployeeRepository
    {
        List<Employee> GetAll();
        Employee Get(string id);
        int Insert(Employee employee);
        int Update(Employee employee);
        int Delete(Employee employee);
           
    }
}
