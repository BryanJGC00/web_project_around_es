# Proyecto 10: Around The U.S. - Interactividad con JavaScript

## Descripción del Proyecto y su Funcionalidad

Este proyecto es una red social simple para compartir tarjetas de lugares, desarrollada como parte del Sprint 10. Permite editar el perfil de usuario (nombre y descripción), agregar nuevas tarjetas con imágenes y títulos, dar "me gusta" o eliminar tarjetas, y ver imágenes en popups modales. Todo con validación de formularios en tiempo real, cierre de popups con Esc/overlay, y generación dinámica de tarjetas.

Funcionalidades clave:

- Edición de perfil: Actualiza nombre y descripción en tiempo real.
- Agregar tarjetas: Crea nuevas con título/URL, agregadas al DOM.
- Interacciones: Like/eliminar tarjetas, popups para imágenes.
- Validación: Forms con mensajes custom, botón disabled si inválido.
- Accesibilidad: Aria-label, alt en imgs, :hover en interactivos.

El proyecto es responsivo y usa JavaScript modular para una interfaz interactiva sin recargas.

## Tecnologías y Técnicas Utilizadas

- **HTML5 y CSS3**: Estructura semántica (header, main, section), BEM para naming (bloques como .profile\_\_title), Flexbox/Grid para layout responsivo, media queries para mobile, transiciones para hovers/popups.
- **JavaScript ES6**: Clases (Card, FormValidator), módulos (imports/exports), eventos (addEventListener para click/submit/input/Esc), DOM manipulation (querySelector, textContent, append/prepend), validación con ValidityState (valueMissing, typeMismatch).
- **Técnicas**: PreventDefault en submits, reset forms para UX limpia, focus en inputs para accesibilidad, no innerHTML (seguridad), no magic numbers (consts para configs).
- **Herramientas**: Normalize.css para reset, fonts.css para tipografía, GitHub Pages para deploy.

Siguiendo sprints: Separación de concerns (HTML estructura, CSS estilo, JS lógica), accesibilidad WCAG (alt/aria), optimización (código conciso, privados con \_).

## Enlace a GitHub Pages

[Ver demo en GitHub Pages] https://github.com/BryanJGC00/web_project_around_es.git

## Estructura de Archivos BEM

Usamos estructura plana BEM para modularidad:

- **pages/**: index.css (imports centrales).
- **blocks/**: CSS separados (ej. header.css, profile.css, card.css, popup.css) para bloques reutilizables.
- **vendor/**: normalize.css, fonts.css.
- **scripts/**: index.js (principal), Card.js, FormValidator.js, utils.js (initialCards, open/closeModal).
- **images/**: Logos, avatares, cards.
- Root: index.html, README.md.

Esto facilita mantenimiento (norma BEM: Bloque\_\_Elemento--Modificador).

Autor: Bryan J. García Chávez
