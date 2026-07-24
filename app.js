const DEFAULT_TEAMS = [
  {
    id: "vp",
    name: "Virtus.pro",
    region: "EMEA",
    seed: "1",
    group: "A",
    logo: "./assets/logos/virtus-pro.png",
    color: "#f05a28",
  },
  {
    id: "ninez",
    name: "9z Team",
    region: "SA",
    seed: "1",
    group: "A",
    logo: "",
    color: "#5b35d5",
  },
  {
    id: "t1",
    name: "T1",
    region: "Asia",
    seed: "3",
    group: "A",
    logo: "./assets/logos/t1.png",
    color: "#e2012d",
  },
  {
    id: "tm",
    name: "Twisted Minds",
    region: "EMEA",
    seed: "3",
    group: "A",
    logo: "./assets/logos/twisted-minds.png",
    color: "#161616",
  },
  {
    id: "wbg",
    name: "Weibo Gaming",
    region: "China",
    seed: "1",
    group: "A",
    logo: "./assets/logos/weibo-gaming.png",
    color: "#e51b23",
  },
  {
    id: "tl",
    name: "Team Liquid",
    region: "NA",
    seed: "3",
    group: "A",
    logo: "./assets/logos/team-liquid.png",
    color: "#1b4f8f",
  },
  {
    id: "df",
    name: "Dallas Fuel",
    region: "NA",
    seed: "1",
    group: "A",
    logo: "./assets/logos/dallas-fuel.png",
    color: "#0072ce",
  },
  {
    id: "tf",
    name: "Team Falcons",
    region: "Invite",
    seed: "2025",
    group: "A",
    logo: "./assets/logos/team-falcons.png",
    color: "#00a46c",
  },
  {
    id: "cr",
    name: "Crazy Raccoon",
    region: "Invite",
    seed: "CC",
    group: "B",
    logo: "./assets/logos/crazy-raccoon.png",
    color: "#e7423a",
  },
  {
    id: "secret",
    name: "Team Secret",
    region: "Asia",
    seed: "Pacific",
    group: "B",
    logo: "./assets/logos/team-secret.png",
    color: "#111111",
  },
  {
    id: "ssg",
    name: "Spacestation Gaming",
    region: "NA",
    seed: "2",
    group: "B",
    logo: "./assets/logos/spacestation-gaming.png",
    color: "#ffcc33",
  },
  {
    id: "jdg",
    name: "JD Gaming",
    region: "China",
    seed: "2",
    group: "B",
    logo: "./assets/logos/jd-gaming.png",
    color: "#d5162f",
  },
  {
    id: "gk",
    name: "Geekay Esports",
    region: "EMEA",
    seed: "2",
    group: "B",
    logo: "./assets/logos/geekay-esports.png",
    color: "#6f2b90",
  },
  {
    id: "ag",
    name: "All Gamers",
    region: "China",
    seed: "3",
    group: "B",
    logo: "./assets/logos/all-gamers.png",
    color: "#c9282d",
  },
  {
    id: "zeta",
    name: "ZETA DIVISION",
    region: "Asia",
    seed: "1",
    group: "B",
    logo: "./assets/logos/zeta-division.png",
    color: "#111111",
  },
  {
    id: "varrel",
    name: "VARREL",
    region: "Asia",
    seed: "Japan",
    group: "B",
    logo: "./assets/logos/varrel.png",
    color: "#111111",
  },
];

const STORAGE_KEY = "owcs-midseason-2026-predictor-v2";
const PICK_IDS = [
  "ga_o1", "ga_o2", "ga_o3", "ga_o4", "ga_u1", "ga_u2", "ga_l1", "ga_l2", "ga_d1", "ga_d2",
  "gb_o1", "gb_o2", "gb_o3", "gb_o4", "gb_u1", "gb_u2", "gb_l1", "gb_l2", "gb_d1", "gb_d2",
  "qf1", "qf2", "qf3", "qf4", "sf1", "sf2", "third", "gf",
];

let state = loadState();
let activeTab = "all";
let viewMode = "vertical";
let collapsedBands = new Set(["gb", "playoffs"]);
let seedEditorCollapsed = true;

