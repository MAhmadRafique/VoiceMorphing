using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VoiceMorphing.Services.Interfaces;

namespace VoiceMorphing.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        #region Private Properties
        private readonly ILoginService _loginService;
        #endregion

        #region Constructor
        public LoginController(ILoginService loginService)
        {
            _loginService = loginService;
        }
        #endregion

        #region Public Methods
        [HttpGet]
        [Route("LoginVerification")]
        public async Task<IActionResult> LoginVerification(string username, string password)
        {
            if (username == null || password == null)
                return new ObjectResult(-2);
            var obj = await _loginService.VerifyLogin(username, password);
            return new ObjectResult(obj);
        }
        #endregion
    }
}
