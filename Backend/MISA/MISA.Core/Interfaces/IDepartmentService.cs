using MISA.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Core.Interfaces
{
    public interface IDepartmentService
    {
        int DepartmentInsertionValidation(Department Department);
        int DepartmentUpdateiValidation(Department Department);
        int DepartmentDeleteValidation(string DepartmentCode);
    }
}
