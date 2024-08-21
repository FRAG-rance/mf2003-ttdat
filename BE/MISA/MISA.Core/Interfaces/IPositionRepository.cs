using MISA.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Core.Interfaces
{
    public interface IPositionRepository
    {
        IEnumerable<Position> GetAll();
        Position Get(string PositionCode);
        int Insert(Position Position);
        int Update(Position Position);
        int Delete(string PositionCode);
        bool CheckDupPositionCode(string PositionCode);
    }
}
