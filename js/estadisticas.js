
// ===== DATOS DE MUNDIALES =====
const mundiales = [
  {
    anio: 2022,
    sede: "Catar",
    campeon: "Argentina",
    subcampeon: "Francia",
    goleador: "Kylian Mbappé (8 goles)",
    partidos: 64,
    goles: 172,
    mejorJugador: "Lionel Messi",
    observaciones: "Primera Copa Mundial realizada en Medio Oriente. Argentina se consagra campeona después de 36 años.",
    imagenes: [
      
    ],
    partidosDetalles: [
      {
        fecha: "18/12/2022",
        fase: "Final",
        equipoA: "Argentina",
        resultado: "3 - 3 (4-2 pen.)",
        equipoB: "Francia",
        goleadoresA: "Messi (2), Di María",
        goleadoresB: "Mbappé (3)",
        estadio: "Lusail",
        ciudad: "Lusail",
        analisisTecnico: {
        estadisticas: {
          posesion: { equipoA: 54, equipoB: 46 },
          tiros: { equipoA: 10, equipoB: 9 },
          tirosPuerta: { equipoA: 7, equipoB: 5 },
          pasesCompletados: { equipoA: 520, equipoB: 480 },
          faltas: { equipoA: 14, equipoB: 18 },
          tarjetas: { equipoA: 2, equipoB: 3 },
          tirosEsquina: { equipoA: 6, equipoB: 5 },
        },
        formacion: {
          equipoA: "4-3-3",
          equipoB: "4-2-3-1",
          jugadoresA: [
            { nombre: "Martínez", posicion: "GK", x: 50, y: 95 },
            { nombre: "Molina", posicion: "RB", x: 75, y: 80 },
            { nombre: "Otamendi", posicion: "CB", x: 60, y: 80 },
            { nombre: "Romero", posicion: "CB", x: 40, y: 80 },
            { nombre: "Tagliafico", posicion: "LB", x: 25, y: 80 },
            { nombre: "De Paul", posicion: "CM", x: 65, y: 65 },
            { nombre: "Fernández", posicion: "CM", x: 50, y: 60 },
            { nombre: "Mac Allister", posicion: "CM", x: 35, y: 65 },
            { nombre: "Messi", posicion: "RW", x: 75, y: 45 },
            { nombre: "Álvarez", posicion: "ST", x: 50, y: 40 },
            { nombre: "Di María", posicion: "LW", x: 25, y: 45 },
          ],
          jugadoresB: [
            { nombre: "Lloris", posicion: "GK", x: 50, y: 95 },
            { nombre: "Koundé", posicion: "RB", x: 75, y: 80 },
            { nombre: "Varane", posicion: "CB", x: 60, y: 80 },
            { nombre: "Upamecano", posicion: "CB", x: 40, y: 80 },
            { nombre: "Hernández", posicion: "LB", x: 25, y: 80 },
            { nombre: "Tchouaméni", posicion: "CM", x: 60, y: 65 },
            { nombre: "Rabiot", posicion: "CM", x: 40, y: 65 },
            { nombre: "Griezmann", posicion: "CAM", x: 50, y: 55 },
            { nombre: "Dembélé", posicion: "RW", x: 75, y: 45 },
            { nombre: "Mbappé", posicion: "LW", x: 25, y: 45 },
            { nombre: "Giroud", posicion: "ST", x: 50, y: 40 },
          ],
        },
      }

      },
     {
        fecha: "17/12/2022",
        fase: "Tercer lugar",
        equipoA: "Croacia",
        resultado: "2 - 1",
        equipoB: "Marruecos",
        goleadoresA: "Gvardiol, Oršić",
        goleadoresB: "Dari",
        estadio: "Khalifa",
        ciudad: "Al Rayyan"
      }
    ]
  },

  {
    anio: 2018,
    sede: "Rusia",
    campeon: "Francia",
    subcampeon: "Croacia",
    goleador: "Harry Kane (6 goles)",
    partidos: 64,
    goles: 169,
    mejorJugador: "Luka Modrić",
    observaciones: "Francia gana su segundo título mundial. Croacia logra su mejor desempeño histórico.",
    imagenes: [
    ],
    partidosDetalles: [
      {
        fecha: "15/07/2018",
        fase: "Final",
        equipoA: "Francia",
        resultado: "4 - 2",
        equipoB: "Croacia",
        goleadoresA: "Mandžukić (autogol), Griezmann, Pogba, Mbappé",
        goleadoresB: "Perišić, Mandžukić",
        estadio: "Luzhnikí",
        ciudad: "Moscú"
      }
    ]
  }
];


