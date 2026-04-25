namespace CineTecServer.Models
{
    public class Cine
    {
        public string nombre { get; set; } = string.Empty;
        public string provincia { get; set; } = string.Empty;
        public string canton { get; set; } = string.Empty;
        public string distrito { get; set; } = string.Empty;
        public int cantidad_salas { get; set; }
        public string admin_id { get; set; } = string.Empty;
    }
}
