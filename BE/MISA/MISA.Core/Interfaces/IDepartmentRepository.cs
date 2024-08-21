using MISA.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Core.Interfaces
{
    public interface IDepartmentRepository
    {
        IEnumerable<Department> GetAll();
        Department Get(string DepartmentCode);
        int Insert(Department Department);
        int Update(Department Department);
        int Delete(string DepartmentCode);
        bool CheckDupDepartmentCode(string DepartmentCode);
    }
}
