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
    newPostBtn.addEventListener('click', () => {
      // Por ahora solo mostrar alerta
      // Redirigirá a un formulario
      alert('Funcionalidad de crear publicación en desarrollo.\nPor ahora es solo un prototipo visual.');
    });
  }

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
  checkAuthentication();
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