# 🚍 Trasporte Escolar

Proyecto desarrollado como parte de un **Bootcamp de Express - NodeJS**, utilizando **Node.js, TypeScript, pnpm y Express**.

El proyecto contiene diferentes ejercicios enfocados en el manejo de TypeScript, asincronía y desarrollo de una API REST con Express.

---

## 🛠️ Tecnologías utilizadas

* Node.js
* TypeScript
* Express
* pnpm
* tsx
* ES Modules

---

## 📁 Estructura del proyecto

```text
Trasporte-escolar/
│
├── src/
│   ├── exercise-1/
│   │   └── ...
│   │
│   ├── exercise-2/
│   │   └── ...
│   │
│   └── exercise-3/
│       ├── controllers/
│       │   └── students.controller.ts
│       │
│       ├── middlewares/
│       │   ├── auth.ts
│       │   ├── errorHandler.ts
│       │   └── logger.ts
│       │
│       ├── routes/
│       │   └── students.routes.ts
│       │
│       ├── app.ts
│       └── index.ts
│
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
└── .gitignore
```

---

# 📚 Ejercicios

## Exercise 1

Primer ejercicio del proyecto, enfocado en los fundamentos de **TypeScript y Node.js**.

El ejercicio sirve como introducción al entorno de desarrollo y a la ejecución de código TypeScript utilizando `tsx`.

Para ejecutarlo:

```bash
pnpm run exercise:1
```

---

## Exercise 2 - Asincronía

El segundo ejercicio está enfocado en el manejo de operaciones asíncronas en Node.js.

Se trabajan tres formas de manejar operaciones asíncronas:

* Callbacks
* Promises
* Async/Await

El ejercicio también realiza operaciones relacionadas con la lectura de archivos.

Para ejecutarlo:

```bash
pnpm run exercise:2
```

### Ejemplo de salida

```text
=== CALLBACK ===
=== PROMISE ===
=== ASYNC/AWAIT ===
```

---

# 🚀 Exercise 3 - Express CRUD

El tercer ejercicio amplía el proyecto incorporando **Express con TypeScript**.

El objetivo es crear una API REST para administrar estudiantes de un sistema de transporte escolar.

La API implementa:

* CRUD de estudiantes
* `req.params`
* `req.body`
* Códigos HTTP
* Middleware de logging
* Middleware de autenticación ficticio
* Middleware global de errores
* Organización mediante controllers, routes y middlewares

---

## 📌 Arquitectura

El ejercicio utiliza una estructura separada por responsabilidades:

```text
exercise-3/
│
├── controllers/
│   └── students.controller.ts
│
├── middlewares/
│   ├── auth.ts
│   ├── errorHandler.ts
│   └── logger.ts
│
├── routes/
│   └── students.routes.ts
│
├── app.ts
└── index.ts
```

### Controllers

Contienen la lógica correspondiente a las operaciones CRUD de estudiantes.

### Routes

Definen los endpoints disponibles para la API.

### Middlewares

Contienen funcionalidades que se ejecutan durante el procesamiento de las peticiones:

* Logging
* Autenticación
* Manejo de errores

### `app.ts`

Configura Express y establece el orden de ejecución de los middlewares y las rutas.

### `index.ts`

Inicia el servidor HTTP.

---

# 🔐 Autenticación

El ejercicio utiliza una autenticación ficticia mediante el header:

```text
x-api-key
```

La API espera la siguiente clave:

```text
123456
```

Ejemplo:

```text
x-api-key: 123456
```

Si la API key no está presente o es incorrecta, el servidor responde:

```http
401 Unauthorized
```

```json
{
  "error": "API key inválida o ausente"
}
```

---

# 📝 Logging

Se implementó un middleware que registra:

* Método HTTP
* Ruta solicitada
* Duración de la petición

Ejemplo:

```text
GET /students - 3ms
POST /students - 5ms
GET /students/1 - 2ms
```

---

# 🧩 CRUD de estudiantes

La API utiliza estudiantes almacenados temporalmente en memoria.

Cada estudiante tiene la siguiente estructura:

```json
{
  "id": 1,
  "name": "Juan Pérez",
  "age": 15,
  "route": "Ruta 1"
}
```

---

## Obtener todos los estudiantes

```http
GET /students
```

Respuesta:

```http
200 OK
```

---

## Obtener estudiante por ID

```http
GET /students/:id
```

Ejemplo:

```http
GET /students/1
```

Utiliza:

```ts
req.params.id
```

Si el estudiante existe:

```http
200 OK
```

Si no existe:

```http
404 Not Found
```

