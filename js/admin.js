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
 Modal nuevas categorias - Panel de Administración
========================================== */

// ===== MODAL DE CATEGORÍAS =====
const categoryModal = {
  modal: null,
  isEditing: false,
  editingId: null,

  /**
   * Crear el HTML del modal
   */
  createModal() {
    const modalHTML = `
      <div class="modal" id="category-modal" hidden>
        <div class="modal__overlay"></div>
        
        <div class="modal__content" role="dialog" aria-modal="true" aria-labelledby="category-modal-title">
          <header class="modal__header">
            <h2 id="category-modal-title" class="modal__title">Nueva Categoría</h2>
            <button class="modal__close" id="close-category-modal" aria-label="Cerrar modal">
              <span class="modal__close-icon">✕</span>
            </button>
          </header>

          <form id="category-form" class="modal__form">
            <!-- Nombre de la categoría -->
            <div class="form-group">
              <label for="category-name" class="form-label">
                Nombre de la categoría
                <span class="form-required">*</span>
              </label>
              <input 
                type="text" 
                id="category-name" 
                class="form-input" 
                placeholder="Ej: Jugadas, Entrevistas"
                maxlength="50"
                required
              >
              <span class="form-hint">Máximo 50 caracteres</span>
            </div>

            <!-- Icono/Emoji -->
            <div class="form-group">
              <label for="category-icon" class="form-label">
                Icono (emoji)
              </label>
              <input 
                type="text" 
                id="category-icon" 
                class="form-input" 
                placeholder="⚽"
                maxlength="2"
              >
              <span class="form-hint">Un emoji que represente la categoría</span>
            </div>

            <!-- Descripción -->
            <div class="form-group">
              <label for="category-description" class="form-label">
                Descripción
              </label>
              <textarea 
                id="category-description" 
                class="form-input" 
                rows="3" 
                placeholder="Breve descripción de la categoría..."
                maxlength="200"
              ></textarea>
              <span class="form-hint">Máximo 200 caracteres</span>
            </div>

            <!-- Color -->
            <div class="form-group">
              <label for="category-color" class="form-label">
                Color de la etiqueta
              </label>
              <div style="display: flex; gap: var(--space-3); align-items: center;">
                <input 
                  type="color" 
                  id="category-color" 
                  value="#3b82f6"
                  style="width: 60px; height: 40px; border: none; border-radius: var(--border-radius-sm); cursor: pointer;"
                >
                <span id="color-preview" class="badge" style="background: #3b82f6;">
                  Vista previa
                </span>
              </div>
            </div>

            <!-- Acciones del formulario -->
            <div class="modal__actions">
              <button type="submit" class="btn btn--primary" id="save-category-btn">
                ✓ Guardar Categoría
              </button>
              <button type="button" class="btn btn--outline" id="cancel-category-btn">
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    `;

    // Insertar el modal en el body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    this.modal = document.getElementById('category-modal');
    this.attachEventListeners();
  },

  /**
   * Agregar event listeners
   */
  attachEventListeners() {
    const closeBtn = document.getElementById('close-category-modal');
    const cancelBtn = document.getElementById('cancel-category-btn');
    const form = document.getElementById('category-form');
    const colorInput = document.getElementById('category-color');
    const overlay = this.modal.querySelector('.modal__overlay');

    // Cerrar modal
    const closeModal = () => this.close();
    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);

    // Preview del color
    colorInput.addEventListener('input', (e) => {
      const preview = document.getElementById('color-preview');
      preview.style.background = e.target.value;
    });

    // Submit del formulario
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.saveCategory();
    });

    // Botón de abrir modal
    const newCategoryBtn = document.getElementById('new-category-btn');
    if (newCategoryBtn) {
      newCategoryBtn.addEventListener('click', () => this.open());
    }
  },

  /**
   * Abrir modal
   */
  open(editData = null) {
    if (!this.modal) this.createModal();

    this.isEditing = !!editData;
    this.editingId = editData?.id || null;

    // Actualizar título
    const title = document.getElementById('category-modal-title');
    const submitBtn = document.getElementById('save-category-btn');
    
    if (this.isEditing) {
      title.textContent = 'Editar Categoría';
      submitBtn.textContent = '✓ Guardar Cambios';
    } else {
      title.textContent = 'Nueva Categoría';
      submitBtn.textContent = '✓ Guardar Categoría';
    }

    // Llenar datos si es edición
    if (editData) {
      document.getElementById('category-name').value = editData.name || '';
      document.getElementById('category-icon').value = editData.icon || '';
      document.getElementById('category-description').value = editData.description || '';
      document.getElementById('category-color').value = editData.color || '#3b82f6';
      document.getElementById('color-preview').style.background = editData.color || '#3b82f6';
    } else {
      document.getElementById('category-form').reset();
      document.getElementById('category-color').value = '#3b82f6';
      document.getElementById('color-preview').style.background = '#3b82f6';
    }

    this.modal.removeAttribute('hidden');
    document.body.classList.add('modal-open');
  },

  /**
   * Cerrar modal
   */
  close() {
    this.modal.setAttribute('hidden', '');
    document.body.classList.remove('modal-open');
    this.isEditing = false;
    this.editingId = null;
  },

  /**
   * Guardar categoría
   */
  saveCategory() {
    const name = document.getElementById('category-name').value.trim();
    const icon = document.getElementById('category-icon').value.trim();
    const description = document.getElementById('category-description').value.trim();
    const color = document.getElementById('category-color').value;

    if (!name) {
      alert('Por favor ingresa un nombre para la categoría');
      return;
    }

    // Obtener categorías existentes
    let categories = [];
    try {
      categories = JSON.parse(localStorage.getItem('wca-categories') || '[]');
    } catch (e) {
      console.error('Error al cargar categorías:', e);
    }

    if (this.isEditing) {
      // Editar categoría existente
      const index = categories.findIndex(c => c.id === this.editingId);
      if (index !== -1) {
        categories[index] = {
          ...categories[index],
          name,
          icon,
          description,
          color,
          updatedAt: new Date().toISOString()
        };
      }
      
      if (window.WCAAdmin) {
        window.WCAAdmin.showNotification('✓ Categoría actualizada', 'success');
      }
    } else {
      // Crear nueva categoría
      const newCategory = {
        id: Date.now(),
        name,
        icon,
        description,
        color,
        postCount: 0,
        createdAt: new Date().toISOString()
      };
      
      categories.push(newCategory);
      
      if (window.WCAAdmin) {
        window.WCAAdmin.showNotification('✓ Categoría creada', 'success');
      }
    }

    // Guardar en localStorage
    try {
      localStorage.setItem('wca-categories', JSON.stringify(categories));
    } catch (e) {
      console.error('Error al guardar categorías:', e);
      alert('Error al guardar la categoría');
      return;
    }

    // Recargar lista de categorías
    this.loadCategories();
    
    // Cerrar modal
    this.close();

    // Anunciar para accesibilidad
    if (window.WCAAccessibility) {
      window.WCAAccessibility.announce(
        this.isEditing ? 'Categoría actualizada' : 'Nueva categoría creada'
      );
    }
  },

  /**
   * Cargar y mostrar categorías
   */
  loadCategories() {
    let categories = [];
    try {
      categories = JSON.parse(localStorage.getItem('wca-categories') || '[]');
    } catch (e) {
      console.error('Error al cargar categorías:', e);
    }

    // Si no hay categorías, crear las predeterminadas
    if (categories.length === 0) {
      categories = [
        { id: 1, name: 'Jugadas', icon: '⚽', description: 'Mejores jugadas y goles', color: '#ef4444', postCount: 156, createdAt: new Date().toISOString() },
        { id: 2, name: 'Entrevistas', icon: '🎤', description: 'Entrevistas exclusivas', color: '#8b5cf6', postCount: 89, createdAt: new Date().toISOString() },
        { id: 3, name: 'Partidos', icon: '🏆', description: 'Análisis de partidos históricos', color: '#f59e0b', postCount: 234, createdAt: new Date().toISOString() },
        { id: 4, name: 'Estadísticas', icon: '📊', description: 'Datos y récords', color: '#3b82f6', postCount: 67, createdAt: new Date().toISOString() },
        { id: 5, name: 'Sedes', icon: '🏟️', description: 'Estadios y sedes', color: '#10b981', postCount: 45, createdAt: new Date().toISOString() },
        { id: 6, name: 'Cultura', icon: '🎭', description: 'Cultura futbolística', color: '#ec4899', postCount: 78, createdAt: new Date().toISOString() },
        { id: 7, name: 'Historia', icon: '📖', description: 'Historia del fútbol', color: '#6366f1', postCount: 92, createdAt: new Date().toISOString() }
      ];
      localStorage.setItem('wca-categories', JSON.stringify(categories));
    }

    // Actualizar el conteo en el stat-card
    const statCard = document.querySelector('.stat-card__value');
    if (statCard) {
      statCard.textContent = categories.length;
    }

    // Renderizar lista de categorías
    const container = document.querySelector('#section-categorias ul');
    if (!container) return;

    container.innerHTML = '';

    categories.forEach(category => {
      const li = document.createElement('li');
      li.style.cssText = `
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--space-4);
        border: 1px solid var(--color-border);
        border-radius: var(--border-radius-md);
        transition: all var(--transition-fast);
      `;
      
      li.innerHTML = `
        <div style="display: flex; align-items: center; gap: var(--space-3);">
          <span style="font-size: var(--font-size-xl);">${category.icon || '📁'}</span>
          <div>
            <div style="font-weight: var(--font-weight-semibold);">
              ${category.name}
              <span class="badge" style="background: ${category.color}; margin-left: var(--space-2);">
                ${category.postCount || 0} publicaciones
              </span>
            </div>
            ${category.description ? `<div style="font-size: var(--font-size-sm); color: var(--color-text-secondary); margin-top: var(--space-1);">${category.description}</div>` : ''}
          </div>
        </div>
        <div style="display: flex; gap: var(--space-2);">
          <button class="btn btn--outline edit-category" data-id="${category.id}">Editar</button>
          <button class="btn btn--outline delete-category" data-id="${category.id}" style="color: var(--color-error);">Eliminar</button>
        </div>
      `;

      // Hover effect
      li.addEventListener('mouseenter', () => {
        li.style.background = 'var(--color-bg)';
        li.style.transform = 'translateX(4px)';
      });
      
      li.addEventListener('mouseleave', () => {
        li.style.background = 'transparent';
        li.style.transform = 'translateX(0)';
      });

      container.appendChild(li);
    });

    // Event listeners para editar y eliminar
    document.querySelectorAll('.edit-category').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.getAttribute('data-id'));
        const category = categories.find(c => c.id === id);
        if (category) {
          this.open(category);
        }
      });
    });

    document.querySelectorAll('.delete-category').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.getAttribute('data-id'));
        this.deleteCategory(id);
      });
    });
  },

  /**
   * Eliminar categoría
   */
  deleteCategory(id) {
    if (!confirm('¿Estás seguro de eliminar esta categoría?\n\nLas publicaciones asociadas no se eliminarán.')) {
      return;
    }

    let categories = [];
    try {
      categories = JSON.parse(localStorage.getItem('wca-categories') || '[]');
      categories = categories.filter(c => c.id !== id);
      localStorage.setItem('wca-categories', JSON.stringify(categories));
      
      this.loadCategories();
      
      if (window.WCAAdmin) {
        window.WCAAdmin.showNotification('✓ Categoría eliminada', 'success');
      }
      
      if (window.WCAAccessibility) {
        window.WCAAccessibility.announce('Categoría eliminada correctamente');
      }
    } catch (e) {
      console.error('Error al eliminar categoría:', e);
      alert('Error al eliminar la categoría');
    }
  },

  /**
   * Inicializar
   */
  init() {
    this.createModal();
    this.loadCategories();
  }
};

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  categoryModal.init();
});

