﻿using FBProject.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FBProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VentaProductoController : ControllerBase
    {
        private readonly AplicationDbContext _context;
        public VentaProductoController(AplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/<VentaProductoController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var listVentaProducto = await _context.Venta_Producto.ToListAsync();
                return Ok(listVentaProducto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // GET api/<VentaProductoController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                var venta_Producto = await _context.Venta_Producto.FindAsync(id);

                if (venta_Producto == null)
                {
                    return NotFound();
                }

                return Ok(venta_Producto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // POST api/<VentaProductoController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Venta_Producto venta_Producto)
        {
            try
            {
                _context.Add(venta_Producto);
                await _context.SaveChangesAsync();
                return Ok(venta_Producto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // POST api/<VentaController>/VentaConProductos
        [HttpPost("VentaConProductos")]
        public async Task<IActionResult> PostVentaConProductos([FromBody] Venta_Producto ventaConProductos)
        {
            {
                try
                {
                    _context.Add(ventaConProductos.Venta);
                    await _context.SaveChangesAsync();

                    foreach (var ventaProducto in ventaConProductos.Productos)
                    {
                        ventaConProductos.ventaId = ventaConProductos.Venta.Id;
                        _context.Add(ventaConProductos);
                    }

                    await _context.SaveChangesAsync();

                    return Ok(ventaConProductos.Venta);
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
        }

        // PUT api/<VentaProductoController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Venta_Producto venta_Producto)
        {
            try
            {
                if (id != venta_Producto.Id)
                {
                    return NotFound();
                }

                _context.Update(venta_Producto);
                await _context.SaveChangesAsync();
                return Ok(new { message = "Venta Producto actualizado con exito" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // DELETE api/<VentaProductoController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var venta_Producto = await _context.Venta_Producto.FindAsync(id);

                if (venta_Producto == null)
                {
                    return NotFound();
                }

                _context.Venta_Producto.Remove(venta_Producto);
                await _context.SaveChangesAsync();
                return Ok(new { message = "Venta Producto eliminado con exito" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
