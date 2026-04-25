namespace CineTecServer.Models
{
    public class Pelicula
    {
        public string nombre_original { get; set; } = string.Empty;
        public string nombre_comercial { get; set; } = string.Empty;
        public string imagen { get; set; } = string.Empty;
        public string clasificacion { get; set; } = string.Empty;
        public int duracion { get; set; }
        public int ventas { get; set; }
    }
}
