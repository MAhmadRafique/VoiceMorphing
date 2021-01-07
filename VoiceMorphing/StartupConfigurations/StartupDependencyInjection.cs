using Microsoft.Extensions.DependencyInjection;
using VoiceMorphing.Repositories;
using VoiceMorphing.Repositories.Interfaces;
using VoiceMorphing.Services;
using VoiceMorphing.Services.Interfaces;

namespace VoiceMorphing
{
    public partial class Startup
    {
        partial void InitializeDependencyInjectionServices(IServiceCollection services)
        {
            services.AddTransient<ILoginService, LoginService>();
            services.AddTransient<ILoginRepository, LoginRepository>();

        }
    }
}
