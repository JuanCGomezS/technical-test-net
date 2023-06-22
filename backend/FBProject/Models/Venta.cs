namespace FBProject.Models
{
    public class Venta
    {
        public int Id { get; set; }
        public int UsuarioId { get; set; }
        public int ClienteId { get; set; }
        public decimal total_v { get; set; }
        public DateTime fecha_v { get; set; }

        // Propiedades de navegación para las relaciones de clave foránea
        public Usuario? Usuario { get; set; }
        public Cliente? Cliente { get; set; }

        public Venta()
        {
            fecha_v = DateTime.Now; // Establecer la fecha actual como valor predeterminado
        }
    }

}
