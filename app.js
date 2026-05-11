const DEFAULT_TEAMS = [
  {
    id: "tm",
    name: "Twisted Minds",
    region: "EMEA",
    seed: "1",
    logo: "./assets/logos/twisted-minds.png",
    color: "#161616",
  },
  {
    id: "ag",
    name: "All Gamers",
    region: "China",
    seed: "2",
    logo: "./assets/logos/all-gamers.png",
    color: "#c9282d",
  },
  {
    id: "df",
    name: "Dallas Fuel",
    region: "NA",
    seed: "1",
    logo: "./assets/logos/dallas-fuel.png",
    color: "#0072ce",
  },
  {
    id: "asia2",
    name: "Crazy Raccoon",
    region: "Asia",
    seed: "2",
    logo: "./assets/logos/crazy-raccoon.png",
    color: "#e7423a",
  },
  {
    id: "wbg",
    name: "Weibo Gaming",
    region: "China",
    seed: "1",
    logo: "./assets/logos/weibo-gaming.png",
    color: "#e51b23",
  },
  {
    id: "vp",
    name: "Virtus.pro",
    region: "EMEA",
    seed: "2",
    logo: "./assets/logos/virtus-pro.png",
    color: "#f05a28",
  },
  {
    id: "asia1",
    name: "ZETA DIVISION",
    region: "Asia",
    seed: "1",
    logo: "./assets/logos/zeta-division.png",
    color: "#111111",
  },
  {
    id: "ssg",
    name: "Spacestation Gaming",
    region: "NA",
    seed: "2",
    logo: "./assets/logos/spacestation-gaming.png",
    color: "#ffcc33",
  },
];

const STORAGE_KEY = "owcs-champions-clash-2026-predictor-v2";
const PICK_IDS = [
  "ubqf1", "ubqf2", "ubqf3", "ubqf4",
  "ubsf1", "ubsf2", "ubf",
  "lbr1a", "lbr1b", "lbqf1", "lbqf2", "lbsf", "lbf", "gf",
];

let state = loadState();
let activeTab = "all";

const seedList = document.querySelector("#seedList");
const bracket = document.querySelector("#bracket");
const podium = document.querySelector("#podium");
const progressBadge = document.querySelector("#progressBadge");

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved?.teams?.length === DEFAULT_TEAMS.length) {
      return { teams: hydrateTeams(saved.teams), picks: saved.picks || {} };
    }
  } catch {
    localStorage.removeItem(STORAGE_KEY);
  }
  return {
    teams: structuredClone(DEFAULT_TEAMS),
    picks: {},
  };
}