// Agregar a la API pública
if (window.WCAAdmin) {
  window.WCAAdmin.categoryModal = categoryModal;


/* ==========================================
   Modal nuevos mundiales - Panel de Administración
========================================== */

const worldcupModal = {
  modal: null,
  isEditing: false,
  editingId: null,

  createModal() {
    const modalHTML = `
      <div class="modal" id="worldcup-modal" hidden>
        <div class="modal__overlay"></div>
        
        <div class="modal__content" role="dialog" aria-modal="true" aria-labelledby="worldcup-modal-title">
          <header class="modal__header">
            <h2 id="worldcup-modal-title" class="modal__title">Nuevo Mundial</h2>
            <button class="modal__close" id="close-worldcup-modal" aria-label="Cerrar modal">
              <span class="modal__close-icon">✕</span>
            </button>
          </header>

          <form id="worldcup-form" class="modal__form">
            <div class="form-group">
              <label for="worldcup-year" class="form-label">Año <span class="form-required">*</span></label>
              <input type="number" id="worldcup-year" class="form-input" placeholder="Ej: 2026" min="1930" max="2100" required>
            </div>

            <div class="form-group">
              <label for="worldcup-host" class="form-label">País anfitrión <span class="form-required">*</span></label>
              <input type="text" id="worldcup-host" class="form-input" placeholder="Ej: México, Canadá y EE.UU." maxlength="100" required>
            </div>

            <div class="form-group">
              <label for="worldcup-main-stadium" class="form-label">Sede principal</label>
              <input type="text" id="worldcup-main-stadium" class="form-input" placeholder="Ej: Estadio Azteca" maxlength="100">
            </div>

            <div class="form-group">
              <label for="worldcup-image" class="form-label">Imagen o Logo (URL)</label>
              <input type="url" id="worldcup-image" class="form-input" placeholder="https://...">
            </div>

            <div class="form-group">
              <label for="worldcup-description" class="form-label">Descripción</label>
              <textarea id="worldcup-description" class="form-input" rows="3" maxlength="300" placeholder="Breve descripción del mundial..."></textarea>
            </div>

            <div class="modal__actions">
              <button type="submit" class="btn btn--primary" id="save-worldcup-btn">✓ Guardar Mundial</button>
              <button type="button" class="btn btn--outline" id="cancel-worldcup-btn">Cancelar</button>
            </div>
          </form>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
    this.modal = document.getElementById('worldcup-modal');
    this.attachEventListeners();
  },

  attachEventListeners() {
    const form = document.getElementById('worldcup-form');
    const overlay = this.modal.querySelector('.modal__overlay');
    const closeBtn = document.getElementById('close-worldcup-modal');
    const cancelBtn = document.getElementById('cancel-worldcup-btn');

    // Cerrar modal
    const closeModal = () => this.close();
    overlay.addEventListener('click', closeModal);
    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);

    // Guardar mundial
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.saveWorldcup();
    });
  },

  open(editData = null) {
    if (!this.modal) this.createModal();

    this.isEditing = !!editData;
    this.editingId = editData?.id || null;

    const title = document.getElementById('worldcup-modal-title');
    const submitBtn = document.getElementById('save-worldcup-btn');

    if (this.isEditing) {
      title.textContent = 'Editar Mundial';
      submitBtn.textContent = '✓ Guardar Cambios';
    } else {
      title.textContent = 'Nuevo Mundial';
      submitBtn.textContent = '✓ Guardar Mundial';
      document.getElementById('worldcup-form').reset();
    }

    if (editData) {
      document.getElementById('worldcup-year').value = editData.year || '';
      document.getElementById('worldcup-host').value = editData.host || '';
      document.getElementById('worldcup-main-stadium').value = editData.mainStadium || '';
      document.getElementById('worldcup-image').value = editData.image || '';
      document.getElementById('worldcup-description').value = editData.description || '';
    }

    this.modal.removeAttribute('hidden');
    document.body.classList.add('modal-open');
  },

  close() {
    this.modal.setAttribute('hidden', '');
    document.body.classList.remove('modal-open');
    this.isEditing = false;
    this.editingId = null;
  },

  saveWorldcup() {
    const year = document.getElementById('worldcup-year').value.trim();
    const host = document.getElementById('worldcup-host').value.trim();
    const mainStadium = document.getElementById('worldcup-main-stadium').value.trim();
    const image = document.getElementById('worldcup-image').value.trim();
    const description = document.getElementById('worldcup-description').value.trim();

    if (!year || !host) {
      alert('Por favor completa los campos obligatorios (Año y País anfitrión)');
      return;
    }

    let worldcups = [];
    try {
      worldcups = JSON.parse(localStorage.getItem('wca-worldcups') || '[]');
    } catch (e) {
      console.error('Error al cargar mundiales:', e);
    }

    if (this.isEditing) {
      const index = worldcups.findIndex(w => w.id === this.editingId);
      if (index !== -1) {
        worldcups[index] = { ...worldcups[index], year, host, mainStadium, image, description, updatedAt: new Date().toISOString() };
      }
    } else {
      worldcups.push({
        id: Date.now(),
        year,
        host,
        mainStadium,
        image,
        description,
        createdAt: new Date().toISOString()
      });
    }

    localStorage.setItem('wca-worldcups', JSON.stringify(worldcups));

    this.loadWorldcups();
    this.close();

    if (window.WCAAdmin) window.WCAAdmin.showNotification('✓ Mundial guardado', 'success');
  },

  loadWorldcups() {
    let worldcups = [];
    try {
      worldcups = JSON.parse(localStorage.getItem('wca-worldcups') || '[]');
    } catch (e) {
      console.error('Error al cargar mundiales:', e);
    }

    const container = document.querySelector('#section-mundiales ul');
    if (!container) return;

    container.innerHTML = '';

    worldcups.forEach(w => {
      const li = document.createElement('li');
      li.style.cssText = `
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--space-4);
        border: 1px solid var(--color-border);
        border-radius: var(--border-radius-md);
      `;

      li.innerHTML = `
        <div style="display: flex; align-items: center; gap: var(--space-4);">
          ${w.image ? `<img src="${w.image}" alt="${w.host}" style="width: 48px; height: 48px; border-radius: 8px; object-fit: cover;">` : ''}
          <div>
            <div style="font-weight: var(--font-weight-semibold);">
              ${w.year} - ${w.host}
            </div>
            ${w.mainStadium ? `<div style="font-size: var(--font-size-sm); color: var(--color-text-secondary);">🏟️ ${w.mainStadium}</div>` : ''}
          </div>
        </div>
        <div style="display: flex; gap: var(--space-2);">
          <button class="btn btn--outline edit-worldcup" data-id="${w.id}">Editar</button>
          <button class="btn btn--outline delete-worldcup" data-id="${w.id}" style="color: var(--color-error);">Eliminar</button>
        </div>
      `;

      container.appendChild(li);
    });

    // Eventos editar / eliminar
    document.querySelectorAll('.edit-worldcup').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.getAttribute('data-id'));
        const data = worldcups.find(w => w.id === id);
        this.open(data);
      });
    });

    document.querySelectorAll('.delete-worldcup').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.getAttribute('data-id'));
        this.deleteWorldcup(id);
      });
    });
  },

  deleteWorldcup(id) {
    if (!confirm('¿Eliminar este mundial?')) return;

    let worldcups = [];
    try {
      worldcups = JSON.parse(localStorage.getItem('wca-worldcups') || '[]');
      worldcups = worldcups.filter(w => w.id !== id);
      localStorage.setItem('wca-worldcups', JSON.stringify(worldcups));
    } catch (e) {
      console.error('Error al eliminar mundial:', e);
    }

    this.loadWorldcups();
    if (window.WCAAdmin) window.WCAAdmin.showNotification('✓ Mundial eliminado', 'success');
  },

  init() {
    this.createModal();

    // Asegurar evento del botón (importante si el modal se crea después)
    const newWorldcupBtn = document.getElementById('new-worldcup-btn');
    if (newWorldcupBtn) {
      newWorldcupBtn.addEventListener('click', () => this.open());
    }

    this.loadWorldcups();
  }
};

document.addEventListener('DOMContentLoaded', () => {
  worldcupModal.init();
  // Activar edición/eliminación en los mundiales precargados que estan en html
  document.querySelectorAll('.edit-worldcup').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const item = btn.closest('li');
      const year = item.querySelector('div > div').textContent.split('-')[0].trim();
      const host = item.querySelector('div > div').textContent.split('-')[1].trim();
      const stadium = item.querySelector('div > div + div')?.textContent?.replace('🏟️', '').trim() || '';

      worldcupModal.open({
        id: parseInt(id),
        year,
        host,
        mainStadium: stadium,
        image: item.querySelector('img')?.src || '',
        description: ''
      });
    });
  });

  document.querySelectorAll('.delete-worldcup').forEach(btn => {
    btn.addEventListener('click', () => {
      if (confirm('¿Eliminar este mundial de la lista?')) {
        btn.closest('li').remove();
        if (window.WCAAdmin) window.WCAAdmin.showNotification('✓ Mundial eliminado', 'success');
      }
    });
  });

});

/* ==========================================
   Gestión completa de usuarios con filtro y estados
========================================== */

const userModal = {
  modal: null,
  isEditing: false,
  editingId: null,

  createModal() {
    const modalHTML = `
      <div class="modal" id="user-modal" hidden>
        <div class="modal__overlay"></div>
        <div class="modal__content" role="dialog" aria-modal="true" aria-labelledby="user-modal-title">
          <header class="modal__header">
            <h2 id="user-modal-title" class="modal__title">Nuevo Usuario</h2>
            <button class="modal__close" id="close-user-modal" aria-label="Cerrar modal">
              <span class="modal__close-icon">✕</span>
            </button>
          </header>

          <form id="user-form" class="modal__form">
            <div class="form-group">
              <label for="user-name" class="form-label">Nombre completo <span class="form-required">*</span></label>
              <input type="text" id="user-name" class="form-input" placeholder="Ej: Juan López" maxlength="60" required>
            </div>

            <div class="form-group">
              <label for="user-username" class="form-label">Nombre de usuario <span class="form-required">*</span></label>
              <input type="text" id="user-username" class="form-input" placeholder="@juanlopez" maxlength="30" required>
            </div>

            <div class="form-group">
              <label for="user-email" class="form-label">Correo electrónico</label>
              <input type="email" id="user-email" class="form-input" placeholder="usuario@correo.com" maxlength="100">
            </div>

            <div class="form-group">
              <label for="user-role" class="form-label">Rol</label>
              <select id="user-role" class="form-input">
                <option value="usuario">Usuario</option>
                <option value="editor">Editor</option>
                <option value="admin">Administrador</option>
              </select>
            </div>

            <div class="modal__actions">
              <button type="submit" class="btn btn--primary" id="save-user-btn">✓ Guardar Usuario</button>
              <button type="button" class="btn btn--outline" id="cancel-user-btn">Cancelar</button>
            </div>
          </form>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
    this.modal = document.getElementById('user-modal');
    this.attachEventListeners();
  },

  attachEventListeners() {
    const closeBtn = document.getElementById('close-user-modal');
    const cancelBtn = document.getElementById('cancel-user-btn');
    const overlay = this.modal.querySelector('.modal__overlay');
    const form = document.getElementById('user-form');
    const searchInput = document.getElementById('user-search');
    const statusFilter = document.getElementById('user-status-filter');

    const closeModal = () => this.close();
    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.saveUser();
    });

    // Filtro por texto
    if (searchInput) {
      searchInput.addEventListener('input', () => this.renderFiltered());
    }

    // Filtro por estado
    if (statusFilter) {
      statusFilter.addEventListener('change', () => this.renderFiltered());
    }

    const newUserBtn = document.getElementById('new-user-btn');
    if (newUserBtn) newUserBtn.addEventListener('click', () => this.open());
  },

  open(editData = null) {
    if (!this.modal) this.createModal();

    this.isEditing = !!editData;
    this.editingId = editData?.id || null;

    const title = document.getElementById('user-modal-title');
    const submitBtn = document.getElementById('save-user-btn');

    if (this.isEditing) {
      title.textContent = 'Editar Usuario';
      submitBtn.textContent = '✓ Guardar Cambios';
      document.getElementById('user-name').value = editData.name || '';
      document.getElementById('user-username').value = editData.username || '';
      document.getElementById('user-email').value = editData.email || '';
      document.getElementById('user-role').value = editData.role || 'usuario';
    } else {
      title.textContent = 'Nuevo Usuario';
      submitBtn.textContent = '✓ Guardar Usuario';
      document.getElementById('user-form').reset();
    }

    this.modal.removeAttribute('hidden');
    document.body.classList.add('modal-open');
  },

  close() {
    this.modal.setAttribute('hidden', '');
    document.body.classList.remove('modal-open');
    this.isEditing = false;
    this.editingId = null;
  },

  saveUser() {
    const name = document.getElementById('user-name').value.trim();
    const username = document.getElementById('user-username').value.trim();
    const email = document.getElementById('user-email').value.trim();
    const role = document.getElementById('user-role').value;

    if (!name || !username) {
      alert('Por favor completa los campos obligatorios.');
      return;
    }

    let users = JSON.parse(localStorage.getItem('wca-users') || '[]');

    if (this.isEditing) {
      const index = users.findIndex(u => u.id === this.editingId);
      if (index !== -1) {
        users[index] = { ...users[index], name, username, email, role, updatedAt: new Date().toISOString() };
      }
    } else {
      users.push({
        id: Date.now(),
        name,
        username,
        email,
        role,
        bannedUntil: null,
        createdAt: new Date().toISOString()
      });
    }

    localStorage.setItem('wca-users', JSON.stringify(users));
    this.loadUsers();
    this.close();
    if (window.WCAAdmin) window.WCAAdmin.showNotification('✓ Usuario guardado', 'success');
  },

  renderFiltered() {
    const term = document.getElementById('user-search').value.toLowerCase();
    const status = document.getElementById('user-status-filter').value;
    const users = JSON.parse(localStorage.getItem('wca-users') || '[]');

    let filtered = users.filter(u =>
      u.name.toLowerCase().includes(term) || u.username.toLowerCase().includes(term)
    );

    if (status === 'active') {
      filtered = filtered.filter(u => !this.isBanned(u));
    } else if (status === 'banned') {
      filtered = filtered.filter(u => this.isBanned(u));
    }

    this.renderLists(filtered);
  },

  loadUsers() {
    const users = JSON.parse(localStorage.getItem('wca-users') || '[]');

    if (users.length === 0) {
      const defaultUsers = [
        { id: 1, name: 'Administrador', username: 'admin', email: 'admin@wca.com', role: 'admin', bannedUntil: null },
        { id: 2, name: 'Juan López', username: '@juanlopez', email: 'juan@example.com', role: 'usuario', bannedUntil: null },
        { id: 3, name: 'Erika Barraza', username: '@erikab', email: 'erika@example.com', role: 'editor', bannedUntil: null }
      ];
      localStorage.setItem('wca-users', JSON.stringify(defaultUsers));
    }

    this.renderFiltered();
  },

  renderLists(users) {
    const containerActive = document.getElementById('users-list-active');
    const containerBanned = document.getElementById('users-list-banned');
    containerActive.innerHTML = '';
    containerBanned.innerHTML = '';

    users.forEach(u => {
      const isBanned = this.isBanned(u);
      const target = isBanned ? containerBanned : containerActive;

      const li = document.createElement('li');
      li.style.cssText = `
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--space-4);
        border: 1px solid var(--color-border);
        border-radius: var(--border-radius-md);
        background: ${isBanned ? 'rgba(255,0,0,0.05)' : 'transparent'};
      `;

      li.innerHTML = `
        <div>
          <div style="font-weight: var(--font-weight-semibold);">${u.name}</div>
          <div style="font-size: var(--font-size-sm); color: var(--color-text-secondary);">
            ${u.username} · ${u.role}
            ${isBanned ? `<span style="color: var(--color-error);"> · ⛔ Baneado hasta ${new Date(u.bannedUntil).toLocaleDateString()}</span>` : ''}
          </div>
          ${u.email ? `<div style="font-size: var(--font-size-sm); color: var(--color-text-secondary);">${u.email}</div>` : ''}
        </div>
        <div style="display: flex; gap: var(--space-2);">
          <button class="btn btn--outline edit-user" data-id="${u.id}">Editar</button>
          ${isBanned 
            ? `<button class="btn btn--outline unban-user" data-id="${u.id}" style="color: var(--color-success);">Desbanear</button>`
            : `<button class="btn btn--outline ban-user" data-id="${u.id}" style="color: var(--color-warning);">Banear</button>`
          }
          <button class="btn btn--outline delete-user" data-id="${u.id}" style="color: var(--color-error);">Eliminar</button>
        </div>
      `;

      target.appendChild(li);
    });

    this.attachUserEvents();
  },

  attachUserEvents() {
    const users = JSON.parse(localStorage.getItem('wca-users') || '[]');

    document.querySelectorAll('.edit-user').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.getAttribute('data-id'));
        const user = users.find(u => u.id === id);
        if (user) this.open(user);
      });
    });

    document.querySelectorAll('.delete-user').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.getAttribute('data-id'));
        this.deleteUser(id);
      });
    });

    document.querySelectorAll('.ban-user').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.getAttribute('data-id'));
        this.banUser(id);
      });
    });

    document.querySelectorAll('.unban-user').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.getAttribute('data-id'));
        this.unbanUser(id);
      });
    });
  },

  deleteUser(id) {
    if (!confirm('¿Eliminar este usuario permanentemente?')) return;
    let users = JSON.parse(localStorage.getItem('wca-users') || '[]');
    users = users.filter(u => u.id !== id);
    localStorage.setItem('wca-users', JSON.stringify(users));
    this.renderFiltered();
    if (window.WCAAdmin) window.WCAAdmin.showNotification('✓ Usuario eliminado', 'success');
  },

  banUser(id) {
    const days = prompt('¿Cuántos días deseas banear al usuario?', '3');
    if (!days || isNaN(days)) return alert('Debes ingresar un número válido.');
    const until = new Date();
    until.setDate(until.getDate() + parseInt(days));

    let users = JSON.parse(localStorage.getItem('wca-users') || '[]');
    const user = users.find(u => u.id === id);
    if (user) user.bannedUntil = until.toISOString();

    localStorage.setItem('wca-users', JSON.stringify(users));
    this.renderFiltered();
    if (window.WCAAdmin) window.WCAAdmin.showNotification(`⛔ Usuario baneado por ${days} días`, 'info');
  },

  unbanUser(id) {
    let users = JSON.parse(localStorage.getItem('wca-users') || '[]');
    const user = users.find(u => u.id === id);
    if (user) user.bannedUntil = null;
    localStorage.setItem('wca-users', JSON.stringify(users));
    this.renderFiltered();
    if (window.WCAAdmin) window.WCAAdmin.showNotification('✅ Usuario desbaneado', 'success');
  },

  isBanned(user) {
    return user.bannedUntil && new Date(user.bannedUntil) > new Date();
  },

  init() {
    this.createModal();
    this.loadUsers();
  }
};

