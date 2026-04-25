namespace CineTecServer.Models
{
    public class Factura
    {
        public int id { get; set; }
        public DateTime fecha { get; set; }
        public decimal monto_total { get; set; }
        public string cine_id { get; set; } = string.Empty;
        public string cliente_id { get; set; } = string.Empty;
    }
}

