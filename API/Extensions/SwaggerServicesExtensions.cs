using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.OpenApi.Models;

namespace API.Extensions
{
    public static class SwaggerServicesExtensions
    {
        public static IServiceCollection AddSwaggerServices(this IServiceCollection services)
        {
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc( "v1", new OpenApiInfo { Title = "WebAPIv5", Version = "v1" });

                var securityScheme= new OpenApiSecurityScheme{
                    Description="JWT Auth Bearer Scheme",
                    Name="Authorization",
                    In=ParameterLocation.Header,
                    Type=SecuritySchemeType.Http,
                    Scheme="bearer",
                    Reference=new OpenApiReference{
                        Type=ReferenceType.SecurityScheme,
                        Id="Bearer"
                    },
                };
                
                c.AddSecurityDefinition("Bearer",securityScheme);
                var securityRequirement=new OpenApiSecurityRequirement
                {
                    {securityScheme,new[]{"Bearer"}}
                };

                c.AddSecurityRequirement(securityRequirement);

            });
            return services;
        }

        public static IApplicationBuilder UseSwaggerMiddleware(this IApplicationBuilder app)
        {
            app.UseSwagger();
            app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "WebAPIv5 v1"));
            return app;
        }
    }
}