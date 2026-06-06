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
- **ORM:** Sequelize
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
   git clone https://github.com/paolaCampero11/Challenge-XAcademy-DEV-2026.git
   cd football-api
2. Levanta los contenedores
    ```bash
    docker compose up 
3. Accede a la aplicación:
    - Frontend: http://localhost:4200
    - Backend API: http://localhost:3000

## Credenciales de Prueba (Listas para usar)
Para facilitar la evaluación, el sistema ya cuenta con un usuario de prueba creado por defecto. Puedes iniciar sesión inmediatamente con:
- **Email**: test@xacademy.com
- **Contraseña**: 123456
*(Nota: Si deseas probar la creación de nuevos usuarios, el endpoint POST /users está habilitado y documentado en la colección de Postman incluida en este repositorio.)

## Colección de Postman
Para probar la API de manera rápida y organizada, se incluye una colección de Postman con todos los endpoints documentados, incluyendo:
- Registro de usuarios
- Login (con script automático para guardar el token JWT)
- CRUD completo de jugadores (con autenticación Bearer Token configurada)
- Filtros y paginación
### Cómo usarla:
1. Abre Postman y haz clic en Import
2. Selecciona el archivo: postman/FIFA Players API.postman_collection.json
3. Ejecuta el request "Login" primero (esto guardará automáticamente el token en la variable jwt_token)
4. Ahora puedes ejecutar cualquier request de la carpeta "Jugadores" sin necesidad de copiar/pegar el token manualmente
Tip: La colección está configurada para usar variables de entorno. Asegúrate de tener seleccionado el entorno correcto en Postman (esquina superior derecha) o usa las variables globales.

## Endpoints Principales
### Autenticación
- POST /users - Registrar nuevo usuario
- POST /auth/login - Iniciar sesión (devuelve JWT)
### Jugadores (Requiere autenticación)
- GET /api/players - Obtener jugadores paginados (soporta filtros: ?name=&club=&position=&page=1&limit=15)
- GET /api/players/:id - Obtener jugador por ID
- POST /api/players - Crear nuevo jugador
- PUT /api/players/:id - Actualizar jugador

## Licencia
Este proyecto fue desarrollado como parte del desafío técnico de XAcademy DEV 2026.