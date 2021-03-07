using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
namespace YK.Data.Model
{
    public class Users : BaseModel
    {
        public string Email { get; set; }
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Password { get; set; }
        [NotMapped]
        public string Token { get; set; }
        public string Company { get; set; }
        public string RoleName { get; set; }
        public virtual ICollection<Roles> role { get; set; }
    }
}