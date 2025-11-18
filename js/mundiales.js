// ======================================================
// ===== DATOS DE TODOS LOS MUNDIALES =====
// ======================================================

const todosLosMundiales = [
  { anio: 1930, sede: "Uruguay", imagen: "assets/images/trofeo.jpg", bracket: [{ type: "final", matches: ["🏆 Uruguay 4–2 Argentina"] }] },
  { anio: 1934, sede: "Italia", imagen: "assets/images/trofeo.jpg", bracket: [{ type: "semifinal", matches: ["🇮🇹 Italia 1–0 Austria", "🇨🇿 Checoslovaquia 3–1 Alemania"] }, { type: "final", matches: ["🏆 Italia 2–1 Checoslovaquia (t.s.)"] }] },
  { anio: 1938, sede: "Francia", imagen: "assets/images/trofeo.jpg", bracket: [{ type: "semifinal", matches: ["🇮🇹 Italia 2–1 Brasil", "🇭🇺 Hungría 5–1 Suecia"] }, { type: "final", matches: ["🏆 Italia 4–2 Hungría"] }] },
  { anio: 1950, sede: "Brasil", imagen: "assets/images/trofeo.jpg", bracket: [{ type: "final", matches: ["🏆 Uruguay 2–1 Brasil (Grupo final)"] }] },
  { anio: 1954, sede: "Suiza", imagen: "assets/images/trofeo.jpg", bracket: [{ type: "semifinal", matches: ["🇩🇪 Alemania 6–1 Austria", "🇭🇺 Hungría 4–2 Uruguay"] }, { type: "final", matches: ["🏆 Alemania 3–2 Hungría"] }] },
  { anio: 1958, sede: "Suecia", imagen: "assets/images/trofeo.jpg", bracket: [{ type: "semifinal", matches: ["🇸🇪 Suecia 3–1 Alemania", "🇧🇷 Brasil 5–2 Francia"] }, { type: "final", matches: ["🏆 Brasil 5–2 Suecia"] }] },
  { anio: 1962, sede: "Chile", imagen: "assets/images/trofeo.jpg", bracket: [{ type: "semifinal", matches: ["🇧🇷 Brasil 4–2 Chile", "🇨🇿 Checoslovaquia 3–1 Yugoslavia"] }, { type: "final", matches: ["🏆 Brasil 3–1 Checoslovaquia"] }] },
  { anio: 1966, sede: "Inglaterra", imagen: "assets/images/trofeo.jpg", bracket: [{ type: "semifinal", matches: ["🏴 Inglaterra 2–1 Portugal", "🇩🇪 Alemania 2–1 URSS"] }, { type: "final", matches: ["🏆 Inglaterra 4–2 Alemania (t.s.)"] }] },
  { anio: 1970, sede: "México", imagen: "assets/images/trofeo.jpg", bracket: [{ type: "semifinal", matches: ["🇧🇷 Brasil 3–1 Uruguay", "🇮🇹 Italia 4–3 Alemania (t.s.)"] }, { type: "final", matches: ["🏆 Brasil 4–1 Italia"] }] },
  { anio: 1974, sede: "Alemania Federal", imagen: "assets/images/trofeo.jpg", bracket: [{ type: "semifinal", matches: ["🇩🇪 RFA 1–0 Polonia", "🇳🇱 Países Bajos 2–0 Brasil"] }, { type: "final", matches: ["🏆 RFA 2–1 Países Bajos"] }] },
  { anio: 1978, sede: "Argentina", imagen: "assets/images/trofeo.jpg", bracket: [{ type: "final", matches: ["🏆 Argentina 3–1 Países Bajos (t.s.)"] }] },
  { anio: 1982, sede: "España", imagen: "assets/images/trofeo.jpg", bracket: [{ type: "semifinal", matches: ["🇮🇹 Italia 2–0 Polonia", "🇩🇪 Alemania 3–3 Francia (5–4 pen.)"] }, { type: "final", matches: ["🏆 Italia 3–1 Alemania"] }] },
  { anio: 1986, sede: "México", imagen: "assets/images/trofeo.jpg", bracket: [{ type: "semifinal", matches: ["🇩🇪 Alemania 2–0 Francia", "🇦🇷 Argentina 2–0 Bélgica"] }, { type: "final", matches: ["🏆 Argentina 3–2 Alemania"] }] },
  { anio: 1990, sede: "Italia", imagen: "assets/images/trofeo.jpg", bracket: [{ type: "semifinal", matches: ["🇩🇪 Alemania 1–1 Inglaterra (4–3 pen.)", "🇦🇷 Argentina 1–1 Italia (4–3 pen.)"] }, { type: "final", matches: ["🏆 Alemania 1–0 Argentina"] }] },
  { anio: 1994, sede: "EE.UU.", imagen: "assets/images/trofeo.jpg", bracket: [{ type: "semifinal", matches: ["🇧🇷 Brasil 1–0 Suecia", "🇮🇹 Italia 2–1 Bulgaria"] }, { type: "final", matches: ["🏆 Brasil 0–0 Italia (3–2 pen.)"] }] },
  { anio: 1998, sede: "Francia", imagen: "assets/images/trofeo.jpg", bracket: [{ type: "semifinal", matches: ["🇫🇷 Francia 2–1 Croacia", "🇧🇷 Brasil 2–1 Países Bajos (pen.)"] }, { type: "final", matches: ["🏆 Francia 3–0 Brasil"] }] },
  { anio: 2002, sede: "Corea / Japón", imagen: "assets/images/trofeo.jpg", bracket: [{ type: "semifinal", matches: ["🇩🇪 Alemania 1–0 Corea del Sur", "🇧🇷 Brasil 1–0 Turquía"] }, { type: "final", matches: ["🏆 Brasil 2–0 Alemania"] }] },
  { anio: 2006, sede: "Alemania", imagen: "assets/images/trofeo.jpg", bracket: [{ type: "semifinal", matches: ["🇮🇹 Italia 2–0 Alemania", "🇫🇷 Francia 1–0 Portugal"] }, { type: "final", matches: ["🏆 Italia 1–1 Francia (5–3 pen.)"] }] },
  { anio: 2010, sede: "Sudáfrica", imagen: "assets/images/trofeo.jpg", bracket: [{ type: "semifinal", matches: ["🇳🇱 Países Bajos 3–2 Uruguay", "🇪🇸 España 1–0 Alemania"] }, { type: "final", matches: ["🏆 España 1–0 Países Bajos (t.s.)"] }] },
  { anio: 2014, sede: "Brasil", imagen: "assets/images/trofeo.jpg", bracket: [{ type: "semifinal", matches: ["🇩🇪 Alemania 7–1 Brasil", "🇦🇷 Argentina 0–0 Países Bajos (4–2 pen.)"] }, { type: "final", matches: ["🏆 Alemania 1–0 Argentina (t.s.)"] }] },
  { anio: 2018, sede: "Rusia", imagen: "assets/images/worldcup2018.jpg", bracket: [{ type: "semifinal", matches: ["🇫🇷 Francia 1–0 Bélgica", "🏴 Inglaterra 1–2 Croacia (t.s.)"] }, { type: "final", matches: ["🏆 Francia 4–2 Croacia"] }] },
  { anio: 2022, sede: "Qatar", imagen: "assets/images/messiCopa.jpg", bracket: [{ type: "semifinal", matches: ["🇦🇷 Argentina 3–0 Croacia", "🇫🇷 Francia 2–0 Marruecos"] }, { type: "final", matches: ["🏆 Argentina 3–3 Francia (4–2 pen.)"] }] }
];

