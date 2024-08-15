using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Dapper;
using MySqlConnector;
using MISA.Core.Entities;
using System.Data;
using MISA.Core.Interfaces;
using MISA.Core.Services;
using Misa.Infrastructure.Repository;

namespace MISA.Api.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        IEmployeeRepository _employeeRepository;
        IEmployeeService _employeeService;
        public EmployeesController(IEmployeeRepository employeeRepository, IEmployeeService employeeService)
        {
            _employeeRepository = employeeRepository;
            _employeeService = employeeService;
        }

        [HttpGet]
        public IActionResult GetEmployees()
        {
            try
            {
                var data = _employeeRepository.GetAll();
                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        
        [HttpGet("{code}")]
        public IActionResult GetEmployee(string code)
        {
            try
            {
                var data = _employeeRepository.Get(code);
                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        
        [HttpPost]
        public IActionResult CreateEmployee(Employee employee)
        {
            try
            {
                var data = _employeeService.EmployeeInsertionValidation(employee);
                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        
        [HttpPut("{employee.EmployeeCode}")]
        public IActionResult UpdateEmployee(Employee employee)
        {
            try
            {
                var data = _employeeService.EmployeeUpdateiValidation(employee);
                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{code}")]
        public IActionResult DeleteEmployee(string code)
        {
            try
            {
                var data = _employeeService.EmployeeDeleteValidation(code);
                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        
    }
}
