USE [master]
GO
/****** Object:  Database [technical_test]    Script Date: 26/06/2023 10:32:39 a. m. ******/
CREATE DATABASE [technical_test]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'technical_test', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\technical_test.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'technical_test_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\technical_test_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [technical_test] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [technical_test].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [technical_test] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [technical_test] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [technical_test] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [technical_test] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [technical_test] SET ARITHABORT OFF 
GO
ALTER DATABASE [technical_test] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [technical_test] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [technical_test] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [technical_test] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [technical_test] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [technical_test] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [technical_test] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [technical_test] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [technical_test] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [technical_test] SET  ENABLE_BROKER 
GO
ALTER DATABASE [technical_test] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [technical_test] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [technical_test] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [technical_test] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [technical_test] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [technical_test] SET READ_COMMITTED_SNAPSHOT ON 
GO
ALTER DATABASE [technical_test] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [technical_test] SET RECOVERY FULL 
GO
ALTER DATABASE [technical_test] SET  MULTI_USER 
GO
ALTER DATABASE [technical_test] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [technical_test] SET DB_CHAINING OFF 
GO
ALTER DATABASE [technical_test] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [technical_test] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [technical_test] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [technical_test] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'technical_test', N'ON'
GO
ALTER DATABASE [technical_test] SET QUERY_STORE = ON
GO
ALTER DATABASE [technical_test] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [technical_test]
GO
/****** Object:  Table [dbo].[__EFMigrationsHistory]    Script Date: 26/06/2023 10:32:40 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[__EFMigrationsHistory](
	[MigrationId] [nvarchar](150) NOT NULL,
	[ProductVersion] [nvarchar](32) NOT NULL,
 CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY CLUSTERED 
(
	[MigrationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Cliente]    Script Date: 26/06/2023 10:32:40 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Cliente](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[nombre_c] [nvarchar](max) NULL,
	[apellido_c] [nvarchar](max) NULL,
	[telefono_c] [bigint] NOT NULL,
	[identificacion_c] [nvarchar](max) NULL,
	[direccion_c] [nvarchar](max) NULL,
	[correo_c] [nvarchar](max) NULL,
	[created_at] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_Cliente] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Producto]    Script Date: 26/06/2023 10:32:40 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Producto](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[nombre_p] [nvarchar](max) NULL,
	[codigo_p] [nvarchar](max) NULL,
	[valor_p] [bigint] NOT NULL,
	[unidades_p] [int] NOT NULL,
	[created_at] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_Producto] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Usuario]    Script Date: 26/06/2023 10:32:40 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Usuario](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[nombre_u] [nvarchar](max) NULL,
	[apellido_u] [nvarchar](max) NULL,
	[correo_u] [nvarchar](max) NULL,
	[telefono_u] [bigint] NOT NULL,
	[password_u] [nvarchar](max) NULL,
	[created_at] [datetime2](7) NOT NULL,
	[direccion_u] [nvarchar](max) NULL,
	[identificacion_u] [nvarchar](max) NULL,
	[RefreshToken] [nvarchar](max) NULL,
	[RefreshTokenExpiryTime] [datetime2](7) NOT NULL,
	[role] [nvarchar](max) NULL,
	[token] [nvarchar](max) NULL,
	[username] [nvarchar](max) NULL,
 CONSTRAINT [PK_Usuario] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Venta]    Script Date: 26/06/2023 10:32:40 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Venta](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UsuarioId] [int] NOT NULL,
	[ClienteId] [int] NOT NULL,
	[total_v] [decimal](18, 2) NOT NULL,
	[fecha_v] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_Venta] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Venta_Producto]    Script Date: 26/06/2023 10:32:40 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Venta_Producto](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ventaId] [int] NOT NULL,
	[productoId] [int] NOT NULL,
	[unidades] [int] NOT NULL,
 CONSTRAINT [PK_Venta_Producto] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20230511034601_v1.0.0', N'7.0.5')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20230621203259_v1.0.1', N'7.0.5')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20230621205056_v1.0.2', N'7.0.5')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20230621224852_v1.0.3', N'7.0.5')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20230621225913_v1.0.4', N'7.0.5')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20230622171411_v1.0.5', N'7.0.5')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20230623192643_v1.0.6', N'7.0.5')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20230623192959_v1.0.7', N'7.0.5')
GO
SET IDENTITY_INSERT [dbo].[Cliente] ON 

INSERT [dbo].[Cliente] ([Id], [nombre_c], [apellido_c], [telefono_c], [identificacion_c], [direccion_c], [correo_c], [created_at]) VALUES (1, N'Juan José', N'Rodríguez', 3102547884, N'123456789', N'Cra 8910 Norte', N'Juan@gmail.com', CAST(N'2023-06-26T09:48:28.1312783' AS DateTime2))
INSERT [dbo].[Cliente] ([Id], [nombre_c], [apellido_c], [telefono_c], [identificacion_c], [direccion_c], [correo_c], [created_at]) VALUES (8, N'Juan ', N'Gomez', 3011234578, N'1002647845', N'cra 123 norte', N'carlos@gmail.com', CAST(N'2023-06-22T11:17:21.8483307' AS DateTime2))
INSERT [dbo].[Cliente] ([Id], [nombre_c], [apellido_c], [telefono_c], [identificacion_c], [direccion_c], [correo_c], [created_at]) VALUES (9, N'Jerónimo', N'Gonzalez', 3124587996, N'1000897485', N'cra 98 sur villa javier', N'marta@gmail.com', CAST(N'2023-06-26T09:48:38.2518349' AS DateTime2))
INSERT [dbo].[Cliente] ([Id], [nombre_c], [apellido_c], [telefono_c], [identificacion_c], [direccion_c], [correo_c], [created_at]) VALUES (10, N'Mariluz', N'Cardenas', 9559595959, N'1111111111', N'Calle 10 # 7-22, Bucaramanga, Colombia', N'correo@gmail.com', CAST(N'2023-06-26T09:51:44.0250617' AS DateTime2))
INSERT [dbo].[Cliente] ([Id], [nombre_c], [apellido_c], [telefono_c], [identificacion_c], [direccion_c], [correo_c], [created_at]) VALUES (11, N'Samuel David', N'García', 3054859789, N'1212121212', N'Cra 111 Campin', N'Garciag@gmail.com', CAST(N'2023-06-26T09:48:59.5229589' AS DateTime2))
INSERT [dbo].[Cliente] ([Id], [nombre_c], [apellido_c], [telefono_c], [identificacion_c], [direccion_c], [correo_c], [created_at]) VALUES (12, N'Omar', N'Jaramillo', 3021345645, N'19128745', N'Calle 120 Norte', N'juli@gmail.com', CAST(N'2023-06-26T09:49:08.4533823' AS DateTime2))
INSERT [dbo].[Cliente] ([Id], [nombre_c], [apellido_c], [telefono_c], [identificacion_c], [direccion_c], [correo_c], [created_at]) VALUES (13, N'Pablo Salomón', N'Morales', 9887946521, N'123123123', N'Calle 123 0000', N'pablo@gmail.com', CAST(N'2023-06-26T09:49:26.2086284' AS DateTime2))
INSERT [dbo].[Cliente] ([Id], [nombre_c], [apellido_c], [telefono_c], [identificacion_c], [direccion_c], [correo_c], [created_at]) VALUES (14, N'Antonio', N'Herrera', 9221310313, N'12341234', N'Calle 45 # 12-34, Bogotá, Colombia', N'dsad@fas.com', CAST(N'2023-06-26T09:51:03.7615735' AS DateTime2))
INSERT [dbo].[Cliente] ([Id], [nombre_c], [apellido_c], [telefono_c], [identificacion_c], [direccion_c], [correo_c], [created_at]) VALUES (15, N'Ángela Carolina', N'Rincón', 9121321231, N'987987987', N'Transversal 25 # 43-19, Cartagena, Colombia', N'angca@gmail.com', CAST(N'2023-06-26T09:51:16.3182822' AS DateTime2))
INSERT [dbo].[Cliente] ([Id], [nombre_c], [apellido_c], [telefono_c], [identificacion_c], [direccion_c], [correo_c], [created_at]) VALUES (16, N'Raquel', N'Ríos Arango', 1254645645, N'654654654', N'Carrera 14 # 90-56, Pereira, Colombia', N'correo@gmail.com', CAST(N'2023-06-26T09:51:23.3103623' AS DateTime2))
INSERT [dbo].[Cliente] ([Id], [nombre_c], [apellido_c], [telefono_c], [identificacion_c], [direccion_c], [correo_c], [created_at]) VALUES (17, N'Pepe', N'Gomez', 123123456, N'1234567898', N'Calle 70 # 55-33, Manizales, Colombia', N'Pepe@gmail.com', CAST(N'2023-06-26T09:51:33.0715472' AS DateTime2))
SET IDENTITY_INSERT [dbo].[Cliente] OFF
GO
SET IDENTITY_INSERT [dbo].[Producto] ON 

INSERT [dbo].[Producto] ([Id], [nombre_p], [codigo_p], [valor_p], [unidades_p], [created_at]) VALUES (1, N'Arroz 500gm', NULL, 3000, 60, CAST(N'2023-06-22T14:55:03.4872762' AS DateTime2))
INSERT [dbo].[Producto] ([Id], [nombre_p], [codigo_p], [valor_p], [unidades_p], [created_at]) VALUES (2, N'Pasta Doria 500g', NULL, 4700, 50, CAST(N'2023-06-22T12:49:03.7142547' AS DateTime2))
INSERT [dbo].[Producto] ([Id], [nombre_p], [codigo_p], [valor_p], [unidades_p], [created_at]) VALUES (6, N'Lentejas 500g', NULL, 3100, 1200, CAST(N'2023-06-24T22:13:15.2742769' AS DateTime2))
INSERT [dbo].[Producto] ([Id], [nombre_p], [codigo_p], [valor_p], [unidades_p], [created_at]) VALUES (7, N'Lentejas 1000g', NULL, 7200, 500, CAST(N'2023-06-24T22:13:45.4112281' AS DateTime2))
SET IDENTITY_INSERT [dbo].[Producto] OFF
GO
SET IDENTITY_INSERT [dbo].[Usuario] ON 

INSERT [dbo].[Usuario] ([Id], [nombre_u], [apellido_u], [correo_u], [telefono_u], [password_u], [created_at], [direccion_u], [identificacion_u], [RefreshToken], [RefreshTokenExpiryTime], [role], [token], [username]) VALUES (15, N'Santiago', N'González', N'juan@gmail.com', 30030111, N'yMkjqemVuDBwu7hNu5x84OLuqLC8W9QDEaRnsJTvNP2JCBwr', CAST(N'2023-06-26T09:46:32.8299875' AS DateTime2), N'Calle 9', N'100200300', N'lPjgziNhqju4B+OdQ1o1R/CGPUVx9pCmR/KdD25JX0CDh771Xd9MPm7UXIZ7RoRuoTepULNWoAu39/tm+aL1wQ==', CAST(N'2023-07-01T09:46:52.3501932' AS DateTime2), N'User', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE1Iiwibm9tYnJlIjoiU2FudGlhZ28iLCJhcGVsbGlkbyI6IkdvbnrDoWxleiIsInJvbCI6IlVzZXIiLCJuYmYiOjE2ODc3OTA4MTIsImV4cCI6MTY4Nzc5MDgyMiwiaWF0IjoxNjg3NzkwODEyfQ.xAOS1E4jM5kzDJVxKttEZLCsX6VR0Y-kDcS9X9ywC8U', N'Santiago')
INSERT [dbo].[Usuario] ([Id], [nombre_u], [apellido_u], [correo_u], [telefono_u], [password_u], [created_at], [direccion_u], [identificacion_u], [RefreshToken], [RefreshTokenExpiryTime], [role], [token], [username]) VALUES (16, N'Carlos', N'Perez', N'test@gmail.com', 0, N'rI87pe0b83UEIuV3BTcvJYDwIPqlhF0Cr+lPaI5UKeFdkMgS', CAST(N'2023-06-26T09:47:40.8205954' AS DateTime2), N'av chile', N'100200400', NULL, CAST(N'0001-01-01T00:00:00.0000000' AS DateTime2), N'User', N'', N'Carlos')
INSERT [dbo].[Usuario] ([Id], [nombre_u], [apellido_u], [correo_u], [telefono_u], [password_u], [created_at], [direccion_u], [identificacion_u], [RefreshToken], [RefreshTokenExpiryTime], [role], [token], [username]) VALUES (17, N'Oscar Javier', N'Pereira Martinez', N'oscar@gmail.com', 3301234165, N'OsWEpUZPu2XI+Qq0adIg33B9nQFJWD1465Vg3IpvZm/8GZQS', CAST(N'2023-06-23T17:05:53.6768561' AS DateTime2), N'calle 15 sur', N'512512512', N'JuTfTOh2soKkoB+L2zAxkdDoBjT0j1QHRzoBc9h7irAVPZZz7xNGGNW726McofNnz39C7HrnFE4xIxBCAHaepA==', CAST(N'2023-07-01T09:46:22.9371407' AS DateTime2), N'User', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE3Iiwibm9tYnJlIjoiT3NjYXIgSmF2aWVyIiwiYXBlbGxpZG8iOiJQZXJlaXJhIE1hcnRpbmV6Iiwicm9sIjoiVXNlciIsIm5iZiI6MTY4Nzc5MDc4MiwiZXhwIjoxNjg3NzkwNzkyLCJpYXQiOjE2ODc3OTA3ODJ9.yIa0OM3xNk6eJ99JiElr-MEDM9Q1pafWxjgZLux1_Ro', N'Oscar')
SET IDENTITY_INSERT [dbo].[Usuario] OFF
GO
SET IDENTITY_INSERT [dbo].[Venta] ON 

INSERT [dbo].[Venta] ([Id], [UsuarioId], [ClienteId], [total_v], [fecha_v]) VALUES (29, 16, 1, CAST(45000.00 AS Decimal(18, 2)), CAST(N'2023-06-23T20:37:24.9515924' AS DateTime2))
INSERT [dbo].[Venta] ([Id], [UsuarioId], [ClienteId], [total_v], [fecha_v]) VALUES (30, 16, 15, CAST(118500.00 AS Decimal(18, 2)), CAST(N'2023-07-24T16:51:09.8635434' AS DateTime2))
INSERT [dbo].[Venta] ([Id], [UsuarioId], [ClienteId], [total_v], [fecha_v]) VALUES (31, 17, 10, CAST(277500.00 AS Decimal(18, 2)), CAST(N'2023-08-24T16:53:28.4951148' AS DateTime2))
INSERT [dbo].[Venta] ([Id], [UsuarioId], [ClienteId], [total_v], [fecha_v]) VALUES (32, 17, 17, CAST(24800.00 AS Decimal(18, 2)), CAST(N'2023-09-24T17:23:32.3169323' AS DateTime2))
INSERT [dbo].[Venta] ([Id], [UsuarioId], [ClienteId], [total_v], [fecha_v]) VALUES (33, 17, 1, CAST(218100.00 AS Decimal(18, 2)), CAST(N'2023-10-24T22:12:15.7996804' AS DateTime2))
INSERT [dbo].[Venta] ([Id], [UsuarioId], [ClienteId], [total_v], [fecha_v]) VALUES (34, 16, 15, CAST(35800.00 AS Decimal(18, 2)), CAST(N'2023-06-26T09:14:56.0745850' AS DateTime2))
SET IDENTITY_INSERT [dbo].[Venta] OFF
GO
SET IDENTITY_INSERT [dbo].[Venta_Producto] ON 

INSERT [dbo].[Venta_Producto] ([Id], [ventaId], [productoId], [unidades]) VALUES (16, 29, 1, 15)
INSERT [dbo].[Venta_Producto] ([Id], [ventaId], [productoId], [unidades]) VALUES (17, 30, 1, 16)
INSERT [dbo].[Venta_Producto] ([Id], [ventaId], [productoId], [unidades]) VALUES (18, 30, 2, 15)
INSERT [dbo].[Venta_Producto] ([Id], [ventaId], [productoId], [unidades]) VALUES (19, 31, 2, 45)
INSERT [dbo].[Venta_Producto] ([Id], [ventaId], [productoId], [unidades]) VALUES (20, 31, 1, 10)
INSERT [dbo].[Venta_Producto] ([Id], [ventaId], [productoId], [unidades]) VALUES (21, 31, 1, 12)
INSERT [dbo].[Venta_Producto] ([Id], [ventaId], [productoId], [unidades]) VALUES (22, 32, 1, 2)
INSERT [dbo].[Venta_Producto] ([Id], [ventaId], [productoId], [unidades]) VALUES (23, 32, 2, 4)
INSERT [dbo].[Venta_Producto] ([Id], [ventaId], [productoId], [unidades]) VALUES (24, 33, 2, 33)
INSERT [dbo].[Venta_Producto] ([Id], [ventaId], [productoId], [unidades]) VALUES (25, 33, 1, 21)
INSERT [dbo].[Venta_Producto] ([Id], [ventaId], [productoId], [unidades]) VALUES (26, 34, 6, 7)
INSERT [dbo].[Venta_Producto] ([Id], [ventaId], [productoId], [unidades]) VALUES (27, 34, 2, 3)
SET IDENTITY_INSERT [dbo].[Venta_Producto] OFF
GO
/****** Object:  Index [IX_Venta_ClienteId]    Script Date: 26/06/2023 10:32:40 a. m. ******/
CREATE NONCLUSTERED INDEX [IX_Venta_ClienteId] ON [dbo].[Venta]
(
	[ClienteId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Venta_UsuarioId]    Script Date: 26/06/2023 10:32:40 a. m. ******/
CREATE NONCLUSTERED INDEX [IX_Venta_UsuarioId] ON [dbo].[Venta]
(
	[UsuarioId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Venta_Producto_productoId]    Script Date: 26/06/2023 10:32:40 a. m. ******/
CREATE NONCLUSTERED INDEX [IX_Venta_Producto_productoId] ON [dbo].[Venta_Producto]
(
	[productoId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Venta_Producto_ventaId]    Script Date: 26/06/2023 10:32:40 a. m. ******/
CREATE NONCLUSTERED INDEX [IX_Venta_Producto_ventaId] ON [dbo].[Venta_Producto]
(
	[ventaId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Cliente] ADD  DEFAULT (getdate()) FOR [created_at]
GO
ALTER TABLE [dbo].[Producto] ADD  DEFAULT (getdate()) FOR [created_at]
GO
ALTER TABLE [dbo].[Usuario] ADD  DEFAULT (getdate()) FOR [created_at]
GO
ALTER TABLE [dbo].[Usuario] ADD  DEFAULT ('0001-01-01T00:00:00.0000000') FOR [RefreshTokenExpiryTime]
GO
ALTER TABLE [dbo].[Venta] ADD  DEFAULT (getdate()) FOR [fecha_v]
GO
ALTER TABLE [dbo].[Venta]  WITH CHECK ADD  CONSTRAINT [FK_Venta_Cliente_ClienteId] FOREIGN KEY([ClienteId])
REFERENCES [dbo].[Cliente] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Venta] CHECK CONSTRAINT [FK_Venta_Cliente_ClienteId]
GO
ALTER TABLE [dbo].[Venta]  WITH CHECK ADD  CONSTRAINT [FK_Venta_Usuario_UsuarioId] FOREIGN KEY([UsuarioId])
REFERENCES [dbo].[Usuario] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Venta] CHECK CONSTRAINT [FK_Venta_Usuario_UsuarioId]
GO
ALTER TABLE [dbo].[Venta_Producto]  WITH CHECK ADD  CONSTRAINT [FK_Venta_Producto_Producto_productoId] FOREIGN KEY([productoId])
REFERENCES [dbo].[Producto] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Venta_Producto] CHECK CONSTRAINT [FK_Venta_Producto_Producto_productoId]
GO
ALTER TABLE [dbo].[Venta_Producto]  WITH CHECK ADD  CONSTRAINT [FK_Venta_Producto_Venta_ventaId] FOREIGN KEY([ventaId])
REFERENCES [dbo].[Venta] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Venta_Producto] CHECK CONSTRAINT [FK_Venta_Producto_Venta_ventaId]
GO
USE [master]
GO
ALTER DATABASE [technical_test] SET  READ_WRITE 
GO
