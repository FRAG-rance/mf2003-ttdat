using Microsoft.AspNetCore.Mvc;
using MISA.Core.Entities;
using MISA.Core.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MISA.Api.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {
        IDepartmentRepository _departmentRepository;
        IDepartmentService _departmentService;
        public DepartmentController(IDepartmentRepository departmentRepository, IDepartmentService departmentService)
        {
            _departmentRepository = departmentRepository;
            _departmentService = departmentService;
        }

        [HttpGet]
        public IActionResult GetDepartments()
        {
            try
            {
                var data = _departmentRepository.GetAll();
                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{code}")]
        public IActionResult GetDepartment(string code)
        {
            try
            {
                var data = _departmentRepository.Get(code);
                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public IActionResult CreateDepartment(Department Department)
        {
            try
            {
                var data = _departmentService.DepartmentInsertionValidation(Department);
                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{Department.DepartmentCode}")]
        public IActionResult UpdateDepartment(Department Department)
        {
            try
            {
                var data = _departmentService.DepartmentUpdateiValidation(Department);
                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{code}")]
        public IActionResult DeleteDepartment(string code)
        {
            try
            {
                var data = _departmentService.DepartmentDeleteValidation(code);
                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