// ======================================================
// ===== VARIABLES PARA CARRUSEL DE MUNDIALES =====
// ======================================================

let currentMundialIndex = 0;
let mundialesFiltrados = [];

// ======================================================
// ===== RENDERIZAR CARDS DE MUNDIALES (CARRUSEL) =====
// ======================================================

function renderMundialesCards(mundialesData) {
  const container = document.getElementById("mundiales-cards-container");
  const indicatorsContainer = document.getElementById("mundiales-carousel-indicators");
  
  if (!container) return;

  mundialesFiltrados = mundialesData;

  if (mundialesData.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="min-width: 100%; text-align: center; padding: 3rem; color: var(--color-text-secondary);">
        <p style="font-size: 1.2rem; margin-bottom: 0.5rem;">No se encontraron mundiales</p>
        <p>Intenta con otros filtros de búsqueda</p>
      </div>
    `;
    if (indicatorsContainer) indicatorsContainer.innerHTML = '';
    return;
  }

  // Resetear índice si es necesario
  if (currentMundialIndex >= mundialesData.length) {
    currentMundialIndex = 0;
  }

  // Renderizar cards
  container.innerHTML = mundialesData.map(m => {
    const finalMatch = m.bracket.find(b => b.type === "final");
    const imagen = m.imagen || "assets/images/trofeo.jpg";
    
    return `
      <article class="mundial-card" data-anio="${m.anio}" data-sede="${m.sede.toLowerCase()}">
        <div class="mundial-card__header">
          <h3 class="mundial-card__year">${m.anio}</h3>
          <span class="mundial-card__sede">${m.sede}</span>
        </div>
        <div class="mundial-card__body">
          <div class="mundial-card__image">
            <img src="${imagen}" alt="Mundial ${m.anio} - ${m.sede}" loading="lazy">
          </div>
          <div class="mundial-card__final-match">
            ${finalMatch ? finalMatch.matches[0] : "Sin datos"}
          </div>
        </div>
        <div class="mundial-card__footer">
          <a href="#detalle-mundial" class="link-mundial btn btn--outline" data-anio="${m.anio}">
            Ver detalles
          </a>
        </div>
      </article>
    `;
  }).join('');

  // Renderizar indicadores (solo 3 que se mueven dinámicamente)
  updateCarouselIndicators();

  // Usar requestAnimationFrame para asegurar que el DOM se haya actualizado antes de calcular posiciones
  requestAnimationFrame(() => {
    // Doble requestAnimationFrame para asegurar que el layout esté completamente renderizado
    requestAnimationFrame(() => {
      updateMundialesCarouselPosition();
    });
  });
}

// ======================================================
// ===== ACTUALIZAR INDICADORES DEL CARRUSEL (3 INDICADORES DINÁMICOS) =====
// ======================================================

function updateCarouselIndicators() {
  const indicatorsContainer = document.getElementById("mundiales-carousel-indicators");
  if (!indicatorsContainer || mundialesFiltrados.length === 0) return;

  // Determinar qué 3 indicadores mostrar
  let startIndex = 0;
  
  if (mundialesFiltrados.length <= 3) {
    // Si hay 3 o menos mundiales, mostrar todos
    startIndex = 0;
  } else {
    // Calcular el índice de inicio para mostrar 3 indicadores alrededor del actual
    if (currentMundialIndex === 0) {
      startIndex = 0;
    } else if (currentMundialIndex === mundialesFiltrados.length - 1) {
      // Si estamos en el último, mostrar los últimos 3
      startIndex = mundialesFiltrados.length - 3;
    } else {
      // Mostrar el anterior, el actual y el siguiente
      startIndex = currentMundialIndex - 1;
    }
  }

  const endIndex = Math.min(startIndex + 3, mundialesFiltrados.length);
  
  indicatorsContainer.innerHTML = '';
  for (let i = startIndex; i < endIndex; i++) {
    const indicator = document.createElement('button');
    indicator.className = `mundiales-carousel-indicator ${i === currentMundialIndex ? 'active' : ''}`;
    indicator.setAttribute('data-index', i);
    indicator.setAttribute('aria-label', `Ir a mundial ${i + 1}`);
    indicatorsContainer.appendChild(indicator);
  }
}

// ======================================================
// ===== FILTROS Y BÚSQUEDA =====
// ======================================================

const searchbar = document.getElementById("searchbar");
const categoria = document.getElementById("categoria");

function aplicarFiltros() {
  const searchText = searchbar.value.toLowerCase();
  const catNum = Number(categoria.value) - 1; // 0 = año, 1 = sede
  
  let filtrados = [...todosLosMundiales];

  if (searchText.length > 0 && catNum >= 0) {
    filtrados = filtrados.filter(m => {
      if (catNum === 0) { // Filtrar por año
        return m.anio.toString().includes(searchText);
      } else if (catNum === 1) { // Filtrar por sede
        return m.sede.toLowerCase().includes(searchText);
      }
      return true;
    });
  }

  // Si hay resultados filtrados, mover al primer resultado
  if (filtrados.length > 0 && searchText.length > 0) {
    currentMundialIndex = 0; // Mostrar el primer resultado filtrado
  } else if (filtrados.length === 0) {
    // Si no hay resultados, mantener el índice en 0
    currentMundialIndex = 0;
  } else {
    // Si no hay búsqueda, resetear al inicio
    currentMundialIndex = 0;
  }

  renderMundialesCards(filtrados);
}

// ======================================================
// ===== NAVEGACIÓN DEL CARRUSEL =====
// ======================================================

function updateMundialesCarouselPosition() {
  const container = document.getElementById("mundiales-cards-container");
  const containerWrapper = document.getElementById("mundiales-carousel-container");
  
  if (!container || !containerWrapper || mundialesFiltrados.length === 0) return;

  // Forzar un reflow para asegurar que el DOM esté actualizado
  void containerWrapper.offsetWidth;
  
  // Calcular el ancho del contenedor para un desplazamiento preciso
  // Usar getBoundingClientRect para obtener el ancho exacto
  const containerRect = containerWrapper.getBoundingClientRect();
  const containerWidth = containerRect.width;
  
  // Agregar animación de fade out antes de cambiar
  const cards = container.querySelectorAll('.mundial-card');
  if (cards.length > 0) {
    cards.forEach(card => {
      card.style.opacity = '0.5';
      card.style.transform = 'scale(0.95)';
    });
  }
  
  // Aplicar transformación después de un breve delay para la animación
  requestAnimationFrame(() => {
    const translateX = -currentMundialIndex * containerWidth;
    container.style.transform = `translateX(${translateX}px)`;
    container.style.willChange = 'transform';
    
    // Animar las cards de vuelta a su estado normal
    setTimeout(() => {
      cards.forEach(card => {
        card.style.opacity = '1';
        card.style.transform = 'scale(1)';
      });
    }, 100);
  });

  // Actualizar indicadores dinámicos (solo 3)
  updateCarouselIndicators();
}

function nextMundial() {
  if (mundialesFiltrados.length === 0) return;
  currentMundialIndex = (currentMundialIndex + 1) % mundialesFiltrados.length;
  updateMundialesCarouselPosition();
}

function prevMundial() {
  if (mundialesFiltrados.length === 0) return;
  currentMundialIndex = (currentMundialIndex - 1 + mundialesFiltrados.length) % mundialesFiltrados.length;
  updateMundialesCarouselPosition();
}

// Event listeners para navegación del carrusel
document.addEventListener('DOMContentLoaded', () => {
  const prevBtn = document.getElementById('mundiales-carousel-prev');
  const nextBtn = document.getElementById('mundiales-carousel-next');

  if (prevBtn) prevBtn.addEventListener('click', prevMundial);
  if (nextBtn) nextBtn.addEventListener('click', nextMundial);

  // Event listener para indicadores (delegación de eventos)
  document.addEventListener('click', (e) => {
    const indicator = e.target.closest('.mundiales-carousel-indicator');
    if (indicator && indicator.hasAttribute('data-index')) {
      currentMundialIndex = parseInt(indicator.getAttribute('data-index'));
      updateMundialesCarouselPosition();
    }
  });

  // Recalcular posición cuando se redimensiona la ventana
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      // Forzar recálculo después del resize
      requestAnimationFrame(() => {
        updateMundialesCarouselPosition();
      });
    }, 250);
  });
});

if (searchbar) searchbar.addEventListener("input", aplicarFiltros);
if (categoria) categoria.addEventListener("change", aplicarFiltros);

window.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.filtros-container');
  if (container) container.classList.add('start-animation');
  
  // Renderizar cards iniciales
  mundialesFiltrados = [...todosLosMundiales];
  renderMundialesCards(todosLosMundiales);
});

// ======================================================
// ===== DETALLE DE MUNDIALES (últimos 5 torneos) =====
// ======================================================

const mundiales = [
  {
    anio: 2022,
    sede: "Qatar",
    campeon: "Argentina",
    subcampeon: "Francia",
    resumen:
    "La Copa Mundial de la FIFA Catar 2022 (en árabe: كأس العالم لكرة القدم قطر 2022‎) fue la vigésima segunda edición de la Copa Mundial de Fútbol masculino organizada por la FIFA. Esta edición del evento se desarrolló del 20 de noviembre al 18 de diciembre en el otoño de Catar, que consiguió los derechos de organización el 2 de diciembre de 2010.\n\nEsta fue la tercera vez que el torneo se disputó en el continente asiático tras la edición de 2002 jugada en Corea del Sur y Japón y la de Rusia 2018 (aunque esta última contaba con una sola sede en territorio asiático); y la primera que se celebró en Asia Occidental. También, fue la primera vez que el torneo tuvo lugar en Oriente Próximo, en un país árabe y de mayoría musulmana, así como el de menor extensión territorial.\n\nPor otra parte, fue el Mundial de mayor tiempo de espera desde 1950 respecto a su edición anterior, ya que se desarrolló entre noviembre y diciembre de 2022, a diferencia de los habituales junio y julio. Paralelamente, fue la Copa más corta desde 1978, pues la competición se desarrolló solamente durante veintinueve días, a diferencia de los usuales treinta y dos en los últimos campeonatos.\n\nFue la edición con más goles anotados: 172 (2.69 por partido). Durante la primera ronda se marcaron 120 goles, la segunda menor cantidad conseguida durante la fase de grupos desde que los participantes son treinta y dos, sólo superando lo conseguido en Sudáfrica 2010 (donde se marcaron 101 goles). Asimismo, por primera vez desde Francia 1998 ningún equipo logró puntaje ideal, ya que ninguna selección pudo ganar sus tres encuentros. Las selecciones de UEFA y AFC se convirtieron en las principales dominadoras de esa fase, pasando ocho de trece equipos europeos, y tres de seis equipos asiáticos, siendo este último caso algo inédito en la Copa Mundial. Por otro lado, Conmebol clasificó a dos de sus cuatro representantes mientras que Concacaf y CAF decepcionaron, ya que solo un representante norteamericano logró pasar la fase de grupos y por el lado africano sólo dos de cinco. Dentro de los eliminados, destacaron el tercer puesto del mundial anterior, Bélgica, las campeonas Alemania y Uruguay, además de Catar, que se convirtió en la selección anfitriona con el peor desempeño en la historia de los mundiales y la segunda en ser eliminada en fase de grupos.\n\nEn octavos, Sudamérica clasificó a los dos equipos que participaron de esa instancia, pero en cuartos de final solo sobrevivió Argentina, que pasó a las semifinales junto a dos europeos, Francia y Croacia, mientras que Marruecos se convirtió en la primera selección africana en alcanzar dicha instancia.\n\nEl campeón fue Argentina, liderado por Lionel Messi, que derrotó en la final por 4-2 en los tiros desde el punto penal al vigente campeón del mundo, Francia, luego de haber empatado 3-3, siendo la cuarta selección del mundo que se consagra fuera de su continente y la segunda de Sudamérica en conseguirlo en Asia. De esta forma, se coronó campeón por tercera vez en su historia después de treinta y seis años (la última ocasión había sido en México 1986). Asimismo, se terminó una racha de cuatro campeones europeos consecutivos, la más larga de un mismo continente.\n\nEn opinión de diversas personalidades del mundo del fútbol, el encuentro final fue considerado como la mejor final de la historia por el contexto previo y abundancia de situaciones de gol durante todo el encuentro.\n\nEs conocido también como el 'Mundial más polémico de la historia', ya que diversas agrupaciones y medios de comunicación expresaron su preocupación acerca de la idoneidad de Catar para acoger el evento, debido a numerosas controversias como la corrupción para adjudicarse como sede, las muertes relacionadas con la construcción de los estadios, los cuestionamientos sobre el respeto de los derechos humanos y sectores que apoyan la visibilización de la homosexualidad en el fútbol profesional, particularmente en los casos de las condiciones laborales de los trabajadores y los derechos de la comunidad LGBT, ya que la homosexualidad se llega a condenar con pena de muerte, así como a las acusaciones contra Catar de apoyar diplomática y financieramente el terrorismo islamista. También fue el 'Mundial más caro de la historia' con un costo estimado en 220 mil millones de dólares.",
    partidos: 64,
    goles: 172,
    asistencias: 110,
    promedio: 2.69,
    bracket: [
      ["Argentina 3 - 0 Croacia", "Francia 2 - 0 Marruecos"],
      ["Argentina 3 (4) - (2) 3 Francia"],
    ],
    imagenes: [
      "assets/images/messiCopa.jpg",
      "assets/images/promocional.jpg",
      "assets/images/mexico-1.jpg",
      "assets/images/trofeo.jpg",
      "assets/images/seleccionCatar.jpg",
      "assets/images/estadio-final.jpg",
      "assets/images/al_wakrah_stadium01.jpg"
    ],
  },
  {
    anio: 2018,
    sede: "Rusia",
    campeon: "Francia",
    subcampeon: "Croacia",
    resumen:
      "Francia se coronó campeona en Rusia con una generación joven y talentosa liderada por Mbappé y Griezmann. Venció 4-2 a Croacia en la final.",
    partidos: 64,
    goles: 169,
    asistencias: 105,
    promedio: 2.64,
    bracket: [
      ["Francia 1 - 0 Bélgica", "Croacia 2 - 1 Inglaterra"],
      ["Francia 4 - 2 Croacia"],
    ],
    imagenes: [
      "assets/images/rusia.jpeg",
      "assets/images/campeon-rusia.jpeg",
      "assets/images/mexico-rusia.jpeg",
      "assets/images/fases-grupos.jpeg"
    ],
  },
  {
    anio: 2014,
    sede: "Brasil",
    campeon: "Alemania",
    subcampeon: "Argentina",
    resumen:
      "Alemania ganó su cuarto título mundial tras vencer 1-0 a Argentina en la prórroga, con un gol histórico de Mario Götze en el Maracaná.",
    partidos: 64,
    goles: 171,
    asistencias: 118,
    promedio: 2.67,
    bracket: [
      ["Alemania 7 - 1 Brasil", "Argentina 0 (4) - (2) 0 Países Bajos"],
      ["Alemania 1 - 0 Argentina"],
    ],
    imagenes: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/German_team_WC2014_final.jpg/400px-German_team_WC2014_final.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Maracana_Stadium_2014_World_Cup_Final.jpg/400px-Maracana_Stadium_2014_World_Cup_Final.jpg",
    ],
  },
  {
    anio: 2010,
    sede: "Sudáfrica",
    campeon: "España",
    subcampeon: "Países Bajos",
    resumen:
      "España conquistó su primer Mundial con un estilo de posesión total liderado por Xavi, Iniesta y Casillas. Venció 1-0 a Países Bajos con gol de Iniesta.",
    partidos: 64,
    goles: 145,
    asistencias: 101,
    promedio: 2.26,
    bracket: [
      ["Países Bajos 3 - 2 Uruguay", "España 1 - 0 Alemania"],
      ["España 1 - 0 Países Bajos"],
    ],
    imagenes: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Spain_World_Cup_2010_team.jpg/400px-Spain_World_Cup_2010_team.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Soccer_City_Stadium_2010_World_Cup.jpg/400px-Soccer_City_Stadium_2010_World_Cup.jpg",
    ],
  },
  {
    anio: 2006,
    sede: "Alemania",
    campeon: "Italia",
    subcampeon: "Francia",
    resumen:
      "Italia se coronó campeona del mundo tras vencer a Francia en penales. El torneo fue recordado por la expulsión de Zidane en la final.",
    partidos: 64,
    goles: 147,
    asistencias: 98,
    promedio: 2.30,
    bracket: [
      ["Italia 2 - 0 Alemania", "Francia 1 - 0 Portugal"],
      ["Italia 1 (5) - (3) 1 Francia"],
    ],
    imagenes: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Italy_World_Cup_2006_team.jpg/400px-Italy_World_Cup_2006_team.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Berlin_Olympiastadion_2006_final.jpg/400px-Berlin_Olympiastadion_2006_final.jpg",
    ],
  },
  {
    anio: 2002,
    sede: "Corea / Japón",
    campeon: "Brasil",
    subcampeon: "Alemania",
    resumen:
      "La Copa Mundial de la FIFA Corea-Japón 2002 fue la decimoséptima edición de la Copa Mundial de Fútbol y la primera organizada en Asia, así como la primera (y hasta ahora única) organizada por dos países. Se disputó del 31 de mayo al 30 de junio de 2002.\n\nEste mundial marcó varios hitos históricos: fue el primero en celebrarse fuera de Europa y América, y contó con la participación de 32 equipos tras la expansión del formato en 1998. El torneo se caracterizó por sorpresas notables, como la eliminación temprana de Francia (campeona vigente) y Argentina en la fase de grupos, así como el impresionante desempeño de Corea del Sur, que llegó hasta las semifinales bajo la dirección de Guus Hiddink.\n\nBrasil, liderado por el tridente ofensivo formado por Ronaldo, Rivaldo y Ronaldinho, demostró su dominio absoluto durante todo el torneo. Ronaldo, quien había regresado de una grave lesión, se convirtió en la gran figura del mundial, anotando 8 goles y siendo clave en la conquista del pentacampeonato.\n\nLa final enfrentó a Brasil contra Alemania en el Estadio Internacional de Yokohama. Ronaldo anotó los dos goles del partido (2-0), convirtiéndose en el máximo goleador del torneo y llevando a Brasil a su quinto título mundial, consolidando su estatus como la selección más exitosa en la historia de los mundiales.\n\nEl mundial también destacó por la organización impecable de ambos países anfitriones, que construyeron estadios modernos y establecieron un nuevo estándar para futuros eventos. Corea del Sur logró el mejor resultado de un equipo asiático en la historia de los mundiales al alcanzar el cuarto lugar.",
    partidos: 64,
    goles: 161,
    asistencias: 102,
    promedio: 2.52,
    bracket: [
      ["Alemania 1 - 0 Corea del Sur", "Brasil 1 - 0 Turquía"],
      ["Brasil 2 - 0 Alemania"],
    ],
    imagenes: [
      "assets/images/corea_japon.jpg",
      "assets/images/trofeo.jpg",
      "assets/images/brazil.jpg",
    ],
  },
  {
    anio: 1998,
    sede: "Francia",
    campeon: "Francia",
    subcampeon: "Brasil",
    resumen:
      "La Copa Mundial de la FIFA Francia 1998 fue la decimosexta edición de la Copa Mundial de Fútbol y se disputó del 10 de junio al 12 de julio de 1998. Fue el primer mundial con 32 equipos participantes, expandiéndose desde los 24 de ediciones anteriores.\n\nFrancia, como país anfitrión, logró su primer título mundial en una de las finales más recordadas de la historia. El equipo francés, liderado por Zinedine Zidane, Didier Deschamps y una defensa sólida, demostró un fútbol táctico y disciplinado que los llevó a la gloria.\n\nLa final enfrentó a Francia contra Brasil, el vigente campeón. En un partido que sorprendió a muchos, Francia dominó completamente el encuentro y venció 3-0. Zidane anotó dos goles de cabeza en la primera mitad, y Emmanuel Petit selló la victoria en el minuto 90. Esta victoria marcó el inicio de una era dorada para el fútbol francés.\n\nEl mundial también fue memorable por el desempeño de otras selecciones. Croacia, en su primera participación como nación independiente, logró un histórico tercer lugar. Davor Šuker se convirtió en el máximo goleador del torneo con 6 goles.\n\nEl torneo se caracterizó por la calidad del fútbol mostrado y por ser el último mundial del siglo XX. Francia demostró que un equipo bien organizado y con talento local puede competir y vencer a las grandes potencias del fútbol mundial. Este triunfo sentó las bases para el éxito continuo de la selección francesa en las décadas siguientes.",
    partidos: 64,
    goles: 171,
    asistencias: 115,
    promedio: 2.67,
    bracket: [
      ["Francia 2 - 1 Croacia", "Brasil 2 - 1 Países Bajos (pen.)"],
      ["Francia 3 - 0 Brasil"],
    ],
    imagenes: [
      "assets/images/francia.jpg",
      "assets/images/trofeo.jpg",
      "assets/images/brazil.jpg",
    ],
  },
  {
    anio: 1994,
    sede: "EE.UU.",
    campeon: "Brasil",
    subcampeon: "Italia",
    resumen:
      "La Copa Mundial de la FIFA Estados Unidos 1994 fue la decimoquinta edición de la Copa Mundial de Fútbol y se disputó del 17 de junio al 17 de julio de 1994. Fue el primer mundial organizado en Estados Unidos y marcó un hito importante para el crecimiento del fútbol en Norteamérica.\n\nEste mundial fue histórico por ser el primero en decidirse mediante tiros desde el punto penal en la final, ya que Brasil e Italia empataron 0-0 después de 120 minutos de juego. Brasil finalmente se impuso 3-2 en la tanda de penales, conquistando su cuarto título mundial y consolidándose como la selección más exitosa hasta ese momento.\n\nEl torneo se caracterizó por un fútbol más defensivo y táctico, reflejado en el bajo promedio de goles (2.71 por partido). Sin embargo, también fue memorable por momentos icónicos como el gol de Diego Maradona contra Grecia (su último gol en mundiales), la celebración de Bebeto tras anotar contra Holanda, y el desempeño de jugadores como Romário, Roberto Baggio y Hristo Stoichkov.\n\nEstados Unidos logró un desempeño respetable como anfitrión, llegando a octavos de final y demostrando que el fútbol podía tener éxito en un país tradicionalmente dominado por otros deportes. El mundial estableció récords de asistencia, con más de 3.5 millones de espectadores en los estadios.\n\nLa final en el Rose Bowl de Pasadena fue la primera final sin goles en el tiempo reglamentario y prórroga. Roberto Baggio, estrella italiana, falló el último penal que le dio el título a Brasil, creando una de las imágenes más icónicas y trágicas del fútbol mundial.",
    partidos: 52,
    goles: 141,
    asistencias: 95,
    promedio: 2.71,
    bracket: [
      ["Brasil 1 - 0 Suecia", "Italia 2 - 1 Bulgaria"],
      ["Brasil 0 (3) - (2) 0 Italia"],
    ],
    imagenes: [
      "assets/images/eua.jpg",
      "assets/images/trofeo.jpg",
      "assets/images/brazil.jpg",
    ],
  },
];

// ======================================================
// ===== MOSTRAR DETALLE DE MUNDIAL =====
// ======================================================

const detalleSeccion = document.getElementById("detalle-mundial");
const detalleTitulo = document.getElementById("detalle-titulo");
const detalleSede = document.getElementById("detalle-sede");
const detalleResumen = document.getElementById("detalle-resumen");
const detalleBracket = document.getElementById("detalle-bracket");
const detalleGaleria = document.getElementById("detalle-galeria");
const estadisticasCarousel = document.getElementById("estadisticas-carousel");
const carouselIndicators = document.getElementById("carousel-indicators");

// Variables para el carrusel
let currentCarouselIndex = 0;
let estadisticasData = [];

// Detectar clic en card de mundial
document.addEventListener("click", (e) => {
  const target = e.target.closest(".link-mundial");
  if (target) {
    const anio = parseInt(target.getAttribute("data-anio") || target.textContent);
    const mundial = mundiales.find(m => m.anio === anio);
    if (mundial) mostrarDetalleMundial(mundial);
  }
});

// Función para mostrar la información
function mostrarDetalleMundial(m) {
  detalleTitulo.textContent = `Mundial ${m.anio} – ${m.sede}`;
  detalleSede.textContent = `Sede: ${m.sede}`;
  detalleResumen.innerHTML = m.resumen.replace(/\n/g, '<br>');

  // Bracket - poner final arriba
  const finalMatch = m.bracket[1] ? m.bracket[1][0] : '';
  const semifinalMatches = m.bracket[0] || [];
  
  detalleBracket.innerHTML = `
    <div class="stage final" style="order: -1;">
      <div class="match winner">${finalMatch}</div>
    </div>
    ${semifinalMatches.length > 0 ? `
    <div class="stage semifinal">
      ${semifinalMatches.map(match => `<div class="match">${match}</div>`).join('')}
    </div>
    ` : ''}
  `;

  // Estadísticas para el carrusel
  estadisticasData = [
    { label: "Partidos", value: m.partidos, icon: "⚽" },
    { label: "Goles", value: m.goles, icon: "🥅" },
    { label: "Asistencias", value: m.asistencias, icon: "🎯" },
    { label: "Promedio Goles/Partido", value: m.promedio, icon: "📊" }
  ];
  
  renderCarousel();

  // Galería
  detalleGaleria.innerHTML = m.imagenes
    .map(img => `<img src="${img}" alt="Imagen del Mundial ${m.anio}">`)
    .join("");

  // Mostrar sección
  detalleSeccion.style.display = "block";

  // Animación de entrada
  detalleSeccion.style.animation = "fadeIn 0.6s ease-out";

  // Scroll suave hacia la sección
  setTimeout(() => {
    detalleSeccion.scrollIntoView({ behavior: "smooth" });
  }, 100);
}

// ======================================================
// ===== CARRUSEL DE ESTADÍSTICAS =====
// ======================================================

function renderCarousel() {
  if (!estadisticasCarousel || !estadisticasData.length) return;

  // Resetear índice al inicio
  currentCarouselIndex = 0;

  // Renderizar cards
  estadisticasCarousel.innerHTML = estadisticasData.map((stat, index) => `
    <div class="estadistica-card-item ${index === 0 ? 'active' : ''}" data-index="${index}">
      <div class="estadistica-card-item__icon">${stat.icon}</div>
      <div class="estadistica-card-item__label">${stat.label}</div>
      <div class="estadistica-card-item__value">${stat.value}</div>
    </div>
  `).join('');

  // Renderizar indicadores
  if (carouselIndicators) {
    carouselIndicators.innerHTML = estadisticasData.map((_, index) => `
      <button class="carousel-indicator ${index === 0 ? 'active' : ''}" 
              data-index="${index}" 
              aria-label="Ir a estadística ${index + 1}"></button>
    `).join('');
  }

  updateCarouselPosition();
}

function updateCarouselPosition() {
  const cards = estadisticasCarousel.querySelectorAll('.estadistica-card-item');
  cards.forEach((card, index) => {
    card.classList.toggle('active', index === currentCarouselIndex);
  });

  const indicators = carouselIndicators?.querySelectorAll('.carousel-indicator');
  indicators?.forEach((indicator, index) => {
    indicator.classList.toggle('active', index === currentCarouselIndex);
  });

  // Actualizar posición del carrusel
  if (estadisticasCarousel) {
    const translateX = -currentCarouselIndex * 100;
    estadisticasCarousel.style.transform = `translateX(${translateX}%)`;
  }
}

function nextCarousel() {
  currentCarouselIndex = (currentCarouselIndex + 1) % estadisticasData.length;
  updateCarouselPosition();
}

function prevCarousel() {
  currentCarouselIndex = (currentCarouselIndex - 1 + estadisticasData.length) % estadisticasData.length;
  updateCarouselPosition();
}

// Event listeners para el carrusel (usar delegación para elementos dinámicos)
document.addEventListener('DOMContentLoaded', () => {
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');

  if (prevBtn) prevBtn.addEventListener('click', prevCarousel);
  if (nextBtn) nextBtn.addEventListener('click', nextCarousel);
});

// Event listener para indicadores (delegación de eventos para elementos dinámicos)
document.addEventListener('click', (e) => {
  const indicator = e.target.closest('.carousel-indicator');
  if (indicator && carouselIndicators && carouselIndicators.contains(indicator)) {
    currentCarouselIndex = parseInt(indicator.getAttribute('data-index'));
    updateCarouselPosition();
  }
});

// Auto-play opcional (descomentar si se desea)
// setInterval(() => {
//   if (estadisticasData.length > 0) nextCarousel();
// }, 5000);
