namespace CineTecServer.Models
{
    public class Sala
    {
        public int id { get; set; }
        public int cantidad_filas { get; set; }
        public int cantidad_columnas { get; set; }
        public string cine_id { get; set; } = string.Empty;
    }
}
