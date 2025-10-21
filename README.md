# TeamsWhats

Aplicación de red social con backend robusto que permite funciones como registro, autenticación, publicación de posts, seguimiento de usuarios, mensajes, likes y manejo de conversaciones.

Para la construcion del proyecto me baso en la arquitectura multicapa para mantener modularidad, escalabilidad y claridad en la organización del código.

<br/><br/>
<img src="https://raw.githubusercontent.com/DianaCarolina3/TeamsWhats/master/src/public/images/teamswhats-api-docs.png" width="500" />
<img src="https://raw.githubusercontent.com/DianaCarolina3/TeamsWhats/master/src/public/images/teamswhast-schema-db.png" width="500" />


## Caracteristicas

- Registro y autenticación segura de usuarios con JWT
- Seguir y dejar de seguir usuarios (follow / unfollow)
- Crear publicaciones (posts)
- Dar “likes” a publicaciones
- Iniciar conversacion con otro usuario y envio de mensajes
- Uso de Redis para cache y optimización de consultas frecuentes
- Microservicio simulado `mock-db-service` para base de datos remota para pruebas o migraciones

## Stack tecnologico

### Frontend

- **HTML** interfaz básica de inicio

### Backend & API

- **Javascript en Node.js** para desarrollo del lado del servidor
- **Express** framework para construir API RESTful
- **PostgreSQL** base de datos relacional
- **Redis** cache para optimizar operaciones frecuentes y mejorar rendimiento
- **JWT (JSON Web Token)** para autentificacion y autorizacion de usuarios
- **Swagger basado en OpenAPI** para documentación de la API
- **Axios** para conectarse con una base de datos remota simulada de un microservicio

### Development Tools

- ESLint y Prettier para la calidad del código
- Husky para la ejecución automática de Prettier y Eslint antes de un commit, y añade todos los cambios al staging

### Despliegue

- Render para hosting del backend
- Supabase para la base de datos

## Primeros pasos

### Prerequisitos

- Node.js (v16+)
- npm o yarn
- PostgreSQL (v14+)
- Redis

### Instalación

1. Clona el repositorio

```bash
git clone https://github.com/DianaCarolina3/TeamsWhats.git
cd TeamsWhats
```

2. Instalar dependencias

```bash
npm install
# o
yarn
```

3. Configurar variables de entorno
   - Crea un archivo `.env` en la raíz del directorio
   - Añade tus keys de API, POSTGRESQL, CACHE_REDIS, JWT

```
## NODE DEV
NODE_ENV=

## API
API_PORT=your_api_port
API_HOST=your_api_host

## POSTGRESQL
PG_USER=your_pg_user
PG_HOST=your_pg_host
PG_PASSWORD=your_pg_password
PG_DATABASE=your_pg_database
PG_PORT=your_pg_port
PG_SCHEMA=public_or_your_pg_schema

## CACHE_REDIS
REDIS_HOST=your_redis_host
REDIS_PORT=your_redis_port
REDIS_PASSWORD=your_redis_password

## JWT
SECRET=your_secret

## CONNECTION_REMOTE
REMOTE_DB=false

## MOCK_DB_SERVICE
MOCK_DB_SERVICE_HOST=your_db_service_host
MOCK_DB_SERVICE_PORT=your_db_service_port
```

4. Levantar el servidor

```bash
npm start
# o
yarn start
```

5. Acceder a la documentación de la API

Visita la ruta de Swagger ( `/api-docs`) para ver los endpoints disponibles y su uso.


### Estructura del proyecto

-`/mock-db-service`: Microservicio simulado

-`/src`:

- `/app.js`: Punto de inicio de la app y del servidor
- `/Auth`: Lógica de autenticación
- `/cache`: Conexión y lógica Redis
- `/clients`: Conexión con clientes remotos (mock db)
- `/modules`: Módulos de la aplicación
- `/config`: Configuración y dependencias
- `/db`: PostgreSQL y sus repositorios
- `/public`: Archivos estáticos
- `/response`: Manejo de respuestas de la API
- `/routes`: Rutas de la API
- `/test`: Pruebas de endpoints con archivos .http
- `/utils`: Funciones auxiliares

### Características detalladas, seguridad y rendimiento

- Uso de JWT con secret seguro para autentificar usuario y validar usuario que acciones puede realizar
- Cache con Redis para disminuir la carga en la base de datos y optimizar operaciones frecuentes
- Manejo de errores controlados y respuestas estandar de la API
- Arquitectura modular y escalable, compatible con microservicios
- `mock-db-service` actúa como un microservicio en una simulacion que permite pruebas de interacción con base de datos remota pensado para migraciones o entornos de prueba, la conexion de la api al servicio se realiza mediante Axios.</br>
  Forma parte de un entorno de práctica diseñado para aplicar conceptos de **arquitectura distribuida**, **comunicación entre servicios** (Axios, REST) y **modelado de escenarios reales** en entornos backend modernos.
  Su propósito es servir como base de experimentación para comprender la interacción interservicio y la infraestructura modular de un sistema orientado a microservicios.

### Documentación de la API

Todos los endpoints disponibles están documentados con Swagger. Puedes consultar los métodos HTTP aceptados, parámetros esperados, respuestas y modelos de datos.
https://teamswhats.onrender.com/api-docs

### Licencia

Este proyecto está bajo la licencia [licencia MIT](https://opensource.org/licenses/MIT).