```json
{
  "error": "Estudiante no encontrado"
}
```

---

## Crear estudiante

```http
POST /students
```

Body:

```json
{
  "name": "Carlos Rodríguez",
  "age": 14,
  "route": "Ruta 3"
}
```

Respuesta:

```http
201 Created
```

---

## Actualizar estudiante

```http
PUT /students/:id
```

Ejemplo:

```http
PUT /students/1
```

Body:

```json
{
  "name": "Juan Carlos Pérez",
  "age": 16,
  "route": "Ruta 4"
}
```

Utiliza:

```ts
req.params.id
req.body
```

Respuesta:

```http
200 OK
```

---

## Eliminar estudiante

```http
DELETE /students/:id
```

Ejemplo:

```http
DELETE /students/1
```

Si el estudiante existe:

```http
204 No Content
```

Si no existe:

```http
404 Not Found
```

---

# 📊 Códigos HTTP

| Operación                 |                      Código |
| ------------------------- | --------------------------: |
| Obtener estudiantes       |                    `200 OK` |
| Obtener estudiante por ID |                    `200 OK` |
| Crear estudiante          |               `201 Created` |
| Actualizar estudiante     |                    `200 OK` |
| Eliminar estudiante       |            `204 No Content` |
| Estudiante no encontrado  |             `404 Not Found` |
| API key inválida/ausente  |          `401 Unauthorized` |
| Error interno             | `500 Internal Server Error` |

---

# 🔄 Orden de Middlewares

El orden de ejecución de la aplicación es:

```text
Request
   │
   ▼
JSON Parser
   │
   ▼
Logging
   │
   ▼
Authentication
   │
   ▼
Routes
   │
   ▼
Controller
   │
   ▼
Response
```

En caso de producirse un error:

```text
Request
   │
   ▼
Logging
   │
   ▼
Authentication
   │
   ▼
Routes
   │
   ▼
Error
   │
   ▼
Error Handler
   │
   ▼
Response 500
```

El middleware de errores utiliza la firma de cuatro parámetros requerida por Express:

```ts
(err, req, res, next)
```

---

# ▶️ Instalación

Clonar el repositorio:

```bash
git clone <URL_DEL_REPOSITORIO>
```

Entrar al proyecto:

```bash
cd Trasporte-escolar
```

Instalar dependencias:

```bash
pnpm install
```

---

# ⚙️ Scripts disponibles

Actualmente el proyecto cuenta con los siguientes comandos:

```bash
pnpm run exercise:1
```

Ejecuta el ejercicio 1.

```bash
pnpm run exercise:2
```

Ejecuta el ejercicio 2.

```bash
pnpm run exercise:3
```

Ejecuta el servidor Express del ejercicio 3.

Para comprobar errores de TypeScript:

```bash
pnpm exec tsc --noEmit
```

Para compilar el proyecto:

```bash
pnpm run build
```

---

# 🌐 Ejecución del servidor

El servidor del Exercise 3 utiliza por defecto el puerto:

```text
3000
```

Para iniciarlo:

```bash
pnpm run exercise:3
```

El servidor estará disponible en:

```text
http://localhost:3000
```

---

# 🧪 Pruebas de la API

Para probar los endpoints se puede utilizar:

* Postman
* Thunder Client
* Insomnia
* Otra herramienta compatible con APIs REST

Todas las peticiones protegidas deben incluir:

```text
x-api-key: 123456
```

Ejemplo:

```http
GET http://localhost:3000/students
x-api-key: 123456
```

---

# 🎯 Objetivos cumplidos

El Exercise 3 está diseñado para cumplir los siguientes requisitos:

* [x] Servidor Express con TypeScript
* [x] Servidor ejecutándose en un puerto configurado
* [x] GET de todos los estudiantes
* [x] GET de estudiante por ID
* [x] POST de estudiantes
* [x] PUT de estudiantes
* [x] DELETE de estudiantes
* [x] Uso de `req.params`
* [x] Uso de `req.body`
* [x] Código HTTP `200`
* [x] Código HTTP `201`
* [x] Código HTTP `204`
* [x] Código HTTP `404`
* [x] Middleware de logging
* [x] Registro de método HTTP
* [x] Registro de ruta
* [x] Registro de duración
* [x] Middleware de autenticación
* [x] Header `x-api-key`
* [x] Middleware global de errores
* [x] Error handler con cuatro parámetros
* [x] Orden correcto de middlewares

---

# 👨‍💻 Autor

Proyecto desarrollado como parte de un **Bootcamp de Express - NodeJS**.

**Trasporte Escolar**
