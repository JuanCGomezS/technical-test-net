using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FBProject.Migrations
{
    /// <inheritdoc />
    public partial class v101 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<long>(
                name: "telefono_u",
                table: "Usuario",
                type: "bigint",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<string>(
                name: "contraseña_u",
                table: "Usuario",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "created_at",
                table: "Usuario",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "direccion_u",
                table: "Usuario",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "identificacion_u",
                table: "Usuario",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Cliente",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nombre_c = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    apellido_c = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    telefono_c = table.Column<long>(type: "bigint", nullable: false),
                    identificacion_c = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    direccion_c = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    correo_c = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cliente", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Producto",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nombre_p = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    codigo_p = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    valor_p = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    unidades_p = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Producto", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Venta",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    usuarioId = table.Column<int>(type: "int", nullable: false),
                    clienteId = table.Column<int>(type: "int", nullable: false),
                    total_de_venta = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    fecha = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Venta", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Venta_Cliente_clienteId",
                        column: x => x.clienteId,
                        principalTable: "Cliente",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Venta_Usuario_usuarioId",
                        column: x => x.usuarioId,
                        principalTable: "Usuario",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Venta_Producto",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ventaId = table.Column<int>(type: "int", nullable: false),
                    productoId = table.Column<int>(type: "int", nullable: false),
                    unidades = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Venta_Producto", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Venta_Producto_Producto_productoId",
                        column: x => x.productoId,
                        principalTable: "Producto",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Venta_Producto_Venta_ventaId",
                        column: x => x.ventaId,
                        principalTable: "Venta",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Venta_clienteId",
                table: "Venta",
                column: "clienteId");

            migrationBuilder.CreateIndex(
                name: "IX_Venta_usuarioId",
                table: "Venta",
                column: "usuarioId");

            migrationBuilder.CreateIndex(
                name: "IX_Venta_Producto_productoId",
                table: "Venta_Producto",
                column: "productoId");

            migrationBuilder.CreateIndex(
                name: "IX_Venta_Producto_ventaId",
                table: "Venta_Producto",
                column: "ventaId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Venta_Producto");

            migrationBuilder.DropTable(
                name: "Producto");

            migrationBuilder.DropTable(
                name: "Venta");

            migrationBuilder.DropTable(
                name: "Cliente");

            migrationBuilder.DropColumn(
                name: "contraseña_u",
                table: "Usuario");

            migrationBuilder.DropColumn(
                name: "created_at",
                table: "Usuario");

            migrationBuilder.DropColumn(
                name: "direccion_u",
                table: "Usuario");

            migrationBuilder.DropColumn(
                name: "identificacion_u",
                table: "Usuario");

            migrationBuilder.AlterColumn<int>(
                name: "telefono_u",
                table: "Usuario",
                type: "int",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "bigint");
        }
    }
}
