using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FBProject.Migrations
{
    /// <inheritdoc />
    public partial class v104 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "created_at",
                table: "Cliente",
                type: "datetime2",
                nullable: false,
                defaultValueSql: "CURRENT_TIMESTAMP");

            migrationBuilder.AlterColumn<DateTime>(
                name: "created_at",
                table: "Producto",
                type: "datetime2",
                nullable: false,
                defaultValueSql: "CURRENT_TIMESTAMP");

            migrationBuilder.AlterColumn<DateTime>(
                name: "created_at",
                table: "Usuario",
                type: "datetime2",
                nullable: false,
                defaultValueSql: "CURRENT_TIMESTAMP");

            migrationBuilder.AlterColumn<DateTime>(
                name: "fecha_v",
                table: "Venta",
                type: "datetime2",
                nullable: false,
                defaultValueSql: "CURRENT_TIMESTAMP");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

            migrationBuilder.AlterColumn<DateTime>(
                name: "created_at",
                table: "Cliente",
                type: "datetime2",
                nullable: false);


            migrationBuilder.AlterColumn<DateTime>(
                name: "created_at",
                table: "Producto",
                type: "datetime2",
                nullable: false);


            migrationBuilder.AlterColumn<DateTime>(
                name: "created_at",
                table: "Usuario",
                type: "datetime2",
                nullable: false);


            migrationBuilder.AlterColumn<DateTime>(
                name: "fecha_v",
                table: "Venta",
                type: "datetime2",
                nullable: false);

        }
    }
}
