using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace VoiceMorphing.Services.Interfaces
{
    /// <summary>
    /// Interface ILoginService
    /// </summary>
    public interface ILoginService
    {
        /// <summary>
        /// Verifies Login Credentials.
        /// </summary>
        /// <returns>Task&lt;bool&gt;</returns>
        Task<int> VerifyLogin(string username, string password);
    }
}
