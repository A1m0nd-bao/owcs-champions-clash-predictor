const EVENTS = [
  {
    year: 2026,
    name: "OWCS 2026 Champions Clash",
    date: "May 22-24, 2026",
    location: "Tachikawa, Tokyo",
    teams: 8,
    prize: "众筹奖金池",
    format: "8 队双败淘汰。胜者组首轮和败者组首轮 BO3，其余常规淘汰赛 BO5，总决赛 BO7。",
    source: "https://liquipedia.net/overwatch/Overwatch_Champions_Series/2026/Champions_Clash",
    podium: ["Crazy Raccoon", "Twisted Minds", "ZETA DIVISION", "Virtus.pro"],
    stages: [
      {
        title: "胜者组关键线",
        matches: [
          ["Crazy Raccoon", "ZETA DIVISION", "3-1", "Crazy Raccoon"],
        ],
      },
      {
        title: "败者组关键线",
        matches: [
          ["Virtus.pro", "Twisted Minds", "1-3", "Twisted Minds"],
          ["ZETA DIVISION", "Twisted Minds", "1-3", "Twisted Minds"],
        ],
      },
      {
        title: "总决赛",
        matches: [
          ["Crazy Raccoon", "Twisted Minds", "4-3", "Crazy Raccoon"],
        ],
      },
      {
        title: "赛事奖项",
        matches: [],
        note: "Tournament MVP：Junbin（Crazy Raccoon）。冠军 Crazy Raccoon 获得 Midseason Championship 资格。",
      },
    ],
    bracket: [
      {
        title: "胜者组四分之一决赛",
        matches: [
          ["Twisted Minds", "All Gamers", "2-0", "Twisted Minds"],
          ["Dallas Fuel", "Crazy Raccoon", "0-2", "Crazy Raccoon"],
          ["Weibo Gaming", "Virtus.pro", "1-2", "Virtus.pro"],
          ["ZETA DIVISION", "Spacestation Gaming", "2-0", "ZETA DIVISION"],
        ],
      },
      {
        title: "胜者组半决赛",
        matches: [
          ["Twisted Minds", "Crazy Raccoon", "0-3", "Crazy Raccoon"],
          ["Virtus.pro", "ZETA DIVISION", "1-3", "ZETA DIVISION"],
        ],
      },
      {
        title: "胜者组决赛 / 总决赛",
        matches: [
          ["Crazy Raccoon", "ZETA DIVISION", "3-1", "Crazy Raccoon"],
          ["Crazy Raccoon", "Twisted Minds", "4-3", "Crazy Raccoon"],
        ],
      },
      {
        title: "败者组",
        matches: [
          ["All Gamers", "Dallas Fuel", "0-2", "Dallas Fuel"],
          ["Weibo Gaming", "Spacestation Gaming", "2-0", "Weibo Gaming"],
          ["Virtus.pro", "Dallas Fuel", "3-1", "Virtus.pro"],
          ["Twisted Minds", "Weibo Gaming", "3-2", "Twisted Minds"],
          ["Virtus.pro", "Twisted Minds", "1-3", "Twisted Minds"],
          ["ZETA DIVISION", "Twisted Minds", "1-3", "Twisted Minds"],
        ],
      },
    ],
  },
  {
    year: 2025,
    name: "OWCS 2025 World Finals",
    date: "Nov 26-30, 2025",
    location: "Stockholm",
    teams: 12,
    prize: "$500,000",
    format: "12 队双败淘汰。前段含 BO3，淘汰赛后段 BO5，总决赛 BO7。",
    source: "https://liquipedia.net/overwatch/Overwatch_Champions_Series/2025/World_Finals",
    podium: ["Twisted Minds", "Al Qadsiah", "Crazy Raccoon", "Team Falcons"],
    stages: [
      {
        title: "胜者组关键线",
        matches: [
          ["Al Qadsiah", "Twisted Minds", "3-1", "Al Qadsiah"],
        ],
      },
      {
        title: "败者组关键线",
        matches: [
          ["Crazy Raccoon", "Team Falcons", "3-2", "Crazy Raccoon"],
          ["Twisted Minds", "Crazy Raccoon", "3-1", "Twisted Minds"],
        ],
      },
      {
        title: "总决赛",
        matches: [
          ["Al Qadsiah", "Twisted Minds", "1-4", "Twisted Minds"],
        ],
      },
    ],
  },
  {
    year: 2025,
    name: "OWCS 2025 Midseason Championship",
    date: "Jul 31-Aug 03, 2025",
    location: "Riyadh",
    teams: 16,
    prize: "$1,060,000",
    format: "小组循环赛后接单败淘汰赛。淘汰赛从八强开始，总决赛 BO7。",
    source: "https://liquipedia.net/overwatch/Overwatch_Champions_Series/2025/Midseason_Championship",
    podium: ["Team Falcons", "Al Qadsiah", "Twisted Minds / T1", "Crazy Raccoon / Virtus.pro / Team Liquid / Geekay Esports"],
    stages: [
      {
        title: "半决赛",
        matches: [
          ["Twisted Minds", "Al Qadsiah", "2-3", "Al Qadsiah"],
          ["T1", "Team Falcons", "1-3", "Team Falcons"],
        ],
      },
      {
        title: "总决赛",
        matches: [
          ["Al Qadsiah", "Team Falcons", "0-4", "Team Falcons"],
        ],
      },
      {
        title: "赛制差异",
        matches: [],
        note: "这是历届 OWCS 国际赛中结构最不同的一站：先用小组循环筛出淘汰赛席位，再用单败决出冠军。",
      },
    ],
  },
  {
    year: 2025,
    name: "OWCS 2025 Champions Clash",
    date: "Apr 18-20, 2025",
    location: "Hangzhou",
    teams: 8,
    prize: "$260,000",
    format: "8 队双败淘汰。常规淘汰赛 BO5，总决赛 BO7。",
    source: "https://liquipedia.net/overwatch/Overwatch_Champions_Series/2025/Champions_Clash",
    podium: ["Crazy Raccoon", "Team Falcons", "NTMR", "Once Again"],
    stages: [
      {
        title: "胜者组关键线",
        matches: [
          ["Team Falcons", "NTMR", "3-0", "Team Falcons"],
        ],
      },
      {
        title: "败者组关键线",
        matches: [
          ["Crazy Raccoon", "Once Again", "3-0", "Crazy Raccoon"],
          ["NTMR", "Crazy Raccoon", "0-3", "Crazy Raccoon"],
        ],
      },
      {
        title: "总决赛",
        matches: [
          ["Team Falcons", "Crazy Raccoon", "2-4", "Crazy Raccoon"],
        ],
      },
    ],
  },
  {
    year: 2024,
    name: "OWCS 2024 World Finals",
    date: "Nov 22-24, 2024",
    location: "Stockholm",
    teams: 8,
    prize: "$500,000",
    format: "8 队双败淘汰。常规淘汰赛 BO5，总决赛 BO7。",
    source: "https://liquipedia.net/overwatch/Overwatch_Champions_Series/2024/World_Finals",
    podium: ["Team Falcons", "Crazy Raccoon", "Toronto Defiant", "NRG Shock"],
    stages: [
      {
        title: "胜者组关键线",
        matches: [
          ["Team Falcons", "Crazy Raccoon", "3-0", "Team Falcons"],
        ],
      },
      {
        title: "败者组关键线",
        matches: [
          ["Toronto Defiant", "NRG Shock", "3-0", "Toronto Defiant"],
          ["Crazy Raccoon", "Toronto Defiant", "3-0", "Crazy Raccoon"],
        ],
      },
      {
        title: "总决赛",
        matches: [
          ["Team Falcons", "Crazy Raccoon", "4-1", "Team Falcons"],
        ],
      },
    ],
  },
  {
    year: 2024,
    name: "OWCS 2024 Major",
    date: "May 31-Jun 02, 2024",
    location: "Dallas, TX",
    teams: 8,
    prize: "$250,000",
    format: "8 队双败淘汰。常规淘汰赛 BO5，总决赛 BO7。",
    source: "https://liquipedia.net/overwatch/Overwatch_Champions_Series/2024/Major",
    podium: ["Crazy Raccoon", "Team Falcons", "Spacestation Gaming", "ENCE"],
    stages: [
      {
        title: "胜者组关键线",
        matches: [
          ["Team Falcons", "Crazy Raccoon", "3-2", "Team Falcons"],
        ],
      },
      {
        title: "败者组关键线",
        matches: [
          ["ENCE", "Spacestation Gaming", "1-3", "Spacestation Gaming"],
          ["Crazy Raccoon", "Spacestation Gaming", "3-0", "Crazy Raccoon"],
        ],
      },
      {
        title: "总决赛",
        matches: [
          ["Team Falcons", "Crazy Raccoon", "2-4", "Crazy Raccoon"],
        ],
      },
    ],
  },
];

