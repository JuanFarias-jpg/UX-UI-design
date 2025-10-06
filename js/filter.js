/* ==========================================
   FILTERS.JS - Sistema de Filtros para Publicaciones
   ==========================================
   Este archivo maneja:
   - Filtros por categoría
   - Filtros por mundial/selección
   - Búsqueda en tiempo real
   - Ordenamiento
   - Cargar más publicaciones
========================================== */

(function() {
  'use strict';

  // ===== ELEMENTOS DEL DOM =====
  const searchInput = document.querySelector('.search-input');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const dropdowns = document.querySelectorAll('.filter-dropdown');
  const publicationsGrid = document.querySelector('#publications-grid');
  const loadMoreBtn = document.querySelector('#load-more');
  const activeFiltersContainer = document.querySelector('#active-filters');

  // ===== ESTADO DE FILTROS =====
  let currentFilters = {
    category: 'all',
    mundial: '',
    seleccion: '',
    sort: 'recent',
    search: ''
  };

  // ===== FUNCIONES DE FILTRADO =====

  /**
   * Obtener todas las cards de publicaciones
   */
  function getAllCards() {
    return Array.from(document.querySelectorAll('.card'));
  }

  /**
   * Verificar si una card coincide con los filtros actuales
   */
  function cardMatchesFilters(card) {
    const category = card.querySelector('.card__badge')?.textContent.toLowerCase().trim();
    const mundial = card.querySelector('.card__category')?.textContent.toLowerCase();
    const title = card.querySelector('.card__title')?.textContent.toLowerCase();
    const description = card.querySelector('.card__description')?.textContent.toLowerCase();

    // Filtro de categoría
    if (currentFilters.category !== 'all' && category !== currentFilters.category) {
      return false;
    }

    // Filtro de mundial
    if (currentFilters.mundial && !mundial?.includes(currentFilters.mundial)) {
      return false;
    }

    // Filtro de búsqueda
    if (currentFilters.search) {
      const searchLower = currentFilters.search.toLowerCase();
      if (!title?.includes(searchLower) && !description?.includes(searchLower)) {
        return false;
      }
    }

    return true;
  }

  /**
   * Aplicar filtros a las cards
   */
  function applyFilters() {
    const cards = getAllCards();
    let visibleCount = 0;

    cards.forEach(card => {
      if (cardMatchesFilters(card)) {
        card.style.display = '';
        card.style.animation = 'fadeIn 0.3s ease-in';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    // Mostrar mensaje si no hay resultados
    showNoResults(visibleCount === 0);

    // Ordenar cards visibles
    sortCards(currentFilters.sort);

    // Actualizar tags de filtros activos
    updateActiveFilters();

    // Anunciar resultado para lectores de pantalla
    if (window.WCAAccessibility) {
      window.WCAAccessibility.announce(
        `${visibleCount} publicación${visibleCount !== 1 ? 'es' : ''} encontrada${visibleCount !== 1 ? 's' : ''}`
      );
    }
  }

  /**
   * Ordenar las cards según el criterio seleccionado
   */
  function sortCards(sortBy) {
    const cards = getAllCards().filter(card => card.style.display !== 'none');
    
    cards.sort((a, b) => {
      if (sortBy === 'popular') {
        const likesA = parseInt(a.querySelector('.stat__count')?.textContent.replace('k', '000') || 0);
        const likesB = parseInt(b.querySelector('.stat__count')?.textContent.replace('k', '000') || 0);
        return likesB - likesA;
      } else if (sortBy === 'views') {
        const viewsA = parseInt(a.querySelectorAll('.stat')[2]?.querySelector('.stat__count')?.textContent.replace('k', '000') || 0);
        const viewsB = parseInt(b.querySelectorAll('.stat')[2]?.querySelector('.stat__count')?.textContent.replace('k', '000') || 0);
        return viewsB - viewsA;
      } else if (sortBy === 'comments') {
        const commentsA = parseInt(a.querySelectorAll('.stat')[1]?.querySelector('.stat__count')?.textContent || 0);
        const commentsB = parseInt(b.querySelectorAll('.stat')[1]?.querySelector('.stat__count')?.textContent || 0);
        return commentsB - commentsA;
      }
      return 0; // 'recent' - mantener orden original
    });

    // Reordenar en el DOM
    cards.forEach(card => publicationsGrid?.appendChild(card));
  }

  /**
   * Mostrar/ocultar mensaje de "no hay resultados"
   */
  function showNoResults(show) {
    let noResultsMsg = document.querySelector('.no-results');

    if (show && !noResultsMsg) {
      noResultsMsg = document.createElement('div');
      noResultsMsg.className = 'no-results';
      noResultsMsg.innerHTML = `
        <div style="text-align: center; padding: var(--space-16) var(--space-6);">
          <p style="font-size: var(--font-size-2xl); margin-bottom: var(--space-4);">
            😕 No se encontraron publicaciones
          </p>
          <p style="color: var(--color-text-secondary);">
            Intenta ajustar los filtros o buscar con otros términos
          </p>
          <button class="btn btn--outline" style="margin-top: var(--space-6);" onclick="location.reload()">
            Limpiar filtros
          </button>
        </div>
      `;
      publicationsGrid?.parentElement.appendChild(noResultsMsg);
    } else if (!show && noResultsMsg) {
      noResultsMsg.remove();
    }
  }

  /**
   * Actualizar visualización de filtros activos
   */
  function updateActiveFilters() {
    if (!activeFiltersContainer) return;

    const activeTags = [];

    // Agregar tags según filtros activos
    if (currentFilters.category !== 'all') {
      activeTags.push({
        label: currentFilters.category,
        type: 'category'
      });
    }

    if (currentFilters.mundial) {
      activeTags.push({
        label: `Mundial ${currentFilters.mundial}`,
        type: 'mundial'
      });
    }

    if (currentFilters.seleccion) {
      activeTags.push({
        label: currentFilters.seleccion,
        type: 'seleccion'
      });
    }

    if (currentFilters.search) {
      activeTags.push({
        label: `"${currentFilters.search}"`,
        type: 'search'
      });
    }

    // Mostrar/ocultar contenedor
    if (activeTags.length === 0) {
      activeFiltersContainer.setAttribute('hidden', '');
      return;
    }

    activeFiltersContainer.removeAttribute('hidden');

    // Generar HTML de tags
    activeFiltersContainer.innerHTML = activeTags.map(tag => `
      <span class="filter-tag">
        ${tag.label}
        <span class="filter-tag__remove" 
              data-filter-type="${tag.type}" 
              role="button" 
              tabindex="0"
              aria-label="Remover filtro ${tag.label}">
          ✕
        </span>
      </span>
    `).join('');

    // Agregar event listeners a los botones de remover
    activeFiltersContainer.querySelectorAll('.filter-tag__remove').forEach(btn => {
      btn.addEventListener('click', handleRemoveFilter);
      btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleRemoveFilter.call(btn);
        }
      });
    });
  }

  /**
   * Remover un filtro específico
   */
  function handleRemoveFilter() {
    const filterType = this.getAttribute('data-filter-type');

    switch(filterType) {
      case 'category':
        currentFilters.category = 'all';
        filterButtons.forEach(btn => {
          btn.classList.remove('filter-btn--active');
          if (btn.getAttribute('data-filter') === 'all') {
            btn.classList.add('filter-btn--active');
          }
        });
        break;
      case 'mundial':
        currentFilters.mundial = '';
        document.querySelector('.filter-dropdown[aria-label*="mundial"]').value = '';
        break;
      case 'seleccion':
        currentFilters.seleccion = '';
        document.querySelector('.filter-dropdown[aria-label*="selección"]').value = '';
        break;
      case 'search':
        currentFilters.search = '';
        if (searchInput) searchInput.value = '';
        break;
    }

    applyFilters();
  }

  // ===== EVENT LISTENERS =====

  /**
   * Botones de filtro de categoría
   */
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');
      currentFilters.category = filter;

      // Actualizar estado visual de los botones
      filterButtons.forEach(b => b.classList.remove('filter-btn--active'));
      btn.classList.add('filter-btn--active');

      applyFilters();
    });
  });

  /**
   * Dropdowns de filtros avanzados
   */
  dropdowns.forEach(dropdown => {
    dropdown.addEventListener('change', (e) => {
      const value = e.target.value;
      const label = dropdown.getAttribute('aria-label');

      if (label.includes('mundial')) {
        currentFilters.mundial = value;
      } else if (label.includes('selección')) {
        currentFilters.seleccion = value;
      } else if (label.includes('Ordenar')) {
        currentFilters.sort = value;
      }

      applyFilters();
    });
  });

  /**
   * Búsqueda en tiempo real
   */
  let searchTimeout;
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      clearTimeout(searchTimeout);
      
      // Debounce: esperar 300ms después de que el usuario deje de escribir
      searchTimeout = setTimeout(() => {
        currentFilters.search = e.target.value.trim();
        applyFilters();
      }, 300);
    });
  }

  /**
   * Botón "Cargar más"
   */
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      // Simular carga de más publicaciones
      loadMoreBtn.textContent = 'Cargando...';
      loadMoreBtn.disabled = true;

      setTimeout(() => {
        // Aquí iría la lógica para cargar más desde el servidor
        // Por ahora solo mostramos un mensaje
        if (window.WCAAccessibility) {
          window.WCAAccessibility.announce('No hay más publicaciones disponibles');
        }
        
        loadMoreBtn.textContent = 'No hay más publicaciones';
        loadMoreBtn.disabled = true;
      }, 1000);
    });
  }

  // ===== ANIMACIONES CSS =====
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;
  document.head.appendChild(style);

  // ===== INICIALIZACIÓN =====
  // Aplicar filtros iniciales al cargar la página
  applyFilters();

  // ===== API PÚBLICA =====
  window.WCAFilters = {
    applyFilters,
    resetFilters: () => {
      currentFilters = {
        category: 'all',
        mundial: '',
        seleccion: '',
        sort: 'recent',
        search: ''
      };
      
      // Resetear UI
      filterButtons.forEach(btn => {
        btn.classList.remove('filter-btn--active');
        if (btn.getAttribute('data-filter') === 'all') {
          btn.classList.add('filter-btn--active');
        }
      });
      
      dropdowns.forEach(d => d.value = '');
      if (searchInput) searchInput.value = '';
      
      applyFilters();
    }
  };

})();

/* ==========================================
   NOTAS PARA TU COMPAÑERO:
   ==========================================
   
   FUNCIONALIDADES:
   ✓ Filtros por categoría (botones rápidos)
   ✓ Filtros por mundial/selección (dropdowns)
   ✓ Búsqueda en tiempo real (debounce 300ms)
   ✓ Ordenamiento (popular, reciente, vistas)
   ✓ Tags de filtros activos removibles
   ✓ Mensaje cuando no hay resultados
   ✓ Botón "Cargar más" con estado de carga
   
   MEJORAS FUTURAS:
   - Conectar con API real para cargar datos
   - Guardar filtros en URL (query params)
   - Persistir filtros en localStorage
   - Agregar más criterios de ordenamiento
   
   PRUEBAS:
   1. Filtrar por categoría y verificar resultados
   2. Buscar texto y ver filtrado en tiempo real
   3. Combinar múltiples filtros
   4. Remover filtros con la X
   5. Ordenar por diferentes criterios
   
========================================== */