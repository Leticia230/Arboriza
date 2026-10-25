
import { plants, missions } from "./plants.js";
import { integration } from "./integration.js";

const $ = (selector) => document.querySelector(selector);

const elements = {
  points: $("#points"),
  environment: $("#environment"),
  sunlight: $("#sunlight"),
  ventilation: $("#ventilation"),
  goal: $("#goal"),
  saveSetup: $("#saveSetup"),
  setupFeedback: $("#setupFeedback"),
  garden: $("#garden"),
  placedPlants: $("#placedPlants"),
  gardenHint: $("#gardenHint"),
  plantCount: $("#plantCount"),
  plantList: $("#plantList"),
  removeSelected: $("#removeSelected"),
  selectionStatus: $("#selectionStatus"),
  missions: $("#missions"),
  temperature: $("#temperature"),
  tempValue: $("#tempValue"),
  humidity: $("#humidity"),
  humidityValue: $("#humidityValue"),
  labResults: $("#labResults"),
  conversation: $("#conversation"),
  conversationActions: $("#conversationActions"),
  plantDialog: $("#plantDialog"),
  dialogContent: $("#dialogContent"),
  closeDialog: $("#closeDialog"),
  acceptPlant: $("#acceptPlant"),
  resetButton: $("#resetButton"),
  targetTemperature: $("#targetTemperature"),
  plannerPrompt: $("#plannerPrompt"),
  plannerSubmit: $("#plannerSubmit")
};

const defaultState = () => ({
  points: 0,
  environment: "sala",
  sunlight: "indireta",
  ventilation: "media",
  goal: "facil",
  temperature: 26,
  targetTemperature: 24,
  humidity: 50,
  accepted: [],
  placed: [],
  completedMissions: [],
  discovered: [],
  setupSaved: false,
  labUsed: false
});

let state = defaultState();
let activePlantId = null;
let selectedPlacedId = null;
let nextPlacedId = 1;
let dragData = null;
let saveQueue = Promise.resolve();

const plantPhotos = {
  jiboia: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=900&q=85",
  espada: "https://images.unsplash.com/photo-1593482892290-f54927ae2b1b?auto=format&fit=crop&w=900&q=85",
  zamioculca: "https://images.unsplash.com/photo-1632207691143-643e2a9a9361?auto=format&fit=crop&w=900&q=85",
  clorofito: "https://images.unsplash.com/photo-1572688484438-313a6e50c333?auto=format&fit=crop&w=900&q=85",
  peperomia: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=900&q=85",
  samambaia: "https://images.unsplash.com/photo-1597055181300-e3633a917c4b?auto=format&fit=crop&w=900&q=85",
  lavanda: "https://images.unsplash.com/photo-1499002238440-d264edd596ec?auto=format&fit=crop&w=900&q=85",
  manjericao: "https://images.unsplash.com/photo-1618164436241-4473940d1f5c?auto=format&fit=crop&w=900&q=85",
  maranta: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?auto=format&fit=crop&w=900&q=85",
  aloe: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=900&q=85"
};

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;",
    '"': "&quot;", "'": "&#39;"
  })[character]);
}

function getPlant(id) {
  return plants.find((plant) => plant.id === id);
}

function announce(message) {
  if (elements.selectionStatus) elements.selectionStatus.textContent = message;
}

function saveState() {
  const snapshot = JSON.parse(JSON.stringify(state));
  saveQueue = saveQueue
    .then(() => integration.saveState(snapshot))
    .catch((error) => console.error("Falha ao salvar:", error));
  return saveQueue;
}

function updatePoints() {
  if (elements.points) elements.points.textContent = state.points;
}

