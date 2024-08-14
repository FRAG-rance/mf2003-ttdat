using MISA.Core.Entities;
using MISA.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Core.Services
{
    internal class PositionService : IPositionService
    {
        private IPositionRepository _positionRepository;

        public PositionService(IPositionRepository PositionRepository)
        {
            _positionRepository = PositionRepository;
        }

        public int PositionDeleteValidation(string PositionCode)
        {
            var isDuplidate = _positionRepository.CheckDupPositionCode(PositionCode);
            if (!isDuplidate)
            {
                throw new Exception();
            }
            var result = _positionRepository.Delete(PositionCode);
            return result;
        }

        public int PositionInsertionValidation(Position Position)
        {
            var isDuplidate = _positionRepository.CheckDupPositionCode(Position.PositionCode);
            if (isDuplidate)
            {
                return 0;
            }

            var result = _positionRepository.Insert(Position);
            return result;
        }

        public int PositionUpdateiValidation(Position Position)
        {
            var isDuplidate = _positionRepository.CheckDupPositionCode(Position.PositionCode);
            if (!isDuplidate)
            {
                return 0;
            }

            var result = _positionRepository.Update(Position);
            return result;
        }
    }
}