let activeYear = "all";

const eventList = document.querySelector("#eventList");
const historySummary = document.querySelector("#historySummary");

function renderSummary() {
  const championCounts = EVENTS.reduce((acc, event) => {
    acc[event.podium[0]] = (acc[event.podium[0]] || 0) + 1;
    return acc;
  }, {});
  const mostTitles = Object.entries(championCounts).sort((a, b) => b[1] - a[1])[0];

  historySummary.innerHTML = [
    ["国际赛", `${EVENTS.length}`],
    ["不同冠军", `${Object.keys(championCounts).length}`],
    ["夺冠最多", `${mostTitles[0]} x${mostTitles[1]}`],
  ].map(([label, value]) => `
    <div class="summary-card">
      <span class="summary-label">${label}</span>
      <span class="summary-value">${value}</span>
    </div>
  `).join("");
}

function renderEvents() {
  const events = activeYear === "all" ? EVENTS : EVENTS.filter((event) => String(event.year) === activeYear);
  eventList.innerHTML = events.map(renderEvent).join("");
}

function renderEvent(event) {
  return `
    <article class="event-card">
      <aside class="event-meta">
        <span class="event-year">${event.year}</span>
        <h2 class="event-title">${event.name}</h2>
        <div class="event-facts">
          ${fact("日期", event.date)}
          ${fact("地点", event.location)}
          ${fact("队伍", `${event.teams} 队`)}
          ${fact("奖金", event.prize)}
          ${fact("赛制", event.format)}
        </div>
        <a class="event-source" href="${event.source}" target="_blank" rel="noreferrer">查看 Liquipedia</a>
      </aside>
      <div class="event-main">
        <div class="podium-line">
          ${event.podium.map((team, index) => `
            <div class="result-tile${index === 0 ? " champion" : ""}">
              <span class="result-place">${placeLabel(index)}</span>
              <span class="result-team">${team}</span>
            </div>
          `).join("")}
        </div>
        <div class="stage-board">
          ${event.stages.map(renderStage).join("")}
        </div>
        ${event.bracket ? renderHistoryBracket(event.bracket) : ""}
      </div>
    </article>
  `;
}

