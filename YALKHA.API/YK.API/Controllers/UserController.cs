using System.Collections.Generic;
using YK.Services.Abstract;
using YK.Data.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using YALKHA.Core.ViewModels;
using System.Text;

namespace YK.API.Controllers
{
    [Authorize(Roles = RoleMaster.Admin)]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {

        private IUserService _userService;

        public UserController(IUserService userService)
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
