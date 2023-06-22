namespace FBProject.Models
{
    public class Producto
    {
        public int Id { get; set; }
        public string? nombre_p { get; set; }
        public string? codigo_p { get; set; }
        public decimal valor_p { get; set; }
        public int unidades_p { get; set; }
        public DateTime created_at { get; set; }

        public Producto()
        {
            created_at = DateTime.Now; // Establecer la fecha actual como valor predeterminado
        }
    }
}
