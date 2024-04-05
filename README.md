# Tienda de Libros

![Badge en Desarollo](https://img.shields.io/badge/STATUS-EN%20DESARROLLO-orange)

**Desarrolladores :** _Felipe Saavedra - Ricardo Barrientos_

_[Ir a la Tienda...](https://tienda-libros-final-front.onrender.com/)_


### Indice

1. [Presentacion y prototipo](#presentacion-y-prototipo)
2. [Desarrollo del frontend](#desarrollo-del-frontend)
3. [Desarrollo del Backend](#desarrollo-del-backend)
   - [Consideraciones](#consideraciones)
   - [API - Documentación de rutas](#api-documentacion-de-rutas)
4. [Integracion y despliegue](#integracion-y-despliegue)
   - [Credenciales para Uso](#credenciales-para-uso)
5. [Presentación de Proyecto](#presentación-de-proyecto) _Pendiente_
6. [Conclusiones](#conclusiones) _Pendiente_



## Presentacion y Prototipo

- [Link de descargar de documento PDF:](https://tienda-libros-final-front.onrender.com/)

## Desarrollo del Frontend

Para el segundo hito de nuestro proyecto, nos enfocamos en el desarrollo de la aplicación cliente utilizando React. A continuación, detallamos los pasos que seguimos:

1. **Creación del Proyecto**: Iniciamos creando un nuevo proyecto en React, asegurándonos de incluir las dependencias adecuadas que se alinearan con el diseño y temática definida en nuestra propuesta inicial.

2. **Uso de Bootstrap para el Manejo de Layout y Estilos**: Utilizamos Bootstrap para el manejo de layout y estilos, asegurando una apariencia atractiva y una estructura coherente en nuestra aplicación.

3. **Uso de Componentes y Hooks**: Implementamos una arquitectura basada en componentes para promover la reutilización de código y una clara separación de secciones en nuestra aplicación. Además, integramos los hooks necesarios para gestionar el ciclo de vida y el estado local de los componentes.

4. **Navegación con React Router**: Empleamos React Router para la gestión de la navegación entre las diferentes vistas de nuestra aplicación. Esto nos permitió establecer rutas claras y estructuradas, facilitando la experiencia de usuario al permitir una navegación fluida.

5. **Gestión de Estado Global con Context API**: Para mantener un estado coherente en toda la aplicación, optamos por utilizar Context API de React. Esta herramienta nos permitió gestionar de manera eficiente el estado global de la aplicación, asegurando una comunicación efectiva entre componentes sin necesidad de pasar props de manera excesiva.

6. **Preparación para el Consumo de Datos**: Finalmente, nos aseguramos de preparar nuestra aplicación para el consumo de datos, siguiendo el contrato definido en nuestra propuesta inicial. Esto implicó configurar las solicitudes de datos hacia el backend de acuerdo con las especificaciones establecidas, garantizando una integración sin problemas entre el frontend y el backend de nuestra aplicación.

Con estos pasos, logramos desarrollar un frontend robusto y altamente funcional que cumplió con los objetivos planteados en nuestra propuesta inicial.


## Desarrollo del Backend

Durante el tercer hito de nuestro proyecto, nos enfocamos en el desarrollo del backend utilizando Express. A continuación, describimos los pasos que seguimos para alcanzar nuestros objetivos:

1. **Creación del Proyecto con Express**: Iniciamos creando un nuevo proyecto utilizando Express, un framework de Node.js ampliamente utilizado para construir aplicaciones web y APIs.

2. **Instalación de Dependencias**: Instalamos las dependencias descritas en nuestra propuesta, incluyendo cors, dotenv y otras dependencias necesarias para el correcto funcionamiento de nuestro backend.

3. **Creación de Rutas con react-router-dom**: Implementamos las diferentes rutas utilizando react-router-dom, siguiendo el esquema definido en nuestra propuesta. Esto nos permitió estructurar nuestra API de manera coherente y accesible.

4. **Levantamiento de la API REST**: Implementamos una API REST capaz de gestionar los datos de nuestra base de datos PostgreSQL, utilizando la dependencia PG para interactuar con la base de datos. Además, utilizamos bcryptjs para el manejo seguro de contraseñas de usuarios, garantizando la protección de los datos sensibles.

5. **Implementación de Autenticación y Autorización con JWT**: Para garantizar la seguridad de nuestra aplicación, implementamos un sistema de autenticación y autorización de usuarios utilizando JSON Web Tokens (JWT). Esto nos permitió proteger nuestros endpoints y controlar el acceso a los recursos protegidos de manera eficiente.

6. **Pruebas de Rutas con Supertest y Thunder Client**: Utilizamos el paquete supertest para realizar pruebas a diferentes rutas de nuestra API REST, asegurándonos de que funcionen correctamente y respondan adecuadamente a las solicitudes. Además, empleamos la extensión Thunder Client para realizar pruebas adicionales de las diferentes rutas de nuestra API REST, garantizando su correcto funcionamiento.

Con estos pasos, logramos desarrollar un backend sólido y confiable que cumplió con los requisitos de nuestra aplicación y facilitó una comunicación eficiente entre el frontend y el backend.


### Consideraciones

- En la raiz del repositorio se encuentra la carpeta [ script_bd ] donde está el archivo con las querys para creacion de base de datos y tablas

- En la raiz del repositorio se encuentra la carpeta [ script_bd ] con los archivos para cargar la informacion base del sitio web, Libros, Autores, Editoriales, Generos y Usuarios (cliente y admin)

- El registro de usuario solo permite crear un usuario del tipo Usuario (cliente), para crear un usuario Admin, se debe asignar el rol de administrador al usuario, desde la base de datos

- Se deben cargar las siguientes variables en el archivo .env

```sql
DB_USER=""
DB_DATABASE=""
DB_HOST=""
DB_PASSWORD=""
SECRET = "az_AZ"
PORT=3000
```

### API Documentacion de rutas

- GET: /autores

  - Permite obtener el listado de todos los autores. Esta ruta no recibe parametros

  ```javascript
  http://localhost:3000/autores
  ```

- GET: /editoriales

  - Permite obtener el listado de todas las editoriales. Esta ruta no recibe parametros

  ```javascript
  http://localhost:3000/editoriales
  ```

- GET: /generos

  - Permite obtener el listado de todas los generos. Esta ruta no recibe parametros

  ```javascript
  http://localhost:3000/generos
  ```

- GET: /libros/filtros

  - Permite obtener el listado de libros a mostrar en la grilla, de acuerdo a los filtros seleccionados. Esta ruta recibe los siguientes parametros:
  <ul>
  <li>id_autor: [integer] Para mostrar todos los autores se debe enviar -1 o el id de un autor</li>
  <li>id_editorial: [integer] Para mostrar todos las editoriales se debe enviar -1 o el id de una editorial</li>
  <li>id_genero: [integer] Para mostrar todos los generos se debe enviar -1 o el id de un genero</li>
  <li>maxPrice: [integer] Lista libros con el precio <= maxprice, por defecto desde el front se envia 100000</li>
  <li>limits: [integer] Indica el limite de productos por pagina</li>
  <li>page: [integer] Indica la pagina a mostrar</li>
  <li>order_by: [string] Indica el campo y dirección de ordenamiento, recibe uno de los siguientes valores adicionales al campo (unidos por <b>_</b> ): ASC o DESC, por ejemplo: <b>titulo_ASC</b>, <b>precio_DESC</b></li>
  </ul>

  ```javascript
  http://localhost:3000/libros/filtros?id_autor=-1&id_editorial=-1&id_genero=-1&maxPrice=100000&limits=6&page=1&order_by=titulo_DESC
  ```

- GET: /libros/:id

  - Permite obtener el listado de libros a mostrar en la grilla, de acuerdo a los filtros seleccionados. Esta ruta recibe los siguientes parametros:
  <ul>
  <li>id: [integer] Indica el ID del libro a mostrar</li>
  </ul>

  ```javascript
  http://localhost:3000/libros/1
  ```

- GET: /usuarios/id

  - Permite obtener los datos de un usuario logueado. Esta ruta recibe los siguientes parametros:
  <ul>
  <li>token: [string] Indica el token del usuario, abajo un ejemplo de token para el usuario fisaavedrae@icloud.com, se debe agregar en <b>Authorization</b></li>
  </ul>

  ```code
  Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZpc2FhdmVkcmFlQGljbG91ZC5jb20iLCJpYXQiOjE3MTEzMjkxMzR9.ciNGY_x9ncM7Fzopj-14mCs1mae3vGBxaoL4XkUAp4A
  ```

  ```javascript
  http://localhost:3000/usuarios/id
  ```

- POST: /registro

  - Permite registrar un nuevo usuario. Esta ruta recibe parametros los siguientes parametros:
  <ul>
  <li>body: [json] Todos los campos para crear el usuario</li>
  </ul>

  ```json
  {
    "nombre": "nombre usuario",
    "email": "email@email.com",
    "password": "password usuario",
    "direccion": "direccion usuario",
    "ciudad": "ciudad usuario"
  }
  ```

  ```javascript
  http://localhost:3000/registro
  ```

- POST: /login

  - Permite autentificar un usuario. Esta ruta recibe los siguientes parametros:
  <ul>
  <li>body: [json] Los campos para loguear el usuario</li>
  </ul>

  ```json
  {
    "email": "email@email.com",
    "password": "password usuario"
  }
  ```

  ```javascript
  http://localhost:3000/login
  ```

- POST: /ordenes

  - Permite crear una orden. Esta ruta recibe los siguientes parametros:
  <ul>
  <li>total: [integer] Monto con el total de la orden</li>
  <li>envio: [integer] Valor del envío</li>
  <li>body: [json] Todos los campos para crear la orden (carro)</li>
  <li>token: [string] Indica el token del usuario, abajo un ejemplo de token para el usuario fisaavedrae@icloud.com, se debe agregar en <b>Authorization</b></li>
  </ul>

  ```json
  [
    {
      "cantidadlibros": 42,
      "id_libro": 26,
      "titulo": "1984",
      "resena": "Una distopía clásica que describe un mundo totalitario donde la libertad individual es suprimida por un gobierno opresivo.",
      "urlimagen": "https://fidatech.net/felipe/fotos-libros/1984.jpg",
      "precio": 16000,
      "stock": 80,
      "destacado": false,
      "id_autor": 14,
      "autor": "George Orwell",
      "id_editorial": 13,
      "editorial": "Secker & Warburg",
      "id_genero": 5,
      "genero": "Ciencia ficción",
      "qty": 1
    }
  ]
  ```

  ```code
  Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZpc2FhdmVkcmFlQGljbG91ZC5jb20iLCJpYXQiOjE3MTEzMjkxMzR9.ciNGY_x9ncM7Fzopj-14mCs1mae3vGBxaoL4XkUAp4A
  ```

  ```javascript
  http://localhost:3000/ordenes?total=20500&envio=4500
  ```

- GET: /ordenes

  - Permite listar las ordenes de un usuario. Esta ruta recibe los siguientes parametros:
  <ul>

  <li>token: [string] Indica el token del usuario, abajo un ejemplo de token para el usuario fisaavedrae@icloud.com, se debe agregar en <b>Authorization</b></li>
  </ul>

  ```code
  Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZpc2FhdmVkcmFlQGljbG91ZC5jb20iLCJpYXQiOjE3MTEzMjkxMzR9.ciNGY_x9ncM7Fzopj-14mCs1mae3vGBxaoL4XkUAp4A
  ```

  ```javascript
  http://localhost:3000/ordenes
  ```

- GET: /ordenes/:id_orden <b>(Disclaimer: esta ruta va a sufrir cambios)</b>

  - Permite obtener el detalle de todas las ordenes de un usuario. Esta ruta recibe los siguientes parametros:
    <ul>
    <li>id_orden: [integer] Indica el ID de la orden a mostrar</li>
    <li>token: [string] Indica el token del usuario, abajo un ejemplo de token para el usuario fisaavedrae@icloud.com, se debe agregar en <b>Authorization</b></li>
    </ul>

  ```code
  Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZpc2FhdmVkcmFlQGljbG91ZC5jb20iLCJpYXQiOjE3MTEzMjkxMzR9.ciNGY_x9ncM7Fzopj-14mCs1mae3vGBxaoL4XkUAp4A
  ```

  ```javascript
  http://localhost:3000/ordenes/1
  ```

- GET: /libros

  - Permite obtener el listado de todos los libros. Esta ruta no recibe parametros

  ```javascript
  http://localhost:3000/libros
  ```


> [!IMPORTANT]
> Las siguientes 3 rutas requieren que el Token sea de un usuario con rol de administrador. Para obtener este Token use la ruta POST: /login con las siguientes credenciales.

 ```json
  {
    "email": "rimar.basaa@gmail.com",
    "password": "rimar"
  }
  ```


- POST: /libros

  - Permite agregar un libro. Esta ruta recibe los siguientes parametros:
  <ul>
  <li>body: [json] Todos los campos para agregar el libro</li>
  <li>token: [string] Indica el token del usuario, abajo un ejemplo de token para el usuario rimar.basaa@gmail.com, se debe agregar en <b>Authorization</b></li>
  </ul>

  ```json
  [
    {
      "titulo": "Titulo",
      "resena": "Reseña libro",
      "urlimagen": "urlimagen",
      "precio": 10000,
      "stock": 100,
      "destacado": false,
      "autor": "autor",
      "editorial": "editorial",
      "genero": "genero"
    }
  ]
  ```

  ```code
  Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJpbWFyLmJhc2FhQGdtYWlsLmNvbSIsImlhdCI6MTcxMTQ5NjM1OH0.MiZSq-2GJD8LWik9pHpy8Bf2JsU-HfBtvMG0tGcNQzg
  ```

  ```javascript
  http://localhost:3000/libros
  ```

- PUT: /libros/:id

  - Permite modificar un libro. Esta ruta recibe los siguientes parametros:
  <ul>
  <li>id: [integer] Indica el ID del libro a modificar</li>
  <li>body: [json] Todos los campos para modificar el libro</li>
  <li>token: [string] Indica el token del usuario, abajo un ejemplo de token para el usuario rimar.basaa@gmail.com, se debe agregar en <b>Authorization</b></li>
  </ul>

  ```json
  [
    {
      "titulo": "Titulo modificado",
      "resena": "Reseña libro modificado",
      "urlimagen": "urlimagen modificado",
      "precio": 10000,
      "stock": 100,
      "destacado": false,
      "id_autor": 1,
      "id_editorial": 1,
      "id_genero": 1
    }
  ]
  ```

  ```code
  Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJpbWFyLmJhc2FhQGdtYWlsLmNvbSIsImlhdCI6MTcxMTQ5NjM1OH0.MiZSq-2GJD8LWik9pHpy8Bf2JsU-HfBtvMG0tGcNQzg
  ```

  ```javascript
  http://localhost:3000/libros/1
  ```

- DELETE: /libros/:id

  - Permite eliminar un libro. Esta ruta recibe los siguientes parametros:
  <ul>
  <li>id: [integer] Indica el ID del libro a eliminar</li>
  <li>token: [string] Indica el token del usuario, abajo un ejemplo de token para el usuario rimar.basaa@gmail.com, se debe agregar en <b>Authorization</b></li>
  </ul>

  ```code
  Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJpbWFyLmJhc2FhQGdtYWlsLmNvbSIsImlhdCI6MTcxMTQ5NjM1OH0.MiZSq-2GJD8LWik9pHpy8Bf2JsU-HfBtvMG0tGcNQzg
  ```

  ```javascript
  http://localhost:3000/libros/1
  ```


## Integracion y Despliegue

Este cuarto hito marca un paso crucial en el proyecto, ya que implica la integración y despliegue de todos sus componentes en internet. El Frontend, el Backend y la base de datos PostgreSQL.

Para lograr este objetivo, se optó por utilizar una plataforma de servicio en la nube, como [Render](https://render.com/), que facilitó el proceso de despliegue tanto de Frontend, Backend y Base Datos garantizando un entorno estable y escalable para nuestra aplicación.

Durante este proceso, se llevaron a cabo pruebas exhaustivas de todas las funcionalidades del proyecto desde la aplicación cliente. Se verificó la persistencia de datos
y el correcto consumo de las API desde el backend, asegurando que todas las interacciones funcionaran según lo esperado.

Posteriormente, se confirmó que en el servicio elegido para la base de datos, estuvieran gestionando efectivamente todos los datos, garantizando la integridad y
disponibilidad de la información necesaria para el correcto funcionamiento de la aplicación.

Con la integración y despliegue exitosos de todos los componentes en internet, el proyecto está listo para ser utilizado por los usuarios finales, ofreciendo una


## Integracion y Despliegue
  
Este cuarto hito marca un paso crucial en el proyecto, ya que implica la integración y despliegue de todos sus componentes en internet. El Frontend, el Backend y la base de datos PostgreSQL.
    
Para lograr este objetivo, se optó por utilizar una plataforma de servicio en la nube, como [Render](https://render.com/), que facilitó el proceso de despliegue tanto de Frontend, Backend y Base Datos garantizando un entorno estable y escalable para nuestra aplicación.
    
Durante este proceso, se llevaron a cabo pruebas exhaustivas de todas las funcionalidades del proyecto desde la aplicación cliente. Se verificó la persistencia de datos 
y el correcto consumo de las API desde el backend, asegurando que todas las interacciones funcionaran según lo esperado.
    
Posteriormente, se confirmó que en el servicio elegido para la base de datos, estuvieran gestionando efectivamente todos los datos, garantizando la integridad y 
disponibilidad de la información necesaria para el correcto funcionamiento de la aplicación.
    
Con la integración y despliegue exitosos de todos los componentes en internet, el proyecto está listo para ser utilizado por los usuarios finales, ofreciendo una 

experiencia fluida y confiable.

### Credenciales para Uso

Si bien usted puede crear su propia cuenta de Usuario, aqui le proporcionamos 2 cuentas ya creadas que puede usar ahora mismo:

- Cuenta de Usuario Normal:
  ```code
  user : juan.carrasco@gmail.com
  pass : carrasco
  ```
- Cuenta de Usuario Administrador:
  ```code
  user : pablo.neruda@gmail.com
  pass : neruda
  ```

