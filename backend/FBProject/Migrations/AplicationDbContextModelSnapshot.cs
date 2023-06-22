﻿// <auto-generated />
using System;
using FBProject;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace FBProject.Migrations
{
    [DbContext(typeof(AplicationDbContext))]
    partial class AplicationDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.5")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("FBProject.Models.Cliente", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("apellido_c")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("correo_c")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("created_at")
                        .HasColumnType("datetime2");

                    b.Property<string>("direccion_c")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("identificacion_c")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("nombre_c")
                        .HasColumnType("nvarchar(max)");

                    b.Property<long>("telefono_c")
                        .HasColumnType("bigint");

                    b.HasKey("Id");

                    b.ToTable("Cliente");
                });

            modelBuilder.Entity("FBProject.Models.Producto", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("codigo_p")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("created_at")
                        .HasColumnType("datetime2");

                    b.Property<string>("nombre_p")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("unidades_p")
                        .HasColumnType("int");

                    b.Property<decimal>("valor_p")
                        .HasColumnType("decimal(18,2)");

                    b.HasKey("Id");

                    b.ToTable("Producto");
                });

            modelBuilder.Entity("FBProject.Models.Usuario", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("apellido_u")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("contraseña_u")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("correo_u")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("created_at")
                        .HasColumnType("datetime2");

                    b.Property<string>("direccion_u")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("identificacion_u")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("nombre_u")
                        .HasColumnType("nvarchar(max)");

                    b.Property<long>("telefono_u")
                        .HasColumnType("bigint");

                    b.HasKey("Id");

                    b.ToTable("Usuario");
                });

            modelBuilder.Entity("FBProject.Models.Venta", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("ClienteId")
                        .HasColumnType("int");

                    b.Property<int>("UsuarioId")
                        .HasColumnType("int");

                    b.Property<DateTime>("fecha_v")
                        .HasColumnType("datetime2");

                    b.Property<decimal>("total_v")
                        .HasColumnType("decimal(18,2)");

                    b.HasKey("Id");

                    b.HasIndex("ClienteId");

                    b.HasIndex("UsuarioId");

                    b.ToTable("Venta");
                });

            modelBuilder.Entity("FBProject.Models.Venta_Producto", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("productoId")
                        .HasColumnType("int");

                    b.Property<int>("unidades")
                        .HasColumnType("int");

                    b.Property<int>("ventaId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("productoId");

                    b.HasIndex("ventaId");

                    b.ToTable("Venta_Producto");
                });

            modelBuilder.Entity("FBProject.Models.Venta", b =>
                {
                    b.HasOne("FBProject.Models.Cliente", "Cliente")
                        .WithMany()
                        .HasForeignKey("ClienteId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("FBProject.Models.Usuario", "Usuario")
                        .WithMany()
                        .HasForeignKey("UsuarioId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Cliente");

                    b.Navigation("Usuario");
                });

            modelBuilder.Entity("FBProject.Models.Venta_Producto", b =>
                {
                    b.HasOne("FBProject.Models.Producto", "Producto")
                        .WithMany()
                        .HasForeignKey("productoId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("FBProject.Models.Venta", "Venta")
                        .WithMany()
                        .HasForeignKey("ventaId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Producto");

                    b.Navigation("Venta");
                });
#pragma warning restore 612, 618
        }
    }
}
