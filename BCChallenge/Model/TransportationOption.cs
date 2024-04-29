using System.ComponentModel.DataAnnotations.Schema;

namespace BCChallenge.Model
{
    public class TransportationOption
    {
        public int ID { get; set; }

        public string Description { get; set; }

        [Column("PROVIDER_NAME")]
        public string ProviderName { get; set; }

        [Column("VEHICLE_TYPE")]
        public string VehicleType { get; set; }

        public decimal Price { get; set; }

        public string Duration { get; set; }

        public string Origin { get; set; }

        public string Destination { get; set; }

        public DateTime? Date { get; set; }

        public TimeSpan? Time { get; set; }

    }
}