function installVisualPolish() {
  if (document.querySelector("#verdequest-visual-polish")) return;

  const style = document.createElement("style");
  style.id = "verdequest-visual-polish";
  style.textContent = `
    .plant-catalog-grid {
      display:grid;
      grid-template-columns:repeat(auto-fit,minmax(min(100%,270px),1fr));
      gap:20px;
      align-items:stretch;
    }
    .plant-card {
      overflow:hidden;
      border:1px solid rgba(58,87,57,.15);
      border-radius:22px;
      background:#fffdf7;
      box-shadow:0 9px 28px rgba(36,56,34,.08);
      transition:transform .2s ease,box-shadow .2s ease;
      min-width:0;
    }
    .plant-card:hover {
      transform:translateY(-4px);
      box-shadow:0 15px 34px rgba(36,56,34,.14);
    }
    .plant-photo {
      position:relative;
      height:220px;
      overflow:hidden;
      background:linear-gradient(135deg,#dfe9d4,#f3e9d6);
    }
    .plant-photo img {
      width:100%;height:100%;display:block;object-fit:cover;
      transition:transform .35s ease;
    }
    .plant-card:hover .plant-photo img {transform:scale(1.045)}
    .plant-photo::after {
      content:"";position:absolute;inset:45% 0 0;
      background:linear-gradient(transparent,rgba(20,38,24,.5));
      pointer-events:none;
    }
    .plant-photo-label {
      position:absolute;z-index:1;bottom:13px;left:15px;
      color:white;font-size:.78rem;font-weight:700;
      letter-spacing:.08em;text-transform:uppercase;
    }
    .plant-card-body {padding:18px}
    .plant-card-topline {
      display:flex;align-items:center;justify-content:space-between;
      gap:8px;flex-wrap:wrap;margin-bottom:8px;
    }
    .plant-pill {
      display:inline-flex;align-items:center;border-radius:999px;
      padding:6px 10px;font-size:.74rem;font-weight:700;
      background:#e7efdf;color:#35563b;
    }
    .plant-pill.accepted {background:#d9f2df;color:#24663b}
    .plant-card h3 {font-size:1.25rem;line-height:1.2;margin:5px 0}
    .plant-card .scientific {
      display:block;color:#7a8174;font-size:.85rem;font-style:italic;
      margin-bottom:10px;
    }
    .plant-tagline {line-height:1.5;color:#4f594d;margin:8px 0 15px}
    .plant-stats {
      display:grid;grid-template-columns:repeat(2,minmax(0,1fr));
      gap:9px;margin:15px 0;
    }
    .plant-stat {
      padding:11px;border-radius:13px;background:#f2f4ec;min-width:0;
    }
    .plant-stat span {
      display:block;font-size:.72rem;color:#707969;margin-bottom:4px;
    }
    .plant-stat strong {
      display:block;font-size:.88rem;line-height:1.35;color:#293d2b;
      overflow-wrap:anywhere;
    }
    .plant-card-actions {display:grid;gap:8px;margin-top:14px}
    .plant-card-actions .button {width:100%}
    .botanical-dialog-hero {
      display:grid;grid-template-columns:140px minmax(0,1fr);
      gap:20px;align-items:center;margin-bottom:20px;
    }
    .botanical-dialog-hero img {
      width:140px;height:170px;object-fit:cover;border-radius:18px;
    }
    .botanical-info-grid {
      display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));
      gap:12px;margin:14px 0;
    }
    .botanical-info {
      padding:15px;border-radius:15px;background:#f3f5ee;
    }
    .botanical-info h3 {margin:0 0 8px;font-size:1rem}
    .botanical-info p {margin:5px 0;line-height:1.5}
    .lab-dashboard {
      display:grid;gap:16px;margin-top:16px;
    }
    .lab-metric-grid {
      display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;
    }
    .lab-metric {
      padding:15px;border-radius:16px;background:#f2f4ec;min-width:0;
    }
    .lab-metric span {display:block;font-size:.77rem;color:#66705f}
    .lab-metric strong {display:block;font-size:1.4rem;margin:7px 0;color:#29432d}
    .lab-meter {
      position:relative;height:24px;border-radius:999px;
      background:linear-gradient(90deg,#c5dfed,#dce8c5,#f1d4a6);
      margin:24px 0 8px;
    }
    .lab-meter-marker {
      position:absolute;top:-7px;width:3px;height:38px;
      background:#27372b;border-radius:3px;transform:translateX(-50%);
    }
    .lab-meter-marker::before {
      content:attr(data-label);position:absolute;bottom:42px;left:50%;
      transform:translateX(-50%);font-size:.72rem;font-weight:800;
      white-space:nowrap;background:#fff;padding:4px 7px;border-radius:7px;
      box-shadow:0 2px 8px #0001;
    }
    .lab-legend {display:flex;flex-wrap:wrap;gap:10px;font-size:.8rem}
    .lab-legend span {display:flex;align-items:center;gap:6px}
    .lab-dot {width:9px;height:9px;border-radius:50%;background:#27372b}
    .lab-dot.target {background:#648c48}
    .lab-dot.final {background:#d18c43}
    .lab-note {font-size:.85rem;color:#626b5e;line-height:1.55}
    .planner-panel {
      padding:18px;border:1px solid #dfe5d7;border-radius:18px;
      background:#fffdf7;margin-bottom:18px;
    }
    .planner-panel textarea {
      box-sizing:border-box;width:100%;min-height:100px;resize:vertical;
      padding:13px;border:1px solid #cfd8c8;border-radius:12px;
      font:inherit;background:white;color:#263a29;
    }
    .planner-priorities {
      display:flex;gap:8px;flex-wrap:wrap;margin:12px 0 16px;
    }
    .planner-priority {
      display:flex;align-items:center;gap:7px;padding:9px 11px;
      border:1px solid #d7dfd0;border-radius:999px;background:#f5f7f1;
      font-size:.86rem;
    }
    .planner-results {display:grid;gap:10px;margin-top:14px}
    .planner-result {
      padding:14px;border-radius:14px;background:#edf3e7;
      display:flex;justify-content:space-between;gap:14px;align-items:center;
    }
    .planner-result p {margin:5px 0 0;color:#5c6758;line-height:1.45}
    @media(max-width:520px) {
      .plant-photo {height:190px}
      .botanical-dialog-hero {grid-template-columns:1fr}
      .botanical-dialog-hero img {width:100%;height:210px}
      .lab-metric-grid {grid-template-columns:1fr}
      .lab-metric strong {font-size:1.25rem}
    }
  `;
  document.head.appendChild(style);
}

