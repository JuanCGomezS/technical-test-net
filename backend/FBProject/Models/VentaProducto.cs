namespace FBProject.Models
{
    public class VentaProducto
    {
        public int Id { get; set; }
        public int? ventaId { get; set; }
        public int? productoId { get; set; }
        public int? unidades { get; set; }

        // Propiedades de navegación para las relaciones
        public Venta? Venta { get; set; }
        public Producto? Productos { get; set; }
    }

}
