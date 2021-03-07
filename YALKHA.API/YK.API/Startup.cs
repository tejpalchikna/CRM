using YK.Services.Abstract;
using YK.Services.Concrete;
using YK.Core.Abstract;
using YK.Core.Concrete;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using YK.Data.Context;
using Swashbuckle.AspNetCore.Swagger;
using Microsoft.OpenApi.Models;
using System;
using Newtonsoft.Json;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using Newtonsoft.Json.Serialization;

namespace YK.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }
        readonly string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // cors add
            services.AddCors(options =>
            {
                options.AddPolicy("MyPolicy", // I introduced a string constant just as a label "AllowAllOriginsPolicy"
                    builder =>
                    {
                        builder.AllowAnyOrigin()
                            .AllowAnyHeader()
                            .AllowAnyHeader();

                    });

            });
            services.AddControllers(options => options.EnableEndpointRouting = false);
            services.AddHttpContextAccessor();

            services.AddDbContext<YKContext>(options => options.UseSqlServer(Configuration.GetConnectionString("ConnectionString")));

            //services.AddDbContext<YKContext>();
            services.AddScoped<IUserService, UserService>();

            services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v2", new OpenApiInfo
                {
                    Version = "v2",
                    Title = "YALKHA API",
                    Description = "YALKHA API Desc",
                    TermsOfService = new Uri("https://example.com/terms"),
                    Contact = new OpenApiContact
                    {
                        Name = "Tej Pal",
                        Email = "info@yalkha.com",
                        Url = new Uri("https://github.com/BerkanARIKAN"),
                    },
                    License = new OpenApiLicense
                    {
                        Name = "Use under LICX",
                        Url = new Uri("https://example.com/license"),
                    }
                });

            });
            const string sec = "401b09eab3c013d4ca54922bb802bec8fd5318192b0a75f201d8b3727429090fb337591abd3e44453b954555b7a0812e1081c39b740293f765eae731f5a65ed1";
            var key = Encoding.ASCII.GetBytes(sec);
            services.AddAuthentication(x =>
                {
                    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                })
                .AddJwtBearer(x =>
                {
                    x.RequireHttpsMetadata = false;
                    x.SaveToken = true;
                    x.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(key),
                        ValidateIssuer = false,
                        ValidateAudience = false
                    };
                });

            services.AddMvc().AddNewtonsoftJson(options =>
                           options.SerializerSettings.ContractResolver = new DefaultContractResolver());
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, YKContext context)
        {

            // global cors policy
            app.UseCors(MyAllowSpecificOrigins);
            app.UseSwagger()
                .UseSwaggerUI(c =>
                {
                    //TODO: Either use the SwaggerGen generated Swagger contract (generated from C# classes)
                    c.SwaggerEndpoint("/swagger/v2/swagger.json", "Swagger Test .Net Core");

                    //TODO: Or alternatively use the original Swagger contract that's included in the static files
                    // c.SwaggerEndpoint("/swagger-original.json", "Swagger Petstore Original");
                });

            app.UseAuthentication();
            //cors add
            app.UseRouting();
            app.UseCors(builder => builder
                .AllowAnyHeader()
                .AllowAnyMethod()
                .SetIsOriginAllowed((host) => true)
                .AllowCredentials()
            );

            app.UseAuthorization();

            app.UseEndpoints(endpoints => { endpoints.MapControllers(); });

            if (env.IsDevelopment())
            {
                if (context.Database.EnsureCreated())
                {
                    context.Database.Migrate();
                }
            }
        }
    }
}

