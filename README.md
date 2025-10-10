# World Cup Archive - Proyecto UX/UI

Proyecto de Interfaz y Experiencia de Usuario - UANL 2025

## 📋 Tabla de Contenidos

1. [Estructura del Proyecto](#estructura-del-proyecto)
2. [Cómo Empezar](#cómo-empezar)
3. [División de Trabajo](#división-de-trabajo)
4. [Guía para Modificar](#guía-para-modificar)
5. [Checklist Segunda Entrega](#checklist-segunda-entrega)
6. [Recursos](#recursos)

---

## 📁 Estructura del Proyecto

```
world-cup-archive/
├── index.html              # Página principal
├── publicaciones.html      # 
├── perfil.html            # 
├── login.html             # 
├── admin.html             # 
├── css/
│   ├── variables.css      # ⭐ Variables globales (colores, fuentes)
│   ├── reset.css          # Normalización entre navegadores
│   ├── layout.css         # Estructura (header, footer, grid)
│   ├── components.css     # Componentes (botones, cards)
│   ├── pages.css          # Estilos específicos de páginas
│   ├── responsive.css     # Diseño mobile-first
│   └── dark-mode.css      # Tema oscuro
├── js/
│   ├── theme.js           # Sistema claro/oscuro
│   ├── navigation.js      # Menú móvil y navegación
│   ├── animations.js      # Microinteracciones
│   └── accessibility.js   # Accesibilidad
└── assets/
    ├── images/            # Imágenes del proyecto
    └── icons/             # Iconos SVG
```

---

## Usar Live Server (Extension de VS code) para checar cambios de pagina


##  Guía para Modificar

### Cambiar colores

**Archivo:** `css/variables.css`

```css
:root {
  --color-primary: #1B998B;  /* Cambiar aquí el color principal */
  --color-secondary: #1B6899; /* Color secundario */
}
```

### Agregar una nueva card

**Archivo:** `index.html`

```html
<article class="card" tabindex="0">
  <div class="card__image">
    <img src="ruta/imagen.jpg" alt="Descripción">
    <span class="card__badge">Categoría</span>
  </div>
  <div class="card__content">
    <h3 class="card__title">Título</h3>
    <p class="card__description">Descripción...</p>
  </div>
  <div class="card__stats">
    <span class="stat">❤️ <span class="stat__count">123</span></span>
  </div>
</article>
```

### Crear una nueva página

1. Duplicar `index.html`
2. Renombrar (ej: `publicaciones.html`)
3. Cambiar el contenido del `<main>`
4. Actualizar los links en la navegación

### Ajustar el diseño responsive

**Archivo:** `css/responsive.css`

```css
/* Para tablet (640px+) */
@media (min-width: 640px) {
  .card-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Para desktop (1024px+) */
@media (min-width: 1024px) {
  .card-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}


---

### Para HTML

1. **Siempre usar clases descriptivas:**
   ```html
   <!-- ✅ Bien -->
   <button class="btn btn--primary">Iniciar Sesión</button>
   
   <!-- ❌ Mal -->
   <button class="boton1">Iniciar Sesión</button>
   ```

2. **Agregar atributos de accesibilidad:**
   ```html
   <button aria-label="Cerrar menú">×</button>
   <img src="..." alt="Descripción clara">
   ```

3. **Usar etiquetas semánticas:**
   ```html
   <header>, <nav>, <main>, <section>, <article>, <footer>
   ```

### Para CSS

1. **Usar variables en lugar de valores directos:**
   ```css
   /* ✅ Bien */
   color: var(--color-primary);
   
   /* ❌ Mal */
   color: #1B998B;
   ```

2. **Móvil primero:**
   ```css
   /* Base: móvil */
   .card { padding: 16px; }
   
   /* Desktop: agregar complejidad */
   @media (min-width: 1024px) {
     .card { padding: 32px; }
   }
   ```

3. **Comentar secciones importantes:**
   ```css
   /* ===== HERO SECTION ===== */
   .hero { ... }
   ```

---


### Documentación

--Paginas usadas para el desarrollo
- [MDN Web Docs](https://developer.mozilla.org/es/) - Referencia de HTML/CSS/JS
- [CSS Tricks](https://css-tricks.com/) - Guías y trucos de CSS
- [Can I Use](https://caniuse.com/) - Compatibilidad de navegadores

### Herramientas

-- Se usaran en el futuro para camprobar la pagina 
- [Google Lighthouse](https://developers.google.com/web/tools/lighthouse) - Auditoría de calidad
- [WAVE](https://wave.webaim.org/) - Evaluación de accesibilidad
- [Contrast Checker](https://webaim.org/resources/contrastchecker/) - Verificar contraste

### Imágenes

--URL de sitios de donde se sacaron las imagenes

---

## Contacto

**Equipo:**
- Juan Pablo Farias Garcia - 2177641
- Erika Guadalupe Barraza Tamez - 2115176

**Maestro:**
- Juan Alejandro Villarreal Mojica


