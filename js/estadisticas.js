
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
      "assets/imagenes/mesiCopa.jpg",
      "assets/imagenes/promocional.jpg",
      "assets/imagenes/mexico-1.jpg",
      "assets/imagenes/trofeo.jpg",
      "assets/imagenes/seleccionCatar.jpg",
      "assets/imagenes/estadio-final.jpg",
      "assets/imagenes/al_wakrah_stadium0.jpg"
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
      "assets/imagenes/rusia-final.jpg",
      "assets/imagenes/rusia-campeon.jpg",
      "assets/imagenes/rusia-trofeo.jpg"
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

// ----- Renderiza el resumen general -----
function renderResumen(data) {
  const tbody = document.querySelector("#tbMundialesResumen tbody");
  tbody.innerHTML = "";

  data.forEach(m => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td><span class="link-mundial" style="color:#007bff;cursor:pointer;text-decoration:underline;">${m.anio}</span></td>
      <td>${m.sede}</td>
      <td>${m.campeon}</td>
      <td>${m.subcampeon}</td>
      <td>${m.goleador}</td>
      <td>${m.partidos}</td>
      <td>${m.goles}</td>
      <td>${m.mejorJugador}</td>
      <td>${m.observaciones}</td>
    `;
    tbody.appendChild(fila);
  });
}


// ----- Renderiza los partidos del mundial seleccionado -----
function renderPartidos(partidos) {
  const tbody = document.querySelector("#tbPartidos tbody");
  tbody.innerHTML = "";

  partidos.forEach(p => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td><a href="#analisis-partido">${p.fecha}</a></td>
      <td>${p.fase}</td>
      <td>${p.equipoA}</td>
      <td>${p.resultado}</td>
      <td>${p.equipoB}</td>
      <td>${p.goleadoresA}</td>
      <td>${p.goleadoresB}</td>
      <td>${p.estadio}</td>
      <td>${p.ciudad}</td>
    `;
    tbody.appendChild(fila);
  });
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
document.querySelector("#tbMundialesResumen").addEventListener("click", e => {
  if (e.target.classList.contains("link-mundial")) {
    const anio = parseInt(e.target.textContent);
    const mundial = mundiales.find(m => m.anio === anio);
    renderPartidos(mundial.partidosDetalles);
  }
});

// ======================================================
// ===== FILTROS =====
// ======================================================

const searchInput = document.querySelector(".search-input");
const selects = document.querySelectorAll(".filter-dropdown");
const tablaPartidos = document.querySelector("#tbPartidos");
const tbodyPartidos = tablaPartidos.querySelector("tbody");
const seccionAnalisis = document.querySelector("#analisis-partido");

// ---- Función para aplicar filtros ----
function aplicarFiltros() {
  const mundialFiltro = selects[0].value;   // Mundial
  const continenteFiltro = selects[1].value; // Continente
  const ordenFiltro = selects[2].value;     // Orden
  const texto = searchInput.value.toLowerCase();

  let filtrados = [...mundiales];

  // Filtrar por mundial
  if (mundialFiltro) {
    if (mundialFiltro === "otros") {
      filtrados = filtrados.filter(m => m.anio < 2006);
    } else {
      filtrados = filtrados.filter(m => m.anio.toString() === mundialFiltro);
    }
  }

  // Filtrar por texto
  if (texto) {
    filtrados = filtrados.filter(m =>
      m.sede.toLowerCase().includes(texto) ||
      m.campeon.toLowerCase().includes(texto) ||
      m.subcampeon.toLowerCase().includes(texto) ||
      (m.mejorJugador && m.mejorJugador.toLowerCase().includes(texto))
    );
  }

  // Filtrar por continente (ejemplo genérico)
  if (continenteFiltro) {
    filtrados = filtrados.filter(m =>
      m.sede.toLowerCase().includes(continenteFiltro)
    );
  }

  // Ordenar
  if (ordenFiltro === "recent") filtrados.sort((a, b) => b.anio - a.anio);
  if (ordenFiltro === "popular") filtrados.sort((a, b) => b.goles - a.goles);
  if (ordenFiltro === "views") filtrados.sort((a, b) => b.partidos - a.partidos);

  // Mostrar en tablas
  renderResumen(filtrados);

  if (filtrados.length > 0) {
    renderPartidos(filtrados[0].partidosDetalles);
    tablaPartidos.classList.remove("bloqueada");
  } else {
    tbodyPartidos.innerHTML = "";
    tablaPartidos.classList.add("bloqueada");
  }

  // Ocultar análisis si se cambia el filtro
  seccionAnalisis.style.display = "none";
}

// Escuchar cambios
selects.forEach(sel => sel.addEventListener("change", aplicarFiltros));
searchInput.addEventListener("input", aplicarFiltros);


// ======================================================
// ===== INTERACCIÓN: MOSTRAR PARTIDOS POR MUNDIAL =====
// ======================================================
document.querySelector("#tbMundialesResumen").addEventListener("click", e => {
  if (e.target.classList.contains("link-mundial")) {
    const anio = parseInt(e.target.textContent);
    const mundial = mundiales.find(m => m.anio === anio);
    renderPartidos(mundial.partidosDetalles);
    tablaPartidos.classList.remove("bloqueada");
    seccionAnalisis.style.display = "none";
  }
});


// ======================================================
// ===== INTERACCIÓN: MOSTRAR ANÁLISIS DE PARTIDO =====
// ======================================================
tablaPartidos.addEventListener("click", e => {
  const fila = e.target.closest("tr");
  if (!fila) return;

  const celdas = fila.querySelectorAll("td");
  const equipoA = celdas[2].textContent;
  const equipoB = celdas[4].textContent;

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
