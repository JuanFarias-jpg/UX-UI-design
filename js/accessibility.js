
(function() {
  'use strict';

  // ===== NAVEGACIÓN POR TECLADO =====
  const keyboardNav = {
    init() {
      let isUsingKeyboard = false;

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
          isUsingKeyboard = true;
          document.body.classList.add('using-keyboard');
        }
      });

      document.addEventListener('mousedown', () => {
        isUsingKeyboard = false;
        document.body.classList.remove('using-keyboard');
      });

      const style = document.createElement('style');
      style.textContent = `
        *:focus {
          outline: none;
        }
        
        .using-keyboard *:focus {
          outline: 3px solid var(--color-primary);
          outline-offset: 3px;
          border-radius: 4px;
        }
      `;
      document.head.appendChild(style);
    }
  };

  // ===== SKIP LINK =====
  const skipLink = {
    create() {
      const link = document.createElement('a');
      link.href = '#main';
      link.className = 'skip-link';
      link.textContent = 'Saltar al contenido principal';
      link.setAttribute('aria-label', 'Saltar al contenido principal, omitir navegación');
      
      document.body.insertBefore(link, document.body.firstChild);

      const style = document.createElement('style');
      style.textContent = `
        .skip-link {
          position: absolute;
          top: -9999px;
          left: 0;
          background: var(--color-primary);
          color: white;
          padding: 12px 24px;
          text-decoration: none;
          z-index: 10000;
          transition: top 0.3s ease;
          font-weight: 600;
          font-size: 16px;
          line-height: 1.5;
          border-radius: 0 0 4px 0;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          display: block;
          width: auto;
        }
        
        .skip-link:focus {
          top: 0;
          outline: 3px solid white;
          outline-offset: 2px;
        }
        
        .skip-link:hover {
          background: var(--color-primary-dark, #147a6f);
        }
      `;
      document.head.appendChild(style);

      link.addEventListener('click', (e) => {
        e.preventDefault();
        const main = document.querySelector('.main') || document.querySelector('main');
        if (main) {
          main.setAttribute('tabindex', '-1');
          main.focus();
          main.removeAttribute('tabindex');
        }
      });
    },

    init() {
      this.create();
    }
  };

  // ===== AJUSTE DE TAMAÑO DE FUENTE =====
  const fontSizeControl = {
    currentSize: 'normal',
    storageKey: 'wca-font-size',

    apply(size) {
      document.documentElement.classList.remove('font-size-large', 'font-size-xlarge');
      
      if (size === 'large') {
        document.documentElement.classList.add('font-size-large');
      } else if (size === 'xlarge') {
        document.documentElement.classList.add('font-size-xlarge');
      }
      
      this.currentSize = size;
      this.save();
      this.updateButtons();
      
      const labels = { normal: 'Normal', large: 'Grande', xlarge: 'Muy grande' };
      announcer.announce(`Tamaño de texto cambiado a ${labels[size]}`);
    },

    save() {
      try {
        localStorage.setItem(this.storageKey, this.currentSize);
      } catch (e) {
        console.warn('No se pudo guardar el tamaño de fuente');
      }
    },

    load() {
      try {
        const saved = localStorage.getItem(this.storageKey);
        if (saved) {
          this.apply(saved);
        }
      } catch (e) {
        console.warn('No se pudo cargar el tamaño de fuente');
      }
    },

    updateButtons() {
      document.querySelectorAll('[data-font-size]').forEach(btn => {
        const size = btn.getAttribute('data-font-size');
        if (size === this.currentSize) {
          btn.setAttribute('aria-pressed', 'true');
          btn.classList.add('active');
        } else {
          btn.setAttribute('aria-pressed', 'false');
          btn.classList.remove('active');
        }
      });
    }
  };

  // ===== MODO DE COLOR ACCESIBLE =====
  const colorMode = {
    currentMode: 'default',
    storageKey: 'wca-color-mode',

    modes: {
      default: { label: 'Normal', description: 'Colores predeterminados' },
      protanopia: { label: 'Protanopia', description: 'Dificultad con rojo-verde' },
      deuteranopia: { label: 'Deuteranopia', description: 'Dificultad con verde-rojo' },
      tritanopia: { label: 'Tritanopia', description: 'Dificultad con azul-amarillo' },
      highContrast: { label: 'Alto Contraste', description: 'Máximo contraste' },
      monochrome: { label: 'Monocromático', description: 'Escala de grises' }
    },

    apply(mode) {
      // Remover todas las clases de modo
      Object.keys(this.modes).forEach(m => {
        document.documentElement.classList.remove(`color-${m}`);
      });
      
      // Aplicar nuevo modo
      if (mode !== 'default') {
        document.documentElement.classList.add(`color-${mode}`);
      }
      
      this.currentMode = mode;
      this.save();
      this.updateButtons();
      
      announcer.announce(`Modo de color cambiado a ${this.modes[mode].label}`);
    },

    save() {
      try {
        localStorage.setItem(this.storageKey, this.currentMode);
      } catch (e) {
        console.warn('No se pudo guardar el modo de color');
      }
    },

    load() {
      try {
        const saved = localStorage.getItem(this.storageKey);
        if (saved && this.modes[saved]) {
          this.apply(saved);
        }
      } catch (e) {
        console.warn('No se pudo cargar el modo de color');
      }
    },

    updateButtons() {
      document.querySelectorAll('[data-color-mode]').forEach(btn => {
        const mode = btn.getAttribute('data-color-mode');
        if (mode === this.currentMode) {
          btn.setAttribute('aria-pressed', 'true');
          btn.classList.add('active');
        } else {
          btn.setAttribute('aria-pressed', 'false');
          btn.classList.remove('active');
        }
      });
    }
  };

  // ===== PANEL DE ACCESIBILIDAD =====
  const accessibilityPanel = {
    createControls() {
      const container = document.createElement('div');
      container.className = 'accessibility-panel';
      container.innerHTML = `
          <button class="accessibility-btn" aria-label="Accesibilidad">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" 
              fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="16" cy="4" r="1"/>
                  <path d="m18 19 1-7-6 1"/>
                  <path d="m5 8 3-3 5.5 3-2.36 3.5"/>
                  <path d="M4.24 14.5a5 5 0 0 0 6.88 6"/>
                  <path d="M13.76 17.5a5 5 0 0 0-6.88-6"/>
            </svg>
          </button>
        <div class="accessibility-menu" hidden role="menu" aria-labelledby="accessibility-menu-title">
          <div class="accessibility-menu__header">
            <h3 id="accessibility-menu-title">⚙️ Accesibilidad</h3>
            <button class="accessibility-menu__close" aria-label="Cerrar panel de accesibilidad">✕</button>
          </div>
          
          <div class="accessibility-menu__content">
            <!-- Guía de bienvenida -->
            <div class="control-section">
              <button class="btn-onboarding" id="show-onboarding" role="menuitem" aria-label="Abrir guía de bienvenida para conocer las funciones del sitio" style="width: 100%; padding: 12px; margin-bottom: 12px;">
                <span aria-hidden="true">💡</span> Ver guía de bienvenida
              </button>
            </div>

            <!-- Tamaño de texto -->
            <div class="control-section">
              <h4 class="control-section__title">
                <span class="control-icon">🔤</span>
                Tamaño de texto
              </h4>
              <div class="control-buttons" role="group" aria-label="Opciones de tamaño de texto">
                <button data-font-size="normal" aria-pressed="true" role="button" aria-label="Tamaño de texto normal">
                  <span class="btn-label" aria-hidden="true">A</span>
                </button>
                <button data-font-size="large" aria-pressed="false" role="button" aria-label="Tamaño de texto grande">
                  <span class="btn-label" style="font-size: 1.2em;" aria-hidden="true">A</span>
                </button>
                <button data-font-size="xlarge" aria-pressed="false" role="button" aria-label="Tamaño de texto muy grande">
                  <span class="btn-label" style="font-size: 1.4em;" aria-hidden="true">A</span>
                </button>
              </div>
            </div>

            <!-- Modos de color -->
            <div class="control-section">
              <h4 class="control-section__title">
                <span class="control-icon">🎨</span>
                Modo de color
              </h4>
              <div class="control-grid" role="group" aria-label="Opciones de modo de color">
                <button data-color-mode="default" aria-pressed="true" class="color-btn" aria-label="Modo de color normal">
                  <span class="color-preview color-preview--default" aria-hidden="true"></span>
                  <span class="color-label">Normal</span>
                </button>
                <button data-color-mode="protanopia" aria-pressed="false" class="color-btn" aria-label="Modo de color Protanopia para usuarios con dificultad para distinguir rojo-verde">
                  <span class="color-preview color-preview--protanopia" aria-hidden="true"></span>
                  <span class="color-label">Protanopia</span>
                </button>
                <button data-color-mode="deuteranopia" aria-pressed="false" class="color-btn" aria-label="Modo de color Deuteranopia para usuarios con dificultad para distinguir verde-rojo">
                  <span class="color-preview color-preview--deuteranopia" aria-hidden="true"></span>
                  <span class="color-label">Deuteranopia</span>
                </button>
                <button data-color-mode="tritanopia" aria-pressed="false" class="color-btn" aria-label="Modo de color Tritanopia para usuarios con dificultad para distinguir azul-amarillo">
                  <span class="color-preview color-preview--tritanopia" aria-hidden="true"></span>
                  <span class="color-label">Tritanopia</span>
                </button>
                <button data-color-mode="highContrast" aria-pressed="false" class="color-btn" aria-label="Modo de alto contraste para mejor visibilidad">
                  <span class="color-preview color-preview--contrast" aria-hidden="true"></span>
                  <span class="color-label">Alto Contraste</span>
                </button>
                <button data-color-mode="monochrome" aria-pressed="false" class="color-btn" aria-label="Modo monocromático en escala de grises">
                  <span class="color-preview color-preview--mono" aria-hidden="true"></span>
                  <span class="color-label">Monocromático</span>
                </button>
              </div>
            </div>

            <!-- Botón de reset -->
            <div class="control-section">
              <button class="btn-reset" id="reset-accessibility" role="menuitem" aria-label="Restaurar todas las configuraciones de accesibilidad a sus valores predeterminados">
                <span aria-hidden="true">🔄</span> Restaurar valores predeterminados
              </button>
            </div>
          </div>
        </div>
      `;

      document.body.appendChild(container);
      this.addStyles();
      this.addEventListeners(container);
    },

    addStyles() {
      const style = document.createElement('style');
      style.id = 'accessibility-styles';
      style.textContent = `
        /* Panel flotante */
        .accessibility-panel {
          position: fixed !important;
          bottom: 24px !important;
          right: 24px !important;
          z-index: 9999 !important;
        }
        
        .accessibility-btn {
          width: 56px !important;
          height: 56px !important;
          border-radius: 50% !important;
          background: linear-gradient(135deg, #3b82f6, #6366f1) !important;
          color: white !important;
          border: none !important;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15) !important;
          cursor: pointer !important;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
        }
        
        .accessibility-btn:hover {
          transform: scale(1.1) rotate(90deg);
          box-shadow: 0 6px 30px rgba(0, 0, 0, 0.2);
        }
        
        .accessibility-btn:active {
          transform: scale(0.95) rotate(90deg);
        }
        
        /* Menú */
        .accessibility-menu {
          position: absolute;
          bottom: 70px;
          right: 0;
          width: 340px;
          max-height: 80vh;
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: 16px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
          overflow: hidden;
          transform-origin: bottom right;
          animation: slideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        .accessibility-menu[hidden] {
          display: none;
        }
        
        /* Header del menú */
        .accessibility-menu__header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          background: linear-gradient(135deg, var(--color-primary), #6366f1);
          color: white;
        }
        
        .accessibility-menu__header h3 {
          margin: 0;
          font-size: 18px;
          font-weight: 600;
        }
        
        .accessibility-menu__close {
          background: rgba(255, 255, 255, 0.2);
          border: none;
          color: white;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          cursor: pointer;
          font-size: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }
        
        .accessibility-menu__close:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: rotate(90deg);
        }
        
        /* Contenido */
        .accessibility-menu__content {
          padding: 20px;
          max-height: calc(80vh - 72px);
          overflow-y: auto;
        }
        
        .control-section {
          margin-bottom: 24px;
        }
        
        .control-section:last-child {
          margin-bottom: 0;
        }
        
        .control-section__title {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
          font-size: 14px;
          font-weight: 600;
          color: var(--color-text-primary);
        }
        
        .control-icon {
          font-size: 18px;
        }
        
        /* Botones de control */
        .control-buttons {
          display: flex;
          gap: 8px;
        }
        
        .control-buttons button {
          flex: 1;
          padding: 12px;
          background: var(--color-bg);
          border: 2px solid var(--color-border);
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
          font-weight: 600;
        }
        
        .control-buttons button:hover {
          border-color: var(--color-primary);
          background: var(--color-primary-light);
          transform: translateY(-2px);
        }
        
        .control-buttons button.active,
        .control-buttons button[aria-pressed="true"] {
          background: var(--color-primary);
          border-color: var(--color-primary);
          color: white;
        }
        
        /* Grid de colores */
        .control-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
        }
        
        .color-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          padding: 12px;
          background: var(--color-bg);
          border: 2px solid var(--color-border);
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .color-btn:hover {
          border-color: var(--color-primary);
          background: var(--color-primary-light);
          transform: translateY(-2px);
        }
        
        .color-btn.active,
        .color-btn[aria-pressed="true"] {
          background: var(--color-primary);
          border-color: var(--color-primary);
          color: white;
        }
        
        .color-preview {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          display: flex;
          border: 2px solid rgba(0, 0, 0, 0.1);
        }
        
        .color-preview--default {
          background: linear-gradient(135deg, #ef4444, #3b82f6, #10b981);
        }
        
        .color-preview--protanopia {
          background: linear-gradient(135deg, #d4a574, #4a90e2, #6bb6ff);
        }
        
        .color-preview--deuteranopia {
          background: linear-gradient(135deg, #c9a55a, #5a9bd5, #7ec8e3);
        }
        
        .color-preview--tritanopia {
          background: linear-gradient(135deg, #ff6b9d, #00bfa5, #78909c);
        }
        
        .color-preview--contrast {
          background: linear-gradient(135deg, #000000, #ffffff);
        }
        
        .color-preview--mono {
          background: linear-gradient(135deg, #1a1a1a, #808080, #f5f5f5);
        }
        
        .color-label {
          font-size: 12px;
          font-weight: 500;
          text-align: center;
        }
        
        /* Botón de onboarding */
        .btn-onboarding {
          width: 100%;
          padding: 12px;
          background: var(--color-primary, #1B998B);
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        
        .btn-onboarding:hover {
          background: var(--color-primary-dark, #147a6f);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(27, 153, 139, 0.3);
        }
        
        /* Botón de reset */
        .btn-reset {
          width: 100%;
          padding: 12px;
          background: var(--color-bg);
          border: 2px dashed var(--color-border);
          border-radius: 8px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        
        .btn-reset:hover {
          border-color: var(--color-primary);
          background: var(--color-primary-light);
          border-style: solid;
        }
        
        /* Modos de color aplicados */
        .color-protanopia {
          filter: url(#protanopia-filter);
        }
        
        .color-deuteranopia {
          filter: url(#deuteranopia-filter);
        }
        
        .color-tritanopia {
          filter: url(#tritanopia-filter);
        }
        
        .color-highContrast {
          --color-bg: #000000;
          --color-surface: #1a1a1a;
          --color-text:#ffffff;
          --color-text-primary: #ffffff;
          --color-text-secondary: #e0e0e0;
          --color-border: #ffffff;
        }
        
        .color-monochrome {
          filter: grayscale(100%);
        }
        
        /* Tamaños de fuente */
        .font-size-large {
          font-size: 110%;
        }
        
        .font-size-xlarge {
          font-size: 125%;
        }
        
        /* Responsive */
        @media (max-width: 768px) {
          .accessibility-menu {
            width: calc(100vw - 48px);
            max-width: 340px;
          }
        }
      `;
      document.head.appendChild(style);

      // Agregar filtros SVG para daltonismo
      this.addColorBlindnessFilters();
    },

    addColorBlindnessFilters() {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.style.position = 'absolute';
      svg.style.width = '0';
      svg.style.height = '0';
      svg.innerHTML = `
        <defs>
          <!-- Protanopia (sin conos rojos) -->
          <filter id="protanopia-filter">
            <feColorMatrix type="matrix" values="
              0.567, 0.433, 0,     0, 0
              0.558, 0.442, 0,     0, 0
              0,     0.242, 0.758, 0, 0
              0,     0,     0,     1, 0"/>
          </filter>
          
          <!-- Deuteranopia (sin conos verdes) -->
          <filter id="deuteranopia-filter">
            <feColorMatrix type="matrix" values="
              0.625, 0.375, 0,   0, 0
              0.7,   0.3,   0,   0, 0
              0,     0.3,   0.7, 0, 0
              0,     0,     0,   1, 0"/>
          </filter>
          
          <!-- Tritanopia (sin conos azules) -->
          <filter id="tritanopia-filter">
            <feColorMatrix type="matrix" values="
              0.95, 0.05,  0,     0, 0
              0,    0.433, 0.567, 0, 0
              0,    0.475, 0.525, 0, 0
              0,    0,     0,     1, 0"/>
          </filter>
        </defs>
      `;
      document.body.appendChild(svg);
    },

    addEventListeners(container) {
      const btn = container.querySelector('.accessibility-btn');
      const menu = container.querySelector('.accessibility-menu');
      const closeBtn = container.querySelector('.accessibility-menu__close');

      // Abrir/cerrar menú
      const toggleMenu = () => {
        const isHidden = menu.hasAttribute('hidden');
        if (isHidden) {
          menu.removeAttribute('hidden');
          btn.setAttribute('aria-expanded', 'true');
        } else {
          menu.setAttribute('hidden', '');
          btn.setAttribute('aria-expanded', 'false');
        }
      };

      btn.addEventListener('click', toggleMenu);
      closeBtn.addEventListener('click', toggleMenu);

      // Cerrar al hacer clic fuera
      document.addEventListener('click', (e) => {
        if (!container.contains(e.target) && !menu.hasAttribute('hidden')) {
          toggleMenu();
        }
      });

      // Botones de tamaño de fuente
      container.querySelectorAll('[data-font-size]').forEach(btn => {
        btn.addEventListener('click', () => {
          const size = btn.getAttribute('data-font-size');
          fontSizeControl.apply(size);
        });
      });

      // Botones de modo de color
      container.querySelectorAll('[data-color-mode]').forEach(btn => {
        btn.addEventListener('click', () => {
          const mode = btn.getAttribute('data-color-mode');
          colorMode.apply(mode);
        });
      });

      // Botón de onboarding
      const onboardingBtn = container.querySelector('#show-onboarding');
      if (onboardingBtn) {
        onboardingBtn.addEventListener('click', () => {
          // Cerrar el panel de accesibilidad
          toggleMenu();
          
          // Función para mostrar onboarding con retry si no está disponible aún
          const showOnboardingWithRetry = (retries = 5) => {
            if (window.WCAOnboarding && typeof window.WCAOnboarding.show === 'function') {
              window.WCAOnboarding.show();
            } else if (retries > 0) {
              // Esperar un poco y volver a intentar
              setTimeout(() => showOnboardingWithRetry(retries - 1), 100);
            } else {
              console.warn('Onboarding no disponible después de varios intentos');
            }
          };
          
          showOnboardingWithRetry();
        });
      }

      // Botón de reset
      container.querySelector('#reset-accessibility').addEventListener('click', () => {
        fontSizeControl.apply('normal');
        colorMode.apply('default');
        announcer.announce('Configuración de accesibilidad restaurada');
      });
    },

    init() {
      this.createControls();
    }
  };

  // ===== ANUNCIOS PARA LECTORES DE PANTALLA =====
  const announcer = {
    element: null,

    create() {
      this.element = document.createElement('div');
      this.element.setAttribute('role', 'status');
      this.element.setAttribute('aria-live', 'polite');
      this.element.setAttribute('aria-atomic', 'true');
      this.element.className = 'sr-only';
      
      const style = document.createElement('style');
      style.textContent = `
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border-width: 0;
        }
      `;
      document.head.appendChild(style);
      
      document.body.appendChild(this.element);
    },

    announce(message) {
      if (!this.element) this.create();
      
      this.element.textContent = '';
      
      setTimeout(() => {
        this.element.textContent = message;
      }, 100);

      setTimeout(() => {
        this.element.textContent = '';
      }, 5000);
    },

    init() {
      this.create();
    }
  };

  // ===== INICIALIZACIÓN =====
  function init() {
    keyboardNav.init();
    skipLink.init();
    announcer.init();
    accessibilityPanel.init();
    fontSizeControl.load();
    colorMode.load();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  document.addEventListener('DOMContentLoaded', () => {

    // Anunciar cuando cambia el tema
    document.addEventListener('themechange', (e) => {
      const theme = e.detail.theme === 'dark' ? 'oscuro' : 'claro';
      announcer.announce(`Tema cambiado a modo ${theme}`);
    });
  });

  // ===== API PÚBLICA =====
  window.WCAAccessibility = {
    announce: (msg) => announcer.announce(msg),
    setFontSize: (size) => fontSizeControl.apply(size),
    setColorMode: (mode) => colorMode.apply(mode)
  };

})();

/* ==========================================

  Animaciones suaves al abrir/cerrar
  Diseño moderno con gradientes
  6 modos de daltonismo diferentes:
      - Normal
      - Protanopia (rojo-verde)
      - Deuteranopia (verde-rojo)  
      - Tritanopia (azul-amarillo)
      - Alto Contraste
      - Monocromático
  Previsualizaciones de colores
  Botón de restaurar valores
  Iconos visuales mejorados
  Mejor UX con hover effects
  Responsive design
  Filtros SVG para daltonismo realista
  Anuncios para screen readers
========================================== */