function renderHistoryBracket(rounds) {
  return `
    <div class="history-bracket" aria-label="官方晋级图">
      <div class="history-bracket-head">
        <h3>官方晋级图</h3>
        <span>完整赛程路径</span>
      </div>
      <div class="history-bracket-lane">
        ${rounds.map((round) => `
          <section class="history-round">
            <h4>${round.title}</h4>
            ${round.matches.map(([a, b, score, winner]) => `
              <div class="history-match">
                <span class="${winner === a ? "winner" : ""}">${a}</span>
                <span class="score-pill">${score}</span>
                <span class="${winner === b ? "winner" : ""}">${b}</span>
              </div>
            `).join("")}
          </section>
        `).join("")}
      </div>
    </div>
  `;
}

function renderStage(stage) {
  return `
    <section class="stage-column">
      <h4>${stage.title}</h4>
      ${stage.note ? `<p class="format-note">${stage.note}</p>` : ""}
      ${stage.matches.map(([a, b, score, winner]) => `
        <div class="match-row">
          <span class="${winner === a ? "winner" : ""}">${a}</span>
          <span class="score-pill">${score}</span>
          <span class="${winner === b ? "winner" : ""}">${b}</span>
        </div>
      `).join("")}
    </section>
  `;
}

function fact(label, value) {
  return `<div class="fact"><strong>${label}</strong><span>${value}</span></div>`;
}

function placeLabel(index) {
  return ["冠军", "亚军", "第三名", "第四名"][index] || `${index + 1}`;
}

document.addEventListener("click", (event) => {
  const tab = event.target.closest("[data-year]");
  if (!tab) return;
  activeYear = tab.dataset.year;
  document.querySelectorAll("[data-year]").forEach((item) => item.classList.toggle("active", item === tab));
  renderEvents();
});

renderSummary();
renderEvents();
