/* ==========================================
   ADMIN.JS - Panel de Administración
   ==========================================
   Este archivo maneja:
   - Navegación entre secciones del admin
   - Aprobar/rechazar publicaciones
   - Protección de acceso (solo admin)
   - Cerrar sesión
========================================== */

(function() {
  'use strict';

  // ===== ELEMENTOS DEL DOM =====
  const adminMenuItems = document.querySelectorAll('.admin-menu__item');
  const adminSections = document.querySelectorAll('.admin-section');
  const approveButtons = document.querySelectorAll('[data-action="approve"]');
  const rejectButtons = document.querySelectorAll('[data-action="reject"]');
  const logoutBtn = document.querySelector('#logout-btn');

  // ===== VERIFICAR ACCESO DE ADMINISTRADOR =====

  /**
   * Verificar que el usuario sea administrador
   */
  function checkAdminAccess() {
    try {
      const username = localStorage.getItem('wca-user');
      const session = localStorage.getItem('wca-session');
      
      // Verificar que haya sesión activa
      if (!session || !username) {
        console.log('No hay sesión activa');
        window.location.href = 'login.html';
        return false;
      }
      
      // Solo permitir acceso al usuario 'admin'
      if (username !== 'admin') {
        alert('⚠️ Acceso denegado. Solo los administradores pueden acceder a esta página.');
        window.location.href = 'index.html';
        return false;
      }
      
      return true;
    } catch (e) {
      console.error('Error al verificar acceso:', e);
      window.location.href = 'login.html';
      return false;
    }
  }

  // ===== NAVEGACIÓN ENTRE SECCIONES =====

  /**
   * Cambiar de sección en el panel admin
   */
  function switchSection(sectionName) {
    // Actualizar menú
    adminMenuItems.forEach(item => {
      const itemSection = item.getAttribute('data-section');
      if (itemSection === sectionName) {
        item.classList.add('admin-menu__item--active');
        item.setAttribute('aria-current', 'page');
      } else {
        item.classList.remove('admin-menu__item--active');
        item.removeAttribute('aria-current');
      }
    });

    // Mostrar/ocultar secciones
    adminSections.forEach(section => {
      const sectionId = section.id;
      if (sectionId === `section-${sectionName}`) {
        section.removeAttribute('hidden');
        section.style.animation = 'fadeIn 0.3s ease-in';
      } else {
        section.setAttribute('hidden', '');
      }
    });

    // Actualizar URL
    if (history.pushState) {
      history.pushState(null, null, `#${sectionName}`);
    }

    // Anunciar cambio
    if (window.WCAAccessibility) {
      window.WCAAccessibility.announce(`Mostrando ${getSectionLabel(sectionName)}`);
    }
  }

  /**
   * Obtener etiqueta legible de la sección
   */
  function getSectionLabel(sectionName) {
    const labels = {
      'pendientes': 'Publicaciones Pendientes',
      'todas': 'Todas las Publicaciones',
      'categorias': 'Gestión de Categorías',
      'mundiales': 'Gestión de Mundiales',
      'usuarios': 'Gestión de Usuarios',
      'estadisticas': 'Estadísticas del Sitio'
    };
    return labels[sectionName] || sectionName;
  }

  /**
   * Event listeners para el menú
   */
  adminMenuItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const sectionName = item.getAttribute('data-section');
      switchSection(sectionName);
    });
  });

  // ===== APROBAR/RECHAZAR PUBLICACIONES =====

  /**
   * Aprobar una publicación
   */
  function approvePost(postId, button) {
    if (!confirm('¿Aprobar esta publicación?')) return;

    // Mostrar estado de carga
    button.disabled = true;
    button.textContent = 'Aprobando...';

    // Simular proceso de aprobación
    setTimeout(() => {
      // Remover la card del DOM con animación
      const postCard = button.closest('.pending-post');
      
      if (postCard) {
        postCard.style.animation = 'fadeOut 0.3s ease-out';
        
        setTimeout(() => {
          postCard.remove();
          
          // Actualizar contador de pendientes
          updatePendingCount(-1);
          
          // Mostrar notificación
          if (window.WCAAccessibility) {
            window.WCAAccessibility.announce('Publicación aprobada correctamente');
          }
          
          showNotification('✓ Publicación aprobada', 'success');
          
          // Si no quedan más pendientes, mostrar mensaje
          checkEmptyState();
        }, 300);
      }
    }, 1000);
  }

  /**
   * Rechazar una publicación
   */
  function rejectPost(postId, button) {
    const reason = prompt('Ingresa el motivo del rechazo (opcional):');
    
    if (reason === null) return; // Usuario canceló

    // Mostrar estado de carga
    button.disabled = true;
    button.textContent = 'Rechazando...';

    // Simular proceso de rechazo
    setTimeout(() => {
      const postCard = button.closest('.pending-post');
      
      if (postCard) {
        postCard.style.animation = 'fadeOut 0.3s ease-out';
        
        setTimeout(() => {
          postCard.remove();
          
          // Actualizar contador
          updatePendingCount(-1);
          
          // Notificar
          if (window.WCAAccessibility) {
            window.WCAAccessibility.announce('Publicación rechazada');
          }
          
          showNotification('✕ Publicación rechazada', 'error');
          
          checkEmptyState();
        }, 300);
      }
    }, 1000);
  }

  /**
   * Actualizar contador de publicaciones pendientes
   */
  function updatePendingCount(delta) {
    const badge = document.querySelector('.admin-menu__item[data-section="pendientes"] .badge');
    if (badge) {
      const currentCount = parseInt(badge.textContent) || 0;
      const newCount = Math.max(0, currentCount + delta);
      badge.textContent = newCount;
      
      if (newCount === 0) {
        badge.style.display = 'none';
      }
    }
  }

  /**
   * Verificar si no quedan publicaciones pendientes
   */
  function checkEmptyState() {
    const pendingSection = document.querySelector('#section-pendientes');
    const pendingPosts = pendingSection?.querySelectorAll('.pending-post');
    
    if (!pendingPosts || pendingPosts.length === 0) {
      const emptyState = document.createElement('div');
      emptyState.className = 'empty-state';
      emptyState.innerHTML = `
        <div style="text-align: center; padding: var(--space-16) var(--space-6);">
          <p style="font-size: var(--font-size-2xl); margin-bottom: var(--space-4);">
            ✓ No hay publicaciones pendientes
          </p>
          <p style="color: var(--color-text-secondary);">
            Todas las publicaciones han sido revisadas
          </p>
        </div>
      `;
      
      const container = pendingSection?.querySelector('.pending-posts');
      if (container) {
        container.innerHTML = '';
        container.appendChild(emptyState);
      }
    }
  }

  /**
   * Event listeners para botones de aprobar/rechazar
   */
  approveButtons.forEach(button => {
    button.addEventListener('click', () => {
      const postId = button.getAttribute('data-post-id');
      approvePost(postId, button);
    });
  });

  rejectButtons.forEach(button => {
    button.addEventListener('click', () => {
      const postId = button.getAttribute('data-post-id');
      rejectPost(postId, button);
    });
  });

  // ===== NOTIFICACIONES =====

  /**
   * Mostrar notificación temporal
   */
  function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.textContent = message;
    notification.setAttribute('role', 'alert');
    
    const colors = {
      success: 'var(--color-success)',
      error: 'var(--color-error)',
      info: 'var(--color-info)'
    };
    
    notification.style.cssText = `
      position: fixed;
      top: calc(var(--header-height) + var(--space-4));
      right: var(--space-4);
      background: ${colors[type]};
      color: white;
      padding: var(--space-4) var(--space-6);
      border-radius: var(--border-radius-md);
      box-shadow: var(--shadow-lg);
      z-index: var(--z-modal);
      animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    // Remover después de 3 segundos
    setTimeout(() => {
      notification.style.animation = 'slideOutRight 0.3s ease-out';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

  // ===== CERRAR SESIÓN =====

  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      if (!confirm('¿Cerrar sesión?')) return;
      
      try {
        localStorage.removeItem('wca-user');
        localStorage.removeItem('wca-remember');
      } catch (e) {
        console.warn('Error al limpiar sesión');
      }
      
      window.location.href = 'login.html';
    });
  }

  // ===== NAVEGACIÓN POR URL =====

  function loadSectionFromURL() {
    const hash = window.location.hash.slice(1);
    
    if (hash && document.querySelector(`#section-${hash}`)) {
      switchSection(hash);
    } else {
      switchSection('pendientes');
    }
  }

  window.addEventListener('hashchange', loadSectionFromURL);

  // ===== ANIMACIONES CSS =====
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes fadeOut {
      from {
        opacity: 1;
        transform: translateY(0);
      }
      to {
        opacity: 0;
        transform: translateY(-10px);
      }
    }
    
    @keyframes slideInRight {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    
    @keyframes slideOutRight {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(100%);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

  // ===== INICIALIZACIÓN =====
  if (checkAdminAccess()) {
    loadSectionFromURL();
  }

  // ===== API PÚBLICA =====
  window.WCAAdmin = {
    switchSection,
    approvePost,
    rejectPost,
    showNotification
  };

})();

/* ==========================================
    Documentación del Panel de Administración:

   FUNCIONALIDADES:
   Verificación de acceso (solo admin)
   Navegación entre secciones
   Aprobar publicaciones con animación
   Rechazar con motivo opcional
   Notificaciones temporales
   Actualización de contadores
   Estado vacío cuando no hay pendientes
   
   FLUJO DE SEGURIDAD:
   1. Verifica que usuario sea 'admin'
   2. Si no es admin → redirige a index.html
   3. Si no hay sesión → redirige a login.html
   
   CREDENCIALES:
   Usuario: admin
   Contraseña: admin123
   
   Bugs a arreglar:
   - Toma la ultima sesion siempre y piensa que el perfil siempre es usuario aunque cierre sesion
   
========================================== */