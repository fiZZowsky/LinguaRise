using LinguaRise.Api;
using LinguaRise.DataAccess;
using LinguaRise.Repositories;
using LinguaRise.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddDataAccess(builder.Configuration);

builder.Services.AddAppConfig();
builder.Services.AddRepositories();
builder.Services.AddService();
builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost3000", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowLocalhost3000");
app.UseAuthorization();

app.MapControllers();

app.Run();
