using CineTecServer.Models;
using System.Text.Json;

namespace CineTecServer.Logic
{
    public class AdministradorService
    {
        private readonly string _filePath = "Data/administradores.json";

        // Funcion SUPER basica
        public bool ValidarLogin(string correo, string contrasena)
        {
            var json = File.ReadAllText(_filePath);
            var admins = JsonSerializer.Deserialize<List<Administrador>>(json) ?? new List<Administrador>();
            return admins.Any(a => a.correo_electronico == correo && a.contrasena == contrasena);
        }
    }
}
