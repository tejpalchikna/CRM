using System.Collections.Generic;

namespace YALKHA.Core.ViewModels
{
    public class AccountViewModel : BaseViewModel
    {
        public string UserID { get; set; }
        public string Password { get; set; }
        public string RoleName { get; set; }
        public string Email { get; set; }
        public bool RememberMe { get; set; }
    }
    public class LoginResultViewModel : BaseViewModel
    {
        public LoginResultViewModel()
        {
            RolesList = new List<string>() { "Admin" };
        }
        public string Token { get; set; }
        public string UserName { get; set; }
        public string RoleName { get; set; }
        public int RoleId { get; set; }
        public string FacilityId { get; set; }
        public string FacilityName { get; set; }
        public string Company { get; set; }
        public string Name { get; set; }
        public string[] PermissionsList { get; set; }
        public List<string> RolesList { get; set; }
        public decimal UserID { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
    }
}