function plantPhoto(plant) {
  return plantPhotos[plant.id] || plantPhotos.jiboia;
}

function careSummary(plant, field, fallback) {
  return plant[field] || fallback;
}

function renderPlantList() {
  if (!elements.plantList) return;
  elements.plantList.classList.add("plant-catalog-grid");

  elements.plantList.innerHTML = plants.map((plant) => {
    const accepted = state.accepted.includes(plant.id);
    const placed = state.placed.some((item) => item.plantId === plant.id);
    const light = Array.isArray(plant.light) ? plant.light.join(" / ") : plant.habitat;
    const photo = plantPhoto(plant);

    return `
      <article class="plant-card">
        <div class="plant-photo">
          <img src="${photo}" alt="Fotografia botânica de ${escapeHTML(plant.name)}"
            loading="lazy" onerror="this.style.display='none'">
          <span class="plant-photo-label">Guia botânico · VerdeQuest</span>
        </div>
        <div class="plant-card-body">
          <div class="plant-card-topline">
            <span class="plant-pill">${escapeHTML(plant.care || "Cuidados especiais")}</span>
            ${accepted ? '<span class="plant-pill accepted">✓ Na coleção</span>' : ""}
          </div>
          <h3>${escapeHTML(plant.name)}</h3>
          <span class="scientific">${escapeHTML(plant.scientific)}</span>
          <p class="plant-tagline">${escapeHTML(plant.tagline || plant.intro || "")}</p>
          <div class="plant-stats">
            <div class="plant-stat"><span>☀️ ILUMINAÇÃO</span><strong>${escapeHTML(light || "Ver descrição")}</strong></div>
            <div class="plant-stat"><span>💧 REGA</span><strong>${escapeHTML(plant.water || "Ver descrição")}</strong></div>
            <div class="plant-stat"><span>🌫️ UMIDADE</span><strong>${escapeHTML(plant.humidity || "Ver descrição")}</strong></div>
            <div class="plant-stat"><span>🌡️ TEMPERATURA</span><strong>${escapeHTML(plant.temperature || "Ver descrição")}</strong></div>
          </div>
          <div class="plant-card-actions">
            <button class="button button-light" type="button"
              data-action="know" data-plant="${plant.id}">
              Explorar espécie
            </button>
            ${accepted ? `
              <button class="button button-primary" type="button"
                data-action="place" data-plant="${plant.id}"
                ${placed ? "disabled" : ""}>
                ${placed ? "Já está no cenário" : "Adicionar ao jardim"}
              </button>` : ""}
          </div>
        </div>
      </article>`;
  }).join("");
}

function updatePlant3DVisibility() {
  const fern = elements.garden?.threePlants?.samambaia;
  if (!fern) return;
  fern.visible = state.placed.some((item) => item.plantId === "samambaia");
}

function renderGarden() {
  if (!elements.placedPlants || !elements.garden) return;
  elements.placedPlants.innerHTML = "";

  state.placed.forEach((placed) => {
    const plant = getPlant(placed.plantId);
    if (!plant || placed.plantId === "samambaia") return;

    const button = document.createElement("button");
    button.type = "button";
    button.className = "placed-plant";
    button.dataset.placedId = placed.id;
    button.style.left = `${placed.x}%`;
    button.style.top = `${placed.y}%`;
    button.setAttribute("aria-label", `${plant.name}. Selecione para conversar ou arraste para mover.`);
    if (placed.id === selectedPlacedId) button.classList.add("selected");

    button.innerHTML = `
      <span class="plant-face">${escapeHTML(plant.emoji || "🌿")}</span>
      <span class="plant-name">${escapeHTML(plant.name)}</span>`;
    elements.placedPlants.appendChild(button);
  });

  elements.gardenHint?.classList.toggle("hidden", state.placed.length > 0);
  if (elements.plantCount) {
    elements.plantCount.textContent =
      `${state.placed.length} ${state.placed.length === 1 ? "planta" : "plantas"} no ambiente`;
  }

  const selected = state.placed.find((item) => item.id === selectedPlacedId);
  announce(selected
    ? `${getPlant(selected.plantId)?.name || "Planta"} selecionada. Clique para conversar ou arraste para mover.`
    : "Nenhuma planta selecionada.");

  updateEnvironmentClass();
  renderLab();
  updatePlant3DVisibility();
}

function updateEnvironmentClass() {
  if (!elements.garden) return;
  elements.garden.classList.remove("garden-sala", "garden-varanda", "garden-quintal", "garden-patio");
  elements.garden.classList.add(`garden-${state.environment}`);
}

function showConversation(emoji, message, actions = []) {
  if (!elements.conversation || !elements.conversationActions) return;
  elements.conversation.innerHTML = `
    <span class="conversation-avatar">${escapeHTML(emoji)}</span>
    <p>${escapeHTML(message)}</p>`;
  elements.conversationActions.innerHTML = actions.map((action) => `
    <button class="button button-light" type="button"
      data-question="${escapeHTML(action.question)}" data-plant="${escapeHTML(action.plantId)}">
      ${escapeHTML(action.label)}
    </button>`).join("");
}

