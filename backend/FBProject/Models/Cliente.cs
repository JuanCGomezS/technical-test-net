namespace FBProject.Models
{
    public class Cliente
    {
        public int Id { get; set; }
        public string? nombre_c { get; set; }
        public string? apellido_c { get; set; }
        public long telefono_c { get; set; }
        public string? identificacion_c { get; set; }
        public string? direccion_c { get; set; }
        public string? correo_c { get; set; }
        public DateTime created_at { get; set; }

        public Cliente()
        {
            created_at = DateTime.Now; // Establecer la fecha actual como valor predeterminado
        }
    }
}
