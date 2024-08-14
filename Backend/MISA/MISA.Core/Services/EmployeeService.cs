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
using System.ComponentModel.DataAnnotations;
using System.Reflection.Metadata;
using System.Text.RegularExpressions;

namespace MISA.Core.Services
{
    public class EmployeeService : IEmployeeService
    {
        private IEmployeeRepository _employeeRepository;

        public EmployeeService(IEmployeeRepository employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }

        public int EmployeeDeleteValidation(string employeeCode)
        {
            var isDuplidate = _employeeRepository.CheckDupEmployeeCode(employeeCode);
            if (!isDuplidate)
            {
                throw new Exception();
            }
            var result = _employeeRepository.Delete(employeeCode);
            return result;
        }

        public int EmployeeInsertionValidation(Employee employee)
        {
            var isDuplidate = _employeeRepository.CheckDupEmployeeCode(employee.EmployeeCode);
            if (isDuplidate)
            {
                return 0;
            }
            if (!IsValidEmail(employee.Email))
            {
                return 0;          
            }
            var result = _employeeRepository.Insert(employee);
            return result;
        }

        public int EmployeeUpdateiValidation(Employee employee)
        {
            var isDuplidate = _employeeRepository.CheckDupEmployeeCode(employee.EmployeeCode);
            if (!isDuplidate)
            {
                return 0;
            }
            if (!IsValidEmail(employee.Email))
            {
                return 0;
            }
            var result = _employeeRepository.Update(employee);
            return result;
        }
        bool IsValidEmail(string email)
        {
            string regex = @"^[^@\s]+@[^@\s]+\.(com|net|org|gov)$";
            return Regex.IsMatch(email, regex, RegexOptions.IgnoreCase);
        }
    }
}
