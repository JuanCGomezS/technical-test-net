using System.ComponentModel.DataAnnotations;

namespace FBProject.Models
{
    public class Usuario
    {
        public int Id { get; set; }
        public string? Nombre_u { get; set; }
        public string? Apellido_u { get; set; }
        public long Telefono_u { get; set; }
        public string? Identificacion_u { get; set; }
        public string? Direccion_u { get; set; }
        public string? Correo_u { get; set; }
        public string? Password_u { get; set; }
        public string? Username { get; set; }
        public int? Role { get; set; }
        public string? Token { get; set; }
        public string? RefreshToken { get; set; }

        public DateTime RefreshTokenExpiryTime { get; set; }
        public DateTime Created_at { get; set; }

        public Usuario()
        {
            Created_at = DateTime.Now; // Establecer la fecha actual como valor predeterminado
        }
    }

}
