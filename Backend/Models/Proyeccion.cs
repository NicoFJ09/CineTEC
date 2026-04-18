namespace CineTecServer.Models
{
    public class Proyeccion
    {
        public int proyeccion_id { get; set; }
        public DateTime fecha { get; set; }
        public TimeSpan hora { get; set; }
        public string pelicula_id { get; set; } = string.Empty;
        public int sala_id { get; set; }
    }
}
