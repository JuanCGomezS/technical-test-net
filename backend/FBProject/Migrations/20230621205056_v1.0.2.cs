using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FBProject.Migrations
{
    /// <inheritdoc />
    public partial class v102 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "total_de_venta",
                table: "Venta",
                newName: "valor_v");

            migrationBuilder.RenameColumn(
                name: "fecha",
                table: "Venta",
                newName: "fecha_v");

            migrationBuilder.AddColumn<DateTime>(
                name: "created_at",
                table: "Producto",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "created_at",
                table: "Cliente",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "created_at",
                table: "Producto");

            migrationBuilder.DropColumn(
                name: "created_at",
                table: "Cliente");

            migrationBuilder.RenameColumn(
                name: "valor_v",
                table: "Venta",
                newName: "total_de_venta");

            migrationBuilder.RenameColumn(
                name: "fecha_v",
                table: "Venta",
                newName: "fecha");
        }
    }
}
