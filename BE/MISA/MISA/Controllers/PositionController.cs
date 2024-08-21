using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MISA.Core.Entities;
using MISA.Core.Interfaces;

namespace MISA.Api.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class PositionController : ControllerBase
    {
        IPositionRepository _positionRepository;
        IPositionService _positionService;
        public PositionController(IPositionRepository positionRepository, IPositionService positionService)
        {
            _positionRepository = positionRepository;
            _positionService = positionService;
        }

        [HttpGet]
        public IActionResult GetPositions()
        {
            try
            {
                var data = _positionRepository.GetAll();
                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{code}")]
        public IActionResult GetPosition(string code)
        {
            try
            {
                var data = _positionRepository.Get(code);
                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public IActionResult CreatePosition(Position Position)
        {
            try
            {
                var data = _positionService.PositionInsertionValidation(Position);
                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{Position.PositionCode}")]
        public IActionResult UpdatePosition(Position Position)
        {
            try
            {
                var data = _positionService.PositionUpdateiValidation(Position);
                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{code}")]
        public IActionResult DeletePosition(string code)
        {
            try
            {
                var data = _positionService.PositionDeleteValidation(code);
                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
