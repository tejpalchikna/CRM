using System.Text;
using YALKHA.Core.ViewModels;
using YK.Data.Model;

namespace YK.Services.Abstract
{
    public interface IContactService
    {
        public ServiceResponse<LoginResultViewModel> CreateToken(AccountViewModel accountViewModel);
        ServiceResponse<LoginResultViewModel> GetList();
        ServiceResponse<StringBuilder> GetMenuForBind();
    }
}