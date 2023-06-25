using FBProject.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FBProject.Helpers;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Security.Cryptography;
using AngularAuthYtAPI.Models.Dto;
using System.Text.RegularExpressions;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FBProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private readonly AplicationDbContext _context;
        public UsuarioController(AplicationDbContext context)
        { 
            _context = context;
        }

        // Auth USER
        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] Usuario usuario)
        {
            try
            {
                if (usuario == null)
                    return BadRequest();

                var user = await _context.Usuario
                    .FirstOrDefaultAsync(x => x.username == usuario.username);

                if (user == null)
                    return NotFound(new { Message = "Usuario no encontrado" });

                if (!PasswordHasher.VerifyPassword(usuario.password_u, user.password_u))
                {
                    return BadRequest(new { Message = "Contraseña incorrecta" });
                }

                user.token = CreateJwt(user);
                var newAccessToken = user.token;
                var newRefreshToken = CreateRefreshToken();
                user.RefreshToken = newRefreshToken;
                user.RefreshTokenExpiryTime = DateTime.Now.AddDays(5);
                await _context.SaveChangesAsync();

                return Ok(new TokenApiDto()
                {
                    AccessToken = newAccessToken,
                    RefreshToken = newRefreshToken
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        private string CreateJwt(Usuario user)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("very2023sceret.....");
            var identity = new ClaimsIdentity(new Claim[]
            {
                new Claim("id",$"{user.Id}"),
                new Claim("nombre",$"{user.nombre_u}"),
                new Claim("apellido",$"{user.apellido_u}"),
                new Claim("rol",$"{user.role}")
            });

            var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = identity,
                Expires = DateTime.UtcNow.AddSeconds(10),
                SigningCredentials = credentials
            };
            var token = jwtTokenHandler.CreateToken(tokenDescriptor);
            return jwtTokenHandler.WriteToken(token);
        }

        private string CreateRefreshToken()
        {
            var tokenBytes = RandomNumberGenerator.GetBytes(64);
            var refreshToken = Convert.ToBase64String(tokenBytes);

            var tokenInUser = _context.Usuario
                .Any(a => a.RefreshToken == refreshToken);
            if (tokenInUser)
            {
                return CreateRefreshToken();
            }
            return refreshToken;
        }

        // GET: api/<UsuarioController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var listUsuarios = await _context.Usuario.ToListAsync();
                return Ok(listUsuarios);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // GET api/<UsuarioController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                var usuario = await _context.Usuario.FindAsync(id);

                if (usuario == null)
                {
                    return NotFound();
                }

                return Ok(usuario);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // POST api/<UsuarioController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Usuario usuario)
        {
            try
            {
                if (usuario == null)
                    return BadRequest();

                // check email
                if (await CheckEmailExistAsync(usuario.correo_u))
                    return BadRequest(new { Message = "El correo ya existe" });

                //check username
                if (await CheckUsernameExistAsync(usuario.username))
                    return BadRequest(new { Message = "El usuario ya existe" });

                var passMessage = CheckPasswordStrength(usuario.password_u);
                if (!string.IsNullOrEmpty(passMessage))
                    return BadRequest(new { Message = passMessage.ToString() });

                usuario.password_u = PasswordHasher.HashPassword(usuario.password_u);
                usuario.role = "User";
                usuario.token = "";
                await _context.AddAsync(usuario);
                await _context.SaveChangesAsync();
                return Ok(new
                {
                    Status = 200,
                    Message = "¡Usuario creado!"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        private Task<bool> CheckEmailExistAsync(string? email)
            => _context.Usuario.AnyAsync(x => x.correo_u == email);

        private Task<bool> CheckUsernameExistAsync(string? username)
            => _context.Usuario.AnyAsync(x => x.username == username);

        private static string CheckPasswordStrength(string pass)
        {
            StringBuilder sb = new StringBuilder();
            if (pass.Length < 9)
                sb.Append("La contraseña debe tener al menos 8 caracteres." + Environment.NewLine);
            if (!(Regex.IsMatch(pass, "[a-z]") && Regex.IsMatch(pass, "[A-Z]") && Regex.IsMatch(pass, "[0-9]")))
                sb.Append("La contraseña debe ser alfanumérica" + Environment.NewLine);
            if (!Regex.IsMatch(pass, "[<,>,@,!,#,$,%,^,&,*,(,),_,+,\\[,\\],{,},?,:,;,|,',\\,.,/,~,`,-,=]"))
                sb.Append("La contraseña debe contener un carácter especial" + Environment.NewLine);
            return sb.ToString();
        }

        // PUT api/<UsuarioController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Usuario usuario)
        {
            try
            {
                if(id != usuario.Id)
                {
                    return NotFound();
                }

                _context.Update(usuario);
                await _context.SaveChangesAsync();
                return Ok(new {message = "Usuario actualizado con exito"});
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // DELETE api/<UsuarioController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var usuario = await _context.Usuario.FindAsync(id);

                if (usuario == null)
                {
                    return NotFound();
                }

                _context.Usuario.Remove(usuario);
                await _context.SaveChangesAsync();
                return Ok(new { message = "Usuario eliminado con exito" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
