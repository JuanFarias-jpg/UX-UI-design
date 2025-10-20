/* ==========================================
   ACCESSIBILITY.JS - Accesibilidad Mejorada
   ==========================================
   Este archivo maneja:
   - Navegación por teclado
   - Skip links (saltar al contenido)
   - Tamaño de fuente ajustable
   - Múltiples modos de daltonismo
   - Anuncios para lectores de pantalla
   - Alto contraste
   - Animaciones mejoradas
========================================== */

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
      
      document.body.insertBefore(link, document.body.firstChild);

      const style = document.createElement('style');
      style.textContent = `
        .skip-link {
          position: absolute;
          top: -40px;
          left: 0;
          background: var(--color-primary);
          color: white;
          padding: var(--space-2) var(--space-4);
          text-decoration: none;
          z-index: 9999;
          transition: top 0.3s ease;
          font-weight: 600;
        }
        
        .skip-link:focus {
          top: 0;
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
        <button class="accessibility-btn" aria-label="Abrir panel de accesibilidad" aria-expanded="false">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M12 1v6m0 6v6m-6-6h6m6 0h-6"></path>
            <path d="M19.778 4.222l-4.242 4.242m0 7.072l4.242 4.242M4.222 4.222l4.242 4.242m0 7.072l-4.242 4.242"></path>
          </svg>
        </button>
        <div class="accessibility-menu" hidden>
          <div class="accessibility-menu__header">
            <h3>⚙️ Accesibilidad</h3>
            <button class="accessibility-menu__close" aria-label="Cerrar panel">✕</button>
          </div>
          
          <div class="accessibility-menu__content">
            <!-- Tamaño de texto -->
            <div class="control-section">
              <h4 class="control-section__title">
                <span class="control-icon">🔤</span>
                Tamaño de texto
              </h4>
              <div class="control-buttons">
                <button data-font-size="normal" aria-pressed="true" title="Tamaño normal">
                  <span class="btn-label">A</span>
                </button>
                <button data-font-size="large" aria-pressed="false" title="Tamaño grande">
                  <span class="btn-label" style="font-size: 1.2em;">A</span>
                </button>
                <button data-font-size="xlarge" aria-pressed="false" title="Tamaño muy grande">
                  <span class="btn-label" style="font-size: 1.4em;">A</span>
                </button>
              </div>
            </div>

            <!-- Modos de color -->
            <div class="control-section">
              <h4 class="control-section__title">
                <span class="control-icon">🎨</span>
                Modo de color
              </h4>
              <div class="control-grid">
                <button data-color-mode="default" aria-pressed="true" class="color-btn">
                  <span class="color-preview color-preview--default"></span>
                  <span class="color-label">Normal</span>
                </button>
                <button data-color-mode="protanopia" aria-pressed="false" class="color-btn">
                  <span class="color-preview color-preview--protanopia"></span>
                  <span class="color-label">Protanopia</span>
                </button>
                <button data-color-mode="deuteranopia" aria-pressed="false" class="color-btn">
                  <span class="color-preview color-preview--deuteranopia"></span>
                  <span class="color-label">Deuteranopia</span>
                </button>
                <button data-color-mode="tritanopia" aria-pressed="false" class="color-btn">
                  <span class="color-preview color-preview--tritanopia"></span>
                  <span class="color-label">Tritanopia</span>
                </button>
                <button data-color-mode="highContrast" aria-pressed="false" class="color-btn">
                  <span class="color-preview color-preview--contrast"></span>
                  <span class="color-label">Alto Contraste</span>
                </button>
                <button data-color-mode="monochrome" aria-pressed="false" class="color-btn">
                  <span class="color-preview color-preview--mono"></span>
                  <span class="color-label">Monocromático</span>
                </button>
              </div>
            </div>

            <!-- Botón de reset -->
            <div class="control-section">
              <button class="btn-reset" id="reset-accessibility">
                <span>🔄</span> Restaurar valores predeterminados
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
   MEJORAS IMPLEMENTADAS:
   
   ✅ Animaciones suaves al abrir/cerrar
   ✅ Diseño moderno con gradientes
   ✅ 6 modos de daltonismo diferentes:
      - Normal
      - Protanopia (rojo-verde)
      - Deuteranopia (verde-rojo)  
      - Tritanopia (azul-amarillo)
      - Alto Contraste
      - Monocromático
   ✅ Previsualizaciones de colores
   ✅ Botón de restaurar valores
   ✅ Iconos visuales mejorados
   ✅ Mejor UX con hover effects
   ✅ Responsive design
   ✅ Filtros SVG para daltonismo realista
   ✅ Anuncios para screen readers
========================================== */