function getCompatibility(plant) {
  const compatible = Array.isArray(plant.light) && plant.light.includes(state.sunlight);
  return compatible
    ? {
        title: "Boa combinação de luz",
        message: `${plant.name} pode combinar com essa iluminação, desde que os outros cuidados também sejam adequados.`
      }
    : {
        title: "Confira o local",
        message: `${plant.name} pode preferir outra condição de luz. Compare a descrição da espécie com a iluminação real do ambiente.`
      };
}

function openPlantDialog(plantId) {
  const plant = getPlant(plantId);
  if (!plant) return;

  activePlantId = plantId;
  state.discovered = [...new Set([...state.discovered, plantId])];
  const compatibility = getCompatibility(plant);
  const accepted = state.accepted.includes(plant.id);

  elements.dialogContent.innerHTML = `
    <div class="botanical-dialog-hero">
      <img src="${plantPhoto(plant)}" alt="Fotografia de ${escapeHTML(plant.name)}"
        onerror="this.style.display='none'">
      <div>
        <span class="plant-pill">Perfil botânico</span>
        <h2>${escapeHTML(plant.name)}</h2>
        <span class="scientific">${escapeHTML(plant.scientific)}</span>
        <p><strong>${escapeHTML(plant.personality || plant.tagline || "")}</strong></p>
        <p>${escapeHTML(plant.intro || "")}</p>
      </div>
    </div>
    <div class="botanical-info-grid">
      <section class="botanical-info"><h3>✨ Habilidade</h3><p>${escapeHTML(plant.ability || "Descubra como essa espécie contribui para seu jardim.")}</p></section>
      <section class="botanical-info"><h3>🎯 Missão</h3><p>${escapeHTML(plant.mission || "Observe suas necessidades e encontre o lugar ideal.")}</p></section>
      <section class="botanical-info"><h3>☀️ Iluminação</h3><p>${escapeHTML(plant.habitat || (plant.light || []).join(", ") || "Consulte a espécie.")}</p><p><strong>${escapeHTML(compatibility.title)}</strong></p><p>${escapeHTML(compatibility.message)}</p></section>
      <section class="botanical-info"><h3>💧 Rega</h3><p>${escapeHTML(plant.water || "Consulte as necessidades da espécie.")}</p></section>
      <section class="botanical-info"><h3>🌫️ Umidade</h3><p>${escapeHTML(plant.humidity || "Acompanhe as condições do ambiente.")}</p></section>
      <section class="botanical-info"><h3>🌡️ Temperatura</h3><p>${escapeHTML(plant.temperature || "Evite mudanças bruscas de temperatura.")}</p></section>
      <section class="botanical-info"><h3>🪴 Dificuldade</h3><p>${escapeHTML(plant.care || "Observe a planta e ajuste os cuidados.")}</p></section>
      <section class="botanical-info"><h3>⚠️ Limites e segurança</h3><p>${escapeHTML(plant.limitation || "Respeite as necessidades da espécie.")}</p><p>${escapeHTML(plant.toxicity || "Confira a segurança antes de manter perto de crianças ou animais.")}</p></section>
    </div>`;

  elements.acceptPlant.textContent = accepted ? "Já faz parte da coleção" : "Aceitar como parceira";
  elements.acceptPlant.disabled = accepted;
  if (!elements.plantDialog.open) elements.plantDialog.showModal();

  renderPlantList();
  renderMissions();
  saveState();
  checkMissions();
}

function acceptActivePlant() {
  if (!activePlantId || state.accepted.includes(activePlantId)) return;
  const plant = getPlant(activePlantId);
  if (!plant) return;

  state.accepted.push(plant.id);
  state.points += 10;
  elements.acceptPlant.textContent = "Aceita! +10 pontos";
  elements.acceptPlant.disabled = true;

  renderPlantList();
  updatePoints();
  saveState();
  checkMissions();

  showConversation(plant.emoji || "🌿", `${plant.greeting || `Olá! Sou ${plant.name}.`} Obrigado por me aceitar como parceira!`, [
    { label: "Luz", question: "luz", plantId: plant.id },
    { label: "Rega", question: "agua", plantId: plant.id },
    { label: "Umidade", question: "umidade", plantId: plant.id },
    { label: "Segurança para pets", question: "pets", plantId: plant.id }
  ]);
}

function placePlant(plantId, x, y) {
  if (!state.accepted.includes(plantId)) {
    openPlantDialog(plantId);
    return;
  }

  const plant = getPlant(plantId);
  if (!plant) return;

  const existing = state.placed.find((item) => item.plantId === plantId);
  if (existing) {
    selectedPlacedId = existing.id;
    renderGarden();
    showPlantConversation(existing.id);
    return;
  }

  const placed = {
    id: `placed-${nextPlacedId++}`,
    plantId,
    x: Math.max(2, Math.min(83, x ?? 48)),
    y: Math.max(30, Math.min(65, y ?? 48))
  };

  state.placed.push(placed);
  selectedPlacedId = placed.id;
  renderGarden();
  renderPlantList();
  saveState();
  checkMissions();
  showPlantConversation(placed.id);
}

