using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using Microsoft.Extensions.Configuration;
using MISA.Core.Entities;
using MISA.Core.Interfaces;
using MySqlConnector;

namespace Misa.Infrastructure.Repository
{
    public class DepartmentRepository : IDepartmentRepository
    {
        private readonly string _connectionString;

        public DepartmentRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("MariaDbConnection");
        }

        public bool CheckDupDepartmentCode(string DepartmentCode)
        {
            using (var connection = new MySqlConnection(_connectionString))
            {
                var sql = "select DepartmentCode from Department where DepartmentCode = @DepartmentCode";
                var dynamicParameters = new DynamicParameters();
                dynamicParameters.Add("@DepartmentCode", DepartmentCode);
                var result = connection.QueryFirstOrDefault<string>(sql, dynamicParameters);
                if (result != null)
                    return true;
                return false;
            }
        }

        public int Delete(string DepartmentCode)
        {
            using (var connection = new MySqlConnection(_connectionString))
            {
                var sql = "DELETE FROM Department WHERE DepartmentCode = @DepartmentCode";
                var dynamicParameters = new DynamicParameters();
                dynamicParameters.Add("@DepartmentCode", DepartmentCode);
                var result = connection.Execute(sql, dynamicParameters);
                return result;
            }
        }



        public int Insert(Department Department)
        {
            var properties = typeof(Department).GetProperties();
            var dynamicParameters = new DynamicParameters();
            dynamicParameters.Add("@DepartmentId", Guid.NewGuid());
            foreach (var prop in properties)
            {
                if (prop.Name != "DepartmentId")
                {
                    dynamicParameters.Add("@" + prop.Name, prop.GetValue(Department));
                }
            }
            using (var connection = new MySqlConnection(_connectionString))
            {
                var sql = @"INSERT INTO Department (DepartmentId, DepartmentCode, DepartmentName, CreatedDate, CreatedBy, ModifiedDate, ModifiedBy) 
                        VALUES (@DepartmentId, @DepartmentCode, @DepartmentCode, @DepartmentName, @CreatedDate, @CreatedBy, @ModifiedDate, @ModifiedBy);
                        SELECT * FROM Department WHERE DepartmentCode = @DepartmentCode";
                var result = connection.Execute(sql, dynamicParameters);
                return result;
            }
        }

        public int Update(Department Department)
        {
            var properties = typeof(Department).GetProperties();
            var dynamicParameters = new DynamicParameters();
            foreach (var prop in properties)
            {
                dynamicParameters.Add("@" + prop.Name, prop.GetValue(Department));
            }
            using (var connection = new MySqlConnection(_connectionString))
            {
                var sql = @"UPDATE Department 
                    SET DepartmentCode = @DepartmentCode, DepartmentName = @DepartmentName, CreatedDate = @CreatedDate, CreatedBy = @CreatedBy,
                    ModifiedDate = @ModifiedDate, ModifiedBy = @ModifiedBy
                    WHERE DepartmentCode = @DepartmentCode";
                var result = connection.Execute(sql, dynamicParameters);
                return result;
            }
        }

        public Department Get(string DepartmentCode)
        {
            using (var connection = new MySqlConnection(_connectionString))
            {
                var sql = "SELECT * FROM Department WHERE DepartmentCode = @Code";
                DynamicParameters dynamicParameters = new DynamicParameters();
                dynamicParameters.Add("@Code", DepartmentCode);
                var department = connection.QueryFirstOrDefault<Department>(sql, dynamicParameters);
                return department;
            }
        }

        public IEnumerable<Department> GetAll()
        {
            using (var connection = new MySqlConnection(_connectionString))
            {
                var sql = "SELECT * FROM Department";
                var department = connection.Query<Department>(sql);
                return department;
            }
        }
    }
}