const seedList = document.querySelector("#seedList");
const bracket = document.querySelector("#bracket");
const podium = document.querySelector("#podium");
const progressBadge = document.querySelector("#progressBadge");
const seedsPanel = document.querySelector(".seeds-panel");
const toggleSeeds = document.querySelector("#toggleSeeds");

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

function seedLabel(item) {
  const seed = escapeHtml(item.seed);
  const region = escapeHtml(item.region);
  return /^\d+$/.test(String(item.seed)) ? `${region} #${seed}` : `${region} ${seed}`;
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

function groupMatches(prefix, ids) {
  const t = Object.fromEntries(ids.map((id) => [id, team(id)]));
  const o1 = { id: `${prefix}_o1`, group: prefix, type: "Ft2", label: "M1", a: t[ids[0]], b: t[ids[1]] };
  const o2 = { id: `${prefix}_o2`, group: prefix, type: "Ft2", label: "M2", a: t[ids[2]], b: t[ids[3]] };
  const o3 = { id: `${prefix}_o3`, group: prefix, type: "Ft2", label: "M3", a: t[ids[4]], b: t[ids[5]] };
  const o4 = { id: `${prefix}_o4`, group: prefix, type: "Ft2", label: "M4", a: t[ids[6]], b: t[ids[7]] };

  const r1 = result(o1.id, o1.a, o1.b);
  const r2 = result(o2.id, o2.a, o2.b);
  const r3 = result(o3.id, o3.a, o3.b);
  const r4 = result(o4.id, o4.a, o4.b);

  const u1 = { id: `${prefix}_u1`, group: prefix, type: "Ft2", label: "出线战 1", a: r1.winner, b: r2.winner };
  const u2 = { id: `${prefix}_u2`, group: prefix, type: "Ft2", label: "出线战 2", a: r3.winner, b: r4.winner };
  const ur1 = result(u1.id, u1.a, u1.b);
  const ur2 = result(u2.id, u2.a, u2.b);

  const l1 = { id: `${prefix}_l1`, group: prefix, type: "Ft2", label: "淘汰战 1", a: r1.loser, b: r2.loser };
  const l2 = { id: `${prefix}_l2`, group: prefix, type: "Ft2", label: "淘汰战 2", a: r3.loser, b: r4.loser };
  const lr1 = result(l1.id, l1.a, l1.b);
  const lr2 = result(l2.id, l2.a, l2.b);

  const d1 = { id: `${prefix}_d1`, group: prefix, type: "Ft2", label: "最终出线 1", a: ur1.loser, b: lr1.winner };
  const d2 = { id: `${prefix}_d2`, group: prefix, type: "Ft2", label: "最终出线 2", a: ur2.loser, b: lr2.winner };
  const dr1 = result(d1.id, d1.a, d1.b);
  const dr2 = result(d2.id, d2.a, d2.b);

  return {
    rounds: [
      { title: "四分之一决赛", group: prefix, matches: [o1, o2, o3, o4] },
      { title: "半决赛", group: prefix, matches: [u1, u2] },
      { title: "败者半决赛", group: prefix, matches: [l1, l2] },
      { title: "最终出线战", group: prefix, matches: [d1, d2] },
    ],
    qualifiers: {
      first: ur1.winner,
      second: ur2.winner,
      third: dr1.winner,
      fourth: dr2.winner,
    },
  };
}

function buildMatches() {
  const groupA = groupMatches("ga", ["vp", "ninez", "t1", "tm", "wbg", "tl", "df", "tf"]);
  const groupB = groupMatches("gb", ["cr", "secret", "ssg", "jdg", "gk", "ag", "zeta", "varrel"]);
  const a = groupA.qualifiers;
  const b = groupB.qualifiers;

  const qf1 = { id: "qf1", group: "playoffs", type: "Ft3", label: "QF1", a: a.first, b: b.fourth };
  const qf2 = { id: "qf2", group: "playoffs", type: "Ft3", label: "QF2", a: b.second, b: a.third };
  const qf3 = { id: "qf3", group: "playoffs", type: "Ft3", label: "QF3", a: a.second, b: b.third };
  const qf4 = { id: "qf4", group: "playoffs", type: "Ft3", label: "QF4", a: b.first, b: a.fourth };
  const qr1 = result(qf1.id, qf1.a, qf1.b);
  const qr2 = result(qf2.id, qf2.a, qf2.b);
  const qr3 = result(qf3.id, qf3.a, qf3.b);
  const qr4 = result(qf4.id, qf4.a, qf4.b);

  const sf1 = { id: "sf1", group: "playoffs", type: "Ft3", label: "SF1", a: qr1.winner, b: qr2.winner };
  const sf2 = { id: "sf2", group: "playoffs", type: "Ft3", label: "SF2", a: qr3.winner, b: qr4.winner };
  const sr1 = result(sf1.id, sf1.a, sf1.b);
  const sr2 = result(sf2.id, sf2.a, sf2.b);

  const third = { id: "third", group: "playoffs", type: "Ft3", label: "3rd", a: sr1.loser, b: sr2.loser };
  const gf = { id: "gf", group: "playoffs", type: "Ft4", label: "GF", a: sr1.winner, b: sr2.winner };

  return [
    ...groupA.rounds,
    ...groupB.rounds,
    { title: "四分之一决赛", group: "playoffs", matches: [qf1, qf2, qf3, qf4] },
    { title: "半决赛", group: "playoffs", matches: [sf1, sf2] },
    { title: "季军赛与总决赛", group: "playoffs", matches: [third, gf] },
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
  const thirdMatch = matches.find((match) => match.id === "third");
  const gf = result("gf", gfMatch.a, gfMatch.b);
  const third = result("third", thirdMatch.a, thirdMatch.b);
  const places = [
    ["冠军", gf.winner],
    ["亚军", gf.loser],
    ["季军", third.winner],
  ];

  podium.innerHTML = places.map(([label, item]) => `
    <div class="podium-card">
      <span class="place">${label}</span>
      ${item ? renderLogo(item, "podium-logo") : ""}
      <span class="podium-team">${item ? escapeHtml(item.name) : "待预测"}</span>
      <span class="team-seed">${item ? seedLabel(item) : "完成关键场次后显示"}</span>
    </div>
  `).join("");
}

function renderBracket() {
  const rounds = buildMatches();
  bracket.innerHTML = "";
  bracket.className = `bracket view-${viewMode}`;

  if (viewMode === "vertical") {
    renderRoutePreview(rounds);
    progressBadge.textContent = `${completedMatches()} / ${PICK_IDS.length}`;
    return;
  }

  const groups = activeTab === "all"
    ? [
        { key: "ga", title: "Group A - GSL 双败出线", rounds: rounds.filter((round) => round.group === "ga") },
        { key: "gb", title: "Group B - GSL 双败出线", rounds: rounds.filter((round) => round.group === "gb") },
        { key: "playoffs", title: "Playoffs - 8 队单败", rounds: rounds.filter((round) => round.group === "playoffs") },
      ]
    : [
        { key: activeTab, title: tabTitle(activeTab), rounds: rounds.filter((round) => round.group === activeTab) },
      ];

  groups.forEach((group) => {
    if (!group.rounds.length) return;
    const collapsed = activeTab === "all" && collapsedBands.has(group.key);
    bracket.appendChild(group.key === "playoffs" ? renderPlayoffBand(group, collapsed) : renderGroupBand(group, collapsed));
  });

  progressBadge.textContent = `${completedMatches()} / ${PICK_IDS.length}`;
  scheduleConnectorDraw();
}

function renderRoutePreview(rounds) {
  const roundByGroup = (group) => rounds.filter((round) => round.group === group);
  const ga = roundByGroup("ga");
  const gb = roundByGroup("gb");
  const playoffs = roundByGroup("playoffs");
  const upperRows = [
    { title: "小组首轮", note: "16 队 / Ft2", matches: [...ga[0].matches, ...gb[0].matches] },
    { title: "胜者出线战", note: "A1 A2 / B1 B2", matches: [...ga[1].matches, ...gb[1].matches] },
    { title: "季后赛四分之一决赛", note: "8 队单败", matches: playoffs[0].matches },
    { title: "半决赛", note: "Ft3", matches: playoffs[1].matches },
    { title: "季军赛 / 总决赛", note: "Ft3 / Ft4", matches: playoffs[2].matches },
  ];
  const lowerRows = [
    { title: "败者半决赛", note: "A/B 组首轮败者", matches: [...ga[2].matches, ...gb[2].matches] },
    { title: "最终出线战", note: "A3 A4 / B3 B4", matches: [...ga[3].matches, ...gb[3].matches] },
  ];

  bracket.appendChild(renderRouteBand("胜者晋级总表", "A/B 组胜者路线与季后赛合并显示", upperRows));
  bracket.appendChild(renderRouteBand("败者组出线表", "小组败者路线单独显示，胜者进入季后赛席位", lowerRows));
}

function renderRouteBand(title, subtitle, rows) {
  const band = document.createElement("section");
  band.className = "bracket-band route-band";
  band.innerHTML = `
    <div class="route-head">
      <h3>${escapeHtml(title)}</h3>
      <span>${escapeHtml(subtitle)}</span>
    </div>
    <div class="route-table">
      ${rows.map(renderRouteRow).join("")}
    </div>
  `;
  return band;
}

function renderRouteRow(row) {
  return `
    <section class="route-row">
      <div class="route-row-label">
        <h4>${escapeHtml(row.title)}</h4>
        <span>${escapeHtml(row.note)}</span>
      </div>
      <div class="route-row-matches" data-count="${row.matches.length}">
        ${row.matches.map(renderMatch).join("")}
      </div>
    </section>
  `;
}

function renderPlayoffBand(group, collapsed) {
  const band = document.createElement("section");
  band.className = `bracket-band bracket-band-${group.key}${collapsed ? " collapsed" : ""}`;
  band.innerHTML = `
    ${renderBandTitle(group, collapsed)}
    <div class="band-body">
      <div class="bracket-lane playoff-lane">
        ${group.rounds.map(renderRound).join("")}
      </div>
    </div>
  `;
  return band;
}

function renderBandTitle(group, collapsed) {
  const count = group.rounds.reduce((sum, round) => sum + round.matches.length, 0);
  const completed = group.rounds.reduce((sum, round) => (
    sum + round.matches.filter((match) => Boolean(state.picks[match.id])).length
  ), 0);
  return `
    <button class="band-title" type="button" data-toggle-band="${escapeAttr(group.key)}" aria-expanded="${collapsed ? "false" : "true"}">
      <h3>${group.title}</h3>
      <span>${completed} / ${count} 场 ${collapsed ? "展开" : "收起"}</span>
    </button>
  `;
}

function renderGroupBand(group, collapsed) {
  const prefix = group.key;
  const groupName = prefix === "ga" ? "A" : "B";
  const opening = group.rounds[0].matches;
  const upper = group.rounds[1].matches;
  const lower = group.rounds[2].matches;
  const decider = group.rounds[3].matches;

  const band = document.createElement("section");
  band.className = `bracket-band bracket-band-${group.key} group-band${collapsed ? " collapsed" : ""}`;
  band.innerHTML = `
    ${renderBandTitle(group, collapsed)}
    <div class="band-body">
      <div class="group-bracket">
        ${renderGroupPath({
          title: "上半区胜者路线",
          rounds: [
            { title: "上半区四分之一决赛", group: prefix, matches: opening.slice(0, 2) },
            { title: "上半决赛", group: prefix, matches: [upper[0]] },
          ],
          advanceTitle: "晋级",
          advanceLabel: `${groupName}1`,
          advanceTeam: result(upper[0].id, upper[0].a, upper[0].b).winner,
          pending: "等待上半决赛胜者",
        })}
        ${renderGroupPath({
          title: "下半区胜者路线",
          rounds: [
            { title: "下半区四分之一决赛", group: prefix, matches: opening.slice(2, 4) },
            { title: "下半决赛", group: prefix, matches: [upper[1]] },
          ],
          advanceTitle: "晋级",
          advanceLabel: `${groupName}2`,
          advanceTeam: result(upper[1].id, upper[1].a, upper[1].b).winner,
          pending: "等待下半决赛胜者",
        })}
        ${renderGroupPath({
          title: "上半区败者路线",
          rounds: [
            { title: "败者半决赛", group: prefix, matches: [lower[0]] },
            { title: "最终出线战", group: prefix, matches: [decider[0]] },
          ],
          advanceTitle: "晋级",
          advanceLabel: `${groupName}3`,
          advanceTeam: result(decider[0].id, decider[0].a, decider[0].b).winner,
          pending: "等待最终出线战胜者",
        })}
        ${renderGroupPath({
          title: "下半区败者路线",
          rounds: [
            { title: "败者半决赛", group: prefix, matches: [lower[1]] },
            { title: "最终出线战", group: prefix, matches: [decider[1]] },
          ],
          advanceTitle: "晋级",
          advanceLabel: `${groupName}4`,
          advanceTeam: result(decider[1].id, decider[1].a, decider[1].b).winner,
          pending: "等待最终出线战胜者",
        })}
      </div>
    </div>
  `;
  return band;
}

function renderGroupPath({ title, rounds, advanceTitle, advanceLabel, advanceTeam, pending }) {
  return `
    <section class="group-path" aria-label="${escapeAttr(title)}">
      <p class="group-path-title">${escapeHtml(title)}</p>
      <div class="bracket-lane group-lane">
        ${rounds.map(renderRound).join("")}
        ${renderAdvanceRound(advanceTitle, advanceLabel, advanceTeam, pending)}
      </div>
    </section>
  `;
}

function renderAdvanceRound(title, label, item, pending) {
  return `
    <section class="round advance-round" data-count="1">
      <div class="round-title">
        <h4>${escapeHtml(title)}</h4>
        <span>${escapeHtml(label)}</span>
      </div>
      <div class="round-matches">
        ${renderAdvanceSlot(item, pending)}
      </div>
    </section>
  `;
}

function renderAdvanceSlot(item, pending) {
  return `
    <article class="match advance-match">
      <div class="match-meta">
        <span>晋级名额</span>
        <span>Playoffs</span>
      </div>
      ${item ? `
        <div class="advance-team">
          ${renderLogo(item, "match-logo")}
          <span class="team-copy">
            <span class="team-name">${escapeHtml(item.name)}</span>
            <span class="team-seed">Group ${escapeHtml(item.group)} / ${seedLabel(item)}</span>
          </span>
        </div>
      ` : `<div class="pending">${escapeHtml(pending)}</div>`}
    </article>
  `;
}

function tabTitle(tab) {
  return {
    ga: "Group A",
    gb: "Group B",
    playoffs: "季后赛",
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
          <span class="team-seed">Group ${escapeHtml(item.group)} / ${seedLabel(item)}</span>
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
    if (!lane.classList.contains("playoff-lane") && !lane.classList.contains("group-lane")) return;

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
  renderSeedPanelState();
  saveState();
}

function renderSeedPanelState() {
  seedsPanel.classList.toggle("collapsed", seedEditorCollapsed);
  toggleSeeds.textContent = seedEditorCollapsed ? "展开编辑" : "收起编辑";
  toggleSeeds.setAttribute("aria-expanded", String(!seedEditorCollapsed));
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
  const toggle = event.target.closest("[data-toggle-band]");
  if (toggle) {
    const key = toggle.dataset.toggleBand;
    if (collapsedBands.has(key)) {
      collapsedBands.delete(key);
    } else {
      collapsedBands.add(key);
    }
    renderBracket();
    return;
  }

  const teamButton = event.target.closest("[data-match][data-team]");
  if (teamButton) {
    const { match, team: teamId } = teamButton.dataset;
    state.picks[match] = state.picks[match] === teamId ? null : teamId;
    if (!state.picks[match]) delete state.picks[match];
    render();
    return;
  }

  const tab = event.target.closest(".tab");
  if (tab?.dataset.tab) {
    activeTab = tab.dataset.tab;
    document.querySelectorAll("[data-tab]").forEach((item) => item.classList.toggle("active", item === tab));
    renderBracket();
    return;
  }

  const view = event.target.closest("[data-view]");
  if (view) {
    viewMode = view.dataset.view;
    document.querySelectorAll("[data-view]").forEach((item) => item.classList.toggle("active", item === view));
    renderBracket();
    return;
  }

  if (event.target.id === "toggleSeeds") {
    seedEditorCollapsed = !seedEditorCollapsed;
    renderSeedPanelState();
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
