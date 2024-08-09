# Roommaes 

## Descripción
Roommates es una aplicación que permite registrar los gastos realizados por cada habitante, y llevar un control detallado de cuánto debe cada persona y cuánto le deben a ellos. Utiliza llamadas a una API para registrar a cada usuario.

## Uso
**Agregar Roommates:**
- Al hacer clic en el botón "Agregar Roommates", se añadirá un nuevo compañero de habitación a la lista.

**Agregar Gasto:**
- Selecciona un roommate de la lista.
- Ingresa una pequeña descripción del gasto.
- Introduce el monto correspondiente.
- Finalmente, haz clic en "Agregar" para registrar el gasto.

**Visualizar Gastos:**
- Revisa la lista de todos los gastos registrados en la aplicación.

**Editar o Eliminar Gastos:**
- Si necesitas hacer cambios, selecciona un gasto de la lista y elige la opción de editar para modificar la información, o elimina el gasto si ya no es necesario

## Visuales
![Roommates](https://github.com/andgerald/roommates-frontend/blob/main/roommates.PNG)

### Prerrequisitos 📋
Para instalar y ejecutar este proyecto, necesitarás asegurarte de contar con las siguientes herramientas y software, junto con las versiones específicas indicadas:
- Express
- PostgreSQL
- nodemon
- dotenv
- Axios
- uuid

### Instalación 🔧
A continuación, se presenta una guía paso a paso para configurar el entorno de desarrollo y realizar la instalación de todas las dependencias necesarias:
1. Clona el repositorio  tanto el backend como el frontend
  - https://github.com/andgerald/DesafioRoommates.git
  - https://github.com/andgerald/roommates-frontend.git
2. Realiza la instalación de dependencias con **npm install** o **npm i**

## Despliegue 📦
En el siguiente enlace podras ver el proyecto: 
https://andgerald.github.io/roommates-frontend/

**Al momento de visualizar la página, es posible una latencia de 60 segundos o más, ya que se está utilizando render para la base de datos.**
## Ejecutando las Pruebas ⚙️
 **Rutas Gastos**
-  GET: Devuelve el historial con todos los gastos registrados.
    -   http://localhost:3000/gastos
-  POST: Crea un  nuevo gasto.
    -  http://localhost:3000/gasto
-  PUT: Edita los datos de un gasto.
    -  http://localhost:3000/gasto
-  DELETE: Elimina un gasto del historial
    -  http://localhost:3000/gasto

 **Rutas Roommates**
-  POST: Almacena un nuevo roommate ocupando random user.
    -  http://localhost:3000/roommate
-  GET: Devuelve todos los roommates almacenados.
    -  http://localhost:3000/roommate

## Construido Con 🛠️
- [Javascript](https://developer.mozilla.org/es/docs/Web/JavaScript) - El lenguaje utilizado
- [Postgresql](https://www.postgresql.org) - Sistema de base de datos
- [Bootstrap](https://getbootstrap.com/docs/5.3/getting-started/introduction/) - Framework de CSS
- [Ramdom user](https://randomuser.me/api) - API

## Versionado 📌

Usamos [Git](https://git-scm.com) para el versionado.



⌨️ con ❤️ por [Geraldine Becerra](https://github.com/andgerald) 😊
