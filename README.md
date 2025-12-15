# Instrucciones para ejecutar los proyectos

Este repositorio contiene **dos proyectos independientes**: un **frontend** y un **backend**.

Ambos fueron desarrollados en **JavaScript con TypeScript**, tanto del lado del cliente como del servidor. La base de datos utilizada es **SQLite**, gestionada mediante **Prisma** como ORM.

---

## Requisitos previos

Antes de comenzar, asegúrate de tener instalado:

- Node.js
- npm

---

## Pasos para ejecutar los proyectos

### 1. Clonar el repositorio

Clona este repositorio en tu máquina local.

---

### 2. Instalar dependencias

Debes realizar este paso **en ambos proyectos**.

1. Navega a la carpeta raíz del **frontend**.
2. Ejecuta:

```bash
npm i
```

3. Repite el mismo procedimiento en la carpeta raíz del **backend**.

---

### 3. Configuración de puertos

- El **frontend**, al usar Vite, suele ejecutarse en el puerto **5173**.
- El **backend** se ejecuta por defecto en el puerto **3080**.

Si el frontend se ejecuta en un puerto distinto al **5173**, debes actualizar el archivo:

```
backend/src/app.ts
```

Coloca allí el puerto correcto del frontend para evitar problemas de **CORS**.

---

### 4. Generar el cliente de Prisma

Desde la carpeta **backend**, ejecuta:

```bash
npx prisma generate
```

Este comando genera el código necesario para interactuar con la base de datos.

---

### 5. Ejecutar los proyectos

En cada proyecto (frontend y backend), ejecuta:

```bash
npm run dev
```

---

## Backend

### Descripción general

El backend está construido con:

- Node.js
- Express
- TypeScript
- Prisma como ORM
- SQLite como base de datos

Se recomienda utilizar **DB Browser for SQLite** (u otra herramienta similar) para visualizar el contenido de la base de datos.

---

### Endpoints disponibles

La API expone un único endpoint principal:

```
http://localhost:3080/api/cards
```

Desde este endpoint se pueden ejecutar todas las operaciones **CRUD**.

#### GET

- Permite obtener todas las cards almacenadas.
- Acepta opcionalmente los siguientes parámetros de consulta para filtrar resultados:
  - `id`
  - `cardHolder`

Si no se envía ningún parámetro, se retorna toda la información disponible.

#### POST

- Crea una nueva card.

#### PUT

- Requiere enviar el `id` en la URL.

Ejemplo:

```
PUT http://localhost:3080/api/cards/1
```

- En el body se deben enviar los campos a actualizar.
- Es obligatorio incluir el header:

```
Content-Type: application/json
```

#### DELETE

- Requiere enviar el `id` en la URL, de forma similar al método PUT.

---

### Estructura del backend

La estructura del backend está organizada de forma modular, separando responsabilidades en:

- Routers
- Controllers
- Services

---

## Frontend

### Descripción general

El frontend fue desarrollado con:

- React
- TypeScript
- TailwindCSS
- Lucide React

La mayor parte de la lógica se encuentra concentrada en un solo archivo, con el objetivo de facilitar el seguimiento del flujo de la aplicación.

Existe un archivo adicional llamado `aux.tsx` que se encarga de:

- Validaciones
- Llamadas a la API

---

### Funcionalidad actual

- El frontend utiliza actualmente los métodos **GET**, **POST**  y **DELETE**.
- El método **GET** funciona correctamente desde el backend, pero por limitaciones de tiempo no se logró renderizar la información en pantalla.
- El método **POST** permite crear nuevas cards.
- El meotdo **DELETE** permite eliminar una card, solo es necesario pasar el click sobre la card deseada (en la seccion mis tarjetas) y hacer click en el icono de eliminar
- El métodos **PUT** esta implementados en `aux.tsx`, pero aún no está integrado en la interfaz de usuario.

---

## Estructura general del proyecto

El repositorio contiene dos carpetas principales:

- `frontend`
- `backend`

Cada una debe ejecutarse de forma independiente siguiendo los pasos descritos anteriormente.

