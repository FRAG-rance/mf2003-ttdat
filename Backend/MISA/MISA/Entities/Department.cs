using System.ComponentModel.DataAnnotations;

namespace MISA.Entities
{
    public class Department
    {
        public string DepartmentId { get; set; }

        [Required] public string DepartmentName { get; set; }

        public DateTime? CreatedDate { get; set; }

        public DateTime? CreatedBy { get; set; }

        public DateTime? ModifyDate { get; set; }

        public DateTime? ModifyBy { get; set; }
    }
}
