using Microsoft.AspNetCore.Mvc;
using CineTecServer.Models;
using CineTecServer.Logic;

namespace CineTecServer.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class AdminController: Controller
    {
        private readonly AdministradorLogic _service = new AdministradorLogic();

        [HttpPost("login")]
        public IActionResult Login([FromBody] Administrador admin)
        {
            bool valido = _service.ValidarLogin(admin.correo_electronico, admin.contrasena);
            if (valido)
                return Ok(new { mensaje = "Login exitoso" });
            else
                return Unauthorized(new { mensaje = "Correo o contrasena incorrecta" });
        }

    }
}
