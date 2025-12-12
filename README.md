Instrucciones para correr los dos proyectos

Ambos proyectos fueron desarrollados en JavaScript, específicamente TypeScript, tanto en el frontend como en el backend. La base de datos utilizada es SQLite, manejada con Prisma como ORM.
A continuación se detallan los pasos para ejecutar ambos proyectos:

Clonar este repositorio.

Moverse a la carpeta raíz de cada proyecto (frontend y backend).

Dentro de cada carpeta, ejecutar:

npm i


para instalar todas las dependencias necesarias.

Verificar los puertos de ejecución:

Vite suele correr en el 5173.

El backend corre en el 3080 por defecto.

Si el frontend usa un puerto distinto al 5173, modificar el archivo app.ts (ruta: backend/src/app.ts) y colocar el puerto correcto para evitar problemas de CORS.

El backend cuenta con un endpoint principal:
http://localhost:3080/api/cards

Desde este endpoint se pueden ejecutar todos los métodos CRUD.

Para el método GET, puedes enviar opcionalmente dos parámetros para filtrar datos: id y cardHolder.
Si no se envía ninguno, se retorna toda la data almacenada.

Tanto PUT como DELETE requieren enviar el id en la URL. Ejemplo:

PUT http://localhost:3080/api/cards/1


Para realizar un PUT, es necesario enviar en el body los campos a actualizar y usar el header:

Content-Type: application/json


(Por ejemplo, si se prueba con Postman).

Finalmente, para correr los proyectos ejecutar:

npm run dev

Estructura del proyecto

El proyecto contiene dos carpetas principales:

frontend

Desarrollado con React, TypeScript, TailwindCSS y Lucide React.

La mayor parte de la lógica está en un solo archivo para facilitar el seguimiento.

Para validaciones y llamadas a la API existe un archivo adicional: aux.tsx.

Actualmente el frontend usa los métodos GET y POST.

GET funciona desde el backend, pero por temas de tiempo no se logró renderizar el resultado en pantalla.

POST crea nuevas cards.

Los métodos PUT y DELETE están implementados en aux.tsx, aunque no integrados en la UI.

backend

Usa Prisma como ORM, SQLite como base de datos y Express con TypeScript sobre Node.js.

Se recomienda usar DB Browser for SQLite u otra herramienta similar para visualizar la base de datos.

La API expone un único endpoint con diferentes métodos HTTP.

La estructura está pensada de forma modular: routers, services, controllers, etc.

