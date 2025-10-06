/* ==========================================
   NAVIGATION.JS - Menú Móvil y Navegación
   ==========================================
   Este archivo maneja:
   - Apertura/cierre del menú hamburguesa
   - Scroll suave entre secciones
   - Sombra del header al hacer scroll
   - Cerrar menú al hacer click fuera
========================================== */

(function() {
  'use strict';

  // ===== ELEMENTOS DEL DOM =====
  const hamburger = document.querySelector('.navbar__toggle');
  const navMenu = document.querySelector('.navbar__menu');
  const header = document.querySelector('.header');
  const navLinks = document.querySelectorAll('.navbar__link');

  // ===== VARIABLES DE ESTADO =====
  let isMenuOpen = false;
  let lastScrollY = window.scrollY;

  // ===== FUNCIONES DEL MENÚ =====

  /**
   * Abrir el menú móvil
   */
  function openMenu() {
    navMenu?.classList.add('navbar__menu--open');
    hamburger?.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden'; // Prevenir scroll del body
    isMenuOpen = true;
  }

  /**
   * Cerrar el menú móvil
   */
  function closeMenu() {
    navMenu?.classList.remove('navbar__menu--open');
    hamburger?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = ''; // Restaurar scroll
    isMenuOpen = false;
  }

  /**
   * Alternar el menú (abrir/cerrar)
   */
  function toggleMenu() {
    if (isMenuOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  // ===== FUNCIONES DE SCROLL =====

  /**
   * Agregar sombra al header cuando se hace scroll
   */
  function handleScroll() {
    const currentScrollY = window.scrollY;

    // Agregar clase "scrolled" cuando se baja más de 10px
    if (currentScrollY > 10) {
      header?.classList.add('header--scrolled');
    } else {
      header?.classList.remove('header--scrolled');
    }

    lastScrollY = currentScrollY;
  }

  /**
   * Scroll suave a una sección específica
   * @param {string} targetId - ID del elemento destino
   */
  function smoothScrollTo(targetId) {
    const target = document.querySelector(targetId);
    if (!target) return;

    const headerHeight = header?.offsetHeight || 0;
    const targetPosition = target.offsetTop - headerHeight;

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }

  // ===== EVENT LISTENERS =====

  /**
   * Click en el botón hamburguesa
   */
  if (hamburger) {
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation(); // Evitar que se propague al documento
      toggleMenu();
    });
  }

  /**
   * Click en los links del menú
   */
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');

      // Si es un link a una sección de la misma página (#section)
      if (href && href.startsWith('#')) {
        e.preventDefault();
        smoothScrollTo(href);
        closeMenu(); // Cerrar menú en móvil después de clickear
      } else {
        // Si es un link a otra página, solo cerrar el menú
        closeMenu();
      }
    });
  });

  /**
   * Click fuera del menú para cerrarlo
   */
  document.addEventListener('click', (e) => {
    if (isMenuOpen && navMenu && !navMenu.contains(e.target) && !hamburger?.contains(e.target)) {
      closeMenu();
    }
  });

  /**
   * Tecla ESC para cerrar el menú
   */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isMenuOpen) {
      closeMenu();
      hamburger?.focus(); // Devolver el foco al botón
    }
  });

  /**
   * Detectar scroll para agregar sombra al header
   */
  let scrollTimeout;
  window.addEventListener('scroll', () => {
    // Usar throttle para mejor performance
    if (!scrollTimeout) {
      scrollTimeout = setTimeout(() => {
        handleScroll();
        scrollTimeout = null;
      }, 10);
    }
  }, { passive: true });

  /**
   * Cerrar menú al redimensionar ventana (de móvil a desktop)
   */
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      // Si la ventana es mayor a 1024px (desktop), cerrar menú
      if (window.innerWidth >= 1024 && isMenuOpen) {
        closeMenu();
      }
    }, 150);
  });

  // ===== NAVEGACIÓN CON TECLADO =====

  /**
   * Trap focus dentro del menú cuando está abierto (accesibilidad)
   */
  function trapFocus(e) {
    if (!isMenuOpen) return;

    const focusableElements = navMenu?.querySelectorAll(
      'a[href], button:not([disabled])'
    );
    
    if (!focusableElements || focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // Si presiona Tab en el último elemento, volver al primero
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  }

  document.addEventListener('keydown', trapFocus);

  // ===== MARCAR LINK ACTIVO SEGÚN SCROLL =====

  /**
   * Actualizar el link activo según la sección visible
   */
  function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.scrollY + 100; // Offset para activar antes

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        // Remover active de todos los links
        navLinks.forEach(link => {
          link.classList.remove('navbar__link--active');
        });

        // Agregar active al link correspondiente
        const activeLink = document.querySelector(`.navbar__link[href="#${sectionId}"]`);
        activeLink?.classList.add('navbar__link--active');
      }
    });
  }

  // Actualizar link activo al hacer scroll
  window.addEventListener('scroll', () => {
    if (!scrollTimeout) {
      scrollTimeout = setTimeout(() => {
        updateActiveLink();
        scrollTimeout = null;
      }, 100);
    }
  }, { passive: true });

  // ===== INICIALIZACIÓN =====
  handleScroll(); // Ejecutar al cargar para verificar posición inicial
  updateActiveLink(); // Marcar link activo inicial

  // ===== API PÚBLICA =====
  window.WCANav = {
    openMenu,
    closeMenu,
    toggleMenu,
    scrollTo: smoothScrollTo
  };

})();

/* ==========================================
    Documentación de Navegación y Menú Móvil:

   FUNCIONALIDADES IMPLEMENTADAS:
   Cierra al clickear fuera
   Cierra con tecla ESC
   Scroll suave entre secciones
   Sombra en header al scroll
   Marca link activo según sección
   Trap focus para accesibilidad
   Cierra menú al redimensionar

   FALTA PROBAR:
   1. Abrir en móvil y probar menú hamburguesa ( aun no funciona)
   2. Clickear links internos (#mundiales)
   3. Hacer scroll y ver sombra del header
   4. Presionar ESC para cerrar menú
   5. Redimensionar ventana de móvil a desktop
   
========================================== */