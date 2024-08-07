using System.ComponentModel.DataAnnotations;

namespace MISA.Entities
{
    public class Employee
    {
        /// <summary>
        ///        public string EmployeeId { get; set; }

        /// </summary>
        public string EmployeeId { get; set; }

        [Required] public string FullName { get; set; }

        [Required] public string Email { get; set; }

        [Required] public string PhoneNumber {  get; set; }

        [Required] public string EmployeeSocials {  get; set; }

        public DateTime? EmployeeSDate { get; set; }

        public DateTime? EmployeeBirthdate { get; set; }
    }
}
