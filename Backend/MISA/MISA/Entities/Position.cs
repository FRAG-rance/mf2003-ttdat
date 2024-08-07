using System.ComponentModel.DataAnnotations;

namespace MISA.Entities
{
    public class Position
    {
        public string PositionId { get; set; }

        [Required] public string PositionName { get; set; }

        public DateTime? CreatedDate { get; set; }

        public DateTime? CreatedBy { get; set; }

        public DateTime? ModifyDate { get; set; }

        public DateTime? ModifyBy { get; set; }
    }
}
