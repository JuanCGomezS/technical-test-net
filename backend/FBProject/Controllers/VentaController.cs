using FBProject.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FBProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VentaController : ControllerBase
    {
        private readonly AplicationDbContext _context;
        public VentaController(AplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/<VentaController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var listVentas = await _context.Venta.ToListAsync();
                return Ok(listVentas);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // GET api/<VentaController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                var venta = await _context.Venta.FindAsync(id);

                if (venta == null)
                {
                    return NotFound();
                }

                return Ok(venta);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // POST api/<VentaController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Venta venta)
        {
            try
            {
                _context.Add(venta);
                await _context.SaveChangesAsync();
                return Ok(venta);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT api/<VentaController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Venta venta)
        {
            try
            {
                if (id != venta.Id)
                {
                    return NotFound();
                }

                _context.Update(venta);
                await _context.SaveChangesAsync();
                return Ok(new { message = "Venta actualizado con exito" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // DELETE api/<VentaController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var venta = await _context.Venta.FindAsync(id);

                if (venta == null)
                {
                    return NotFound();
                }

                _context.Venta.Remove(venta);
                await _context.SaveChangesAsync();
                return Ok(new { message = "Venta eliminado con exito" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
