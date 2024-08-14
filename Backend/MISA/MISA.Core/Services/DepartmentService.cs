using MISA.Core.Entities;
using MISA.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace MISA.Core.Services
{
    public class DepartmentService : IDepartmentService
    {
        private IDepartmentRepository _departmentRepository;

        public DepartmentService(IDepartmentRepository DepartmentRepository)
        {
            _departmentRepository = DepartmentRepository;
        }

        public int DepartmentDeleteValidation(string DepartmentCode)
        {
            var isDuplidate = _departmentRepository.CheckDupDepartmentCode(DepartmentCode);
            if (!isDuplidate)
            {
                throw new Exception();
            }
            var result = _departmentRepository.Delete(DepartmentCode);
            return result;
        }

        public int DepartmentInsertionValidation(Department Department)
        {
            var isDuplidate = _departmentRepository.CheckDupDepartmentCode(Department.DepartmentCode);
            if (isDuplidate)
            {
                return 0;
            }

            var result = _departmentRepository.Insert(Department);
            return result;
        }

        public int DepartmentUpdateiValidation(Department Department)
        {
            var isDuplidate = _departmentRepository.CheckDupDepartmentCode(Department.DepartmentCode);
            if (!isDuplidate)
            {
                return 0;
            }

            var result = _departmentRepository.Update(Department);
            return result;
        }

    }
}
