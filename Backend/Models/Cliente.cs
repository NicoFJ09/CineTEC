namespace CineTecServer.Models
{
    public class Cliente
    {
        public string correo_electronico { get; set; } = string.Empty;
        public string cedula { get; set; } = string.Empty;
        public string contrasena { get; set; } = string.Empty;
        public DateTime fecha_nacimiento { get; set; }
        public string nombre { get; set; } = string.Empty;
        public string apellido1 { get; set; } = string.Empty;
        public string apellido2 { get; set; } = string.Empty;
    }
}
