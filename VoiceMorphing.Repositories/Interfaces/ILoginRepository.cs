using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace VoiceMorphing.Repositories.Interfaces
{
    /// <summary>
    /// Interface ILoginRepository
    /// </summary>
    public interface ILoginRepository
    {
        /// <summary>
        /// Verifies Login Credentials.
        /// </summary>
        /// <returns>Task&lt;bool&gt;</returns>
        Task<int> VerifyLogin(string username, string password);
    }
}
