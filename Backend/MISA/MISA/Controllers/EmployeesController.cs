using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Dapper;
using MySqlConnector;
using MISA.Core.Entities;
using System.Data;
using MISA.Core.Interfaces;
using MISA.Core.Exceptions;
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
                return StatusCode(200,data);
            }
            catch (ValidationExp ex)
            {
                var response = new
                {
                    DevMsg = ex.Message,
                    userMsg = ex.Message,
                    data = ex.Data,
                };
                return BadRequest(response);
            }
            catch (Exception ex)
            {
                var response = new
                {
                    DevMsg = ex.Message,
                    data = ex.InnerException,
                };
                return StatusCode(500, response);
            }
        }
        
        [HttpGet("{code}")]
        public IActionResult GetEmployee(string code)
        {
            try
            {
                var data = _employeeRepository.Get(code);
                return StatusCode(200, data);
            }
            catch (ValidationExp ex)
            {
                var response = new
                {
                    DevMsg = ex.Message,
                    userMsg = ex.Message,
                    data = ex.Data,
                };
                return BadRequest(response);
            }
            catch (Exception ex)
            {
                var response = new
                {
                    DevMsg = ex.Message,
                    data = ex.InnerException,
                };
                return StatusCode(500, response);
            }
        }
        
        [HttpPost]
        public IActionResult CreateEmployee(Employee employee)
        {
            try
            {
                var data = _employeeService.EmployeeInsertionValidation(employee);
                if (data.Success == true)
                {
                    return StatusCode(200, data);
                }
                else
                {
                    return StatusCode(400, data);
                }
            }
            catch (ValidationExp ex)
            {
                var response = new
                {
                    DevMsg = ex.Message,
                    userMsg = ex.Message,
                    data = ex.Data,
                };
                return BadRequest(response);
            }
            catch (Exception ex)
            {
                var response = new
                {
                    DevMsg = ex.Message,
                    data = ex.InnerException,
                };
                return StatusCode(500, response);
            }


        }
        
        [HttpPut("{employee.EmployeeCode}")]
        public IActionResult UpdateEmployee(Employee employee)
        {
            try
            {
                var data = _employeeService.EmployeeUpdateiValidation(employee);
                if (data.Success == true)
                {
                    return StatusCode(200, data);
                }
                else
                {
                    return StatusCode(400, data);
                }
            }
            catch (ValidationExp ex)
            {
                var response = new
                {
                    DevMsg = ex.Message,
                    userMsg = ex.Message,
                    data = ex.Data,
                };
                return BadRequest(response);
            }
            catch (Exception ex)
            {
                var response = new
                {
                    DevMsg = ex.Message,
                    data = ex.InnerException,
                };
                return StatusCode(500, response);
            }
        }

        [HttpDelete("{code}")]
        public IActionResult DeleteEmployee(string code)
        {
            try
            {
                var data = _employeeService.EmployeeDeleteValidation(code);
                if (data.Success == true)
                {
                    return StatusCode(200, data);
                }
                else
                {
                    return StatusCode(400, data);
                };
            }
            catch (ValidationExp ex)
            {
                var response = new
                {
                    DevMsg = ex.Message,
                    userMsg = ex.Message,
                    data = ex.Data,
                };
                return BadRequest(response);
            }
            catch (Exception ex)
            {
                var response = new
                {
                    DevMsg = ex.Message,
                    data = ex.InnerException,
                };
                return StatusCode(500, response);
            }
        }
        
    }
}
