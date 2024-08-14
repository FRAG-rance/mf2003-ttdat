using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Core.Entities
{
    public class Employee
    {
        public Guid EmployeeId { get; set; }
        [Required]
        public string EmployeeCode { get; set; }
        [Required]
        public string FullName { get; set; }
        [AllowNull]
        public DateTime? DateOfBirth { get; set; }
        [AllowNull]
        public int?  Gender { get; set; }
        [Required]
        public string SocialNumber { get; set; }
        [AllowNull]
        public DateTime? SocialDate { get; set; }
        [AllowNull]
        public string? SocialPlace { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string MobileNumber { get; set; }
        [AllowNull]
        public string? Address { get; set; }
        [AllowNull]
        public string? LandlineNumber { get; set; }
        [AllowNull]
        public string? BankAccount { get; set; }
        [AllowNull]
        public string? BankName { get; set; }
        [AllowNull]
        public string? Branch { get; set; }
        public Guid PositionId { get; set; }
        public Guid DepartmentId { get; set; }
        [AllowNull]
        public DateTime? CreatedDate { get; set; }
        [AllowNull]
        public string? CreatedBy { get; set; }
        [AllowNull]
        public DateTime? ModifiedDate { get; set; }
        [AllowNull]
        public string? ModifiedBy { get; set; }

    }
}
