using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FBProject.Migrations
{
    /// <inheritdoc />
    public partial class v103 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Venta_Cliente_clienteId",
                table: "Venta");

            migrationBuilder.DropForeignKey(
                name: "FK_Venta_Usuario_usuarioId",
                table: "Venta");

            migrationBuilder.RenameColumn(
                name: "usuarioId",
                table: "Venta",
                newName: "UsuarioId");

            migrationBuilder.RenameColumn(
                name: "clienteId",
                table: "Venta",
                newName: "ClienteId");

            migrationBuilder.RenameColumn(
                name: "valor_v",
                table: "Venta",
                newName: "total_v");

            migrationBuilder.RenameIndex(
                name: "IX_Venta_usuarioId",
                table: "Venta",
                newName: "IX_Venta_UsuarioId");

            migrationBuilder.RenameIndex(
                name: "IX_Venta_clienteId",
                table: "Venta",
                newName: "IX_Venta_ClienteId");

            migrationBuilder.AddForeignKey(
                name: "FK_Venta_Cliente_ClienteId",
                table: "Venta",
                column: "ClienteId",
                principalTable: "Cliente",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Venta_Usuario_UsuarioId",
                table: "Venta",
                column: "UsuarioId",
                principalTable: "Usuario",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Venta_Cliente_ClienteId",
                table: "Venta");

            migrationBuilder.DropForeignKey(
                name: "FK_Venta_Usuario_UsuarioId",
                table: "Venta");

            migrationBuilder.RenameColumn(
                name: "UsuarioId",
                table: "Venta",
                newName: "usuarioId");

            migrationBuilder.RenameColumn(
                name: "ClienteId",
                table: "Venta",
                newName: "clienteId");

            migrationBuilder.RenameColumn(
                name: "total_v",
                table: "Venta",
                newName: "valor_v");

            migrationBuilder.RenameIndex(
                name: "IX_Venta_UsuarioId",
                table: "Venta",
                newName: "IX_Venta_usuarioId");

            migrationBuilder.RenameIndex(
                name: "IX_Venta_ClienteId",
                table: "Venta",
                newName: "IX_Venta_clienteId");

            migrationBuilder.AddForeignKey(
                name: "FK_Venta_Cliente_clienteId",
                table: "Venta",
                column: "clienteId",
                principalTable: "Cliente",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Venta_Usuario_usuarioId",
                table: "Venta",
                column: "usuarioId",
                principalTable: "Usuario",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
