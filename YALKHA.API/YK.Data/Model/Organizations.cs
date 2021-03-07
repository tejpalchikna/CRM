using System.ComponentModel.DataAnnotations.Schema;

namespace YK.Data.Model
{
    public class Organizations : BaseModel
    {
        public string OrganizationName { get; set; }
        public string ContactPerson { get; set; }
        public string ContactPersonEmail { get; set; }
        public string ContactPersonAltEmail { get; set; }
        public string ContactPersonPhone { get; set; }
        public string ContactPersonAltPhone { get; set; }
        public string OrgContactNo { get; set; }
        public string OrgEmail { get; set; }
        public string IndustryType { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Country { get; set; }
    }
}