function showPlantConversation(placedId) {
  const placed = state.placed.find((item) => item.id === placedId);
  if (!placed) return;
  const plant = getPlant(placed.plantId);
  if (!plant) return;
  const compatibility = getCompatibility(plant);

  showConversation(plant.emoji || "🌿", `${plant.greeting || `Olá, sou ${plant.name}.`} ${compatibility.message}`, [
    { label: "Luz ☀️", question: "luz", plantId: plant.id },
    { label: "Rega 💧", question: "agua", plantId: plant.id },
    { label: "Umidade 🌫️", question: "umidade", plantId: plant.id },
    { label: "Pets 🐾", question: "pets", plantId: plant.id }
  ]);
}

function answerPlantQuestion(plantId, question) {
  const plant = getPlant(plantId);
  if (!plant) return;
  const answer = question === "missao"
    ? plant.mission
    : plant.questions?.[question] || "Observe a planta e ajuste os cuidados de acordo com o ambiente.";

  showConversation(plant.emoji || "🌿", `${plant.name}: ${answer}`, [
    { label: "Minha missão 🎯", question: "missao", plantId: plant.id },
    { label: "Minha luz ☀️", question: "luz", plantId: plant.id },
    { label: "Minha rega 💧", question: "agua", plantId: plant.id },
    { label: "Segurança 🐾", question: "pets", plantId: plant.id }
  ]);
}

function estimateFinalTemperature(initial, target, count) {
  // Estimativa ilustrativa, deliberadamente limitada a uma variação pequena.
  // Não representa uma previsão física validada nem uma medição real.
  const influence = Math.min(count * 0.25, 1.5);
  const direction = initial > target ? -1 : initial < target ? 1 : 0;
  const estimate = initial + direction * influence;
  return Math.max(15, Math.min(40, Number(estimate.toFixed(1))));
}

function renderLab() {
  if (!elements.temperature || !elements.humidity || !elements.labResults) return;

  const initial = Number(state.temperature);
  const target = Number(state.targetTemperature);
  const humidity = Number(state.humidity);
  const count = state.placed.length;
  const finalTemp = estimateFinalTemperature(initial, target, count);
  const min = 15;
  const max = 40;
  const position = (value) => Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));

  if (elements.tempValue) elements.tempValue.textContent = `${initial} °C`;
  if (elements.humidityValue) elements.humidityValue.textContent = `${humidity}%`;

  const species = [...new Set(state.placed.map((item) => getPlant(item.plantId)?.name).filter(Boolean))];
  const speciesText = species.length ? species.map(escapeHTML).join(", ") : "Nenhuma espécie posicionada";

  elements.labResults.innerHTML = `
    <div class="lab-dashboard">
      <p class="lab-note">SIMULAÇÃO EDUCATIVA · Os valores abaixo são estimativas ilustrativas, não medições reais. O efeito de plantas na temperatura depende de fatores como ventilação, insolação, tamanho do espaço e quantidade de folhas.</p>
      <div class="lab-metric-grid">
        <div class="lab-metric"><span>🌡️ Temperatura inicial</span><strong>${initial} °C</strong><small>Ambiente sem efeito estimado das plantas</small></div>
        <div class="lab-metric"><span>🎯 Temperatura desejada</span><strong>${target} °C</strong><small>Meta configurada por você</small></div>
        <div class="lab-metric"><span>🌿 Temperatura final estimada</span><strong>${finalTemp} °C</strong><small>Estimativa simples para ${count} ${count === 1 ? "planta" : "plantas"}</small></div>
      </div>
      <section>
        <h3>Comparativo de temperatura</h3>
        <div class="lab-meter" role="img" aria-label="Temperatura inicial ${initial} graus, meta ${target} graus, estimativa final ${finalTemp} graus">
          <span class="lab-meter-marker" style="left:${position(initial)}%" data-label="Inicial ${initial}°"></span>
          <span class="lab-meter-marker" style="left:${position(target)}%" data-label="Meta ${target}°"></span>
          <span class="lab-meter-marker" style="left:${position(finalTemp)}%" data-label="Estimada ${finalTemp}°"></span>
        </div>
        <div class="lab-legend">
          <span><i class="lab-dot"></i> Inicial</span>
          <span><i class="lab-dot target"></i> Meta</span>
          <span><i class="lab-dot final"></i> Estimativa final</span>
        </div>
        <p class="lab-note">Escala ilustrativa de ${min} °C a ${max} °C. A fórmula usada considera uma influência máxima arbitrária de 1,5 °C; não deve ser usada para dimensionar climatização ou prever o comportamento de um cômodo real.</p>
      </section>
      <div class="botanical-info">
        <h3>🌱 Plantas consideradas</h3>
        <p><strong>Quantidade no cenário:</strong> ${count}</p>
        <p><strong>Espécies posicionadas:</strong> ${speciesText}</p>
        <p><strong>Umidade configurada:</strong> ${humidity}%</p>
        <p><strong>Ventilação:</strong> ${escapeHTML(({baixa:"baixa",media:"moderada",alta:"alta"})[state.ventilation] || state.ventilation)}</p>
      </div>
    </div>`;

  if (elements.targetTemperature) elements.targetTemperature.value = target;
}

