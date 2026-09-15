# 🚍 Transporte Escolar

Proyecto desarrollado con **Node.js, TypeScript, Express y pnpm**, orientado al desarrollo de una API REST para la gestión de estudiantes de una empresa de transporte escolar.

El proyecto se desarrolla progresivamente mediante ejercicios prácticos sobre fundamentos de Node.js, programación asíncrona, Express, arquitectura por capas, validación, manejo de errores, autenticación y logging.

---

## 🛠️ Tecnologías utilizadas

* **Node.js**
* **TypeScript**
* **Express**
* **pnpm**
* **Zod**
* **Winston**
* **Morgan**
* **tsx**
* **ES Modules (ESM)**

### Versiones principales

```text
Node.js: 22.22.0
TypeScript: 7.0.2
pnpm: 10.33.0
tsx: 4.23.12
```

---

# 📚 Contenido del proyecto

## Semana 01 — Fundamentos de Node.js

En esta etapa se trabajaron los conceptos fundamentales de Node.js y TypeScript.

### Temas

* Event Loop
* I/O no bloqueante
* TypeScript
* ES Modules
* `import` / `export`
* Módulo `fs`
* Módulo `path`
* Lectura de archivos
* Estructura básica de un proyecto Node.js

---

## Semana 02 — Patrones asíncronos

Se compararon diferentes formas de manejar operaciones asíncronas en Node.js.

### Implementaciones

* Callbacks
* Promises
* `async/await`

Se utilizó la lectura de un archivo `students.txt` como ejemplo práctico.

### Ejecución

```bash
pnpm run exercise:2
```

---

# 🚀 Semana 03 — API REST con Express

Se implementó una API REST para administrar estudiantes.

La API permite realizar operaciones CRUD:

| Método | Endpoint        | Descripción                   |
| ------ | --------------- | ----------------------------- |
| GET    | `/students`     | Obtener todos los estudiantes |
| GET    | `/students/:id` | Obtener un estudiante         |
| POST   | `/students`     | Crear estudiante              |
| PUT    | `/students/:id` | Actualizar estudiante         |
| DELETE | `/students/:id` | Eliminar estudiante           |

---

# 🏗️ Arquitectura

El proyecto utiliza una arquitectura organizada por responsabilidades:

```text
src/
└── exercise-3/
    ├── controllers/
    │   └── students.controller.ts
    │
    ├── dtos/
    │   └── student.dto.ts
    │
    ├── middlewares/
    │   ├── auth.ts
    │   ├── errorHandler.ts
    │   ├── logger.ts
    │   ├── notFound.ts
    │   └── validate.ts
    │
    ├── repositories/
    │   └── students.repository.ts
    │
    ├── services/
    │   └── students.service.ts
    │
    ├── types/
    │   ├── api.types.ts
    │   └── student.types.ts
    │
    ├── errors/
    │   └── AppError.ts
    │
    ├── schemas/
    │   └── student.schema.ts
    │
    ├── utils/
    │   └── logger.ts
    │
    ├── app.ts
    └── index.ts
```

### Responsabilidades

#### Controller

Gestiona las peticiones HTTP y las respuestas.

```text
Request → Controller → Service
```

#### Service

Contiene la lógica de negocio.

```text
Controller → Service → Repository
```

#### Repository

Se encarga del acceso y manipulación de los datos.

Actualmente se utiliza un arreglo en memoria como almacenamiento temporal.

#### DTO

Define la estructura de los datos que recibe la aplicación.

#### Schemas

Utiliza **Zod** para validar los datos recibidos.

#### Middleware

Permite ejecutar lógica antes o después de las rutas, como autenticación, validación, logging y manejo de errores.

---

# 📦 Semana 04 — Validación, errores y logging

En esta etapa se agregaron mecanismos para mejorar la seguridad, validación y mantenimiento de la API.

## Validación con Zod

Se implementaron esquemas para:

* Crear estudiantes
* Actualizar estudiantes
* Validar IDs
* Validar parámetros de paginación

Ejemplo:

```json
{
  "name": "Carlos Pérez",
  "age": 15,
  "route": "Ruta Norte"
}
```

La API valida que:

* `name` sea un texto obligatorio.
* `age` sea un número entero mayor que cero.
* `route` sea un texto obligatorio.

---

# 📄 DTOs

Se utilizan DTOs derivados directamente de los esquemas de Zod.

```text
CreateStudentDTO
UpdateStudentDTO
```

Esto permite mantener sincronizada la validación con los tipos utilizados por TypeScript.

---

# ❌ Manejo de errores

Se creó una clase personalizada:

```text
AppError
```

Esta permite definir:

* Mensaje
* Código HTTP
* Código interno del error
* Si el error es operacional

Ejemplo:

```text
STUDENT_NOT_FOUND
```

Cuando un estudiante no existe:

```http
404 Not Found
```

Respuesta:

```json
{
  "error": {
    "code": "STUDENT_NOT_FOUND",
    "message": "Estudiante no encontrado"
  }
}
```

---

# ⚠️ Error Handler

Todos los errores son procesados mediante un middleware centralizado.

Se manejan principalmente:

### Errores de validación

```http
400 Bad Request
```

