using System.Collections.Generic;

namespace YALKHA.Core.ViewModels
{
    public class OraganizationViewModel : BaseViewModel
    {
        public string UserID { get; set; }
        public string Password { get; set; }
        public string RoleName { get; set; }
        public string Email { get; set; }
        public bool RememberMe { get; set; }
    }
}
