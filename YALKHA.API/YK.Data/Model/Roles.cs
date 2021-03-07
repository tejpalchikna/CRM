using System.ComponentModel.DataAnnotations.Schema;

namespace YK.Data.Model
{
    public class Roles : BaseModel
    {
        public string RoleName { get; set; }
        public string RoleType { get; set; }
    }
}