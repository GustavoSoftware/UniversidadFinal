# Universidad - API REST

Este proyecto es una API REST construida con **Node.js**, **TypeScript**, **Express** y **PostgreSQL** para gestionar información de una universidad.

## Características

La API permite administrar:

- Carreras
- Alumnos
- Profesores
- Cursos
- Horarios
- Matrículas (Alumno-Curso)
- Calificaciones
- Pagos
- Usuarios y autenticación

---

## Requisitos

- Node.js **18** o superior
- PostgreSQL en ejecución (local o remoto)

---

## Instalación

1. Clona el repositorio.

```bash
git clone <URL_DEL_REPOSITORIO>
```

2. Ingresa a la carpeta del proyecto.

```bash
cd universidad-api
```

3. Instala las dependencias.

```bash
npm install
```

---

## Configuración

### Variables de entorno

El proyecto utiliza **dotenv** para cargar las variables de entorno desde un archivo `.env` ubicado en la raíz del proyecto.

Variables disponibles:

| Variable | Descripción |
|----------|-------------|
| `JWT_SECRET` | Clave utilizada para firmar y verificar los tokens JWT. |
| `JWT_EXPIRES_IN` | Tiempo de expiración del token (por defecto `1h`). |

Ejemplo de archivo `.env`:

```env
JWT_SECRET=mi_super_clave_secreta
JWT_EXPIRES_IN=1h
```

### Base de datos

El proyecto utiliza **PostgreSQL** mediante un `Pool` de la librería `pg`.

Configuración por defecto:

- Base de datos: `universidad`
- Archivo SQL inicial: `UniversidadDB.sql`

Antes de iniciar la API, ejecuta el script `UniversidadDB.sql` en tu servidor PostgreSQL para crear las tablas y cargar los datos iniciales.

Si necesitas cambiar el usuario, contraseña, host o puerto, modifica el archivo:

```
src/database.ts
```

---

## Comandos disponibles

Todos los comandos se ejecutan desde la raíz del proyecto.

### Desarrollo

Inicia el servidor utilizando `ts-node`.

```bash
npm run dev
```

La aplicación se ejecutará en:

```
http://localhost:3000
```

### Compilar

Compila el proyecto de TypeScript a JavaScript.

```bash
npm run build
```

Los archivos compilados se generan en la carpeta:

```
dist/
```

### Producción

Ejecuta la versión compilada.

```bash
npm start
```

Este comando ejecuta:

```bash
node dist/app.js
```

---

## Endpoints principales

Prefijo base de la API:

```
http://localhost:3000/api/v1
```

### Usuarios

| Método | Endpoint | Descripción |
|---------|----------|-------------|
| GET | `/usuarios` | Listar usuarios |
| POST | `/usuarios` | Registrar usuario |

### Autenticación

| Método | Endpoint | Descripción |
|---------|----------|-------------|
| POST | `/auth/login` | Iniciar sesión y obtener un token JWT |

### Rutas protegidas

Las rutas protegidas utilizan el middleware `requireAuth`.

Debe enviarse el encabezado:

```http
Authorization: Bearer <token>
```

---

## Documentación de la API (Swagger)

Swagger está configurado mediante:

- `swagger-jsdoc`
- `swagger-ui-express`

La documentación se genera automáticamente a partir de las anotaciones `@openapi` ubicadas en:

```
src/routes/
```

Una vez iniciado el servidor, la documentación estará disponible en:

```
http://localhost:3000/api-docs
```

---

## Arquitectura del proyecto

```
src/
│
├── app.ts                 # Punto de entrada
│
├── config/                # Configuración (Swagger, variables de entorno)
│
├── controllers/           # Controladores HTTP
│
├── middlewares/           # Middlewares (Auth, Validaciones)
│
├── models/                # Interfaces TypeScript
│
├── routes/                # Definición de endpoints
│
├── schemas/               # Validaciones con Joi
│
├── services/              # Lógica de negocio y acceso a datos
│
├── shared/                # Clases compartidas
│
└── utils/                 # Utilidades
```

### Descripción de las capas

| Carpeta | Responsabilidad |
|----------|-----------------|
| `app.ts` | Configura Express, middlewares, rutas y Swagger. |
| `routes/` | Define los endpoints y conecta controladores. |
| `controllers/` | Gestiona las peticiones HTTP y delega la lógica a los servicios. |
| `services/` | Contiene la lógica de negocio y realiza consultas a PostgreSQL mediante `pool.query`. |
| `models/` | Interfaces TypeScript del dominio (Alumno, Carrera, Pago, etc.). |
| `schemas/` | Validaciones de `body`, `params` y `query` mediante Joi. |
| `middlewares/` | Middlewares como autenticación y validaciones. |
| `shared/` | Clases compartidas de la aplicación. |
| `utils/` | Funciones auxiliares y utilidades. |

---

## Estado de las pruebas

Actualmente el proyecto **no cuenta con pruebas automatizadas**.

Si deseas agregar pruebas, puedes utilizar herramientas como:

- Jest
- Vitest

Después de configurarlas, recuerda:

- Agregar el script `test` en `package.json`.
- Ubicar los archivos de prueba en `tests/` o dentro de `src/`.

---

## Tecnologías utilizadas

- Node.js
- TypeScript
- Express
- PostgreSQL
- Joi
- JSON Web Token (JWT)
- Swagger (OpenAPI)
- dotenv
- pg
