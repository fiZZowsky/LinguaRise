using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace LinguaRise.DataAccess;

public static class DataAccessExtensions
{
    public static void AddDataAccess(this IServiceCollection services, IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("LinguaRise");
        services.AddDbContext<AppDbContext>(options => options.UseSqlServer(connectionString));
    }
}