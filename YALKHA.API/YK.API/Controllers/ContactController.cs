using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Text;
using YALKHA.Core.ViewModels;
using YK.Data.Model;
using YK.Services.Abstract;

namespace YK.API.Controllers
{
    [Authorize(Roles = RoleMaster.Admin)]
    [Route("api/[controller]")]
    [ApiController]
    public class ContactController : ControllerBase
    {

        private IUserService _userService;

        public ContactController(IUserService userService)
        {
            _userService = userService;
        }

        [AllowAnonymous]
        [HttpPost("CreateToken")]
        public ServiceResponse<LoginResultViewModel> CreateToken(AccountViewModel accountViewModel)
        {
            return _userService.CreateToken(accountViewModel);
        }

        [Authorize(Roles = "Admin,User")]
        [HttpGet]
        public ServiceResponse<LoginResultViewModel> GetAll()
        {
            var response = _userService.GetList();
            return response;
        }

        [Authorize(Roles = "Admin,User")]
        [HttpGet("GetMenuForBind")]
        public ServiceResponse<StringBuilder> GetMenuForBind()
        {
            return _userService.GetMenuForBind();
        }
    }

}
