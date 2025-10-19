/* ==========================================
   PROFILE.JS - Funcionalidad del Perfil
   ==========================================
   Este archivo maneja:
   - Navegación entre tabs del perfil
   - Filtros de estado de publicaciones
   - Cerrar sesión
   - Cargar datos del usuario
========================================== */

(function() {
  'use strict';

  // ===== ELEMENTOS DEL DOM =====
  const profileNavLinks = document.querySelectorAll('.profile-nav__link');
  const profileSections = document.querySelectorAll('.profile-content');
  const statusFilters = document.querySelectorAll('[data-status]');
  const logoutBtn = document.querySelector('#logout-btn');
  const newPostBtn = document.querySelector('#new-post-btn');

  // ===== NAVEGACIÓN ENTRE TABS =====

  /**
   * Cambiar de tab en el perfil
   */
  function switchTab(tabName) {
    // Actualizar links de navegación
    profileNavLinks.forEach(link => {
      const linkTab = link.getAttribute('data-tab');
      if (linkTab === tabName) {
        link.classList.add('profile-nav__link--active');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('profile-nav__link--active');
        link.removeAttribute('aria-current');
      }
    });

    // Mostrar/ocultar secciones
    profileSections.forEach(section => {
      const sectionId = section.id;
      if (sectionId === `tab-${tabName}`) {
        section.removeAttribute('hidden');
        // Animar entrada
        section.style.animation = 'fadeIn 0.3s ease-in';
      } else {
        section.setAttribute('hidden', '');
      }
    });

    // Actualizar URL sin recargar
    if (history.pushState) {
      history.pushState(null, null, `#${tabName}`);
    }

    // Anunciar cambio para lectores de pantalla
    if (window.WCAAccessibility) {
      window.WCAAccessibility.announce(`Mostrando ${getTabLabel(tabName)}`);
    }
  }

  /**
   * Obtener etiqueta legible del tab
   */
  function getTabLabel(tabName) {
    const labels = {
      'publicaciones': 'Mis Publicaciones',
      'favoritas': 'Publicaciones Favoritas',
      'borradores': 'Borradores',
      'configuracion': 'Configuración'
    };
    return labels[tabName] || tabName;
  }

  /**
   * Event listeners para los links de navegación
   */
  profileNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const tabName = link.getAttribute('data-tab');
      switchTab(tabName);
    });
  });

  // ===== FILTROS DE ESTADO =====

  /**
   * Filtrar publicaciones por estado
   */
  function filterByStatus(status) {
    const cards = document.querySelectorAll('#tab-publicaciones .card');

    cards.forEach(card => {
      const badge = card.querySelector('.badge');
      let cardStatus = 'published';

      if (badge) {
        const badgeText = badge.textContent.toLowerCase().trim();
        if (badgeText.includes('revisión')) cardStatus = 'pending';
        if (badgeText.includes('rechazada')) cardStatus = 'rejected';
      }

      // Mostrar/ocultar según filtro
      if (status === 'all' || status === cardStatus) {
        card.style.display = '';
        card.style.animation = 'fadeIn 0.3s ease-in';
      } else {
        card.style.display = 'none';
      }
    });

    // Contar visibles
    const visibleCount = Array.from(cards).filter(c => c.style.display !== 'none').length;
    
    if (window.WCAAccessibility) {
      window.WCAAccessibility.announce(
        `Mostrando ${visibleCount} publicación${visibleCount !== 1 ? 'es' : ''}`
      );
    }
  }

  /**
   * Event listeners para filtros de estado
   */
  statusFilters.forEach(filter => {
    filter.addEventListener('click', () => {
      const status = filter.getAttribute('data-status');
      
      // Actualizar estado visual
      statusFilters.forEach(f => f.classList.remove('filter-btn--active'));
      filter.classList.add('filter-btn--active');

      // Aplicar filtro
      filterByStatus(status);
    });
  });

  // ===== CERRAR SESIÓN =====

  /**
   * Manejar cierre de sesión
   */
  function handleLogout() {
    // Mostrar confirmación
    const confirmed = confirm('¿Estás seguro de que deseas cerrar sesión?');
    
    if (!confirmed) return;

    // Limpiar datos de sesión
    try {
      localStorage.removeItem('wca-user');
      localStorage.removeItem('wca-remember');
    } catch (e) {
      console.warn('No se pudo limpiar localStorage');
    }

    // Anunciar
    if (window.WCAAccessibility) {
      window.WCAAccessibility.announce('Cerrando sesión...');
    }

    // Redirigir al login
    setTimeout(() => {
      window.location.href = 'login.html';
    }, 500);
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', handleLogout);
  }

  // ===== NUEVA PUBLICACIÓN =====

  if (newPostBtn) {
  const modal = document.querySelector('#post-modal');
  const closeModal = document.querySelector('#close-post-modal');
  const cancelBtn = document.querySelector('#cancel-post-btn');
  const form = document.querySelector('#post-form');
  const mediaInput = document.querySelector('#post-media');
  const previewContainer = document.querySelector('#media-preview');
  let mediaFiles = [];
  let editingCard = null;

  function openModal(editMode = false, data = null) {
    modal.removeAttribute('hidden');
    document.body.classList.add('modal-open');
    document.querySelector('#post-modal-title').textContent = editMode ? 'Editar Publicación' : 'Nueva Publicación';
    document.querySelector('#save-post-btn').textContent = editMode ? 'Guardar cambios' : 'Publicar';
    form.reset();
    previewContainer.innerHTML = '';
    mediaFiles = [];

    if (editMode && data) {
      document.querySelector('#post-title').value = data.title;
      document.querySelector('#post-category').value = data.category;
      document.querySelector('#post-description').value = data.description;
      document.querySelector('#post-content').value = data.content;
      document.querySelector('#post-status').value = data.status;

      if (data.media && data.media.length > 0) {
        data.media.forEach(src => addMediaPreview(src));
      }
    }
  }

  function closeModalFunc() {
    modal.setAttribute('hidden', '');
    document.body.classList.remove('modal-open');

  }

  closeModal.addEventListener('click', closeModalFunc);
  cancelBtn.addEventListener('click', closeModalFunc);
  newPostBtn.addEventListener('click', () => openModal());

  // Mostrar previsualización de múltiples imágenes o videos
  function addMediaPreview(src, type = 'image') {
    const wrapper = document.createElement('div');
    wrapper.style.position = 'relative';
    wrapper.style.width = '120px';
    wrapper.style.height = '120px';
    wrapper.style.overflow = 'hidden';
    wrapper.style.borderRadius = 'var(--border-radius-md)';

    const removeBtn = document.createElement('button');
    removeBtn.textContent = '×';
    removeBtn.style.position = 'absolute';
    removeBtn.style.top = '4px';
    removeBtn.style.right = '4px';
    removeBtn.style.background = 'rgba(0,0,0,0.5)';
    removeBtn.style.color = '#fff';
    removeBtn.style.border = 'none';
    removeBtn.style.borderRadius = '50%';
    removeBtn.style.width = '20px';
    removeBtn.style.height = '20px';
    removeBtn.style.cursor = 'pointer';
    removeBtn.addEventListener('click', () => wrapper.remove());

    if (type === 'video') {
      const vid = document.createElement('video');
      vid.src = src;
      vid.controls = true;
      vid.style.width = '100%';
      vid.style.height = '100%';
      wrapper.appendChild(vid);
    } else {
      const img = document.createElement('img');
      img.src = src;
      img.alt = 'media preview';
      img.style.width = '100%';
      img.style.height = '100%';
      img.style.objectFit = 'cover';
      wrapper.appendChild(img);
    }
    wrapper.appendChild(removeBtn);
    previewContainer.appendChild(wrapper);
  }

  mediaInput.addEventListener('change', (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const type = file.type.startsWith('video') ? 'video' : 'image';
        addMediaPreview(ev.target.result, type);
        mediaFiles.push(ev.target.result);
      };
      reader.readAsDataURL(file);
    });
  });

  // Guardar publicación
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.querySelector('#post-title').value;
    const desc = document.querySelector('#post-description').value;
    const category = document.querySelector('#post-category').value;
    const content = document.querySelector('#post-content').value;
    const status = document.querySelector('#post-status').value;
    const firstMedia = mediaFiles[0] || 'assets/images/user-post-placeholder.jpg';

    const grid = document.querySelector('.card-grid');
    const article = document.createElement('article');
    article.className = 'card';
    article.innerHTML = `
      <div class="card__image">
        <img src="${firstMedia}" alt="${title}">
        <span class="card__badge">${category}</span>
        <span class="badge" style="position:absolute;top:var(--space-3);right:var(--space-3);background:var(--color-success);">
          ${status}
        </span>
      </div>
      <div class="card__content">
        <h3 class="card__title">${title}</h3>
        <p class="card__description">${desc}</p>
        <div class="card__meta">
          <span class="card__category">${category}</span>
          <time>${new Date().toLocaleDateString()}</time>
        </div>
      </div>
      <div style="display:flex;gap:var(--space-2);padding:var(--space-3);">
        <button class="btn btn--outline edit-post" style="flex:1;">Editar</button>
        <button class="btn btn--outline view-post" style="flex:1;">Ver</button>
      </div>
    `;
    grid.prepend(article);

    // Enlazar editar y ver
    article.querySelector('.edit-post').addEventListener('click', () => {
      openModal(true, { title, description: desc, category, content, status, media: mediaFiles });
    });
    article.querySelector('.view-post').addEventListener('click', () => {
      // Simular guardar datos para la vista de detalle
      localStorage.setItem('currentPost', JSON.stringify({ title, content, media: mediaFiles }));
      window.location.href = 'publicacion.html';
    });

    closeModalFunc();
  });
}