// =========================================================
// ===== FUNCIONES PARA MOSTRAR LOS DATOS =====
// =========================================================

// ----- Renderiza el resumen general como cards -----
function renderResumen(data) {
  const container = document.getElementById("estadisticas-cards-container");
  if (!container) return;
  
  container.innerHTML = "";

  if (data.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--color-text-secondary);">
        <p style="font-size: 1.2rem; margin-bottom: 0.5rem;">No se encontraron resultados</p>
        <p>Intenta con otros filtros de búsqueda</p>
      </div>
    `;
    return;
  }

  container.innerHTML = data.map(m => `
    <article class="estadistica-card" data-anio="${m.anio}">
      <div class="estadistica-card__header">
        <h3 class="estadistica-card__year">${m.anio}</h3>
        <span class="estadistica-card__sede">${m.sede}</span>
      </div>
      <div class="estadistica-card__body">
        <div class="estadistica-card__champion">
          <span class="estadistica-card__label">🏆 Campeón:</span>
          <span class="estadistica-card__value">${m.campeon}</span>
        </div>
        <div class="estadistica-card__subchampion">
          <span class="estadistica-card__label">🥈 Subcampeón:</span>
          <span class="estadistica-card__value">${m.subcampeon}</span>
        </div>
        <div class="estadistica-card__stats">
          <div class="estadistica-card__stat">
            <span class="estadistica-card__stat-label">⚽ Goleador:</span>
            <span class="estadistica-card__stat-value">${m.goleador || "N/A"}</span>
          </div>
          <div class="estadistica-card__stat">
            <span class="estadistica-card__stat-label">👤 Mejor Jugador:</span>
            <span class="estadistica-card__stat-value">${m.mejorJugador || "N/A"}</span>
          </div>
          <div class="estadistica-card__stat-row">
            <div class="estadistica-card__stat-item">
              <span class="estadistica-card__stat-number">${m.partidos || 0}</span>
              <span class="estadistica-card__stat-label-small">Partidos</span>
            </div>
            <div class="estadistica-card__stat-item">
              <span class="estadistica-card__stat-number">${m.goles || 0}</span>
              <span class="estadistica-card__stat-label-small">Goles</span>
            </div>
          </div>
        </div>
        ${m.observaciones ? `
          <div class="estadistica-card__observations">
            <span class="estadistica-card__label">📝 Observaciones:</span>
            <p class="estadistica-card__text">${m.observaciones}</p>
          </div>
        ` : ''}
      </div>
      <div class="estadistica-card__footer">
        <button class="link-mundial btn btn--outline" data-anio="${m.anio}" style="width: 100%;">
          Ver partidos
        </button>
      </div>
    </article>
  `).join('');

  // Agregar animación de entrada
  setTimeout(() => {
    document.querySelectorAll('.estadistica-card').forEach((card, index) => {
      card.style.animation = `fadeIn 0.3s ease-out ${index * 0.05}s both`;
    });
  }, 10);
}


// ----- Renderiza los partidos del mundial seleccionado como cards -----
function renderPartidos(partidos) {
  const container = document.getElementById("partidos-cards-container");
  if (!container) return;
  
  container.innerHTML = "";

  if (!partidos || partidos.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--color-text-secondary);">
        <p style="font-size: 1.2rem; margin-bottom: 0.5rem;">No hay partidos disponibles</p>
        <p>Selecciona un mundial para ver sus partidos</p>
      </div>
    `;
    return;
  }

  container.innerHTML = partidos.map(p => `
    <article class="partido-card" data-fecha="${p.fecha}" data-equipo-a="${p.equipoA}" data-equipo-b="${p.equipoB}">
      <div class="partido-card__header">
        <span class="partido-card__fase">${p.fase}</span>
        <time class="partido-card__fecha">${p.fecha}</time>
      </div>
      <div class="partido-card__body">
        <div class="partido-card__teams">
          <div class="partido-card__team">
            <span class="partido-card__team-name">${p.equipoA}</span>
            ${p.goleadoresA ? `<span class="partido-card__scorers">⚽ ${p.goleadoresA}</span>` : ''}
          </div>
          <div class="partido-card__score">${p.resultado}</div>
          <div class="partido-card__team">
            <span class="partido-card__team-name">${p.equipoB}</span>
            ${p.goleadoresB ? `<span class="partido-card__scorers">⚽ ${p.goleadoresB}</span>` : ''}
          </div>
        </div>
        <div class="partido-card__venue">
          <span class="partido-card__venue-icon">🏟️</span>
          <div class="partido-card__venue-info">
            <span class="partido-card__venue-name">${p.estadio || "N/A"}</span>
            <span class="partido-card__venue-city">${p.ciudad || ""}</span>
          </div>
        </div>
      </div>
      ${p.analisisTecnico ? `
        <div class="partido-card__footer">
          <a href="#analisis-partido" class="btn btn--primary" style="width: 100%; text-align: center;">
            Ver análisis técnico
          </a>
        </div>
      ` : ''}
    </article>
  `).join('');

  // Agregar animación de entrada
  setTimeout(() => {
    document.querySelectorAll('.partido-card').forEach((card, index) => {
      card.style.animation = `fadeIn 0.3s ease-out ${index * 0.05}s both`;
    });
  }, 10);
}


