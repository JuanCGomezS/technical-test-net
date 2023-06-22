using FBProject.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FBProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClienteController : ControllerBase
    {
        private readonly AplicationDbContext _context;
        public ClienteController(AplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/<ClienteController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var listClientes = await _context.Cliente.ToListAsync();
                return Ok(listClientes);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // GET api/<ClienteController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                var cliente = await _context.Cliente.FindAsync(id);

                if (cliente == null)
                {
                    return NotFound();
                }

                return Ok(cliente);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // POST api/<ClienteController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Cliente cliente)
        {
            try
            {
                _context.Add(cliente);
                await _context.SaveChangesAsync();
                return Ok(cliente);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT api/<ClienteController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Cliente cliente)
        {
            try
            {
                if (id != cliente.Id)
                {
                    return NotFound();
                }

                _context.Update(cliente);
                await _context.SaveChangesAsync();
                return Ok(new { message = "cliente actualizado con exito" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // DELETE api/<ClienteController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var cliente = await _context.Cliente.FindAsync(id);

                if (cliente == null)
                {
                    return NotFound();
                }

                _context.Cliente.Remove(cliente);
                await _context.SaveChangesAsync();
                return Ok(new { message = "Cliente eliminado con exito" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