document.addEventListener('DOMContentLoaded', () => {
  userModal.init();
});

/* ==========================================
   ESTADÍSTICAS DEL PANEL ADMIN
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  updateAdminStats();
});

/**
 * Actualiza los datos de las estadísticas del panel admin.
 */
function updateAdminStats() {
  // === Cargar datos existentes desde localStorage ===
  const users = JSON.parse(localStorage.getItem('wca-users') || '[]');
  const worldcups = JSON.parse(localStorage.getItem('wca-worldcups') || '[]');
  const posts = JSON.parse(localStorage.getItem('wca-posts') || '[]');
  const categories = JSON.parse(localStorage.getItem('wca-categories') || '[]');

  // === Calcular estadísticas básicas ===
  const bannedCount = users.filter(u => u.bannedUntil && new Date(u.bannedUntil) > new Date()).length;
  const activeCount = users.length - bannedCount;

  // === Actualizar contadores en tarjetas ===
  const statUsers = document.getElementById('stat-users');
  const statBanned = document.getElementById('stat-banned');
  const statWorldcups = document.getElementById('stat-worldcups');
  const statPosts = document.getElementById('stat-posts');

  if (statUsers) statUsers.textContent = users.length;
  if (statBanned) statBanned.textContent = bannedCount;
  if (statWorldcups) statWorldcups.textContent = worldcups.length;
  if (statPosts) statPosts.textContent = posts.length || 523; // valor temporal

  // === Insights rápidos (valores simulados) ===
  const newUsers = Math.floor(Math.random() * 50 + 10);
  const newPosts = Math.floor(Math.random() * 200 + 50);
  const mostActiveCategory = categories.length ? categories[Math.floor(Math.random() * categories.length)].name : 'General';
  const mostActiveUser = users.length ? users[Math.floor(Math.random() * users.length)].username : '@admin';

  const insightUsers = document.getElementById('insight-new-users');
  const insightPosts = document.getElementById('insight-new-posts');
  const insightCategory = document.getElementById('insight-most-active-category');
  const insightUser = document.getElementById('insight-most-active-user');

  if (insightUsers) insightUsers.querySelector('strong').textContent = newUsers;
  if (insightPosts) insightPosts.querySelector('strong').textContent = newPosts;
  if (insightCategory) insightCategory.querySelector('strong').textContent = mostActiveCategory;
  if (insightUser) insightUser.querySelector('strong').textContent = mostActiveUser;

  // === === === GRÁFICAS === === ===

  // --- 1️⃣ Gráfica: crecimiento de usuarios ---
  const ctx1 = document.getElementById('chart-users-growth');
  if (ctx1) {
    new Chart(ctx1, {
      type: 'line',
      data: {
        labels: ['Mayo', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct'],
        datasets: [{
          label: 'Usuarios registrados',
          data: [200, 320, 480, 650, 900, users.length || 1000],
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59,130,246,0.2)',
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          y: { beginAtZero: true, ticks: { stepSize: 100 } }
        }
      }
    });
  }

  // --- 2️⃣ Gráfica: publicaciones por categoría ---
  const ctx2 = document.getElementById('chart-posts-categories');
  if (ctx2) {
    const categoryLabels = categories.map(c => c.name);
    const categoryValues = categories.map(c => c.postCount || Math.floor(Math.random() * 200 + 20));

    new Chart(ctx2, {
      type: 'bar',
      data: {
        labels: categoryLabels.length ? categoryLabels : ['Jugadas', 'Entrevistas', 'Historia', 'Estadísticas'],
        datasets: [{
          label: 'Publicaciones',
          data: categoryValues.length ? categoryValues : [156, 89, 92, 67],
          backgroundColor: [
            '#3b82f6', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6', '#ec4899'
          ],
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          y: { beginAtZero: true, ticks: { stepSize: 50 } }
        }
      }
    });
  }

  // --- 3️⃣ Gráfica: usuarios activos vs baneados ---
  const ctx3 = document.getElementById('chart-users-status');
  if (ctx3) {
    new Chart(ctx3, {
      type: 'doughnut',
      data: {
        labels: ['Activos', 'Baneados'],
        datasets: [{
          data: [activeCount, bannedCount],
          backgroundColor: ['#10b981', '#ef4444'],
          borderColor: '#ffffff',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        cutout: '70%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: { boxWidth: 18, color: '#374151' }
          }
        }
      }
    });
  }

  // --- 4️⃣ Texto dinámico de usuarios activos ---
  const summaryText = document.getElementById('user-status-summary');
  if (summaryText && users.length > 0) {
    const activePercent = ((activeCount / users.length) * 100).toFixed(1);
    summaryText.textContent = `${activePercent}% de los usuarios están activos actualmente.`;
  }
}


}

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
   
   
========================================== */