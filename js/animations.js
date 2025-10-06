/* ==========================================
   ANIMATIONS.JS - Microinteracciones y Animaciones
   ==========================================
   Este archivo maneja:
   - Carrusel de noticias
   - Animaciones al hacer scroll (scroll reveal)
   - Efectos de carga (loading states)
   - Transiciones suaves entre elementos
========================================== */

(function() {
  'use strict';

  // ===== CARRUSEL =====
  const carousel = {
    track: document.querySelector('.carousel__track'),
    items: document.querySelectorAll('.carousel__item'),
    prevBtn: document.querySelector('.carousel__control--prev'),
    nextBtn: document.querySelector('.carousel__control--next'),
    indicators: document.querySelectorAll('.carousel__indicators button'),
    currentIndex: 0,
    autoplayInterval: null,
    autoplayDelay: 5000, // 5 segundos

    /**
     * Mostrar un slide específico
     */
    showSlide(index) {
      // Asegurar que el índice esté en rango
      if (index < 0) {
        this.currentIndex = this.items.length - 1;
      } else if (index >= this.items.length) {
        this.currentIndex = 0;
      } else {
        this.currentIndex = index;
      }

      // Ocultar todos los slides
      this.items.forEach(item => {
        item.classList.remove('carousel__item--active');
      });

      // Mostrar el slide actual
      this.items[this.currentIndex]?.classList.add('carousel__item--active');

      // Actualizar indicadores
      this.indicators.forEach((indicator, i) => {
        if (i === this.currentIndex) {
          indicator.setAttribute('aria-selected', 'true');
        } else {
          indicator.setAttribute('aria-selected', 'false');
        }
      });
    },

    /**
     * Ir al slide anterior
     */
    prev() {
      this.showSlide(this.currentIndex - 1);
      this.resetAutoplay();
    },

    /**
     * Ir al siguiente slide
     */
    next() {
      this.showSlide(this.currentIndex + 1);
      this.resetAutoplay();
    },

    /**
     * Iniciar autoplay
     */
    startAutoplay() {
      this.autoplayInterval = setInterval(() => {
        this.next();
      }, this.autoplayDelay);
    },

    /**
     * Detener autoplay
     */
    stopAutoplay() {
      if (this.autoplayInterval) {
        clearInterval(this.autoplayInterval);
        this.autoplayInterval = null;
      }
    },

    /**
     * Reiniciar autoplay (cuando el usuario interactúa)
     */
    resetAutoplay() {
      this.stopAutoplay();
      this.startAutoplay();
    },

    /**
     * Inicializar el carrusel
     */
    init() {
      if (!this.track || this.items.length === 0) return;

      // Botón anterior
      this.prevBtn?.addEventListener('click', () => this.prev());

      // Botón siguiente
      this.nextBtn?.addEventListener('click', () => this.next());

      // Indicadores
      this.indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
          this.showSlide(index);
          this.resetAutoplay();
        });
      });

      // Navegación con teclado
      document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') this.prev();
        if (e.key === 'ArrowRight') this.next();
      });

      // Pausar al hacer hover (buena práctica de UX)
      this.track.addEventListener('mouseenter', () => this.stopAutoplay());
      this.track.addEventListener('mouseleave', () => this.startAutoplay());

      // Pausar si el usuario prefiere menos movimiento
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return; // No iniciar autoplay
      }

      // Iniciar autoplay
      this.startAutoplay();
    }
  };

  // ===== SCROLL REVEAL (animaciones al hacer scroll) =====
  const scrollReveal = {
    elements: document.querySelectorAll('.card, .world-cup-card, .section__header'),
    options: {
      threshold: 0.1, // 10% del elemento visible
      rootMargin: '0px 0px -50px 0px' // Activar antes de que sea completamente visible
    },

    /**
     * Callback cuando un elemento entra en viewport
     */
    onIntersect(entries, observer) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Agregar clase de animación
          entry.target.style.opacity = '0';
          entry.target.style.transform = 'translateY(30px)';
          
          // Animar con un pequeño delay
          setTimeout(() => {
            entry.target.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, 100);

          // Dejar de observar este elemento
          observer.unobserve(entry.target);
        }
      });
    },

    /**
     * Inicializar Intersection Observer
     */
    init() {
      // Verificar si el navegador soporta Intersection Observer
      if (!('IntersectionObserver' in window)) {
        // Fallback: mostrar todo inmediatamente
        this.elements.forEach(el => {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        });
        return;
      }

      // Respetar preferencia de movimiento reducido
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        this.elements.forEach(el => {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        });
        return;
      }

      // Crear observer
      const observer = new IntersectionObserver(
        this.onIntersect.bind(this),
        this.options
      );

      // Observar todos los elementos
      this.elements.forEach(el => observer.observe(el));
    }
  };

  // ===== LOADING STATES =====
  const loadingStates = {
    /**
     * Mostrar estado de carga en una card
     */
    showCardLoading(card) {
      card.classList.add('card--loading');
      card.innerHTML = `
        <div class="card__loading">
          <div class="skeleton skeleton--image"></div>
          <div class="skeleton skeleton--text"></div>
          <div class="skeleton skeleton--text"></div>
        </div>
      `;
    },

    /**
     * Agregar pulse effect a elementos que cargan
     */
    addPulseEffect() {
      const style = document.createElement('style');
      style.textContent = `
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        .card--loading {
          animation: pulse 1.5s ease-in-out infinite;
        }
        
        .skeleton {
          background: linear-gradient(
            90deg,
            var(--color-border) 0%,
            var(--color-bg) 50%,
            var(--color-border) 100%
          );
          background-size: 200% 100%;
          animation: shimmer 1.5s ease-in-out infinite;
        }
        
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        
        .skeleton--image {
          width: 100%;
          height: 200px;
          border-radius: var(--border-radius-md);
        }
        
        .skeleton--text {
          width: 100%;
          height: 1rem;
          margin: var(--space-2) 0;
          border-radius: var(--border-radius-sm);
        }
      `;
      document.head.appendChild(style);
    }
  };

  // ===== SMOOTH SCROLL PARA TODA LA PÁGINA =====
  function initSmoothScroll() {
    // Ya está implementado en CSS con scroll-behavior: smooth
    // Pero aquí podemos agregar efectos adicionales

    let scrolling = false;

    window.addEventListener('scroll', () => {
      if (!scrolling) {
        scrolling = true;
        
        // Agregar clase al body mientras se hace scroll
        document.body.classList.add('is-scrolling');
        
        setTimeout(() => {
          scrolling = false;
          document.body.classList.remove('is-scrolling');
        }, 150);
      }
    }, { passive: true });
  }

  // ===== PARALLAX EFFECT (efecto de profundidad) =====
  const parallax = {
    elements: document.querySelectorAll('.hero'),
    
    update() {
      const scrollY = window.scrollY;
      
      this.elements.forEach(el => {
        const speed = 0.5; // Velocidad del parallax
        const yPos = -(scrollY * speed);
        el.style.transform = `translateY(${yPos}px)`;
      });
    },

    init() {
      // Respetar preferencia de movimiento reducido
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
      }

      window.addEventListener('scroll', () => {
        requestAnimationFrame(() => this.update());
      }, { passive: true });
    }
  };

  // ===== ANIMACIÓN DE CONTADORES =====
  function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16); // 60fps
    let current = start;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = target;
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current);
      }
    }, 16);
  }

  // ===== RIPPLE EFFECT EN BOTONES =====
  function addRippleEffect() {
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
      button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
      });
    });

    // Agregar estilos para el ripple
    const style = document.createElement('style');
    style.textContent = `
      .btn {
        position: relative;
        overflow: hidden;
      }
      
      .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
      }
      
      @keyframes ripple-animation {
        to {
          transform: scale(2);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // ===== INICIALIZACIÓN =====
  document.addEventListener('DOMContentLoaded', () => {
    carousel.init();
    scrollReveal.init();
    initSmoothScroll();
    parallax.init();
    addRippleEffect();
    loadingStates.addPulseEffect();
  });

  // ===== API PÚBLICA =====
  window.WCAAnimations = {
    carousel,
    animateCounter,
    showLoading: loadingStates.showCardLoading
  };

})();

/* ==========================================
   NOTAS PARA TU COMPAÑERO:
   ==========================================
   
   FUNCIONALIDADES IMPLEMENTADAS:
   ✓ Carrusel automático con controles
   ✓ Scroll reveal (elementos aparecen al scroll)
   ✓ Ripple effect en botones
   ✓ Parallax suave en hero
   ✓ Loading states con skeleton
   ✓ Respeta prefers-reduced-motion
   
   PRUEBAS:
   1. Ver carrusel cambiar automáticamente
   2. Hacer scroll y ver cards aparecer
   3. Clickear botones para ver ripple effect
   4. Usar flechas del teclado en carrusel
   5. Hacer hover en carrusel (pausa autoplay)
   
   PERFORMANCE:
   - Usa requestAnimationFrame para animaciones
   - Usa Intersection Observer (eficiente)
   - Eventos con { passive: true }
   
========================================== */