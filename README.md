Around The U.S.

Descripción

"Around The U.S." es una aplicación web interactiva desarrollada como parte del Sprint 12 del curso de Web Development en TripleTen/Practicum. Permite a los usuarios crear y gestionar perfiles, agregar lugares con imágenes, dar likes, eliminar cards y editar información personal mediante una API backend. El proyecto utiliza programación orientada a objetos (POO) en JavaScript, validación de formularios, modales (popups) y una estructura de archivos modular con BEM para CSS.

Features Principales

Perfil de Usuario: Edición de nombre, descripción y avatar mediante API (PATCH).
Cards/Lugares: Carga inicial desde API (GET), agregar nuevos lugares (POST), eliminar (DELETE), likes/unlikes (PUT/DELETE).
Modales: Popups para edición, adición, confirmación de delete e imagen ampliada.
Validación: Formularios validados en tiempo real con clases personalizadas.
Responsividad: Diseño adaptable a diferentes resoluciones usando media queries.
Accesibilidad: Atributos ARIA, alt en imágenes y focus states.

El proyecto se enfoca en integración con API, manejo de errores asíncronos y optimización de código.
Tecnologías Utilizadas

Frontend: HTML5, CSS3 (con BEM y Flexbox/Grid para layout), JavaScript ES6+ (clases, modules, async/await no usado pero then/catch para promesas).
Herramientas: Fetch API para requests, sin frameworks (JS puro).
Estructura: Archivos en src/ con subdirectorios blocks/ (CSS), components/ (JS), pages/ (index.css/js), images/, vendor/ (normalize.css, fonts).
Otros: .gitignore para ignorar node_modules (si aplica dependencias).

Instalación

Clona el repositorio:textgit clone https://github.com/BryanJGC00/web_project_around_es.git
Abre src/index.html en un navegador moderno (Chrome, Firefox, etc.). No se requieren servidores o dependencias adicionales, ya que es un proyecto estático con JS client-side.

Nota: El proyecto interactúa con una API externa, por lo que requiere conexión a internet. Usa el token de autorización proporcionado en Api.js (reemplaza si es necesario).
Uso

Perfil: Haz clic en el lápiz para editar nombre/descripción, o en el avatar para cambiar foto.
Agregar Lugar: Botón "+" para abrir modal y agregar card con título e imagen URL.
Likes/Delete: Interactúa con hearts y botes de basura en cards (confirmación para delete).
Imagen Ampliada: Clic en imagen de card para abrir popup centrado.

Verifica la consola del navegador para logs de errores en requests API.
Enlaces

Repositorio GitHub: https://github.com/BryanJGC00/web_project_around_es.git.

Autor

Bryan Joseph García Chávez (@bjgchavez)
Desarrollado en Enero 2026 como proyecto final del Sprint 12.

Si encuentras issues o sugerencias, abre un issue en el repo. ¡Gracias!