// =========================================================
// ===== INICIALIZACIÓN AL CARGAR LA PÁGINA =====
// =========================================================
document.addEventListener("DOMContentLoaded", () => {
  // Cargar resumen general
  renderResumen(mundiales);

  // Mostrar los partidos del mundial más reciente (el primero del array)
  renderPartidos(mundiales[0].partidosDetalles);
});


// =========================================================
// ===== INTERACCIÓN: CAMBIAR PARTIDOS SEGÚN EL AÑO =====
// =========================================================
document.addEventListener("click", e => {
  const target = e.target.closest(".link-mundial");
  if (target) {
    const anio = parseInt(target.getAttribute("data-anio") || target.textContent);
    const mundial = mundiales.find(m => m.anio === anio);
    if (mundial) {
      renderPartidos(mundial.partidosDetalles);
    }
  }
});

// ======================================================
// ===== FILTROS =====
// ======================================================

const searchInput = document.querySelector(".search-input");
const selects = document.querySelectorAll(".filter-dropdown");
const seccionAnalisis = document.querySelector("#analisis-partido");

// ---- Función para aplicar filtros ----
function aplicarFiltros() {
  const mundialFiltro = selects[0] ? selects[0].value : "";   // Mundial
  const seleccionFiltro = selects[1] ? selects[1].value : ""; // Selección/Campeón
  const texto = searchInput ? searchInput.value.trim() : "";

  let filtrados = [...mundiales];

  // Filtrar por mundial
  if (mundialFiltro) {
    if (mundialFiltro === "otros") {
      filtrados = filtrados.filter(m => m.anio < 2006);
    } else {
      filtrados = filtrados.filter(m => m.anio.toString() === mundialFiltro);
    }
  }

  // Filtrar por selección/campeón
  if (seleccionFiltro) {
    if (seleccionFiltro === "otros") {
      // Filtrar campeones que no están en la lista específica
      const campeonesListados = ["argentina", "francia", "brasil", "alemania", "italia", "españa"];
      filtrados = filtrados.filter(m => 
        !campeonesListados.includes(m.campeon.toLowerCase())
      );
    } else {
      filtrados = filtrados.filter(m => 
        m.campeon.toLowerCase() === seleccionFiltro
      );
    }
  }

  // Filtrar por texto de búsqueda: año específico o nombre de mundial (sede)
  if (texto) {
    const textoLower = texto.toLowerCase();
    filtrados = filtrados.filter(m => {
      // Buscar por año específico
      const coincideAnio = m.anio.toString().includes(textoLower);
      
      // Buscar por nombre de mundial (sede)
      const coincideSede = m.sede.toLowerCase().includes(textoLower);
      
      return coincideAnio || coincideSede;
    });
  }

  // Mostrar en cards
  renderResumen(filtrados);

  if (filtrados.length > 0) {
    renderPartidos(filtrados[0].partidosDetalles);
  } else {
    renderPartidos([]);
  }

  // Ocultar análisis si se cambia el filtro
  if (seccionAnalisis) {
    seccionAnalisis.style.display = "none";
  }
}

