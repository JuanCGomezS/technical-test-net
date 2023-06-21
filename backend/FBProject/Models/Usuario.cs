using System.ComponentModel.DataAnnotations;

namespace FBProject.Models
{
    public class Usuario
    {
        public int Id { get; set; }
        public string? nombre_u { get; set; }
        public string? apellido_u { get; set; }
        public string? correo_u { get; set; }
        public int telefono_u { get; set; }
    }
}
