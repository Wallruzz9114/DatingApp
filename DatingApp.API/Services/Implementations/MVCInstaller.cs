using DatingApp.API.Configs;
using DatingApp.API.Data;
using DatingApp.API.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Swashbuckle.AspNetCore.Swagger;

namespace DatingApp.API.Services.Implementations
{
    public class MVCInstaller : IInstaller
    {
        public void InstallServices(IServiceCollection services, IConfiguration configuration)
        {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
            services.AddSwaggerGen(swagger => {
                swagger.SwaggerDoc("v1", new Info { Title = "DatingApp API", Version = "v1" });
            });
            services.AddCors();
            services.Configure<CloudinaryConfig>(configuration.GetSection("CloudinarySettings"));
            // services.AddAutoMapper();
            // services.AddTransient<Seed>();
        }
    }
}