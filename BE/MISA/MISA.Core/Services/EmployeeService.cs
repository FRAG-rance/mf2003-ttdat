using MISA.Core.Entities;
using MISA.Core.Interfaces;
using MISA.Core.DTOs;
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

        public ServiceResult EmployeeDeleteValidation(string employeeCode)
        {
            var isDuplidate = _employeeRepository.CheckDupEmployeeCode(employeeCode);
            if (!isDuplidate)
            {
                return new ServiceResult { Success = false };
            }
            var result = _employeeRepository.Delete(employeeCode);
            return new ServiceResult
            {
                Success = true,
                Data = result
            };
            
        }

        public ServiceResult EmployeeInsertionValidation(Employee employee)
        {
            var isDuplidate = _employeeRepository.CheckDupEmployeeCode(employee.EmployeeCode);
            if (isDuplidate)
            {
                return new ServiceResult { Success = false };
            }
            if (!IsValidEmail(employee.Email))
            {
                return new ServiceResult { Success = false };
            }
            var result = _employeeRepository.Insert(employee);
            return new ServiceResult
            {
                Success = true,
                Data = result
            };
        }

        public ServiceResult EmployeeUpdateiValidation(Employee employee)
        {
            var isDuplidate = _employeeRepository.CheckDupEmployeeCode(employee.EmployeeCode);
            if (!isDuplidate)
            {
                return new ServiceResult { Success = false };
            }
            if (!IsValidEmail(employee.Email))
            {
                return new ServiceResult { Success = false };
            }
            var result = _employeeRepository.Update(employee);
            return new ServiceResult
            {
                Success = true,
                Data = result
            };
        }
        bool IsValidEmail(string email)
        {
            string regex = @"^[^@\s]+@[^@\s]+\.(com|net|org|gov)$";
            return Regex.IsMatch(email, regex, RegexOptions.IgnoreCase);
        }
    }
}
