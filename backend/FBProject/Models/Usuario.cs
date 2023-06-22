using System.ComponentModel.DataAnnotations;

namespace FBProject.Models
{
    public class Usuario
    {
        public int Id { get; set; }
        public string? nombre_u { get; set; }
        public string? apellido_u { get; set; }
        public long telefono_u { get; set; }
        public string? identificacion_u { get; set; }
        public string? direccion_u { get; set; }
        public string? correo_u { get; set; }
        public string? contraseña_u { get; set; }
        public DateTime created_at { get; set; }

        public Usuario()
        {
            created_at = DateTime.Now; // Establecer la fecha actual como valor predeterminado
        }
    }

}
