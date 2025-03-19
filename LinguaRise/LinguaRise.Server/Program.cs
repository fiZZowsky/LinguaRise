using LinguaRise.DataAccess;
using LinguaRise.Models.Entities;
using LinguaRise.Repositories;
using LinguaRise.Services;
using Microsoft.AspNetCore.Identity;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddDataAccess(builder.Configuration);

builder.Services.AddRepositories();
builder.Services.AddService();

builder.Services.AddIdentity<ApplicationUser, IdentityRole>()
            .AddEntityFrameworkStores<AppDbContext>()
            .AddDefaultTokenProviders();

builder.Services.ConfigureApplicationCookie(options =>
{
    options.LoginPath = "/api/auth/login";
    options.AccessDeniedPath = "/api/auth/access-denied";
});


builder.Services.AddAuthentication();
builder.Services.AddAuthorization();
builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

AppDbContext.EnsureDatabaseUpdated(app.Services);

app.UseDefaultFiles();
app.UseStaticFiles();

app.Map("/logout", async (SignInManager<ApplicationUser> signInManager) =>
{
    await signInManager.SignOutAsync();
    return Results.Ok();
}).RequireAuthorization();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
