using MISA.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Core.Interfaces
{
    public interface IPositionService
    {
        int PositionInsertionValidation(Position Position);
        int PositionUpdateiValidation(Position Position);
        int PositionDeleteValidation(string PositionCode);
    }
}
