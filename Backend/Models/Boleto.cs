namespace CineTecServer.Models
{
    public class Boleto
    {
        public int id { get; set; }
        public decimal precio { get; set; }
        public int asiento_id { get; set; }
        public int proyeccion_id { get; set; }
        public int factura_id { get; set; }
        public string cliente_id { get; set; } = string.Empty;
    }
}
