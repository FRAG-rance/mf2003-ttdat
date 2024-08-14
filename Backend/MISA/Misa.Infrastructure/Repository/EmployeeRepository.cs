using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using MISA.Core.Entities;
using MISA.Core.Interfaces;
using MySqlConnector;
using Dapper;
using System.Collections;
using static Dapper.SqlMapper;


namespace Misa.Infrastructure.Repository
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly string _connectionString;

        public EmployeeRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("MariaDbConnection");
        }

        public int Delete(Employee employee)
        {
            using (var connection = new MySqlConnection(_connectionString))
            { 
                var sql = "DELETE FROM Employee WHERE EmployeeCode = @EmployeeCode";
                var dynamicParameters = new DynamicParameters();
                dynamicParameters.Add("@EmployeeCode", employee.EmployeeCode);
                var result = connection.Execute(sql, dynamicParameters);
                return result;
            }
        } 

        public Employee Get(string code)
        {
            /*
            var connection = new MySqlConnection(_connectionString);
            var sql = "SELECT * FROM Employee WHERE EmployeeCode = @Code";
            var employee = connection.QueryFirstOrDefaultAsync<Employee>(sql, new { Code = code });
            return employee;
            */
            using (var connection = new MySqlConnection(_connectionString))
            {
                var sql = "SELECT * FROM Employee WHERE EmployeeCode = @Code";
                DynamicParameters dynamicParameters = new DynamicParameters();
                dynamicParameters.Add("@Code", code);
                var employee = connection.QueryFirstOrDefault<Employee>(sql,dynamicParameters);
                return employee;
            }
        }

        public IEnumerable<Employee> GetAll()
        {
            using (var connection = new MySqlConnection(_connectionString))
            {
                var sql = "SELECT * FROM Employee";
                var employees = connection.Query<Employee>(sql);
                return employees;
            }
            
        }

        public int Insert(Employee employee)
        {
            var properties = typeof(Employee).GetProperties();
            var dynamicParameters = new DynamicParameters();
            dynamicParameters.Add("@EmployeeId", Guid.NewGuid);
            foreach (var prop in properties)
            {
                dynamicParameters.Add("@" + prop.Name, prop.GetValue(employee));
            }
            using (var connection = new MySqlConnection(_connectionString))
            {

                var sql = @"INSERT INTO Employee (EmployeeId, EmployeeCode, FullName, Email, MobileNumber, SocialNumber) 
                        VALUES (@EmployeeId, @EmployeeCode, @FullName, @Email, @MobileNumber, @SocialNumber);
                        SELECT * FROM Employee WHERE EmployeeCode = @EmployeeCode";
                var result = connection.Execute(sql, dynamicParameters);
                return result;
            }
        }

        public int Update(Employee employee)
        {
            var properties = typeof(Employee).GetProperties();
            var dynamicParameters = new DynamicParameters();
            foreach (var prop in properties)
            {
                dynamicParameters.Add("@" + prop.Name, prop.GetValue(employee));
            }
            using (var connection = new MySqlConnection(_connectionString))
            {
                var sql = @"UPDATE Employee 
                    SET FullName = @FullName, Email = @Email, MobileNumber = @MobileNumber, SocialNumber = @SocialNumber 
                    WHERE EmployeeCode = @EmployeeCode;";
                var result = connection.Execute(sql, dynamicParameters);
                return result;
            }
        }
    }
}
