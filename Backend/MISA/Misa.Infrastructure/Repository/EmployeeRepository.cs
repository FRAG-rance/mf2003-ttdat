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
using System.Diagnostics;
using System.Diagnostics.Eventing.Reader;


namespace Misa.Infrastructure.Repository
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly string _connectionString;

        public EmployeeRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("MariaDbConnection");
        }

        public bool CheckDupEmployeeCode(string employeeCode)
        {
            using (var connection = new MySqlConnection(_connectionString))
            {
                var sql = "select EmployeeCode from Employee where EmployeeCode = @EmployeeCode";
                var dynamicParameters = new DynamicParameters();
                dynamicParameters.Add("@EmployeeCode", employeeCode);
                var result = connection.QueryFirstOrDefault<string>(sql, dynamicParameters);
                if (result != null)
                    return true;
                return false;
            }
        }

        public int Delete(string employeeCode)
        {
            using (var connection = new MySqlConnection(_connectionString))
            { 
                var sql = "DELETE FROM Employee WHERE EmployeeCode = @EmployeeCode";
                var dynamicParameters = new DynamicParameters();
                dynamicParameters.Add("@EmployeeCode", employeeCode);
                var result = connection.Execute(sql, dynamicParameters);
                return result;
            }
        }

        public IEnumerable<Employee> Get(string Code)
        {
            /*
            var connection = new MySqlConnection(_connectionString);
            var sql = "SELECT * FROM Employee WHERE EmployeeCode = @Code";
            var employee = connection.QueryFirstOrDefaultAsync<Employee>(sql, new { Code = code });
            return employee;
            */
            var sql = "";
            if (Code.StartsWith("NV")) {
                sql = "SELECT * FROM Employee WHERE EmployeeCode = @Code";
            } else if (Code.StartsWith("PID")) {
                sql = "SELECT * FROM Employee WHERE PositionCode = @Code";
            } else if (Code.StartsWith("DID")) {
                sql = "SELECT * FROM Employee WHERE DepartmentCode = @Code";
            }
            
            using (var connection = new MySqlConnection(_connectionString))
            {
                DynamicParameters dynamicParameters = new DynamicParameters();
                dynamicParameters.Add("@Code", Code);
                var employees = connection.Query<Employee>(sql,dynamicParameters);
                return employees;
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
            dynamicParameters.Add("@EmployeeId", Guid.NewGuid());
            foreach (var prop in properties)
            {
                if(prop.Name != "EmployeeId")
                {
                    dynamicParameters.Add("@" + prop.Name, prop.GetValue(employee));
                }
            }

            using (var connection = new MySqlConnection(_connectionString))
            {
                var sql = @"INSERT INTO Employee (EmployeeId, EmployeeCode, DepartmentCode, PositionCode, FullName, Email, DateOfBirth, Gender, SocialNumber, 
                        SocialDate, SocialPlace, MobileNumber, Address, LandlineNumber, BankAccount, BankName, BranchName, CreatedDate, CreatedBy, ModifiedDate, ModifiedBy) 
                        VALUES (@EmployeeId, @EmployeeCode, @DepartmentCode, @PositionCode, @FullName, @Email, @DateOfBirth, @Gender, @SocialNumber, @SocialDate, 
                        @SocialPlace, @MobileNumber, @Address, @LandlineNumber, @BankAccount, @BankName, @BranchName, @CreatedDate, @CreatedBy, @ModifiedDate, @ModifiedBy);
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
                    SET DepartmentCode = @DepartmentCode, PositionCode = @PositionCode,
                    FullName = @FullName, Email = @Email, DateOfBirth = @DateOfBirth, Gender = @Gender, SocialNumber = @SocialNumber, SocialDate = @SocialDate, 
                    SocialPlace = @SocialPlace, MobileNumber = @MobileNumber, Address = @Address, LandlineNumber = @LandlineNumber, BankAccount = @BankAccount, 
                    BankName = @BankName, BranchName = @BranchName, CreatedDate = @CreatedDate, CreatedBy = @CreatedBy, ModifiedDate = @ModifiedDate, ModifiedBy = @ModifiedBy
                    WHERE EmployeeCode = @EmployeeCode";
                var result = connection.Execute(sql, dynamicParameters);
                return result;
            }
        }
    }
}