function syncSetupInputs() {
  if (elements.environment) elements.environment.value = state.environment;
  if (elements.sunlight) elements.sunlight.value = state.sunlight;
  if (elements.ventilation) elements.ventilation.value = state.ventilation;
  if (elements.goal) elements.goal.value = state.goal;
  if (elements.temperature) elements.temperature.value = state.temperature;
  if (elements.targetTemperature) elements.targetTemperature.value = state.targetTemperature;
  if (elements.humidity) elements.humidity.value = state.humidity;
  updateEnvironmentClass();
  renderLab();
}

function saveSetup() {
  state.environment = elements.environment.value;
  state.sunlight = elements.sunlight.value;
  state.ventilation = elements.ventilation.value;
  state.goal = elements.goal.value;
  state.setupSaved = true;

  if (elements.setupFeedback) {
    elements.setupFeedback.textContent = "Ambiente salvo! Agora vamos encontrar plantas compatíveis com seu espaço.";
  }

  renderGarden();
  saveState();
  checkMissions();

  const recommendations = plants.filter((plant) =>
    Array.isArray(plant.light) && plant.light.includes(state.sunlight)
  );
  showConversation("🌿", recommendations.length
    ? `Para essa condição de luz, explore ${recommendations.slice(0, 3).map((plant) => plant.name).join(", ")}. Considere também ventilação, espaço e rega.`
    : "Vamos revisar as condições do ambiente antes de escolher as plantas.");
}

function removeSelectedPlant() {
  if (!selectedPlacedId) {
    announce("Selecione uma planta no cenário antes de retirá-la.");
    return;
  }
  const placed = state.placed.find((item) => item.id === selectedPlacedId);
  if (!placed) return;

  const plant = getPlant(placed.plantId);
  state.placed = state.placed.filter((item) => item.id !== selectedPlacedId);
  selectedPlacedId = null;
  renderGarden();
  renderPlantList();
  saveState();

  showConversation(plant?.emoji || "🌱",
    `${plant?.name || "A planta"} voltou para sua coleção. Você pode colocá-la novamente quando quiser.`);
}

function renderMissions() {
  if (!elements.missions) return;
  elements.missions.innerHTML = missions.map((mission) => {
    const completed = state.completedMissions.includes(mission.id);
    return `
      <article class="mission-card ${completed ? "completed" : ""}">
        <div class="mission-symbol">${escapeHTML(mission.emoji || "🌱")}</div>
        <h3>${escapeHTML(mission.title)}</h3>
        <p>${escapeHTML(mission.description)}</p>
        <div class="mission-reward">${completed ? "✓ Concluída" : `✦ ${mission.reward} pontos`}</div>
      </article>`;
  }).join("");
}

function awardMission(mission) {
  if (state.completedMissions.includes(mission.id)) return;
  state.completedMissions.push(mission.id);
  state.points += mission.reward;
  updatePoints();
  renderMissions();
  showConversation("🏆", `Missão concluída: ${mission.title}! Você ganhou ${mission.reward} pontos.`);
  saveState();
}

function checkMissions() {
  for (const mission of missions) {
    if (state.completedMissions.includes(mission.id)) continue;
    let complete = false;

    switch (mission.type) {
      case "accepted": complete = state.accepted.length >= 1; break;
      case "placed": complete = state.placed.length >= 1; break;
      case "discover": complete = state.discovered.length >= 3; break;
      case "three-placed": complete = state.placed.length >= 3; break;
      case "setup": complete = state.setupSaved; break;
      case "lab": complete = state.labUsed; break;
    }
    if (complete) awardMission(mission);
  }
}

function ensurePlanner() {
  if (!elements.conversation) return;
  let panel = $("#plannerPanel");
  if (panel) return;

  panel = document.createElement("section");
  panel.id = "plannerPanel";
  panel.className = "planner-panel";
  panel.innerHTML = `
    <h3>🌿 Recados do jardim</h3>
    <p>O que você quer melhorar no seu ambiente? Conte com suas palavras e selecione as prioridades.</p>
    <label for="plannerFreeText">Seu objetivo</label>
    <textarea id="plannerFreeText" placeholder="Ex.: quero um cantinho mais fresco perto da janela, com plantas fáceis de cuidar e sem gastar muito."></textarea>
    <div class="planner-priorities">
      <label class="planner-priority"><input type="checkbox" name="plannerPriority" value="umidade"> Mais umidade</label>
      <label class="planner-priority"><input type="checkbox" name="plannerPriority" value="temperatura"> Temperatura</label>
      <label class="planner-priority"><input type="checkbox" name="plannerPriority" value="custo"> Baixo custo</label>
      <label class="planner-priority"><input type="checkbox" name="plannerPriority" value="facil"> Pouca manutenção</label>
      <label class="planner-priority"><input type="checkbox" name="plannerPriority" value="compatibilidade"> Compatibilidade</label>
    </div>
    <button class="button button-primary" id="plannerRun" type="button">Encontrar plantas para mim</button>
    <div class="planner-results" id="plannerResults" aria-live="polite"></div>`;
  elements.conversation.parentElement?.insertBefore(panel, elements.conversation);
  $("#plannerRun")?.addEventListener("click", runPlanner);
}