// Escuchar cambios - solo si los elementos existen
if (selects.length > 0) {
  selects.forEach(sel => sel.addEventListener("change", aplicarFiltros));
}
if (searchInput) {
  searchInput.addEventListener("input", aplicarFiltros);
}


// ======================================================
// ===== INTERACCIÓN: MOSTRAR PARTIDOS POR MUNDIAL =====
// ======================================================
// Ya manejado por el event listener general más arriba


// ======================================================
// ===== INTERACCIÓN: MOSTRAR ANÁLISIS DE PARTIDO =====
// ======================================================
document.addEventListener("click", e => {
  // Verificar si se hizo clic en el botón de análisis técnico
  const btnAnalisis = e.target.closest('a[href="#analisis-partido"]');
  if (!btnAnalisis) return;

  e.preventDefault();
  
  const card = btnAnalisis.closest(".partido-card");
  if (!card) return;

  const equipoA = card.getAttribute("data-equipo-a");
  const equipoB = card.getAttribute("data-equipo-b");

  let partidoConAnalisis = null;

  // Buscar el partido dentro de los mundiales
  for (const mundial of mundiales) {
    const partido = mundial.partidosDetalles.find(
      p => p.equipoA === equipoA && p.equipoB === equipoB && p.analisisTecnico
    );
    if (partido) {
      partidoConAnalisis = partido;
      break;
    }
  }

  if (partidoConAnalisis) {
    mostrarAnalisis(partidoConAnalisis);
    // Scroll suave hacia la sección de análisis
    seccionAnalisis.scrollIntoView({ behavior: "smooth" });
  } else {
    alert("Este partido no tiene análisis técnico disponible.");
  }
});


