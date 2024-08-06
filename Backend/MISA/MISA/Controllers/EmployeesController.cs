using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Dapper;
using MySqlConnector;
using MISA.Entities;
using System.Data;

namespace MISA.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly string connectionString;
        public EmployeesController(IConfiguration configuration)
        {
            connectionString = configuration.GetConnectionString("MariaDbConnection");
        }

        [HttpGet]
        public async Task<ActionResult<Employee>> GetEmployees()
        {
            
            var connection = new MySqlConnection(connectionString);
            var sql = "SELECT * FROM employee";
            var employees = await connection.QueryAsync<Employee>(sql);
            return StatusCode(200, employees);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Employee>> GetEmployee(string id)
        {
            var connection = new MySqlConnection(connectionString);
            var sql = "SELECT * FROM employee WHERE EmployeeId = @Id";
            var employee = await connection.QueryFirstOrDefaultAsync<Employee>(sql, new { Id = id });
            if (employee == null)
            {
                return StatusCode(204);
            }
            return StatusCode(200, employee);
        }

        [HttpPost]
        public async Task<ActionResult<Employee>> CreateEmployee(Employee employee)
        {
            var connection = new MySqlConnection(connectionString);
            var sql = @"INSERT INTO employee (EmployeeId, FullName, Email, PhoneNumber, EmployeeSocials) 
                        VALUES (@EmployeeId, @FullName, @Email, @PhoneNumber, @EmployeeSocials);
                        SELECT * FROM employee WHERE EmployeeId = @EmployeeId;";
            employee.EmployeeId = Guid.NewGuid().ToString();
            var createdEmployee = await connection.QueryFirstAsync<Employee>(sql, employee);
            return CreatedAtAction(nameof(GetEmployee), new { id = createdEmployee.EmployeeId }, createdEmployee);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEmployee(string id, Employee employee)
        {
            if (id != employee.EmployeeId)
            {
                return StatusCode(400);
            }

            var connection = new MySqlConnection(connectionString);
            var sql = @"UPDATE employee 
                    SET FullName = @FullName, Email = @Email, PhoneNumber = @PhoneNumber, EmployeeSocials = @EmployeeSocials 
                    WHERE EmployeeId = @EmployeeId";
            var affectedRows = await connection.ExecuteAsync(sql, employee);
            if (affectedRows == 0)
            {
                return StatusCode(404);
            }
            return StatusCode(200);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(string id)
        {
            var connection = new MySqlConnection(connectionString);
            var sql = "DELETE FROM employee WHERE EmployeeId = @Id";
            var affectedRows = await connection.ExecuteAsync(sql, new { Id = id });
            if (affectedRows == 0)
            {
                return StatusCode(404);
            }
            return StatusCode(200);
        }
    }
}
