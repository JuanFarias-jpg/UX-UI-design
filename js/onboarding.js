/* ==========================================
   ONBOARDING.JS - Sistema de Bienvenida
   ==========================================
   Este archivo maneja:
   - Detección de primera visita
   - Modal de bienvenida con pasos
   - Tour guiado con tooltips
   - Guardado en localStorage
   - Opción para omitir o reabrir
========================================== */

(function() {
  'use strict';

  // ===== CONSTANTES =====
  const ONBOARDING_KEY = 'wca-onboarding-completed';
  const ONBOARDING_VERSION = '1.0'; // Versión del onboarding (para futuras actualizaciones)

  // ===== CONFIGURACIONES DEL ONBOARDING POR PÁGINA =====
  
  // Configuración general (para index.html y otras páginas)
  const onboardingConfigDefault = {
    autoShow: true,
    steps: [
      {
        icon: '👋',
        title: '¡Bienvenido a World Cup Archive!',
        description: 'Tu fuente completa de información sobre todos los mundiales de fútbol.',
        features: [
          {
            icon: '🏆',
            title: 'Historia Completa',
            text: 'Explora todos los mundiales desde 1930 hasta hoy'
          },
          {
            icon: '📊',
            title: 'Estadísticas Detalladas',
            text: 'Accede a datos, resultados y análisis completos'
          },
          {
            icon: '👥',
            title: 'Comunidad Activa',
            text: 'Comparte y descubre contenido de otros fanáticos'
          }
        ]
      },
      {
        icon: '🧭',
        title: 'Navega por el sitio',
        description: 'Conoce las secciones principales disponibles:',
        features: [
          {
            icon: '🌍',
            title: 'Mundiales',
            text: 'Información detallada de cada copa del mundo'
          },
          {
            icon: '📈',
            title: 'Estadísticas',
            text: 'Datos históricos y comparativas'
          },
          {
            icon: '💬',
            title: 'Publicaciones',
            text: 'Contenido creado por la comunidad'
          },
          {
            icon: '👤',
            title: 'Mi Perfil',
            text: 'Gestiona tu cuenta y publicaciones'
          }
        ]
      },
      {
        icon: '⚙️',
        title: 'Personaliza tu experiencia',
        description: 'Aprovecha las funciones disponibles:',
        features: [
          {
            icon: '🌙',
            title: 'Modo Oscuro',
            text: 'Cambia entre tema claro y oscuro según tu preferencia'
          },
          {
            icon: '🔍',
            title: 'Búsqueda Avanzada',
            text: 'Encuentra contenido con filtros y búsquedas específicas'
          },
          {
            icon: '♿',
            title: 'Accesibilidad',
            text: 'Panel de ajustes para mejorar tu experiencia'
          }
        ]
      }
    ]
  };

  // Configuración específica para mundiales.html
  const onboardingConfigMundiales = {
    autoShow: false,
    steps: [
      {
        icon: '🌍',
        title: 'Explora los Mundiales',
        description: 'En esta sección encontrarás información completa de cada Copa del Mundo.',
        features: [
          {
            icon: '🏆',
            title: 'Carrusel de Mundiales',
            text: 'Navega entre todas las ediciones usando las flechas o los indicadores'
          },
          {
            icon: '🔍',
            title: 'Búsqueda por Año',
            text: 'Busca un mundial específico por año o por sede'
          },
          {
            icon: '📊',
            title: 'Información Detallada',
            text: 'Haz clic en "Ver detalles" para conocer más sobre cada mundial'
          },
          {
            icon: '🏅',
            title: 'Ganadores y Resultados',
            text: 'Descubre quién ganó cada mundial y los resultados clave'
          }
        ]
      }
    ]
  };

  // Configuración específica para estadisticas.html
  const onboardingConfigEstadisticas = {
    autoShow: false,
    steps: [
      {
        icon: '📈',
        title: 'Estadísticas del Mundial',
        description: 'Accede a datos históricos y análisis detallados de los mundiales.',
        features: [
          {
            icon: '🔍',
            title: 'Búsqueda Inteligente',
            text: 'Busca por año específico o nombre del mundial'
          },
          {
            icon: '📊',
            title: 'Filtros Avanzados',
            text: 'Ordena las estadísticas según tus preferencias'
          },
          {
            icon: '📉',
            title: 'Visualización de Datos',
            text: 'Explora gráficos y comparativas históricas'
          },
          {
            icon: '🎯',
            title: 'Información Precisa',
            text: 'Accede a datos verificados de cada edición'
          }
        ]
      }
    ]
  };

  // Configuración específica para publicaciones.html
  const onboardingConfigPublicaciones = {
    autoShow: false,
    steps: [
      {
        icon: '💬',
        title: 'Publicaciones de la Comunidad',
        description: 'Descubre contenido creado por otros fanáticos del fútbol.',
        features: [
          {
            icon: '🔍',
            title: 'Búsqueda y Filtros',
            text: 'Encuentra publicaciones usando la barra de búsqueda y filtros'
          },
          {
            icon: '🏷️',
            title: 'Categorías',
            text: 'Filtra por categorías: Jugadas, Entrevistas, Partidos, etc.'
          },
          {
            icon: '📊',
            title: 'Ordenar por',
            text: 'Ordena por más recientes, populares, vistas o comentadas'
          },
          {
            icon: '👆',
            title: 'Explora el Contenido',
            text: 'Haz clic en cualquier card para ver los detalles completos'
          }
        ]
      }
    ]
  };

  // Configuración específica para perfil.html
  const onboardingConfigPerfil = {
    autoShow: false,
    steps: [
      {
        icon: '👤',
        title: 'Mi Perfil',
        description: 'Gestiona tu cuenta y tus publicaciones desde aquí.',
        features: [
          {
            icon: '📝',
            title: 'Gestiona tus Publicaciones',
            text: 'Ve todas tus publicaciones: pendientes, aprobadas y rechazadas'
          },
          {
            icon: '📊',
            title: 'Filtra por Estado',
            text: 'Usa los filtros para encontrar publicaciones específicas'
          },
          {
            icon: '✏️',
            title: 'Edita tu Contenido',
            text: 'Modifica tus publicaciones desde la sección de gestión'
          },
          {
            icon: '⚙️',
            title: 'Configuración',
            text: 'Actualiza tu información personal y preferencias de cuenta'
          }
        ]
      }
    ]
  };

  // Variable global para la configuración actual
  let onboardingConfig = onboardingConfigDefault;

  // ===== VARIABLES GLOBALES =====
  let currentStep = 0;
  let onboardingModal = null;
  let onboardingOverlay = null;
  let escapeListener = null; // Para evitar duplicar el listener

  // ===== FUNCIONES DE UTILIDAD =====

  /**
   * Verificar si el onboarding ya fue completado
   * @returns {boolean}
   */
  function isOnboardingCompleted() {
    try {
      const completed = localStorage.getItem(ONBOARDING_KEY);
      return completed === 'true' || completed === ONBOARDING_VERSION;
    } catch (e) {
      console.warn('No se pudo acceder a localStorage:', e);
      return false;
    }
  }

  /**
   * Marcar el onboarding como completado
   */
  function markOnboardingCompleted() {
    try {
      localStorage.setItem(ONBOARDING_KEY, ONBOARDING_VERSION);
    } catch (e) {
      console.warn('No se pudo guardar en localStorage:', e);
    }
  }

  /**
   * Obtener la configuración de onboarding según la página actual
   * @returns {Object} Configuración de onboarding para la página actual
   */
  function getOnboardingConfig() {
    const path = window.location.pathname.toLowerCase();
    
    if (path.includes('mundiales.html')) {
      return onboardingConfigMundiales;
    } else if (path.includes('estadisticas.html')) {
      return onboardingConfigEstadisticas;
    } else if (path.includes('publicaciones.html')) {
      return onboardingConfigPublicaciones;
    } else if (path.includes('perfil.html')) {
      return onboardingConfigPerfil;
    }
    
    return onboardingConfigDefault;
  }

  /**
   * Crear el modal de onboarding
   */
  function createModal() {
    // Usar la configuración actual
    const config = onboardingConfig;
    
    const modalHTML = `
      <div class="onboarding-overlay" id="onboarding-overlay"></div>
      <div class="onboarding-modal" id="onboarding-modal" role="dialog" aria-labelledby="onboarding-title" aria-describedby="onboarding-subtitle" aria-modal="true">
        <div class="onboarding-modal__header">
          <button class="onboarding-modal__close" id="onboarding-close" aria-label="Cerrar guía de bienvenida">
            ×
          </button>
          <h2 id="onboarding-title" class="onboarding-modal__title">Guía</h2>
          <p id="onboarding-subtitle" class="onboarding-modal__subtitle">Conoce las funciones principales</p>
        </div>
        <div class="onboarding-modal__content" id="onboarding-content">
          ${config.steps.map((step, index) => `
            <div class="onboarding-step ${index === 0 ? 'active' : ''}" data-step="${index}">
              <span class="onboarding-step__icon" aria-hidden="true">${step.icon}</span>
              <h3 class="onboarding-step__title">${step.title}</h3>
              <p class="onboarding-step__description">${step.description}</p>
              ${step.features ? `
                <ul class="onboarding-step__features">
                  ${step.features.map(feature => `
                    <li class="onboarding-step__feature">
                      <span class="onboarding-step__feature-icon" aria-hidden="true">${feature.icon}</span>
                      <div class="onboarding-step__feature-content">
                        <h4 class="onboarding-step__feature-title">${feature.title}</h4>
                        <p class="onboarding-step__feature-text">${feature.text}</p>
                      </div>
                    </li>
                  `).join('')}
                </ul>
              ` : ''}
            </div>
          `).join('')}
        </div>
        ${config.steps.length > 1 ? `
        <div class="onboarding-modal__indicators" id="onboarding-indicators">
          ${config.steps.map((_, index) => `
            <button class="onboarding-indicator ${index === 0 ? 'active' : ''}" 
                    data-step="${index}" 
                    aria-label="Ir al paso ${index + 1} de ${config.steps.length}"
                    aria-current="${index === 0 ? 'step' : 'false'}"></button>
          `).join('')}
        </div>
        ` : ''}
        <div class="onboarding-modal__footer">
          <button class="onboarding-btn onboarding-btn--skip" id="onboarding-skip" aria-label="Cerrar guía">
            Cerrar
          </button>
          <div style="display: flex; gap: var(--space-2); flex: 1;">
            <button class="onboarding-btn onboarding-btn--secondary" id="onboarding-prev" style="display: none;" aria-label="Ir al paso anterior">
              Anterior
            </button>
            <button class="onboarding-btn onboarding-btn--primary" id="onboarding-next" aria-label="Ir al siguiente paso">
              Siguiente
            </button>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    onboardingModal = document.getElementById('onboarding-modal');
    onboardingOverlay = document.getElementById('onboarding-overlay');
    
    // Event listeners
    setupModalListeners();
  }

  /**
   * Configurar event listeners del modal
   */
  function setupModalListeners() {
    const closeBtn = document.getElementById('onboarding-close');
    const skipBtn = document.getElementById('onboarding-skip');
    const prevBtn = document.getElementById('onboarding-prev');
    const nextBtn = document.getElementById('onboarding-next');
    const indicators = document.querySelectorAll('.onboarding-indicator');
    const overlay = onboardingOverlay;

    if (closeBtn) {
      closeBtn.addEventListener('click', closeOnboarding);
    }

    if (skipBtn) {
      skipBtn.addEventListener('click', () => {
        markOnboardingCompleted();
        closeOnboarding();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (currentStep > 0) {
          goToStep(currentStep - 1);
        }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (onboardingConfig.steps.length === 1) {
          // Si solo hay un paso, cerrar directamente
          markOnboardingCompleted();
          closeOnboarding();
        } else if (currentStep < onboardingConfig.steps.length - 1) {
          goToStep(currentStep + 1);
        } else {
          // Último paso - completar
          markOnboardingCompleted();
          closeOnboarding();
        }
      });
    }

    if (indicators.length > 0) {
      indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => goToStep(index));
      });
    }

    if (overlay) {
      overlay.addEventListener('click', (e) => {
        // Solo cerrar si se hace clic directamente en el overlay (no en el modal)
        if (e.target === overlay) {
          closeOnboarding();
        }
      });
    }

    // Cerrar con Escape (solo agregar una vez)
    if (!escapeListener) {
      escapeListener = (e) => {
        if (e.key === 'Escape' && onboardingModal?.classList.contains('active')) {
          closeOnboarding();
        }
      };
      document.addEventListener('keydown', escapeListener);
    }
  }

  /**
   * Ir a un paso específico
   * @param {number} step - Índice del paso
   */
  function goToStep(step) {
    if (step < 0 || step >= onboardingConfig.steps.length) return;

    // Ocultar paso actual
    const currentStepEl = document.querySelector(`.onboarding-step[data-step="${currentStep}"]`);
    const currentIndicator = document.querySelector(`.onboarding-indicator[data-step="${currentStep}"]`);
    
    if (currentStepEl) {
      currentStepEl.classList.remove('active');
    }
    if (currentIndicator) {
      currentIndicator.classList.remove('active');
    }

    // Mostrar nuevo paso
    currentStep = step;
    const newStepEl = document.querySelector(`.onboarding-step[data-step="${currentStep}"]`);
    const newIndicator = document.querySelector(`.onboarding-indicator[data-step="${currentStep}"]`);
    const allIndicators = document.querySelectorAll('.onboarding-indicator');
    
    if (newStepEl) {
      newStepEl.classList.add('active');
    }
    // Actualizar todos los indicadores con aria-current
    allIndicators.forEach((indicator, index) => {
      if (index === currentStep) {
        indicator.classList.add('active');
        indicator.setAttribute('aria-current', 'step');
      } else {
        indicator.classList.remove('active');
        indicator.setAttribute('aria-current', 'false');
      }
    });

    // Actualizar botones
    updateButtons();
  }

  /**
   * Actualizar estado de los botones de navegación
   */
  function updateButtons() {
    const prevBtn = document.getElementById('onboarding-prev');
    const nextBtn = document.getElementById('onboarding-next');
    const isFirstStep = currentStep === 0;
    const isLastStep = currentStep === onboardingConfig.steps.length - 1;

    if (prevBtn) {
      prevBtn.style.display = isFirstStep ? 'none' : 'block';
    }

    if (nextBtn) {
      if (onboardingConfig.steps.length === 1) {
        nextBtn.textContent = 'Cerrar';
      } else {
        nextBtn.textContent = isLastStep ? 'Comenzar' : 'Siguiente';
      }
    }
  }

  /**
   * Mostrar el modal de onboarding
   */
  function showOnboarding() {
    // Actualizar la configuración según la página actual
    onboardingConfig = getOnboardingConfig();
    
    // Si el modal ya existe pero la configuración cambió, recrearlo
    if (onboardingModal) {
      onboardingModal.remove();
      if (onboardingOverlay) {
        onboardingOverlay.remove();
      }
      onboardingModal = null;
      onboardingOverlay = null;
    }
    
    if (!onboardingModal) {
      createModal();
      // Pequeño delay para asegurar que el DOM esté listo
      setTimeout(() => {
        if (onboardingModal && onboardingOverlay) {
          onboardingModal.classList.add('active');
          onboardingOverlay.classList.add('active');
          document.body.style.overflow = 'hidden'; // Prevenir scroll
        }
      }, 50);
    } else {
      onboardingModal.classList.add('active');
      onboardingOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  /**
   * Cerrar el modal de onboarding
   */
  function closeOnboarding() {
    if (onboardingModal) {
      onboardingModal.classList.remove('active');
    }
    if (onboardingOverlay) {
      onboardingOverlay.classList.remove('active');
    }
    document.body.style.overflow = '';
    
    // Remover del DOM después de la animación
    setTimeout(() => {
      if (onboardingModal) {
        onboardingModal.remove();
        onboardingModal = null;
      }
      if (onboardingOverlay) {
        onboardingOverlay.remove();
        onboardingOverlay = null;
      }
    }, 300);
  }


  /**
   * Inicializar el sistema de onboarding
   */
  function initOnboarding() {
    // Obtener la configuración según la página actual
    onboardingConfig = getOnboardingConfig();

    // Verificar si ya completó el onboarding
    const completed = isOnboardingCompleted();

    // Si ya completó el onboarding, no mostrar automáticamente
    if (completed) {
      return;
    }

    // Mostrar onboarding si está configurado para auto-mostrar
    if (onboardingConfig.autoShow) {
      // Esperar a que el contenido se cargue
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
          setTimeout(showOnboarding, 200); // Pequeño delay para mejor UX
        });
      } else {
        setTimeout(showOnboarding, 200);
      }
    }
  }

  // ===== INICIALIZACIÓN =====
  initOnboarding();

  // ===== API PÚBLICA =====
  // Exponer funciones para uso externo
  window.WCAOnboarding = {
    show: showOnboarding,
    close: closeOnboarding,
    reset: () => {
      localStorage.removeItem(ONBOARDING_KEY);
      showOnboarding();
    },
    isCompleted: isOnboardingCompleted
  };

})();