function runPlanner() {
  const prompt = ($("#plannerFreeText")?.value || "").trim();
  const priorities = [...document.querySelectorAll('input[name="plannerPriority"]:checked')]
    .map((input) => input.value);

  const ranked = plants.map((plant) => {
    let score = 0;
    const lightCompatible = Array.isArray(plant.light) && plant.light.includes(state.sunlight);
    if (priorities.includes("compatibilidade") && lightCompatible) score += 4;
    if (priorities.includes("facil") && /fácil|baixa|simples|resistente/i.test(`${plant.care} ${plant.tagline} ${plant.intro}`)) score += 3;
    if (priorities.includes("umidade") && /umidade|úmid|humid/i.test(`${plant.humidity} ${plant.ability} ${plant.intro}`)) score += 2;
    if (priorities.includes("temperatura") && /calor|temperatura|fresco|sombra/i.test(`${plant.temperature} ${plant.habitat} ${plant.intro}`)) score += 2;
    if (priorities.includes("custo") && /fácil|resistente|propaga|simples/i.test(`${plant.care} ${plant.intro} ${plant.ability}`)) score += 1;

    const text = `${plant.name} ${plant.tagline} ${plant.intro} ${plant.ability} ${plant.habitat} ${plant.mission}`.toLowerCase();
    const words = prompt.toLowerCase().split(/\s+/).filter((word) => word.length >= 4);
    for (const word of words) if (text.includes(word)) score += 2;

    return { plant, score, lightCompatible };
  }).sort((a, b) => b.score - a.score).slice(0, 3);

  const results = $("#plannerResults");
  if (!results) return;
  results.innerHTML = `
    <p><strong>Recomendações iniciais</strong> — compare os cuidados de cada espécie antes de comprar.</p>
    ${ranked.map(({ plant, score, lightCompatible }) => `
      <article class="planner-result">
        <div>
          <strong>${escapeHTML(plant.name)}</strong>
          <p>${escapeHTML(plant.tagline || plant.intro || "")}</p>
          <p>Compatibilidade de luz: ${lightCompatible ? "combina com a configuração atual" : "confira antes de escolher"} · Rega: ${escapeHTML(plant.water || "consulte o perfil")}</p>
        </div>
        <button class="button button-light" type="button" data-planner-plant="${plant.id}">Ver perfil</button>
      </article>`).join("")}
    <p class="lab-note">As sugestões são uma triagem simples baseada nas informações cadastradas, no texto informado e nas prioridades selecionadas; não são uma garantia de resultado ambiental.</p>`;

  results.querySelectorAll("[data-planner-plant]").forEach((button) => {
    button.addEventListener("click", () => openPlantDialog(button.dataset.plannerPlant));
  });
}

function handlePlantListClick(event) {
  const button = event.target.closest("button[data-action]");
  if (!button) return;
  if (button.dataset.action === "know") openPlantDialog(button.dataset.plant);
  if (button.dataset.action === "place") placePlant(button.dataset.plant);
}

function handleConversationClick(event) {
  const button = event.target.closest("button[data-question]");
  if (button) answerPlantQuestion(button.dataset.plant, button.dataset.question);
}

function handleGardenPointerDown(event) {
  const target = event.target.closest(".placed-plant");
  if (!target) return;
  const placedId = target.dataset.placedId;
  const placed = state.placed.find((item) => item.id === placedId);
  if (!placed) return;

  selectedPlacedId = placedId;
  dragData = {
    id: placedId, pointerId: event.pointerId,
    startX: event.clientX, startY: event.clientY,
    originalX: placed.x, originalY: placed.y, moved: false
  };
  renderGarden();
  const button = elements.placedPlants.querySelector(`[data-placed-id="${placedId}"]`);
  button?.setPointerCapture?.(event.pointerId);
}

function handleGardenPointerMove(event) {
  if (!dragData || event.pointerId !== dragData.pointerId) return;
  const rect = elements.garden.getBoundingClientRect();
  const dx = event.clientX - dragData.startX;
  const dy = event.clientY - dragData.startY;
  if (Math.abs(dx) + Math.abs(dy) > 4) dragData.moved = true;
  if (!dragData.moved) return;

  const placed = state.placed.find((item) => item.id === dragData.id);
  if (!placed) return;
  placed.x = Math.max(2, Math.min(83, dragData.originalX + (dx / rect.width) * 100));
  placed.y = Math.max(30, Math.min(65, dragData.originalY + (dy / rect.height) * 100));

  const button = elements.placedPlants.querySelector(`[data-placed-id="${dragData.id}"]`);
  if (button) {
    button.style.left = `${placed.x}%`;
    button.style.top = `${placed.y}%`;
  }
}

function handleGardenPointerUp(event) {
  if (!dragData || event.pointerId !== dragData.pointerId) return;
  const moved = dragData.moved;
  const id = dragData.id;
  dragData = null;

  if (moved) {
    renderGarden();
    saveState();
  } else {
    selectedPlacedId = id;
    renderGarden();
    showPlantConversation(id);
  }
}

