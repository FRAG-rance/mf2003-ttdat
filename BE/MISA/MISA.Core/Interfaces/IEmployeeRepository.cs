using MISA.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Core.Interfaces
{
    public interface IEmployeeRepository
    {
        IEnumerable<Employee> GetAll();
        IEnumerable<Employee> Get(string employeeCode);
        int Insert(Employee employee);
        int Update(Employee employee);
        int Delete(string employeeCode);
        bool CheckDupEmployeeCode(string employeeCode);
    }
}
