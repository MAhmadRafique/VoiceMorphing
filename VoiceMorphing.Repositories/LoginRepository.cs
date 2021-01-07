using System;
using System.Threading.Tasks;
using VoiceMorphing.Repositories.Interfaces;

namespace VoiceMorphing.Repositories
{
    public class LoginRepository : ILoginRepository
    {
        #region Private Properties

        #endregion

        #region Constructor
        public LoginRepository()
        {

        }
        #endregion

        #region Public Methods
        public async Task<int> VerifyLogin(string username, string password)
        {
            var isUserNameValid = username.Equals("MAhmadRafique", StringComparison.InvariantCultureIgnoreCase);
            var isPasswordValid = password.Equals("Hello123");
            if (!isUserNameValid)
                return -1;
            if (!isPasswordValid)
                return 1;
            return 0;
        }
        #endregion
    }
}
