# Sistema de Gestión de Jugadores (FIFA Manager)

Aplicación web Full-Stack desarrollada para la gestión, búsqueda y administración de jugadores de fútbol. El sistema incluye autenticación segura, filtrado avanzado, paginación y exportación de datos, cumpliendo con las mejores prácticas de arquitectura de software.

## Características Principales

- **Autenticación Segura:** Sistema de Login con JWT (JSON Web Tokens), encriptación de contraseñas con `bcrypt`, Guards en backend y frontend, e Interceptors para manejo automático de tokens.
- **CRUD Completo:** Creación, lectura, actualización y eliminación de jugadores con validaciones estrictas de datos usando DTOs y `class-validator`.
- **Búsqueda y Filtrado:** Paginación del lado del servidor y filtros dinámicos por nombre, club y posición.
- **Exportación de Datos:** Funcionalidad para descargar el listado de jugadores (respetando los filtros aplicados) en formato **CSV** utilizando la librería `xlsx`.
- **Contenerización:** Proyecto completamente dockerizado para un despliegue y ejecución sencillos y consistentes.
- **Interfaz Moderna:** Frontend desarrollado con Angular (Standalone Components) y estilizado con Bootstrap 5 para una experiencia de usuario responsiva y limpia.

## Stack Tecnológico

### Frontend
- **Framework:** Angular version: 21.2.13
- **Gestión de Estado/Formularios:** Reactive Forms, RxJS
- **Estilos:** Bootstrap 5
- **Librerías:** `xlsx` (para exportación CSV), `jwt-decode`

### Backend
- **Framework:** NestJS (TypeScript)
- **Base de Datos:** MySQL
- **ORM:** Sequelize / TypeORM *(Elige el que hayas usado finalmente)*
- **Seguridad:** Passport, JWT, `bcrypt`
- **Validación:** `class-validator`, `class-transformer`

### DevOps
- Docker & Docker Compose

## ⚙️ Instalación y Ejecución

La forma más rápida de ejecutar el proyecto es utilizando Docker.

### Prerrequisitos
- Tener instalado [Docker](https://www.docker.com/) y [Docker Compose](https://docs.docker.com/compose/).

### Pasos
1. Clona el repositorio:
   ```bash
   git clone [https://github.com/paolaCampero11/Challenge-XAcademy-DEV-2026.git]
   cd [football-api]