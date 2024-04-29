namespace BCChallenge.Model
{
    public interface IDatabaseRepository
    {
        Task<List<TransportationOption>> GetTransportationAsync();

        Task<TransportationOption> GetTransportationByIdAsync(int id);

        Task<List<BookedTravel>> GetBookedAsync(string username);

        Task<BookedTravel> AddBookingAsync(BookedTravel booking);

        Task<BookedTravel> PutBookingAsync(BookedTravel booking);

        Task<bool> DeleteBookingAsync(int id);
    }

}