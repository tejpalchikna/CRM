using System.ComponentModel.DataAnnotations.Schema;
using System;

namespace YK.Data.Model
{
    public class Contacts : BaseModel
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Designation { get; set; }
        public string Email { get; set; }
        public string AlternateEmail { get; set; }
        public string OfficePhone { get; set; }
        public string MobileNbr { get; set; }
        public string AlternateMobile { get; set; }
        public DateTime DOB { get; set; }
        public DateTime Anniversary { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Country { get; set; }
        public virtual Organizations Organization { get; set; }
    }
}