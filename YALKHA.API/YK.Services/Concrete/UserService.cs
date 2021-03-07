using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using YALKHA.Core.ViewModels;
using YK.Core.Abstract;
using YK.Data.Model;
using YK.Services.Abstract;
using YK.Services.Middleware;

namespace YK.Services.Concrete
{
    public class UserService : IUserService
    {
        private IRepository<Users> _userRepository;

        public UserService(IRepository<Users> userRepository)
        {
            _userRepository = userRepository;
        }

        public ServiceResponse<LoginResultViewModel> CreateToken(AccountViewModel accountViewModel)
        {
            var response = new ServiceResponse<LoginResultViewModel>(null);
            try
            {
                //var a = Cipher.Encrypt("password", "Tej@321");

                var users = _userRepository.Table.Where(x => x.Email == accountViewModel.UserID && x.Password == Cipher.Encrypt("password", accountViewModel.Password)).Select(x => new
                LoginResultViewModel()
                {
                    Email = x.Email,
                    Name = x.FirstName + " " + x.LastName,
                    UserID = x.Id,
                    RoleName = x.RoleName,
                    UserName = x.Email,
                    Company = x.Company,
                }).FirstOrDefault();

                // return null if user not found
                if (users == null)
                    return null;
                var tokenHandler = new JwtSecurityTokenHandler();
                const string sec = "401b09eab3c013d4ca54922bb802bec8fd5318192b0a75f201d8b3727429090fb337591abd3e44453b954555b7a0812e1081c39b740293f765eae731f5a65ed1";

                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                    new Claim(JwtRegisteredClaimNames.UniqueName, users.UserName),
                    new Claim(JwtRegisteredClaimNames.Sub, users.UserID.ToString()),
                    new Claim(ClaimTypes.Role, users.RoleName),
                    new Claim(JwtRegisteredClaimNames.Email, users.Email),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                    }),
                    Expires = DateTime.UtcNow.AddDays(7),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.Default.GetBytes(sec)), SecurityAlgorithms.HmacSha256Signature)
                };
                var token = tokenHandler.CreateToken(tokenDescriptor);
                users.Token = tokenHandler.WriteToken(token);
                string[] Permission = { "DASHBOARD", "CONTACTS", "MANAGECONTACTS", "ADMINISTRATOR", "MANAGEROLE", "MANAGEUSER", "MENUEDITOR", "MANAGERIGHTS", "BULKEMAILS", "SENDBULKEMAILS" };
                users.RoleId = 1;
                users.FacilityId = "1";
                users.FacilityName = "Remote";
                users.PermissionsList = Permission;
                //users.RolesList = new List<string>() { Role.Admin, Role.User };

                // remove password before returning
                users.Password = null;
                response.Entity = users;
                response.IsSuccessful = true;
                response.SuccessMessage = "Login Successful";
                return response;
            }
            catch (System.Exception ex)
            {
                response.ExceptionMessage = ex.Message;
                response.HasExceptionError = true;
                return response;

            }

        }

        public ServiceResponse<LoginResultViewModel> GetList()
        {
            var response = new ServiceResponse<LoginResultViewModel>(null);
            try
            {
                response.List = _userRepository.Table.Select(x => new LoginResultViewModel
                {
                    UserID = x.Id,
                    Company = x.Company,
                    Email = x.Email,
                    Name = x.FirstName + " " + x.LastName,
                    RoleName = x.RoleName,
                    UserName = x.UserName
                }).ToList();

                response.Count = response.List.Count;
                response.IsSuccessful = true;
                return response;
            }
            catch (Exception e)
            {
                response.ExceptionMessage = e.Message;
                response.HasExceptionError = true;
                return response;
            }
        }

        public ServiceResponse<StringBuilder> GetMenuForBind()
        {
            var response = new ServiceResponse<StringBuilder>(null);
            List<MenuModel> menuModels = new List<MenuModel>();
            MenuMainModel menuMainModel = new MenuMainModel();

            menuMainModel.Menu = new List<MenuModel>() {
                new MenuModel { Code="DASHBOARD" ,Url = "/", DisplayOrder = 0, Name = "Dashboard", ParentMenu = null, Type = "T" },
                new MenuModel { Code="ADMINISTRATOR" ,Url = null, DisplayOrder = 3, Name = "Administrator", ParentMenu = null, Type = "T" },

                new MenuModel { Code="MANAGEROLE" ,Url = "roles/index", DisplayOrder = 1, Name = "Role Master", ParentMenu = "ADMINISTRATOR", Type = "S" },
                new MenuModel { Code="MANAGEUSER" ,Url = "users/index", DisplayOrder = 2, Name = "Manage User", ParentMenu = "ADMINISTRATOR", Type = "S" },
                new MenuModel { Code="MENUEDITOR" ,Url = "menu/index", DisplayOrder = 3, Name = "Menu Editor", ParentMenu = "ADMINISTRATOR", Type = "S" },
                new MenuModel { Code="MANAGERIGHTS" ,Url = "home/manageright", DisplayOrder = 4, Name = "Manage Right", ParentMenu = "ADMINISTRATOR", Type = "S" },

                new MenuModel { Code="CONTACTS" ,Url = null, DisplayOrder = 1, Name = "Contacts", ParentMenu = null, Type = "T" },
                new MenuModel { Code="MANAGECONTACTS" ,Url = "contacts/index", DisplayOrder = 1, Name = "Manage Contacts", ParentMenu = "CONTACTS", Type = "S" },

                new MenuModel { Code="BULKEMAILS" ,Url = null, DisplayOrder = 2, Name = "Bulk Email", ParentMenu = null, Type = "T" },
                new MenuModel { Code="SENDBULKEMAILS" ,Url = "sendbulkemails/index", DisplayOrder = 1, Name = "Send Bulk Email", ParentMenu = "BULKEMAILS", Type = "S" },
              };
            var menu = Menu(menuMainModel);
            response.Entity = menu;
            response.IsSuccessful = true;
            return response;
        }

        [NonAction]
        public StringBuilder Menu(MenuMainModel model)
        {
            StringBuilder html = new StringBuilder();
            html.Append("<ul class=\"nav navbar-nav\">");

            foreach (var item in model.Menu.Where(s => s.Type == "T").OrderBy(s => s.DisplayOrder))
            {
                var submenu = model.Menu.Where(s => s.ParentMenu == item.Code).ToList();
                if (submenu.Count == 0)
                {
                    if (!string.IsNullOrEmpty(item.Url) && item.Url != "#")
                        html.AppendFormat("<li class=\"\"><a href = \"#/{0}\">{1}</a></li>", item.Url, item.Name);
                    else
                        html.AppendFormat("<li class=\"\"><a href = \"#/{0}\" >{0}</a></li>", item.Name);
                }
                else
                {
                    html.AppendFormat("<li class=\"dropdown\"><a class=\"dropdown-toggle\" nnee=\"ds\" data-toggle=\"dropdown\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\" href = \"#/{0}\">{0}<span class=\"caret\"></span></a>", item.Name);
                    CreateChild(html, item.Code, model.Menu, item.Url);
                    html.AppendFormat("</li>");
                }
            }
            html.Append("</ul>");
            return html;
        }
        [NonAction]
        private StringBuilder CreateChild(StringBuilder sb, string name, List<MenuModel> model, string urlHelper)
        {
            var submenu = model.Where(s => s.ParentMenu == name).ToList();
            if (submenu.Count > 0)
            {
                sb.AppendFormat(" <ul class=\"dropdown-menu\">");
                foreach (var item in submenu.OrderBy(s => s.DisplayOrder))
                {
                    var subsubmenu = model.Where(s => s.ParentMenu == item.Code).ToList();
                    if (subsubmenu.Count == 0)
                    {
                        if (!string.IsNullOrEmpty(item.Url) && item.Url != "#")
                            sb.AppendFormat("<li class=\"\"><a href = \"#/{0}\">{1}</a></li>", item.Url, item.Name);
                        else
                            sb.AppendFormat("<li class=\"\"><a href = \"#/{0}\">{0}</a></li>", item.Name);
                    }
                    else
                    {
                        sb.AppendFormat("<li class=\"dropdown\"><a class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\" href = \"#/{0}\">{0}<span class=\"caret\"></span></a>", item.Name);
                        CreateChild(sb, item.Code, model, item.Url);
                        sb.Append("</li>");
                    }
                }
                sb.Append("</ul>");
            }
            return sb;
        }

        public class MenuModel
        {
            public decimal Id { get; set; }
            public string Code { get; set; }
            public string Name { get; set; }

            public string Url { get; set; }

            public int DisplayOrder { get; set; }

            public string ParentMenu { get; set; }

            public string Type { get; set; }

            public List<CustomSelectListItem> ListParentMenu { get; set; }
        }
        public class MenuMainModel
        {
            public string HomeUrl { get; set; }

            public string LogoutUrl { get; set; }

            public string TargetFrame { get; set; }

            public List<MenuModel> Menu { get; set; }
        }

    }
}