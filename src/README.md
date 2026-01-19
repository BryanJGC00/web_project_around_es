# Proyecto Around - Sprint 11: Refactorización con POO y Clases ES6

## Descripción

Este proyecto es una aplicación web simple para mostrar y gestionar tarjetas de lugares (cards), con funcionalidades como editar perfil, agregar nuevas tarjetas y ver imágenes en popups. En el Sprint 11, se refactorizó el código usando Programación Orientada a Objetos (POO) y clases ES6 para hacerla más modular y mantenible, sin alterar el funcionamiento base (e.g., las tarjetas se renderizan igual, los popups abren y cierran igual, y la validación de formularios sigue igual).

El proyecto usa HTML semántico, CSS responsivo (con BEM para naming) y JavaScript vanilla con clases ES6. No se usan librerías externas, alineado con los temas del bootcamp.

## Tecnologías Usadas

- HTML5 (con semántica para accesibilidad).
- CSS3 (Flexbox/Grid para layout, BEM para organización).
- JavaScript ES6 (clases, herencia básica, métodos privados/públicos).
- Validación de formularios con HTML5 y JS personalizado.
- Manipulación del DOM para renderizado dinámico.

## Estructura de Archivos

La estructura sigue BEM plana para CSS y modularidad en JS:

WEB_PROJECT_AROUND_ES/
│
├── blocks/ # CSS para bloques BEM (e.g., card.css, popup.css)
├── images/ # Imágenes y SVGs (e.g., avatar.jpg, like-active.svg)
├── pages/ # CSS principal (index.css)
├── scripts/ # JavaScript modular con clases ES6
│ ├── Card.js # Clase para generar y manejar tarjetas
│ ├── FormValidator.js # Clase para validación de formularios
│ ├── Popup.js # Clase base para popups (maneja open/close, ESC, overlay)
│ ├── PopupWithForm.js # Subclase para popups con forms (herencia)
│ ├── PopupWithImage.js # Subclase para popups de imágenes
│ ├── UserInfo.js # Clase para manejar info de usuario (get/set)
│ ├── Section.js # Clase para secciones (e.g., lista de cards)
│ ├── index.js # Punto de entrada: Crea instancias y listeners minimalistas
│ └── utils.js # Constantes compartidas (e.g., initialCards, validationConfig)
├── vendor/ # Recursos de terceros (fonts.css, normalize.css, fuentes)
├── .prettierignore # Configuración para Prettier
├── index.html # HTML principal
└── README.md # Este archivo

## Cambios en el Sprint 11

- Refactorización a POO: Transformadas funciones procedurales en clases ES6 (e.g., Card ahora es clase con constructor y métodos privados).
- Herencia: PopupWithForm y PopupWithImage heredan de Popup para reutilización.
- Encapsulación: Lógica de validación, popups y usuario encapsulada en clases separadas (métodos privados con \_prefijo).
- index.js minimalista: Solo crea instancias y pasa callbacks, cumpliendo con separación de responsabilidades.
- No se alteró el funcionamiento base: La app se comporta igual (e.g., likes, deletes, submits), solo es más escalable.

Estos cambios cumplen con el criterio del sprint de "Aplicar POO y clases ES6 para estructurar el código de manera modular, manteniendo la separación de responsabilidades".

Autor: Bryan J. García Chávez
