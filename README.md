# 🚍 Transporte Escolar

API REST desarrollada con **Node.js, TypeScript, Express y pnpm**, como parte del Bootcamp de Express - NodeJS.

El proyecto simula la gestión de estudiantes de una empresa de transporte escolar mediante una API CRUD organizada bajo una arquitectura en capas.

---

## 📚 Semana 03 — REST API y Arquitectura en Capas

### Objetivos

* Implementar una API REST con Express.
* Organizar el proyecto usando arquitectura en capas.
* Separar responsabilidades entre rutas, controladores, servicios y repositorios.
* Utilizar TypeScript para tipar datos y DTOs.
* Implementar respuestas JSON consistentes.
* Agregar paginación.
* Validar los datos recibidos.
* Manejar errores de forma uniforme.
* Implementar middlewares personalizados.

---

## 🛠️ Tecnologías utilizadas

* [Node.js](https://nodejs.org/)
* [TypeScript](https://www.typescriptlang.org/)
* [Express](https://expressjs.com/)
* [pnpm](https://pnpm.io/)
* [tsx](https://tsx.is/)
* Postman para pruebas de la API.

---

## 📦 Requisitos previos

Antes de ejecutar el proyecto, debes tener instalado:

* Node.js
* pnpm
* Git

Puedes verificar las versiones con:

```bash
node -v
pnpm -v
git --version
```

---

## 🚀 Instalación

Clona el repositorio:

```bash
git clone URL_DEL_REPOSITORIO
```

Ingresa a la carpeta del proyecto:

```bash
cd trasporte-escolar
```

Instala las dependencias:

```bash
pnpm install
```

---

## ▶️ Ejecución del proyecto

### Ejecutar el ejercicio 1

```bash
pnpm run exercise:1
```

### Ejecutar el ejercicio 2

```bash
pnpm run exercise:2
```

### Ejecutar la API REST

```bash
pnpm run exercise:3
```

El servidor estará disponible en:

```text
http://localhost:3000
```

---

## 🧪 Verificar TypeScript

Para comprobar que no existen errores de TypeScript:

```bash
pnpm exec tsc --noEmit
```

Para compilar el proyecto:

```bash
pnpm run build
```

---

## 📁 Estructura del proyecto

```text
trasporte-escolar/
│
├── src/
│   │
│   ├── exercise-1/
│   │   └── index.ts
│   │
│   ├── exercise-2/
│   │   └── index.ts
│   │
│   └── exercise-3/
│       │
│       ├── controllers/
│       │   └── students.controller.ts
│       │
│       ├── dtos/
│       │   └── student.dto.ts
│       │
│       ├── middlewares/
│       │   ├── auth.ts
│       │   ├── errorHandler.ts
│       │   └── logger.ts
│       │
│       ├── repositories/
│       │   └── students.repository.ts
│       │
│       ├── routes/
│       │   └── students.routes.ts
│       │
│       ├── services/
│       │   └── students.service.ts
│       │
│       ├── types/
│       │   ├── api.types.ts
│       │   └── student.types.ts
│       │
│       ├── app.ts
│       └── index.ts
│
├── .gitignore
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
└── README.md
```

---

## 🏗️ Arquitectura en capas

La API utiliza la siguiente estructura:

```text
Cliente
   │
   ▼
Routes
   │
   ▼
Controllers
   │
   ▼
Services
   │
   ▼
Repositories
   │
   ▼
Datos en memoria
```

### Routes

Define los endpoints disponibles y dirige cada solicitud al controlador correspondiente.

### Controllers

Recibe las solicitudes HTTP, obtiene los parámetros y devuelve las respuestas al cliente.

### Services

Contiene la lógica de negocio, validaciones y reglas de la aplicación.

### Repositories

Se encarga de consultar, crear, actualizar y eliminar estudiantes.

Actualmente utiliza un arreglo en memoria como fuente de datos.

### DTOs

Define la estructura de los datos recibidos en las operaciones de creación y actualización.

### Types

Contiene las interfaces utilizadas para tipar estudiantes y respuestas de la API.

### Middlewares

Incluye:

* Autenticación mediante API Key.
* Registro de solicitudes.
* Manejo global de errores.

---

## 🔐 Autenticación

La API utiliza un middleware de autenticación simulado mediante el header:

```http
x-api-key: 123456
```

Este header debe enviarse en todas las solicitudes.

### Ejemplo

```http
GET http://localhost:3000/students
x-api-key: 123456
```

Si la API Key es incorrecta o no se envía, la solicitud será rechazada.

---

## 🌐 Endpoints

La ruta base es:

```text
http://localhost:3000/students
```

---

### Obtener todos los estudiantes

```http
GET /students
```

Ejemplo:

```http
GET http://localhost:3000/students
```

Respuesta:

```json
{
  "data": [
    {
      "id": 1,
      "name": "Juan Pérez",
      "age": 15,
      "route": "Ruta 1"
    },
    {
      "id": 2,
      "name": "María Gómez",
      "age": 16,
      "route": "Ruta 2"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 2,
    "totalPages": 1
  }
}
```

---

### Obtener un estudiante por ID

```http
GET /students/:id
```

Ejemplo:

```http
GET http://localhost:3000/students/1
```

Respuesta:

```json
{
  "data": {
    "id": 1,
    "name": "Juan Pérez",
    "age": 15,
    "route": "Ruta 1"
  }
}
```

---

### Crear un estudiante

```http
POST /students
```

Ejemplo:

```http
POST http://localhost:3000/students
```

Body:

```json
{
  "name": "Carlos Rodríguez",
  "age": 17,
  "route": "Ruta 3"
}
```

Respuesta:

```json
{
  "data": {
    "id": 3,
    "name": "Carlos Rodríguez",
    "age": 17,
    "route": "Ruta 3"
  }
}
```

Código HTTP:

```text
201 Created
```

---

### Actualizar un estudiante

```http
PUT /students/:id
```

Ejemplo:

```http
PUT http://localhost:3000/students/1
```

Body:

```json
{
  "name": "Juan Pérez actualizado",
  "age": 16,
  "route": "Ruta 4"
}
```

Respuesta:

```json
{
  "data": {
    "id": 1,
    "name": "Juan Pérez actualizado",
    "age": 16,
    "route": "Ruta 4"
  }
}
```

Código HTTP:

```text
200 OK
```

---

### Eliminar un estudiante

```http
DELETE /students/:id
```

Ejemplo:

```http
DELETE http://localhost:3000/students/1
```

Respuesta:

```text
204 No Content
```

---

## 📄 Paginación

El endpoint `GET /students` permite utilizar los parámetros:

* `page`: número de página.
* `limit`: cantidad de estudiantes por página.

Ejemplo:

```http
GET http://localhost:3000/students?page=1&limit=2
```

Respuesta:

```json
{
  "data": [
    {
      "id": 1,
      "name": "Juan Pérez",
      "age": 15,
      "route": "Ruta 1"
    },
    {
      "id": 2,
      "name": "María Gómez",
      "age": 16,
      "route": "Ruta 2"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 2,
    "total": 2,
    "totalPages": 1
  }
}
```

El límite máximo permitido es de `100` estudiantes por página.

---

## ✅ Validaciones

La API valida los datos enviados al crear o actualizar estudiantes.

### Nombre

* Debe ser un texto.
* No puede estar vacío.

### Edad

* Debe ser un número entero.
* Debe ser mayor que cero.

### Ruta

* Debe ser un texto.
* No puede estar vacía.

Ejemplo de solicitud inválida:

```json
{
  "name": "",
  "age": -5,
  "route": ""
}
```

Respuesta:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "El nombre es obligatorio"
  }
}
```

---

## ❌ Manejo de errores

La API utiliza un formato uniforme para los errores:

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Descripción del error"
  }
}
```

### Estudiante no encontrado

Código HTTP:

```text
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

### ID inválido

Código HTTP:

```text
400 Bad Request
```

Respuesta:

```json
{
  "error": {
    "code": "INVALID_ID",
    "message": "El ID debe ser un número entero positivo"
  }
}
```

### Error interno

Código HTTP:

```text
500 Internal Server Error
```

Respuesta:

```json
{
  "error": {
    "code": "INTERNAL_SERVER_ERROR",
    "message": "Descripción del error"
  }
}
```

---

## 📊 Códigos HTTP utilizados

| Código | Descripción                     |
| ------ | ------------------------------- |
| `200`  | Solicitud exitosa               |
| `201`  | Recurso creado                  |
| `204`  | Recurso eliminado correctamente |
| `400`  | Solicitud inválida              |
| `404`  | Recurso no encontrado           |
| `500`  | Error interno del servidor      |

---

## 🧾 Middleware de logging

La API registra información de cada solicitud:

* Método HTTP.
* Ruta solicitada.
* Duración de la solicitud.

Ejemplo de log:

```text
[GET] /students - 3ms
[POST] /students - 2ms
[DELETE] /students/1 - 1ms
```

---

## 🧪 Pruebas realizadas

La API fue probada utilizando Postman.

Pruebas realizadas:

* Obtener todos los estudiantes.
* Obtener un estudiante por ID.
* Crear un estudiante.
* Actualizar un estudiante.
* Eliminar un estudiante.
* Consultar un estudiante inexistente.
* Enviar un ID inválido.
* Probar la autenticación mediante API Key.
* Probar la paginación.
* Probar validaciones de datos.
* Verificar respuestas y códigos HTTP.

---

## 💾 Fuente de datos

Actualmente los estudiantes se almacenan en un arreglo en memoria.

Esto significa que:

* Los datos se crean mientras el servidor está ejecutándose.
* Los datos se pierden cuando se reinicia el servidor.
* No se utiliza todavía una base de datos.

En futuras versiones se puede integrar una base de datos como PostgreSQL o MongoDB.

---

## 📌 Estado del proyecto

### Completado

* [x] Configuración de Node.js.
* [x] Configuración de TypeScript.
* [x] Configuración de pnpm.
* [x] Ejercicio de callbacks.
* [x] Ejercicio de Promises.
* [x] Ejercicio de async/await.
* [x] Servidor Express.
* [x] CRUD de estudiantes.
* [x] Arquitectura en capas.
* [x] DTOs tipados.
* [x] Paginación.
* [x] Validaciones.
* [x] Middleware de autenticación.
* [x] Middleware de logging.
* [x] Middleware global de errores.
* [x] Pruebas en Postman.

### Próximas mejoras

* [ ] Conectar una base de datos.
* [ ] Agregar variables de entorno.
* [ ] Agregar pruebas automatizadas.
* [ ] Implementar documentación con Swagger.
* [ ] Agregar más entidades: rutas, vehículos y conductores.
* [ ] Implementar autenticación real.
* [ ] Agregar paginación y filtros avanzados.

---

## 👨‍💻 Autor

**Angel Gomez**

Proyecto académico desarrollado para el Bootcamp de Express - NodeJS.

---

## 📄 Licencia

Este proyecto fue desarrollado con fines educativos.
