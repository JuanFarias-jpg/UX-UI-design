// ======================================================
// ===== FILTROS Y BÚSQUEDA DE TABLA DE MUNDIALES =====
// ======================================================

const searchbar = document.getElementById("searchbar");
const categoria = document.getElementById("categoria");
const tbMundial = document.getElementById("tbMundiales");

function Search() {
  const rows = tbMundial.querySelectorAll("tr");
  const catNum = Number(categoria.value) - 1;
  const searchText = searchbar.value.toLowerCase();

  // Si no se selecciona categoría o el texto está vacío, mostrar todo
  if (catNum < 0 || searchText.length === 0) {
    rows.forEach(row => row.style.display = "");
    return;
  }

  rows.forEach(row => {
    const cellText = row.children[catNum]?.innerText.toLowerCase() || "";
    row.style.display = cellText.includes(searchText) ? "" : "none";
  });
}

searchbar.addEventListener("input", Search);
categoria.addEventListener("change", Search);

window.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.filtros-container');
  container.classList.add('start-animation');
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
      "Argentina se consagró campeona del mundo tras vencer a Francia en una final épica. Lionel Messi brilló con goles y liderazgo, consiguiendo su primer Mundial.",
    partidos: 64,
    goles: 172,
    asistencias: 110,
    promedio: 2.69,
    bracket: [
      ["Argentina 3 - 0 Croacia", "Francia 2 - 0 Marruecos"],
      ["Argentina 3 (4) - (2) 3 Francia"],
    ],
    imagenes: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Lionel_Messi_WC2022_Final.jpg/400px-Lionel_Messi_WC2022_Final.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Lusail_Stadium_World_Cup_Final_2022.jpg/400px-Lusail_Stadium_World_Cup_Final_2022.jpg",
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
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/France_team_World_Cup_2018.jpg/400px-France_team_World_Cup_2018.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Luzhniki_Stadium_2018_WC_Final.jpg/400px-Luzhniki_Stadium_2018_WC_Final.jpg",
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
];

// ======================================================
// ===== MOSTRAR DETALLE DE MUNDIAL =====
// ======================================================

const detalleSeccion = document.getElementById("detalle-mundial");
const detalleTitulo = document.getElementById("detalle-titulo");
const detalleSede = document.getElementById("detalle-sede");
const detalleResumen = document.getElementById("detalle-resumen");
const detalleBracket = document.getElementById("detalle-bracket");
const detallePartidos = document.getElementById("detalle-partidos");
const detalleGoles = document.getElementById("detalle-goles");
const detalleAsistencias = document.getElementById("detalle-asistencias");
const detallePromedio = document.getElementById("detalle-promedio");
const detalleGaleria = document.getElementById("detalle-galeria");

// Detectar clic en año de la tabla
tbMundial.addEventListener("click", (e) => {
  const target = e.target;
  if (target.classList.contains("link-mundial")) {
    const anio = parseInt(target.innerText);
    const mundial = mundiales.find(m => m.anio === anio);
    if (mundial) mostrarDetalleMundial(mundial);
  }
});

// Función para mostrar la información
function mostrarDetalleMundial(m) {
  detalleTitulo.textContent = `Mundial ${m.anio} – ${m.sede}`;
  detalleSede.textContent = `Sede: ${m.sede}`;
  detalleResumen.textContent = m.resumen;
  detallePartidos.textContent = m.partidos;
  detalleGoles.textContent = m.goles;
  detalleAsistencias.textContent = m.asistencias;
  detallePromedio.textContent = m.promedio;

  // Bracket
  detalleBracket.innerHTML = `
    <div class="stage semifinal">
      <div class="match">${m.bracket[0][0]}</div>
      <div class="match">${m.bracket[0][1]}</div>
    </div>
    <div class="stage final">
      <div class="match winner">${m.bracket[1][0]}</div>
    </div>
  `;

  // Galería
  detalleGaleria.innerHTML = m.imagenes
    .map(img => `<img src="${img}" alt="Imagen del Mundial ${m.anio}">`)
    .join("");

  // Mostrar sección
  detalleSeccion.classList.remove("oculto");

  // Animación de entrada
  detalleSeccion.style.animation = "fadeIn 0.6s ease-out";

  // Scroll suave hacia la sección
  detalleSeccion.scrollIntoView({ behavior: "smooth" });
}