Ejemplo:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Los datos enviados no son válidos",
    "details": []
  }
}
```

### Recurso no encontrado

```http
404 Not Found
```

### Error interno

```http
500 Internal Server Error
```

---

# 🔐 Autenticación

Se implementó un middleware de autenticación mediante API Key.

La petición debe incluir el header:

```http
x-api-key: 123456
```

Las peticiones que no proporcionen una API Key válida son rechazadas.

---

# 📊 Paginación

El endpoint:

```http
GET /students
```

permite utilizar paginación mediante:

```text
?page=1&limit=10
```

Ejemplo:

```http
GET /students?page=1&limit=10
```

La respuesta incluye:

```json
{
  "data": [],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 2,
    "totalPages": 1
  }
}
```

---

# 📝 Logging

Se implementaron dos herramientas de logging:

## Morgan

Morgan registra información de las peticiones HTTP:

```text
GET /students
POST /students
PUT /students/:id
DELETE /students/:id
```

## Winston

Winston administra los logs de la aplicación.

Se generan archivos:

```text
logs/
├── combined.log
└── error.log
```

Los logs incluyen información como:

```text
GET /students - 200 - 15ms
```

Esto permite conocer:

* Método HTTP
* Ruta
* Código de respuesta
* Tiempo de respuesta

---

# 🔄 Flujo de Middleware

La aplicación sigue el siguiente orden:

```text
Request
   ↓
Express JSON
   ↓
Morgan
   ↓
Logger Middleware
   ↓
Auth Middleware
   ↓
Routes
   ↓
Validation
   ↓
Controller
   ↓
Service
   ↓
Repository
   ↓
Response
   ↓
Error Handler
```

Para rutas inexistentes:

```text
Request
   ↓
Not Found Middleware
   ↓
Error Handler
   ↓
404
```

---

# 📡 API

## Obtener estudiantes

```http
GET /students
```

También permite:

```http
GET /students?page=1&limit=10
```

Respuesta:

```http
200 OK
```

---

## Obtener estudiante por ID

```http
GET /students/1
```

Respuesta exitosa:

```http
200 OK
```

Si no existe:

```http
404 Not Found
```

---

## Crear estudiante

```http
POST /students
```

Header:

```http
Content-Type: application/json
x-api-key: 123456
```

Body:

```json
{
  "name": "Carlos Pérez",
  "age": 15,
  "route": "Ruta Norte"
}
```

Respuesta:

```http
201 Created
```

---

## Actualizar estudiante

```http
PUT /students/1
```

Body:

```json
{
  "name": "Carlos Pérez",
  "age": 16
}
```

Respuesta:

```http
200 OK
```

---

## Eliminar estudiante

```http
DELETE /students/1
```

Respuesta:

```http
204 No Content
```

---

# 🧪 Pruebas

Las funcionalidades de la API fueron probadas utilizando **Postman**.

Se verificaron:

* ✅ Obtener estudiantes
* ✅ Obtener estudiante por ID
* ✅ Crear estudiante
* ✅ Actualizar estudiante
* ✅ Eliminar estudiante
* ✅ Validación de datos
* ✅ IDs inválidos
* ✅ Estudiantes inexistentes
* ✅ API Key válida
* ✅ API Key inválida
* ✅ Rutas inexistentes
* ✅ Paginación
* ✅ Códigos HTTP
* ✅ Manejo de errores
* ✅ Logging

---

# ▶️ Instalación

Clonar el repositorio:

```bash
git clone <URL_DEL_REPOSITORIO>
```

Entrar al proyecto:

```bash
cd trasporte-escolar
```

Instalar dependencias:

```bash
pnpm install
```

---

# ▶️ Ejecución

### Ejercicio 1

```bash
pnpm run exercise:1
```

### Ejercicio 2

```bash
pnpm run exercise:2
```

### Ejercicio 3

```bash
pnpm run exercise:3
```

El servidor estará disponible en:

```text
http://localhost:3000
```

---

# 🏗️ Compilar TypeScript

Para comprobar que el proyecto no tiene errores de TypeScript:

```bash
pnpm exec tsc --noEmit
```

Para generar la versión compilada:

```bash
pnpm run build
```

Los archivos compilados se generan en:

```text
dist/
```

---

# 📁 Estructura general

```text
trasporte-escolar/
│
├── src/
│   ├── exercise-1/
│   ├── exercise-2/
│   └── exercise-3/
│       ├── controllers/
│       ├── dtos/
│       ├── errors/
│       ├── middlewares/
│       ├── repositories/
│       ├── routes/
│       ├── schemas/
│       ├── services/
│       ├── types/
│       ├── utils/
│       ├── app.ts
│       └── index.ts
│
├── logs/
├── dist/
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
└── README.md
```

---

# 🎯 Objetivos alcanzados

* [x] Configuración de Node.js + TypeScript
* [x] Uso de ES Modules
* [x] Manejo de archivos con Node.js
* [x] Callbacks
* [x] Promises
* [x] Async/Await
* [x] Creación de servidor Express
* [x] API REST
* [x] CRUD de estudiantes
* [x] Arquitectura Controller / Service / Repository
* [x] DTOs
* [x] Validación con Zod
* [x] Manejo de errores personalizado
* [x] Middleware de autenticación
* [x] Middleware de logging
* [x] Morgan
* [x] Winston
* [x] Paginación
* [x] Respuestas HTTP correctas
* [x] Pruebas con Postman
* [x] Compilación TypeScript

---

# 🚧 Próximos pasos

Entre las posibles mejoras futuras se encuentran:

* Persistencia con una base de datos.
* Implementación de rutas, vehículos y conductores.
* Autenticación más robusta mediante JWT.
* Tests automatizados.
* Documentación con Swagger/OpenAPI.
* Variables de entorno mediante `.env`.
* Dockerización de la aplicación.
* Deploy de la API.

---

## 👨‍💻 Autor

Proyecto desarrollado como parte del proceso de formación en desarrollo backend con Node.js, TypeScript y Express.
