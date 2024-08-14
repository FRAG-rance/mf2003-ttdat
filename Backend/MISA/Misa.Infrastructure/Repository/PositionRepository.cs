using MISA.Core.Interfaces;
using MISA.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using Microsoft.Extensions.Configuration;
using MySqlConnector;

namespace Misa.Infrastructure.Repository
{
    internal class PositionRepository : IPositionRepository
    {
        private readonly string _connectionString;

        public PositionRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("MariaDbConnection");
        }

        public bool CheckDupPositionCode(string PositionCode)
        {
            using (var connection = new MySqlConnection(_connectionString))
            {
                var sql = "select PositionCode from Position where PositionCode = @PositionCode";
                var dynamicParameters = new DynamicParameters();
                dynamicParameters.Add("@PositionCode", PositionCode);
                var result = connection.QueryFirstOrDefault<string>(sql, dynamicParameters);
                if (result != null)
                    return true;
                return false;
            }
        }

        public int Delete(string PositionCode)
        {
            using (var connection = new MySqlConnection(_connectionString))
            {
                var sql = "DELETE FROM Position WHERE PositionCode = @PositionCode";
                var dynamicParameters = new DynamicParameters();
                dynamicParameters.Add("@PositionCode", PositionCode);
                var result = connection.Execute(sql, dynamicParameters);
                return result;
            }
        }



        public int Insert(Position Position)
        {
            var properties = typeof(Position).GetProperties();
            var dynamicParameters = new DynamicParameters();
            foreach (var prop in properties)
            {
                if (prop.Name != "PositionId")
                {
                    dynamicParameters.Add("@" + prop.Name, prop.GetValue(Position));
                }
            }
            dynamicParameters.Add("@PositionId", Guid.NewGuid());
            using (var connection = new MySqlConnection(_connectionString))
            {
                var sql = @"INSERT INTO Position (PositionId, PositionCode, PositionName, CreatedDate, CreatedBy, ModifiedDate, ModifiedBy) 
                        VALUES (@PositionId, @PositionCode, @PositionCode, @PositionName, @CreatedDate, @CreatedBy, @ModifiedDate, @ModifiedBy);
                        SELECT * FROM Position WHERE PositionCode = @PositionCode";
                var result = connection.Execute(sql, dynamicParameters);
                return result;
            }
        }

        public int Update(Position Position)
        {
            var properties = typeof(Position).GetProperties();
            var dynamicParameters = new DynamicParameters();
            foreach (var prop in properties)
            {
                dynamicParameters.Add("@" + prop.Name, prop.GetValue(Position));
            }
            using (var connection = new MySqlConnection(_connectionString))
            {
                var sql = @"UPDATE Position 
                    SET PositionCode = @PositionCode, PositionName = @PositionName, CreatedDate = @CreatedDate, CreatedBy = @CreatedBy,
                    ModifiedDate = @ModifiedDate, ModifiedBy = @ModifiedBy
                    WHERE PositionCode = @PositionCode";
                var result = connection.Execute(sql, dynamicParameters);
                return result;
            }
        }

        public Position Get(string PositionCode)
        {
            using (var connection = new MySqlConnection(_connectionString))
            {
                var sql = "SELECT * FROM Position WHERE PositionCode = @Code";
                DynamicParameters dynamicParameters = new DynamicParameters();
                dynamicParameters.Add("@Code", PositionCode);
                var Position = connection.QueryFirstOrDefault<Position>(sql, dynamicParameters);
                return Position;
            }
        }

        public IEnumerable<Position> GetAll()
        {
            using (var connection = new MySqlConnection(_connectionString))
            {
                var sql = "SELECT * FROM Position";
                var Position = connection.Query<Position>(sql);
                return Position;
            }
        }
    }
}
