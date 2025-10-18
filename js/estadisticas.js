// ======================================================
// ===== DATOS DE MUNDIALES =====
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
    partidosDetalles: [
      { fecha: "20/11/2022", fase: "Grupo A", equipoA: "Qatar", resultado: "0-2", equipoB: "Ecuador", goleadoresA: "-", goleadoresB: "Enner Valencia", estadio: "Al Bayt", ciudad: "Al Khor" },
      { fecha: "18/12/2022", fase: "Final", equipoA: "Argentina", resultado: "3-3 (4-2 penales)", equipoB: "Francia", goleadoresA: "Messi, Di María, Messi", goleadoresB: "Mbappé x3", estadio: "Lusail Stadium", ciudad: "Lusail" },
    ]
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
    partidosDetalles: [
      { fecha: "14/06/2018", fase: "Grupo C", equipoA: "Francia", resultado: "2-1", equipoB: "Australia", goleadoresA: "Giroud, Griezmann", goleadoresB: "Behich", estadio: "Kazan Arena", ciudad: "Kazan" },
      { fecha: "15/07/2018", fase: "Final", equipoA: "Francia", resultado: "4-2", equipoB: "Croacia", goleadoresA: "Mandzukic OG, Griezmann, Pogba, Mbappé", goleadoresB: "Perisic, Mandzukic", estadio: "Luzhniki Stadium", ciudad: "Moscú" },
    ]
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
    partidosDetalles: [
      { fecha: "12/06/2014", fase: "Grupo G", equipoA: "Alemania", resultado: "4-0", equipoB: "Portugal", goleadoresA: "Müller x2, Klose, Schürrle", goleadoresB: "-", estadio: "Arena Fonte Nova", ciudad: "Salvador" },
      { fecha: "13/07/2014", fase: "Final", equipoA: "Alemania", resultado: "1-0", equipoB: "Argentina", goleadoresA: "Götze", goleadoresB: "-", estadio: "Maracaná", ciudad: "Río de Janeiro" },
    ]
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
    partidosDetalles: [
      { fecha: "11/06/2010", fase: "Grupo A", equipoA: "Sudáfrica", resultado: "1-1", equipoB: "México", goleadoresA: "S. Mphela", goleadoresB: "H. Herrera", estadio: "Soccer City", ciudad: "Johannesburgo" },
      { fecha: "11/07/2010", fase: "Final", equipoA: "España", resultado: "1-0", equipoB: "Países Bajos", goleadoresA: "Iniesta", goleadoresB: "-", estadio: "Soccer City", ciudad: "Johannesburgo" },
    ]
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
    partidosDetalles: [
      { fecha: "09/06/2006", fase: "Grupo A", equipoA: "Alemania", resultado: "4-2", equipoB: "Costa Rica", goleadoresA: "Frings x2, Podolski, Klose", goleadoresB: "Gonzalez, Ruiz", estadio: "Fritz-Walter-Stadion", ciudad: "Kaiserslautern" },
      { fecha: "09/07/2006", fase: "Final", equipoA: "Italia", resultado: "1-1 (5-3 penales)", equipoB: "Francia", goleadoresA: "Motta", goleadoresB: "Zidane", estadio: "Olympiastadion", ciudad: "Berlín" },
    ]
  }
];

// ======================================================
// ===== FUNCIONES DE RENDERIZADO =====
function renderResumen(data) {
  const tbody = document.querySelector("#tbMundialesResumen tbody");
  tbody.innerHTML = "";
  data.forEach(m => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="link-mundial">${m.anio}</td>
      <td>${m.sede}</td>
      <td>${m.campeon}</td>
      <td>${m.subcampeon}</td>
      <td>${m.goleador || "-"}</td>
      <td>${m.partidos}</td>
      <td>${m.goles}</td>
      <td>${m.mejorJugador || "-"}</td>
      <td>${m.resumen}</td>
    `;
    tbody.appendChild(row);
  });
}

function renderPartidos(data) {
  const tbody = document.querySelector("#tbPartidos tbody");
  tbody.innerHTML = "";
  data.forEach(p => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${p.fecha || "-"}</td>
      <td>${p.fase || "-"}</td>
      <td>${p.equipoA}</td>
      <td>${p.resultado}</td>
      <td>${p.equipoB}</td>
      <td>${p.goleadoresA || "-"}</td>
      <td>${p.goleadoresB || "-"}</td>
      <td>${p.estadio || "-"}</td>
      <td>${p.ciudad || "-"}</td>
    `;
    tbody.appendChild(row);
  });
}

function renderBracket(mundial) {
  const bracketContainer = document.getElementById("bracketContainer");
  const bracketsSection = document.getElementById("brackets");

  if(!mundial) {
    bracketsSection.classList.add("oculto");
    bracketContainer.innerHTML = "";
    return;
  }

  bracketsSection.classList.remove("oculto");
  bracketContainer.innerHTML = mundial.bracket.map(stage => {
    return `<div class="stage">${stage.map(match => `<div class="match">${match}</div>`).join("")}</div>`;
  }).join("");
}

// ======================================================
// ===== FILTROS =====
const filtros = document.getElementById("filtro-categoria");
const search = document.getElementById("filtro-search");

function aplicarFiltro() {
  const cat = filtros.value;
  const text = search.value.toLowerCase();

  let filtered = mundiales;

  if(cat && text.length > 0) {
    filtered = mundiales.filter(m => {
      if(cat === "sede") return m.sede.toLowerCase().includes(text);
      if(cat === "anio") return m.anio.toString().includes(text);
      if(cat === "seleccion") return m.campeon.toLowerCase().includes(text) || m.subcampeon.toLowerCase().includes(text);
      return true;
    });
  }

  renderResumen(filtered);
  renderPartidos(filtered.length ? filtered[0].partidosDetalles || [] : []);
  renderBracket(filtered.length === 1 ? filtered[0] : null);
}

filtros.addEventListener("change", aplicarFiltro);
search.addEventListener("input", aplicarFiltro);

// ======================================================
// ===== CARGA INICIAL =====
document.addEventListener("DOMContentLoaded", () => {
  renderResumen([mundiales[0]]);
  renderPartidos(mundiales[0].partidosDetalles);
  renderBracket(null);
});
