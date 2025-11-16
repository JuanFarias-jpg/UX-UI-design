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
    // Usar atributos data-* si están disponibles, si no, usar el texto como fallback
    const category = card.getAttribute('data-category') || 
                     card.querySelector('.card__badge')?.textContent.toLowerCase().trim() || '';
    const mundialData = card.getAttribute('data-mundial') || '';
    const mundialText = card.querySelector('.card__category')?.textContent.toLowerCase() || '';
    const title = card.querySelector('.card__title')?.textContent.toLowerCase() || '';
    const description = card.querySelector('.card__description')?.textContent.toLowerCase() || '';

    // Filtro de categoría (usar data-category o badge)
    if (currentFilters.category !== 'all') {
      const categoryLower = category.toLowerCase();
      const filterLower = currentFilters.category.toLowerCase();
      
      // Mapear nombres de botones a valores data-category
      const categoryMap = {
        'all': 'all',
        'jugadas': 'jugadas',
        'entrevistas': 'entrevistas',
        'partidos': 'partidos',
        'estadisticas': 'estadisticas',
        'estadísticas': 'estadisticas',
        'sedes': 'sedes',
        'polémicas': 'polémicas',
        'polemicas': 'polémicas',
        'cultura': 'cultura'
      };
      
      const mappedCategory = categoryMap[filterLower] || filterLower;
      
      // Comparar sin acentos y en minúsculas
      const normalizeCategory = (cat) => cat.toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Remover acentos
        .replace(/[^a-z0-9]/g, ''); // Remover caracteres especiales
      
      const normalizedCardCategory = normalizeCategory(category);
      const normalizedFilterCategory = normalizeCategory(mappedCategory);
      
      if (normalizedCardCategory !== normalizedFilterCategory) {
        return false;
      }
    }

    // Filtro de mundial (usar data-mundial o texto)
    if (currentFilters.mundial) {
      if (currentFilters.mundial === 'otros') {
        // Mundiales anteriores a 2006
        let tieneMundialAnterior = false;
        
        // Primero verificar en data-mundial
        if (mundialData && mundialData.trim()) {
          // Obtener todos los años del data-mundial (puede tener múltiples separados por coma)
          const anos = mundialData.split(',').map(a => parseInt(a.trim())).filter(a => !isNaN(a));
          // Verificar si todos los años son menores a 2006
          if (anos.length > 0) {
            tieneMundialAnterior = anos.every(año => año < 2006);
          }
        }
        
        // Si no se encontró en data-mundial, buscar en el texto (fallback)
        if (!tieneMundialAnterior && mundialText) {
          // Extraer años del texto (buscar números de 4 dígitos entre 1930-2005)
          // También buscar años escritos como 1958-1970 o 1958-62
          const añoMatches = mundialText.match(/\b(19[3-9]\d|200[0-5])\b/g);
          if (añoMatches && añoMatches.length > 0) {
            // Verificar que al menos un año sea menor a 2006
            // (si tiene múltiples años, al menos uno debe ser anterior)
            tieneMundialAnterior = añoMatches.some(año => parseInt(año) < 2006);
            
            // Si tiene años mayores o iguales a 2006, verificar que no sean los únicos
            const anosEnTexto = añoMatches.map(a => parseInt(a));
            const anosMenores = anosEnTexto.filter(a => a < 2006);
            const anosMayores = anosEnTexto.filter(a => a >= 2006);
            
            // Si tiene años menores, incluir la card
            if (anosMenores.length > 0) {
              tieneMundialAnterior = true;
            }
          }
        }
        
        // Si no tiene ningún mundial anterior a 2006, ocultar la card
        if (!tieneMundialAnterior) {
          return false;
        }
      } else {
        // Filtro por año específico
        const mundialToMatch = currentFilters.mundial.toString();
        const mundialDataLower = mundialData ? mundialData.toLowerCase() : '';
        const mundialTextLower = mundialText ? mundialText.toLowerCase() : '';
        
        let coincide = false;
        
        // Verificar en data-mundial (puede tener múltiples años separados por coma)
        if (mundialData && mundialDataLower.includes(mundialToMatch)) {
          coincide = true;
        }
        
        // Si no coincide en data-mundial, verificar en el texto como fallback
        if (!coincide && mundialTextLower) {
          if (mundialTextLower.includes(mundialToMatch) || mundialTextLower.includes(mundialToMatch.slice(-2))) {
            coincide = true;
          }
        }
        
        if (!coincide) {
          return false;
        }
      }
    }

    // Filtro de búsqueda
    if (currentFilters.search) {
      const searchLower = currentFilters.search.toLowerCase();
      if (!title.includes(searchLower) && !description.includes(searchLower)) {
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
   * Convertir número con formato "k" a número entero
   */
  function parseNumber(value) {
    if (!value) return 0;
    const str = value.toString().toLowerCase().trim();
    if (str.includes('k')) {
      return Math.round(parseFloat(str.replace('k', '')) * 1000);
    }
    return parseInt(str) || 0;
  }

  /**
   * Ordenar las cards según el criterio seleccionado
   */
  function sortCards(sortBy) {
    const cards = getAllCards().filter(card => card.style.display !== 'none');
    
    cards.sort((a, b) => {
      if (sortBy === 'recent') {
        // Ordenar por fecha (más reciente primero)
        const dateA = a.getAttribute('data-date') || '';
        const dateB = b.getAttribute('data-date') || '';
        if (dateA && dateB) {
          return new Date(dateB) - new Date(dateA);
        }
        // Si no hay fecha, mantener orden original
        return 0;
      } else if (sortBy === 'popular') {
        // Ordenar por likes (más populares primero)
        const likesA = parseInt(a.getAttribute('data-likes') || 0);
        const likesB = parseInt(b.getAttribute('data-likes') || 0);
        // Si no hay data-likes, intentar parsear del texto
        if (likesA === 0 || likesB === 0) {
          const textLikesA = a.querySelector('.stat__count')?.textContent || '0';
          const textLikesB = b.querySelector('.stat__count')?.textContent || '0';
          const parsedA = likesA || parseNumber(textLikesA);
          const parsedB = likesB || parseNumber(textLikesB);
          return parsedB - parsedA;
        }
        return likesB - likesA;
      } else if (sortBy === 'views') {
        // Ordenar por vistas (más vistas primero)
        const viewsA = parseInt(a.getAttribute('data-views') || 0);
        const viewsB = parseInt(b.getAttribute('data-views') || 0);
        // Si no hay data-views, intentar parsear del texto (tercer stat)
        if (viewsA === 0 || viewsB === 0) {
          const statsA = a.querySelectorAll('.stat');
          const statsB = b.querySelectorAll('.stat');
          const textViewsA = statsA[2]?.querySelector('.stat__count')?.textContent || '0';
          const textViewsB = statsB[2]?.querySelector('.stat__count')?.textContent || '0';
          const parsedA = viewsA || parseNumber(textViewsA);
          const parsedB = viewsB || parseNumber(textViewsB);
          return parsedB - parsedA;
        }
        return viewsB - viewsA;
      } else if (sortBy === 'comments') {
        // Ordenar por comentarios (más comentadas primero)
        const commentsA = parseInt(a.getAttribute('data-comments') || 0);
        const commentsB = parseInt(b.getAttribute('data-comments') || 0);
        // Si no hay data-comments, intentar parsear del texto (segundo stat)
        if (commentsA === 0 || commentsB === 0) {
          const statsA = a.querySelectorAll('.stat');
          const statsB = b.querySelectorAll('.stat');
          const textCommentsA = statsA[1]?.querySelector('.stat__count')?.textContent || '0';
          const textCommentsB = statsB[1]?.querySelector('.stat__count')?.textContent || '0';
          const parsedA = commentsA || parseInt(textCommentsA) || 0;
          const parsedB = commentsB || parseInt(textCommentsB) || 0;
          return parsedB - parsedA;
        }
        return commentsB - commentsA;
      }
      return 0;
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
        const mundialDropdown = document.querySelector('.filter-dropdown[aria-label*="mundial"]');
        if (mundialDropdown) mundialDropdown.value = '';
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
        // Solo se muestra el mensaje
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
    Documentación de Filtros (filter.js):
   ==========================================
    Este archivo maneja:
   - Filtros por categoría
   - Filtros por mundial/selección
   - Búsqueda en tiempo real
   - Ordenamiento
   - Cargar más publicaciones
   
   FUNCIONALIDADES:
   Filtros por categoría (botones rápidos)
   Filtros por mundial/selección (dropdowns)
   Búsqueda en tiempo real (debounce 300ms)
   Ordenamiento (popular, reciente, vistas)
   Tags de filtros activos removibles
   Mensaje cuando no hay resultados
   Botón "Cargar más" con estado de carga
   
   
   MEJORAS FUTURAS:
   - Guardar filtros en URL (query params)
   - Persistir filtros en localStorage
   - Agregar más criterios de ordenamiento
   
   PRUEBAS FALTANTES:
  - No están implementados los filtros en todas las páginas
  -Checar funcionalidad completa
   
========================================== */