function hydrateTeams(teams) {
  const savedById = Object.fromEntries(teams.map((item) => [item.id, item]));
  return DEFAULT_TEAMS.map((defaultTeam) => ({
    ...defaultTeam,
    ...(savedById[defaultTeam.id] || {}),
    logo: defaultTeam.logo,
    color: defaultTeam.color,
  }));
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function team(id) {
  return state.teams.find((item) => item.id === id) || null;
}

function result(matchId, a, b) {
  const picked = state.picks[matchId];
  if (!a || !b || (picked !== a.id && picked !== b.id)) {
    return { winner: null, loser: null };
  }
  const winner = picked === a.id ? a : b;
  const loser = picked === a.id ? b : a;
  return { winner, loser };
}

function buildMatches() {
  const t = Object.fromEntries(state.teams.map((item) => [item.id, item]));

  const ubqf1 = { id: "ubqf1", group: "upper", type: "Ft3", label: "QF1", a: t.tm, b: t.ag };
  const ubqf2 = { id: "ubqf2", group: "upper", type: "Ft3", label: "QF2", a: t.df, b: t.asia2 };
  const ubqf3 = { id: "ubqf3", group: "upper", type: "Ft3", label: "QF3", a: t.wbg, b: t.vp };
  const ubqf4 = { id: "ubqf4", group: "upper", type: "Ft3", label: "QF4", a: t.asia1, b: t.ssg };

  const qf1 = result("ubqf1", ubqf1.a, ubqf1.b);
  const qf2 = result("ubqf2", ubqf2.a, ubqf2.b);
  const qf3 = result("ubqf3", ubqf3.a, ubqf3.b);
  const qf4 = result("ubqf4", ubqf4.a, ubqf4.b);

  const ubsf1 = { id: "ubsf1", group: "upper", type: "Ft3", label: "SF1", a: qf1.winner, b: qf2.winner };
  const ubsf2 = { id: "ubsf2", group: "upper", type: "Ft3", label: "SF2", a: qf3.winner, b: qf4.winner };
  const sf1 = result("ubsf1", ubsf1.a, ubsf1.b);
  const sf2 = result("ubsf2", ubsf2.a, ubsf2.b);

  const ubf = { id: "ubf", group: "upper", type: "Ft3", label: "UBF", a: sf1.winner, b: sf2.winner };
  const ubFinal = result("ubf", ubf.a, ubf.b);

  const lbr1a = { id: "lbr1a", group: "lower", type: "Ft3", label: "L1", a: qf1.loser, b: qf2.loser };
  const lbr1b = { id: "lbr1b", group: "lower", type: "Ft3", label: "L2", a: qf3.loser, b: qf4.loser };
  const lr1a = result("lbr1a", lbr1a.a, lbr1a.b);
  const lr1b = result("lbr1b", lbr1b.a, lbr1b.b);

  const lbqf1 = { id: "lbqf1", group: "lower", type: "Ft3", label: "LQF1", a: sf1.loser, b: lr1b.winner };
  const lbqf2 = { id: "lbqf2", group: "lower", type: "Ft3", label: "LQF2", a: sf2.loser, b: lr1a.winner };
  const lqf1 = result("lbqf1", lbqf1.a, lbqf1.b);
  const lqf2 = result("lbqf2", lbqf2.a, lbqf2.b);

  const lbsf = { id: "lbsf", group: "lower", type: "Ft3", label: "LSF", a: lqf1.winner, b: lqf2.winner };
  const lowerSf = result("lbsf", lbsf.a, lbsf.b);
  const lbf = { id: "lbf", group: "lower", type: "Ft3", label: "LBF", a: ubFinal.loser, b: lowerSf.winner };
  const lowerFinal = result("lbf", lbf.a, lbf.b);
  const gf = { id: "gf", group: "finals", type: "Ft4", label: "GF", a: ubFinal.winner, b: lowerFinal.winner };

  return [
    { title: "胜者组四分之一决赛", group: "upper", matches: [ubqf1, ubqf2, ubqf3, ubqf4] },
    { title: "胜者组半决赛", group: "upper", matches: [ubsf1, ubsf2] },
    { title: "胜者组决赛", group: "upper", matches: [ubf] },
    { title: "总决赛", group: "finals", matches: [gf] },
    { title: "败者组第一轮", group: "lower", matches: [lbr1a, lbr1b] },
    { title: "败者组四分之一决赛", group: "lower", matches: [lbqf1, lbqf2] },
    { title: "败者组半决赛", group: "lower", matches: [lbsf] },
    { title: "败者组决赛", group: "lower", matches: [lbf] },
  ];
}

function completedMatches() {
  return PICK_IDS.filter((id) => Boolean(state.picks[id])).length;
}

function renderSeeds() {
  seedList.innerHTML = "";
  state.teams.forEach((item, index) => {
    const row = document.createElement("div");
    row.className = "seed-row";
    row.innerHTML = `
      <div class="seed-rank">
        ${renderLogo(item, "seed-logo")}
        <span>${index + 1}</span>
      </div>
      <div class="seed-fields">
        <input aria-label="队名" value="${escapeAttr(item.name)}" data-field="name" data-id="${item.id}">
        <input aria-label="地区" value="${escapeAttr(item.region)}" data-field="region" data-id="${item.id}">
        <input aria-label="种子" value="${escapeAttr(item.seed)}" data-field="seed" data-id="${item.id}">
      </div>
    `;
    seedList.appendChild(row);
  });
}

function renderPodium() {
  const matches = buildMatches().flatMap((round) => round.matches);
  const gfMatch = matches.find((match) => match.id === "gf");
  const lbfMatch = matches.find((match) => match.id === "lbf");
  const gf = result("gf", gfMatch.a, gfMatch.b);
  const lbf = result("lbf", lbfMatch.a, lbfMatch.b);
  const places = [
    ["冠军", gf.winner],
    ["亚军", gf.loser],
    ["季军", lbf.loser],
  ];

  podium.innerHTML = places.map(([label, item]) => `
    <div class="podium-card">
      <span class="place">${label}</span>
      ${item ? renderLogo(item, "podium-logo") : ""}
      <span class="podium-team">${item ? escapeHtml(item.name) : "待预测"}</span>
      <span class="team-seed">${item ? `${escapeHtml(item.region)} #${escapeHtml(item.seed)}` : "完成关键场次后显示"}</span>
    </div>
  `).join("");
}

function renderBracket() {
  const rounds = buildMatches();
  bracket.innerHTML = "";

  const groups = activeTab === "all"
    ? [
        { key: "upper", title: "胜者组与总决赛", rounds: rounds.filter((round) => round.group === "upper" || round.group === "finals") },
        { key: "lower", title: "败者组", rounds: rounds.filter((round) => round.group === "lower") },
      ]
    : [
        { key: activeTab, title: tabTitle(activeTab), rounds: rounds.filter((round) => round.group === activeTab) },
      ];

  groups.forEach((group) => {
    const visibleRounds = group.rounds;
    if (!visibleRounds.length) return;

    const band = document.createElement("section");
    band.className = `bracket-band bracket-band-${group.key}`;
    band.innerHTML = `
      <div class="band-title">
        <h3>${group.title}</h3>
        <span>${visibleRounds.reduce((sum, round) => sum + round.matches.length, 0)} 场</span>
      </div>
      <div class="bracket-lane">
        ${visibleRounds.map(renderRound).join("")}
      </div>
    `;
    bracket.appendChild(band);
  });

  progressBadge.textContent = `${completedMatches()} / ${PICK_IDS.length}`;
  scheduleConnectorDraw();
}

function tabTitle(tab) {
  return {
    upper: "胜者组",
    lower: "败者组",
    finals: "总决赛",
  }[tab] || "全部赛程";
}

function renderRound(round) {
  return `
    <section class="round" data-group="${round.group}" data-count="${round.matches.length}">
      <div class="round-title">
        <h4>${round.title}</h4>
        <span>${round.matches.length} 场</span>
      </div>
      <div class="round-matches">
        ${round.matches.map(renderMatch).join("")}
      </div>
    </section>
  `;
}

function renderMatch(match) {
  const ready = match.a && match.b;
  const picked = state.picks[match.id];
  const slot = (side, item) => {
    if (!item) {
      return `<div class="pending">${side === "a" ? "上半区" : "下半区"}待定</div>`;
    }
    const isWinner = picked === item.id;
    return `
      <button class="team-button${isWinner ? " winner" : ""}" type="button" data-match="${match.id}" data-team="${item.id}" ${ready ? "" : "disabled"}>
        ${renderLogo(item, "match-logo")}
        <span class="team-copy">
          <span class="team-name">${escapeHtml(item.name)}</span>
          <span class="team-seed">${escapeHtml(item.region)} #${escapeHtml(item.seed)}</span>
        </span>
      </button>
    `;
  };

  return `
    <article class="match" data-match-id="${match.id}">
      <div class="match-meta">
        <span>${match.label}</span>
        <span>${match.type}</span>
      </div>
      ${slot("a", match.a)}
      ${slot("b", match.b)}
    </article>
  `;
}

function scheduleConnectorDraw() {
  requestAnimationFrame(drawConnectors);
}

function drawConnectors() {
  document.querySelectorAll(".connector-layer").forEach((layer) => layer.remove());

  document.querySelectorAll(".bracket-lane").forEach((lane) => {
    const rounds = [...lane.querySelectorAll(".round")];
    if (rounds.length < 2) return;

    const laneRect = lane.getBoundingClientRect();
    const width = Math.max(lane.scrollWidth, lane.clientWidth);
    const height = Math.max(lane.scrollHeight, lane.clientHeight);
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.classList.add("connector-layer");
    svg.setAttribute("width", width);
    svg.setAttribute("height", height);
    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);

    for (let index = 0; index < rounds.length - 1; index += 1) {
      const current = [...rounds[index].querySelectorAll(".match")];
      const next = [...rounds[index + 1].querySelectorAll(".match")];
      if (!current.length || !next.length) continue;

      if (current.length === 4 && next.length >= 2) {
        addMergedPath(svg, lane, laneRect, current.slice(0, 2), next[0]);
        addMergedPath(svg, lane, laneRect, current.slice(2, 4), next[1]);
        continue;
      }

      if (current.length === 2 && next.length === 1) {
        addMergedPath(svg, lane, laneRect, current, next[0]);
        continue;
      }

      const count = Math.min(current.length, next.length);
      for (let item = 0; item < count; item += 1) {
        addDirectPath(svg, lane, laneRect, current[item], next[item]);
      }
    }

    lane.prepend(svg);
  });
}

function matchPoint(element, side, lane, laneRect) {
  const rect = element.getBoundingClientRect();
  const x = side === "right" ? rect.right - laneRect.left : rect.left - laneRect.left;
  return {
    x: x + lane.scrollLeft,
    y: rect.top - laneRect.top + rect.height / 2 + lane.scrollTop,
  };
}

function addMergedPath(svg, lane, laneRect, sources, target) {
  const targetPoint = matchPoint(target, "left", lane, laneRect);
  const sourcePoints = sources.map((source) => matchPoint(source, "right", lane, laneRect));
  const mergeX = Math.round((Math.max(...sourcePoints.map((point) => point.x)) + targetPoint.x) / 2);
  const commands = sourcePoints
    .map((point) => `M ${point.x} ${point.y} H ${mergeX} V ${targetPoint.y}`)
    .join(" ");
  addPath(svg, `${commands} M ${mergeX} ${targetPoint.y} H ${targetPoint.x}`);
}

function addDirectPath(svg, lane, laneRect, source, target) {
  const sourcePoint = matchPoint(source, "right", lane, laneRect);
  const targetPoint = matchPoint(target, "left", lane, laneRect);
  const mergeX = Math.round((sourcePoint.x + targetPoint.x) / 2);
  addPath(svg, `M ${sourcePoint.x} ${sourcePoint.y} H ${mergeX} V ${targetPoint.y} H ${targetPoint.x}`);
}

function addPath(svg, d) {
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.classList.add("connector-path");
  path.setAttribute("d", d);
  svg.appendChild(path);
}

function clearInvalidPicks() {
  const matches = buildMatches().flatMap((round) => round.matches);
  for (const match of matches) {
    const pick = state.picks[match.id];
    if (!pick) continue;
    if (!match.a || !match.b || (pick !== match.a.id && pick !== match.b.id)) {
      delete state.picks[match.id];
    }
  }
}

function render() {
  clearInvalidPicks();
  renderSeeds();
  renderBracket();
  renderPodium();
  saveState();
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttr(value) {
  return escapeHtml(value);
}

function initials(name) {
  const words = String(name).trim().split(/\s+/).filter(Boolean);
  if (!words.length) return "?";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return words.slice(0, 2).map((word) => word[0]).join("").toUpperCase();
}

function renderLogo(item, className) {
  const style = `--team-color:${escapeAttr(item.color || "#263746")}`;
  const fallback = `<span class="logo-fallback" style="${style}" ${item.logo ? "hidden" : ""}>${escapeHtml(initials(item.name))}</span>`;
  if (!item.logo) {
    return `<span class="team-logo ${className}">${fallback}</span>`;
  }
  return `
    <span class="team-logo ${className}">
      <img class="logo-img" src="${escapeAttr(item.logo)}" alt="${escapeAttr(item.name)} 队标" loading="lazy">
      ${fallback}
    </span>
  `;
}

document.addEventListener("click", (event) => {
  const teamButton = event.target.closest("[data-match][data-team]");
  if (teamButton) {
    const { match, team: teamId } = teamButton.dataset;
    state.picks[match] = state.picks[match] === teamId ? null : teamId;
    if (!state.picks[match]) delete state.picks[match];
    render();
    return;
  }

  const tab = event.target.closest(".tab");
  if (tab) {
    activeTab = tab.dataset.tab;
    document.querySelectorAll(".tab").forEach((item) => item.classList.toggle("active", item === tab));
    renderBracket();
    return;
  }

  if (event.target.id === "resetPicks") {
    state.picks = {};
    render();
  }

  if (event.target.id === "resetAll") {
    state = { teams: structuredClone(DEFAULT_TEAMS), picks: {} };
    render();
  }
});

seedList.addEventListener("input", (event) => {
  const input = event.target;
  const item = team(input.dataset.id);
  if (!item) return;
  item[input.dataset.field] = input.value;
  renderBracket();
  renderPodium();
  saveState();
});

document.addEventListener(
  "error",
  (event) => {
    if (!event.target.classList?.contains("logo-img")) return;
    const fallback = event.target.nextElementSibling;
    event.target.hidden = true;
    if (fallback) fallback.hidden = false;
  },
  true,
);

window.addEventListener("resize", scheduleConnectorDraw);

render();
