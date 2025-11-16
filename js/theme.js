/* ==========================================
   THEME.JS - Sistema de Modo Claro/Oscuro
   ==========================================
   Este archivo maneja:
   - Detección automática del tema del sistema
   - Toggle manual entre temas
   - Guardado de preferencia del usuario
   - Animación suave al cambiar
   
   CÓMO FUNCIONA:
   1. Al cargar la página, detecta si el usuario prefiere modo oscuro
   2. Si el usuario clickea el botón, cambia el tema
   3. Guarda la preferencia para la próxima visita
========================================== */

(function() {
  'use strict';

  // ===== CONSTANTES =====
  const THEME_KEY = 'wca-theme'; // Clave para guardar en localStorage
  const DARK_CLASS = 'dark-mode';
  const CHANGING_CLASS = 'theme-toggle--changing';

  // ===== ELEMENTOS DEL DOM =====
  const themeToggle = document.querySelector('.theme-toggle');
  const htmlElement = document.documentElement;

  // ===== FUNCIONES PRINCIPALES =====

  /**
   * Obtener el tema guardado del usuario
   * @returns {string|null} 'dark', 'light', o null si no hay preferencia guardada
   */
  function getSavedTheme() {
    try {
      return localStorage.getItem(THEME_KEY);
    } catch (e) {
      console.warn('No se pudo acceder a localStorage:', e);
      return null;
    }
  }

  /**
   * Guardar la preferencia del usuario
   * @param {string} theme - 'dark' o 'light'
   */
  function saveTheme(theme) {
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (e) {
      console.warn('No se pudo guardar en localStorage:', e);
    }
  }

  /**
   * Detectar si el sistema del usuario prefiere modo oscuro
   * @returns {boolean}
   */
  function systemPrefersDark() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  /**
   * Aplicar el tema oscuro
   */
  function enableDarkMode() {
    htmlElement.classList.add(DARK_CLASS);
    themeToggle?.setAttribute('aria-label', 'Cambiar a modo claro');
    
    // Mostrar luna en modo oscuro
    const icon = themeToggle?.querySelector('.theme-toggle__icon');
    if (icon) {
      icon.textContent = '🌙';
    }
  }

  /**
   * Aplicar el tema claro
   */
  function enableLightMode() {
    htmlElement.classList.remove(DARK_CLASS);
    themeToggle?.setAttribute('aria-label', 'Cambiar a modo oscuro');
    
    // Mostrar sol en modo claro
    const icon = themeToggle?.querySelector('.theme-toggle__icon');
    if (icon) {
      icon.textContent = '☀️';
    }
  }

  /**
   * Alternar entre tema claro y oscuro
   */
  function toggleTheme() {
    const isDark = htmlElement.classList.contains(DARK_CLASS);
    
    // Agregar clase de animación
    themeToggle?.classList.add(CHANGING_CLASS);
    
    if (isDark) {
      enableLightMode();
      saveTheme('light');
    } else {
      enableDarkMode();
      saveTheme('dark');
    }

    // Remover clase de animación después de completar
    setTimeout(() => {
      themeToggle?.classList.remove(CHANGING_CLASS);
    }, 500);

    // Disparar evento personalizado para otros scripts que necesiten saber del cambio
    const event = new CustomEvent('themechange', {
      detail: { theme: isDark ? 'light' : 'dark' }
    });
    document.dispatchEvent(event);
  }

  /**
   * Inicializar el tema correcto al cargar la página
   */
  function initTheme() {
    const savedTheme = getSavedTheme();

    // Prioridad:
    // 1. Tema guardado por el usuario
    // 2. Preferencia del sistema
    // 3. Tema claro por defecto

    if (savedTheme === 'dark') {
      enableDarkMode();
    } else if (savedTheme === 'light') {
      enableLightMode();
    } else if (systemPrefersDark()) {
      enableDarkMode();
    } else {
      enableLightMode();
    }
  }

  // ===== EVENT LISTENERS =====

  /**
   * Click en el botón de tema
   */
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }

  /**
   * Detectar cambios en la preferencia del sistema
   * (por ejemplo, si el usuario cambia su sistema a modo oscuro)
   */
  const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  
  // Para navegadores modernos
  if (darkModeMediaQuery.addEventListener) {
    darkModeMediaQuery.addEventListener('change', (e) => {
      // Solo aplicar si el usuario no ha guardado una preferencia manual
      if (!getSavedTheme()) {
        if (e.matches) {
          enableDarkMode();
        } else {
          enableLightMode();
        }
      }
    });
  }

  // ===== INICIALIZACIÓN =====
  initTheme();

  // ===== API PÚBLICA =====
  // Exponer funciones para que otros scripts puedan usarlas
  window.WCATheme = {
    toggle: toggleTheme,
    enableDark: enableDarkMode,
    enableLight: enableLightMode,
    isDark: () => htmlElement.classList.contains(DARK_CLASS)
  };

})();

/* ==========================================
   DOCUMENTACION DE THEME.JS:
    FUNCIONALIDADES:  
    - Detección automática del tema del sistema
    - Toggle manual entre temas
    - Guardado de preferencia del usuario
    - Animación suave al cambiar
   
   CÓMO FUNCIONA:
   1. Al cargar la página, detecta si el usuario prefiere modo oscuro
   2. Si el usuario clickea el botón, cambia el tema
   3. Guarda la preferencia para la próxima visita

   
========================================== */