// ======================================================
// ===== RENDER DE ANÁLISIS TÉCNICO =====
// ======================================================
function mostrarAnalisis(partido) {
  const contenedor = document.querySelector("#analisis-partido");
  const tabla = document.querySelector("#tabla-analisis");
  const canvas = document.querySelector("#grafico-analisis");
  const cancha = document.querySelector("#cancha");

  // Asegurarnos que la sección se muestre
  contenedor.style.display = "block";

  // ----- Tabla de estadísticas -----
  const { estadisticas, formacion } = partido.analisisTecnico;
  tabla.innerHTML = `
    <tr><th>Estadística</th><th>${partido.equipoA}</th><th>${partido.equipoB}</th></tr>
    <tr><td>Posesión (%)</td><td>${estadisticas.posesion.equipoA}</td><td>${estadisticas.posesion.equipoB}</td></tr>
    <tr><td>Tiros</td><td>${estadisticas.tiros.equipoA}</td><td>${estadisticas.tiros.equipoB}</td></tr>
    <tr><td>Tiros al arco</td><td>${estadisticas.tirosPuerta.equipoA}</td><td>${estadisticas.tirosPuerta.equipoB}</td></tr>
    <tr><td>Pases completados</td><td>${estadisticas.pasesCompletados.equipoA}</td><td>${estadisticas.pasesCompletados.equipoB}</td></tr>
    <tr><td>Faltas</td><td>${estadisticas.faltas.equipoA}</td><td>${estadisticas.faltas.equipoB}</td></tr>
    <tr><td>Tarjetas</td><td>${estadisticas.tarjetas.equipoA}</td><td>${estadisticas.tarjetas.equipoB}</td></tr>
    <tr><td>Tiros de esquina</td><td>${estadisticas.tirosEsquina.equipoA}</td><td>${estadisticas.tirosEsquina.equipoB}</td></tr>
  `;

  // ----- Limpiar controles dinámicos previos (si existen) -----
  const prevControls = document.querySelector(".opciones-formacion");
  if (prevControls) prevControls.remove();

  // ----- Gráfico -----
  // destruir instancia previa SI existe (usa UNA variable consistente)
  if (window.graficoAnalisis) {
    try { window.graficoAnalisis.destroy(); } catch(e) {}
    window.graficoAnalisis = null;
  }

  const ctx = canvas.getContext("2d");
  window.graficoAnalisis = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Posesión", "Tiros", "Tiros al arco", "Pases", "Faltas", "Tarjetas", "Tiros esquina"],
      datasets: [
        {
          label: partido.equipoA,
          data: [
            estadisticas.posesion.equipoA,
            estadisticas.tiros.equipoA,
            estadisticas.tirosPuerta.equipoA,
            estadisticas.pasesCompletados.equipoA,
            estadisticas.faltas.equipoA,
            estadisticas.tarjetas.equipoA,
            estadisticas.tirosEsquina.equipoA
          ],
          backgroundColor: "rgba(52, 152, 219, 0.7)"
        },
        {
          label: partido.equipoB,
          data: [
            estadisticas.posesion.equipoB,
            estadisticas.tiros.equipoB,
            estadisticas.tirosPuerta.equipoB,
            estadisticas.pasesCompletados.equipoB,
            estadisticas.faltas.equipoB,
            estadisticas.tarjetas.equipoB,
            estadisticas.tirosEsquina.equipoB
          ],
          backgroundColor: "rgba(231, 76, 60, 0.7)"
        }
      ]
    },
    options: {
      responsive: true,
      plugins: { legend: { position: "bottom" } },
      scales: { y: { beginAtZero: true } }
    }
  });

  // ----- Formaciones: limpiar cancha -----
  // eliminar jugadores previos (todos)
  cancha.querySelectorAll(".jugador").forEach(el => el.remove());


  // insertar CONTROLES de formacion UNA sola vez
  const controles = document.createElement("div");
  controles.className = "opciones-formacion";
  controles.innerHTML = `
    <label style="margin-right:12px;"><input type="checkbox" id="chkA" checked> ${partido.equipoA}</label>
    <label><input type="checkbox" id="chkB" checked> ${partido.equipoB}</label>
  `;
  // insertar justo antes de la cancha (si ya existe, lo hemos quitado arriba)
  cancha.parentNode.insertBefore(controles, cancha);
  // ----- Bind a checkboxes-----
  const chkA = document.getElementById("chkA");
  const chkB = document.getElementById("chkB");

  // ----- Dibujar jugadores (usa renderFormacionEquipo que limpia por clase) -----
  renderFormacionEquipo(formacion.jugadoresA, "equipoA");
  renderFormacionEquipo(formacion.jugadoresB, "equipoB");



  const actualizarVisibilidad = () => {
    document.querySelectorAll(".jugador.equipoA").forEach(j => j.style.display = chkA.checked ? "block" : "none");
    document.querySelectorAll(".jugador.equipoB").forEach(j => j.style.display = chkB.checked ? "block" : "none");
  };

  chkA.addEventListener("change", actualizarVisibilidad);
  chkB.addEventListener("change", actualizarVisibilidad);

  // estado inicial
  actualizarVisibilidad();
}


function renderFormacionEquipo(jugadores, clase) {
  const cancha = document.getElementById("cancha");
  // limpiar previos del mismo equipo
  cancha.querySelectorAll(`.jugador.${clase}`).forEach(el => el.remove());

  jugadores.forEach(jugador => {
    const div = document.createElement("div");
    div.classList.add("jugador", clase);
    div.textContent = jugador.nombre;
    div.style.left = `${jugador.x}%`;
    div.style.top = `${jugador.y}%`;
    cancha.appendChild(div);
  });
}


// ======================================================
// ===== INICIALIZACIÓN =====
// ======================================================
document.addEventListener("DOMContentLoaded", () => {
  renderResumen(mundiales);
  renderPartidos(mundiales[0].partidosDetalles);
});
