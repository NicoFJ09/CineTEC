using Microsoft.AspNetCore.Mvc;
using CineTecServer.Models;
using CineTecServer.Logic;
using Microsoft.AspNetCore.DataProtection.AuthenticatedEncryption.ConfigurationModel;

namespace CineTecServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CineController: Controller
    {
        private readonly CineService _service = new CineService();

        // GET multivalor - todos los cines
        [HttpGet("allcinemas")]
        public IActionResult ObtenerTodos()
        {
            var cines = _service.ObtenerTodos();
            var resumen = cines.Select(c => new { c.nombre, c.provincia });
            return Ok(resumen);
        }

        // GET un valor - un cine por nombre
        [HttpGet("{nombre}")]
        public IActionResult ObtenerPorNombre(string nombre)
        {
            var cine = _service.ObtenerPorNombre(nombre);
            if (cine == null)
                return NotFound(new { mensaje = "Cine no encontrado" });
            return Ok(cine);
        }
    }
}
