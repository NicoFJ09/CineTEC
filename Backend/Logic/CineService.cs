using CineTecServer.Models;
using System.Text.Json;

namespace CineTecServer.Logic
{
    public class CineService
    {
        private readonly string _filePath = "Data/cines.json";

        public List<Cine> ObtenerTodos()
        {
            var json = File.ReadAllText(_filePath);
            return JsonSerializer.Deserialize<List<Cine>>(json) ?? new List<Cine>();
        }

        public Cine? ObtenerPorNombre(string nombre)
        {
            var sucursales = ObtenerTodos();

            foreach (var cine in sucursales)
            {
                if (cine.nombre.Equals(nombre, StringComparison.OrdinalIgnoreCase))
                {
                    return cine;
                }
            }
            return null; // si no encuentra nada
        }
    }
}
