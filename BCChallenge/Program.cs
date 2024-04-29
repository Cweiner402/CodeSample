using BCChallenge.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Serilog;
using System.Diagnostics;

var builder = WebApplication.CreateBuilder(args);

//Add our connection string to Azure for context on build
var connectionString = builder.Configuration.GetConnectionString("BcDB");
builder.Services.AddDbContext<TransportationOptionDbContext>(c => c.UseSqlServer(connectionString));
builder.Services.AddScoped<IDatabaseRepository, DatabaseRepository>();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//error handling log this will create it locally but could be sent anywhere or insert your favorite logger here
Log.Logger = new LoggerConfiguration()
    .MinimumLevel.Debug()
    .WriteTo.Console()
    .WriteTo.File("logs/BCChallengeLog.txt", rollingInterval: RollingInterval.Day)
    .CreateLogger();

builder.Host.UseSerilog();


builder.Configuration.AddEnvironmentVariables();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        builder => builder.WithOrigins("http://localhost:5173") 
                          .AllowAnyMethod()
                          .AllowAnyHeader());
});


var app = builder.Build();
app.UseSwaggerUI();

app.UseCors("AllowSpecificOrigin");

using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<TransportationOptionDbContext>();

    dbContext.Database.Migrate();
}

SeedDatabaseIfEmpty(app.Services, app.Environment, app.Configuration);

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseDeveloperExceptionPage();
}


app.UseSwagger(x => x.SerializeAsV2 = true);
app.MapGet("/", () => Results.Redirect("/swagger"));

// Get a specific TransportationOption by id
app.MapGet("/TransportationOption/{id}", async ([FromServices] IDatabaseRepository db, int id) =>
{
    var result = await db.GetTransportationByIdAsync(id);
    return result is not null ? Results.Ok(result) : Results.NotFound();
});

// Get all TransportationOptions
app.MapGet("/TransportationOptions", async ([FromServices] IDatabaseRepository db) =>
{
    var results = await db.GetTransportationAsync();
    return Results.Ok(results);
});

// Get all BookedTravels for user 
app.MapGet("/BookedTravels/{username}", async ([FromServices] IDatabaseRepository db, string username) =>
{
    var results = await db.GetBookedAsync(username);
    return Results.Ok(results);
});

// Update a specific BookedTravel
app.MapPut("/BookedTravel/{id}", async ([FromServices] IDatabaseRepository db, int id, BookedTravel bk) =>
{
    if (bk.ID != id)
    {
        return Results.BadRequest("ID mismatch");
    }

    var updated = await db.PutBookingAsync(bk);
    return updated is not null ? Results.Ok(updated) : Results.NotFound();
});

// Delete a specific BookedTravel
app.MapDelete("/DeleteBookedTravel/{id}", async ([FromServices] IDatabaseRepository db, int id) =>
{
    var success = await db.DeleteBookingAsync(id);
    return success ? Results.Ok($"Booking with ID {id} has been successfully deleted.") : Results.NotFound($"No Booking with ID {id} .");
});


// Add a new BookedTravel
app.MapPost("/BookedTravel", async ([FromServices] IDatabaseRepository db, BookedTravel bk) =>
{
    var added = await db.AddBookingAsync(bk);
    if (added == null)
    {
        return Results.BadRequest("Invalid BookedTravel option provided.");
    }

    var locationUri = $"/BookedTravel/{added.ID}";
    return Results.Created(locationUri, added);
});


app.Run();

//seed the db based on the sql file in /data remove the SQL SERVER context so it can parse the data
void SeedDatabaseIfEmpty(IServiceProvider serviceProvider, IWebHostEnvironment appEnvironment, IConfiguration configuration)
{
    using (var scope = serviceProvider.CreateScope())
    {
        var context = scope.ServiceProvider.GetRequiredService<TransportationOptionDbContext>();
        if (!context.TransportationOption.Any())
        {
            //set script location in app settings for deployment db location
            var sqlServerInstance = configuration["DatabaseSettings:SqlServerInstance"];
            var relativeScriptPath = configuration["DatabaseSettings:ScriptPath"];
            var scriptPath = Path.Combine(appEnvironment.ContentRootPath, relativeScriptPath);

            using (var process = new Process
            {
                StartInfo = new ProcessStartInfo
                {
                    FileName = "sqlcmd",
                    Arguments = $"-S {sqlServerInstance} -i \"{scriptPath}\"",
                    RedirectStandardOutput = true,
                    UseShellExecute = false,
                    CreateNoWindow = true,
                }
            })
            {
                process.Start();
                process.WaitForExit();
            }
        }
    }
}