// ===== ACTIVAR BOTONES DE EDICIÓN EN CARDS EXISTENTES =====
document.querySelectorAll('.card .edit-post').forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const card = e.target.closest('.card');
    if (!card) return;

    // Extraer datos del card
    const title = card.querySelector('.card__title')?.textContent.trim() || '';
    const description = card.querySelector('.card__description')?.textContent.trim() || '';
    const category = card.querySelector('.card__badge')?.textContent.trim() || '';
    const status = card.querySelector('.badge')?.textContent.trim() || '';
    const imageSrc = card.querySelector('.card__image img')?.src || '';
    const content = card.querySelector('.card__description')?.textContent.trim() || '';

    // Abrir el modal en modo edición
    openModal(true, {
      title,
      description,
      category,
      content,
      status,
      media: [imageSrc] // por ahora solo la imagen principal
    });
  });
});

  // ===== CARGAR DATOS DEL USUARIO =====

  /**
   * Cargar y mostrar información del usuario
   */
  function loadUserData() {
    try {
      const username = localStorage.getItem('wca-user');
      
      if (!username) {
        // No hay sesión, redirigir al login
        window.location.href = 'login.html';
        return;
      }

      // Simular datos del usuario 
      const userData = {
        name: username === 'admin' ? 'Administrador' : 'Juan López',
        username: username,
        avatar: 'assets/images/avatar-placeholder.jpg',
        stats: {
          posts: 24,
          likes: 1200,
          followers: 156
        }
      };

      // Actualizar DOM con los datos
      const profileName = document.querySelector('#profile-name');
      const profileUsername = document.querySelector('.profile-username');

      if (profileName) profileName.textContent = userData.name;
      if (profileUsername) profileUsername.textContent = `@${userData.username}`;

    } catch (e) {
      console.error('Error al cargar datos del usuario:', e);
    }
  }

  // ===== VERIFICAR SESIÓN =====

  /**
   * Verificar que el usuario esté autenticado
   */
  function checkAuthentication() {
    try {
      const username = localStorage.getItem('wca-user');
      const session = localStorage.getItem('wca-session');
      
      if (!username || !session) {
        // Redirigir al login si no hay sesión
        console.log('No hay sesión activa, redirigiendo a login...');
        window.location.href = 'login.html';
        return false;
      }
      
      return true;
    } catch (e) {
      console.error('Error al verificar autenticación:', e);
      window.location.href = 'login.html';
      return false;
    }
  }

  // ===== NAVEGACIÓN POR URL =====

  /**
   * Cargar tab según el hash de la URL
   */
  function loadTabFromURL() {
    const hash = window.location.hash.slice(1); // Remover el #
    
    if (hash && document.querySelector(`#tab-${hash}`)) {
      switchTab(hash);
    } else {
      switchTab('publicaciones'); // Tab por defecto
    }
  }

  /**
   * Escuchar cambios en el hash de la URL
   */
  window.addEventListener('hashchange', loadTabFromURL);

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
  `;
  document.head.appendChild(style);

  // ===== INICIALIZACIÓN =====
  if (checkAuthentication()) {
  const mainProfile = document.querySelector('.main.profile-page');
  if (mainProfile) mainProfile.style.display = 'block'; // ← mostrar contenido
  loadUserData();
  loadTabFromURL();
}
  loadUserData();
  loadTabFromURL();

  // ===== API PÚBLICA =====
  window.WCAProfile = {
    switchTab,
    filterByStatus,
    logout: handleLogout
  };

})();

/* ==========================================
  DOCUMENTACION DE PROFILE.JS:

   FUNCIONALIDADES:
   Sistema de tabs con animación
   Filtros por estado de publicación
   Verificación de autenticación
   Cerrar sesión funcional
   Navegación por URL hash (#publicaciones)
   Carga datos del usuario desde localStorage
   
   FLUJO:
   1. Al cargar la página verifica si hay sesión
   2. Si no hay sesión → redirige a login.html
   3. Si hay sesión → carga datos y muestra perfil
   4. Usuario puede navegar entre tabs
   5. Al cerrar sesión → limpia datos y redirige
   
   
   FALTA PROBAR:
   - Editar información del perfil
   - Subir/cambiar foto de avatar
   - Modal para crear nueva publicación
   - Confirmación antes de eliminar cuenta
   - Paginación de publicaciones
   
========================================== */