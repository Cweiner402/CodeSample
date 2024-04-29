using Microsoft.EntityFrameworkCore;
using System.Runtime.CompilerServices;

namespace BCChallenge.Model
{
    public class DatabaseRepository : IDatabaseRepository
    {
        private readonly TransportationOptionDbContext db;
        private readonly ILogger<DatabaseRepository> logger;

        public DatabaseRepository(TransportationOptionDbContext db, ILogger<DatabaseRepository> logger)
        {
            this.db = db;
            this.logger = logger;
        }

        public async Task<List<TransportationOption>> GetTransportationAsync()
        {
            try
            {
                return await db.TransportationOption.ToListAsync();
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Error occurred while fetching transportation");
                throw;
            }
        }
        public async Task<List<BookedTravel>> GetBookedAsync(string username)
        {
            try
            {
                return await db.BookedTravels.Where(bt => bt.username == username).ToListAsync();
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Error occurred while fetching bookings for user {Username}", username);
                throw;
            }
        }

        public async Task<BookedTravel> PutBookingAsync(BookedTravel booking)
        {
            if (booking == null)
            {
                logger.LogError("Attempted to update a null transportation");
                throw new ArgumentNullException(nameof(booking));
            }

            try
            {
                db.BookedTravels.Update(booking);
                await db.SaveChangesAsync();
                return await db.BookedTravels.FirstOrDefaultAsync(x => x.ID == booking.ID);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, $"Error occurred while updating ID {booking.ID}.");
                throw;
            }
        }

        public async Task<BookedTravel> AddBookingAsync(BookedTravel booking)
        {
            if (booking == null)
            {
                logger.LogError("Attempted to add a null Booking.");
                throw new ArgumentNullException(nameof(booking));
            }

            try
            {
                booking.ID = 0;
                await db.BookedTravels.AddAsync(booking);
                await db.SaveChangesAsync();

                return booking;
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Error occurred while adding a new booking .");
                throw;
            }
        }

        public async Task<TransportationOption> GetTransportationByIdAsync(int id)
        {
            try
            {
                return await db.TransportationOption.FirstOrDefaultAsync(x => x.ID == id);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, $"Error occurred while fetching ID {id}.");
                throw;
            }
        }

        public async Task<bool> DeleteBookingAsync(int id)
        {
            try
            {
                var booking = await db.BookedTravels.FindAsync(id);
                if (booking == null)
                {
                    return false;
                }

                db.BookedTravels.Remove(booking);
                await db.SaveChangesAsync();

                return true;
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Error occurred while deleting a Booking.");
                throw;
            }
        }



    }
}
