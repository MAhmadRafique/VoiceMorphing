using System;
using System.Threading.Tasks;
using VoiceMorphing.Repositories.Interfaces;
using VoiceMorphing.Services.Interfaces;

namespace VoiceMorphing.Services
{
    public class LoginService : ILoginService
    {
        #region Private Properties
        private readonly ILoginRepository _loginRepository;
        #endregion

        #region Constructor
        /// <summary>
        /// Initializes a new instance of the <see cref="LoginService" /> class.
        /// </summary>
        /// <param name="loginRepository"></param>
        public LoginService(ILoginRepository loginRepository)
        {
            _loginRepository = loginRepository;
        }
        #endregion

        #region Public Methods
        public async Task<int> VerifyLogin(string username, string password)
        {
            return await _loginRepository.VerifyLogin(username, password);
        }
        #endregion
    }
}
