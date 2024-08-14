using MISA.Core.Entities;
using MISA.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using static Dapper.SqlMapper;
using System.Diagnostics;

namespace MISA.Core.Services
{
    public class EmployeeService : IEmployeeService
    {
        private IEmployeeRepository _employeeRepository;

        public EmployeeService(IEmployeeRepository employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }
        public int InsertionValidation(Employee employee)
        {
            throw new NotImplementedException();
        }

        public int SearchValidation(Employee employee)
        {
            throw new NotImplementedException();
        }

        public int UpdateionValidation(Employee employee)
        {
            throw new NotImplementedException();
        }
        /*
        public int CheckNull(Employee employee) {
            {
                if (employee == null)
                    return 1;

                var properties = typeof(Employee).GetProperties();
                var propNotEmpty = properties.Where(p => Attribute.);

                foreach (PropertyInfo props in propNotEmpty)
                {
                    Debug.WriteLine(props.Name);
                    // Skip properties that are allowed to be                     
                }
                return 0;
            }
        }
        */
    }
}