function normalizeLoadedState(saved) {
  if (!saved || typeof saved !== "object") return defaultState();
  const fresh = defaultState();

  return {
    ...fresh,
    ...saved,
    accepted: Array.isArray(saved.accepted) ? saved.accepted.filter((id) => Boolean(getPlant(id))) : [],
    placed: Array.isArray(saved.placed)
      ? saved.placed.filter((item) => item && getPlant(item.plantId) && typeof item.id === "string")
        .map((item) => ({
          id: item.id,
          plantId: item.plantId,
          x: Math.max(2, Math.min(83, Number(item.x) || 48)),
          y: Math.max(30, Math.min(65, Number(item.y) || 48))
        }))
      : [],
    completedMissions: Array.isArray(saved.completedMissions)
      ? saved.completedMissions.filter((id) => missions.some((mission) => mission.id === id))
      : [],
    discovered: Array.isArray(saved.discovered) ? saved.discovered.filter((id) => Boolean(getPlant(id))) : [],
    points: Math.max(0, Number(saved.points) || 0),
    temperature: Math.max(15, Math.min(40, Number(saved.temperature) || 26)),
    targetTemperature: Math.max(15, Math.min(40, Number(saved.targetTemperature) || 24)),
    humidity: Math.max(20, Math.min(90, Number(saved.humidity) || 50))
  };
}

function bindEvents() {
  elements.plantList?.addEventListener("click", handlePlantListClick);
  elements.conversationActions?.addEventListener("click", handleConversationClick);
  elements.saveSetup?.addEventListener("click", saveSetup);
  elements.acceptPlant?.addEventListener("click", acceptActivePlant);
  elements.closeDialog?.addEventListener("click", () => elements.plantDialog.close());
  elements.removeSelected?.addEventListener("click", removeSelectedPlant);

  elements.temperature?.addEventListener("input", () => {
    state.temperature = Number(elements.temperature.value);
    state.labUsed = true;
    renderLab();
    saveState();
    checkMissions();
  });

  elements.targetTemperature?.addEventListener("input", () => {
    state.targetTemperature = Number(elements.targetTemperature.value);
    state.labUsed = true;
    renderLab();
    saveState();
    checkMissions();
  });

  elements.humidity?.addEventListener("input", () => {
    state.humidity = Number(elements.humidity.value);
    state.labUsed = true;
    renderLab();
    saveState();
    checkMissions();
  });

  elements.environment?.addEventListener("change", () => {
    state.environment = elements.environment.value;
    updateEnvironmentClass();
    saveState();
  });

  elements.sunlight?.addEventListener("change", () => {
    state.sunlight = elements.sunlight.value;
    saveState();
  });

  elements.ventilation?.addEventListener("change", () => {
    state.ventilation = elements.ventilation.value;
    renderLab();
    saveState();
  });

  elements.garden?.addEventListener("pointerdown", handleGardenPointerDown);
  elements.garden?.addEventListener("pointermove", handleGardenPointerMove);
  elements.garden?.addEventListener("pointerup", handleGardenPointerUp);
  elements.garden?.addEventListener("pointercancel", handleGardenPointerUp);

  elements.garden?.addEventListener("click", (event) => {
    if (event.target.closest(".placed-plant")) return;
    if (event.target.closest(".floor, .window, .wall-picture, .shelf")) return;
    if (!activePlantId || !state.accepted.includes(activePlantId)) return;

    const rect = elements.garden.getBoundingClientRect();
    placePlant(
      activePlantId,
      ((event.clientX - rect.left) / rect.width) * 100,
      ((event.clientY - rect.top) / rect.height) * 100
    );
  });

  elements.resetButton?.addEventListener("click", async () => {
    const confirmed = window.confirm("Tem certeza de que deseja reiniciar o VerdeQuest e apagar o progresso salvo neste navegador?");
    if (!confirmed) return;

    await integration.clearState();
    state = defaultState();
    activePlantId = null;
    selectedPlacedId = null;
    nextPlacedId = 1;

    syncSetupInputs();
    renderPlantList();
    renderGarden();
    renderMissions();
    updatePoints();
    showConversation("🌱", "Seu jardim foi reiniciado. Vamos começar uma nova aventura!");
    if (elements.setupFeedback) elements.setupFeedback.textContent = "";
    saveState();
  });
}

async function init() {
  installVisualPolish();

  try {
    state = normalizeLoadedState(await integration.loadState());
  } catch (error) {
    console.warn("Iniciando sem progresso anterior:", error);
    state = defaultState();
  }

  nextPlacedId = state.placed.reduce((max, item) => {
    const number = Number(item.id.replace("placed-", ""));
    return Number.isFinite(number) ? Math.max(max, number + 1) : max;
  }, 1);

  bindEvents();
  ensurePlanner();
  syncSetupInputs();
  renderPlantList();
  renderGarden();
  renderMissions();
  updatePoints();

  showConversation("🌱", "Olá, explorador! Conheça as espécies, aceite missões e monte seu cantinho verde.");
  checkMissions();
}

init();
