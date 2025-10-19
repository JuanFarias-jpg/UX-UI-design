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
  detalleResumen.innerHTML = m.resumen.replace(/\n/g, '<br>');

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
