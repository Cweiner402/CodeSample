using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace BCChallenge.Model
{
    public class TransportationOptionDbContext : DbContext
    {
        public TransportationOptionDbContext()
        {
        }
        public TransportationOptionDbContext(DbContextOptions<TransportationOptionDbContext> options) : base(options)
        {
        }

        public DbSet<TransportationOption> TransportationOption { get; set; }
        public DbSet<BookedTravel> BookedTravels { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                var configuration = new ConfigurationBuilder()
                    .SetBasePath(Directory.GetCurrentDirectory())
                    .AddJsonFile("appsettings.json")
                    .Build();

                var connectionString = configuration.GetConnectionString("BcDB");

                //wake up time for idle even though we are using localdb 
                optionsBuilder.UseSqlServer(connectionString, options =>
                    options.EnableRetryOnFailure(
                        maxRetryCount: 5,
                        maxRetryDelay: TimeSpan.FromSeconds(10),
                        errorNumbersToAdd: null));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TransportationOption>()
                .ToTable("TRANSPORTATION_OPTIONS");

            modelBuilder.Entity<BookedTravel>()
                .ToTable("BookedTravels");

        }

    }
}
