using System.Text;
using DatingApp.API.Configs;
using DatingApp.API.Services.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Swashbuckle.AspNetCore.Swagger;

namespace DatingApp.API.Services.Implementations
{
    public class MVCInstaller : IInstaller
    {
        public void InstallServices(IServiceCollection services, IConfiguration configuration)
        {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2)
                .AddJsonOptions(options => {
                    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
                });
            services.AddSwaggerGen(swagger => {
                swagger.SwaggerDoc("v1", new Info { Title = "DatingApp API", Version = "v1" });
            });
            services.AddCors();
            services.Configure<CloudinaryConfig>(configuration.GetSection("CloudinarySettings"));
            services.AddScoped<IAuthenticationService, AuthenticationService>();
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(
                options => {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(
                            Encoding.ASCII.GetBytes(configuration.GetSection("AppSettings:Token").Value)
                        ),
                        ValidateIssuer = false,
                        ValidateAudience = false
                    };
                }
            );
            // services.AddAutoMapper();
            // services.AddTransient<Seed>();
        }
    }
}