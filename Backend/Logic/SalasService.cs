using CineTecServer.Models;
using System.Collections.Generic;
using System.Text.Json;

namespace CineTecServer.Logic
{
    public class SalasService
    {
        private readonly string _filePath = "Data/salas.json";
        public List<Sala> ObtenerTodos()
        {
            var json = File.ReadAllText(_filePath);
            return JsonSerializer.Deserialize<List<Sala>>(json) ?? new List<Sala>();
        }

        public List<Sala>? ObtenerPorID(string nombre)
        {
            var salas = ObtenerTodos();

            List<Sala> salas_por_idcine = new List<Sala>();

            foreach (var sala in salas)
            {
                if (sala.cine_id.Equals(nombre, StringComparison.OrdinalIgnoreCase))
                {
                    salas_por_idcine.Add(sala);
                }
            }
            return salas_por_idcine;
        }

    }
}
