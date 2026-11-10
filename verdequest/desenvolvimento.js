import { obterTarefas, tarefaPrevista, tarefaConcluida } from "./tarefas.js";

function dataLocal(date = new Date()) {
  const ano = date.getFullYear();
  const mes = String(date.getMonth() + 1).padStart(2, "0");
  const dia = String(date.getDate()).padStart(2, "0");
  return `${ano}-${mes}-${dia}`;
}

function converterData(valor) {
  if (!valor) return null;

  if (valor instanceof Date) {
    return Number.isNaN(valor.getTime()) ? null : valor;
  }

  const texto = String(valor);

  if (/^\d{4}-\d{2}-\d{2}$/.test(texto)) {
    const [ano, mes, dia] = texto.split("-").map(Number);
    const data = new Date(ano, mes - 1, dia, 12);
    return Number.isNaN(data.getTime()) ? null : data;
  }

  const data = new Date(texto);
  return Number.isNaN(data.getTime()) ? null : data;
}

function diferencaEmDias(inicio, fim) {
  const a = new Date(inicio.getFullYear(), inicio.getMonth(), inicio.getDate());
  const b = new Date(fim.getFullYear(), fim.getMonth(), fim.getDate());

  return Math.max(0, Math.floor((b - a) / 86400000));
}

function contarOcorrencias(tarefas, hoje) {
  let previstas = 0;
  let concluidas = 0;

  for (const tarefa of tarefas) {
    const inicio = converterData(tarefa.dataInicio);
    if (!inicio) continue;

    const primeiroDia = new Date(
      inicio.getFullYear(),
      inicio.getMonth(),
      inicio.getDate(),
      12
    );

    const limite = new Date(
      hoje.getFullYear(),
      hoje.getMonth(),
      hoje.getDate(),
      12
    );

    if (primeiroDia > limite) continue;

    const diasDeBusca = Math.min(
      diferencaEmDias(primeiroDia, limite),
      3650
    );

    for (let deslocamento = 0; deslocamento <= diasDeBusca; deslocamento++) {
      const data = new Date(primeiroDia);
      data.setDate(data.getDate() + deslocamento);

      const chave = dataLocal(data);

      if (!tarefaPrevista(tarefa, chave)) continue;

      previstas++;

      if (tarefaConcluida(tarefa, chave)) {
        concluidas++;
      }
    }
  }

  return { previstas, concluidas };
}

function contarCuidadosRecentes(planta, hoje) {
  const limite = new Date(hoje);
  limite.setDate(limite.getDate() - 29);

  const registros = Array.isArray(planta?.cuidados)
    ? planta.cuidados
    : [];

  return registros.filter(registro => {
    const data = converterData(registro?.data);
    if (!data) return false;

    const dia = new Date(
      data.getFullYear(),
      data.getMonth(),
      data.getDate()
    );

    const inicio = new Date(
      limite.getFullYear(),
      limite.getMonth(),
      limite.getDate()
    );

    const fim = new Date(
      hoje.getFullYear(),
      hoje.getMonth(),
      hoje.getDate()
    );

    return dia >= inicio && dia <= fim;
  }).length;
}

export function obterDesenvolvimento(planta) {
  const hoje = new Date();
  const inicio = converterData(planta?.adicionadaEm) || hoje;
  const diasNoJardim = diferencaEmDias(inicio, hoje);

  let fase = "Fase inicial";
  let faseId = "semente";
  let descricaoFase = "Sua jornada começa com uma pequena semente.";

  if (diasNoJardim >= 60) {
    fase = "Desenvolvida";
    faseId = "desenvolvida";
    descricaoFase = "Sua planta chegou à fase adulta. Uma jornada construída com cuidado!";
  } else if (diasNoJardim >= 21) {
    fase = "Muda";
    faseId = "muda";
    descricaoFase = "As primeiras folhas estão ganhando forma. Continue cuidando!";
  } else if (diasNoJardim >= 7) {
    fase = "Broto";
    faseId = "broto";
    descricaoFase = "Um pequeno broto surgiu. Sua jornada está florescendo!";
  }

  const tarefas = obterTarefas(planta);
  const ocorrencias = contarOcorrencias(tarefas, hoje);

  const aproveitamento = ocorrencias.previstas
    ? Math.round(
        (ocorrencias.concluidas / ocorrencias.previstas) * 100
      )
    : 0;

  const cuidadosUltimos30Dias = contarCuidadosRecentes(planta, hoje);

  return {
    diasNoJardim,
    fase,
    faseId,
    descricaoFase,
    tarefasConcluidas: ocorrencias.concluidas,
    totalTarefas: ocorrencias.previstas,
    cuidadosUltimos30Dias,
    aproveitamento,

    dias: diasNoJardim,
    concluidas: ocorrencias.concluidas,
    totalPrevisto: ocorrencias.previstas,
    cuidadosRecentes: cuidadosUltimos30Dias
  };
}

export function obterEstadoVisual(planta, data = dataLocal()) {
  const tarefas = obterTarefas(planta);

  const pendentes = tarefas.filter(tarefa =>
    tarefaPrevista(tarefa, data) &&
    !tarefaConcluida(tarefa, data)
  );

  return {
    regaPendente: pendentes.some(tarefa => tarefa.tipo === "rega"),
    adubacaoPendente: pendentes.some(tarefa => tarefa.tipo === "adubacao"),
    podaPendente: pendentes.some(tarefa => tarefa.tipo === "poda"),
    limpezaPendente: pendentes.some(tarefa => tarefa.tipo === "limpeza"),
    totalPendentes: pendentes.length
  };
}

const estiloCultivo = `
.vq-performance-stage.vq-game-stage {
  position: relative !important;
  min-height: 270px !important;
  isolation: isolate;
  overflow: hidden !important;
  background:
    radial-gradient(ellipse at 50% 15%, #ffffff 0%, transparent 65%),
    linear-gradient(180deg, #e8f3dc 0%, #d9eacb 100%) !important;
}

.vq-game-stage .vq-game-sky {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

.vq-game-stage .vq-game-sun {
  position: absolute;
  top: 24px;
  right: 34px;
  width: 43px;
  height: 43px;
  border-radius: 50%;
  background: #ffdb79;
  box-shadow: 0 0 0 10px rgba(255,219,121,.15);
  animation: vqSunPulse 4s ease-in-out infinite;
}

.vq-game-stage .vq-game-cloud {
  position: absolute;
  top: 53px;
  left: 13%;
  width: 65px;
  height: 19px;
  border-radius: 30px;
  background: rgba(255,255,255,.8);
  animation: vqCloudFloat 7s ease-in-out infinite alternate;
}

.vq-game-stage .vq-game-cloud::before,
.vq-game-stage .vq-game-cloud::after {
  position: absolute;
  bottom: 5px;
  border-radius: 50%;
  background: inherit;
  content: "";
}

.vq-game-stage .vq-game-cloud::before {
  left: 12px;
  width: 27px;
  height: 27px;
}

.vq-game-stage .vq-game-cloud::after {
  right: 10px;
  width: 21px;
  height: 21px;
}

.vq-game-stage .vq-game-ground {
  position: absolute;
  z-index: 1;
  right: 0;
  bottom: 0;
  left: 0;
  height: 83px;
  border-top: 7px solid #8eb66b;
  background:
    radial-gradient(ellipse at 20% 20%, #a77a4d 0 2px, transparent 3px),
    radial-gradient(ellipse at 75% 45%, #a77a4d 0 2px, transparent 3px),
    linear-gradient(180deg, #9a7048, #795438);
  background-size: 38px 27px, 47px 35px, auto;
}

.vq-game-stage .vq-game-ground::before {
  position: absolute;
  top: -11px;
  left: 0;
  width: 100%;
  height: 10px;
  background: repeating-linear-gradient(
    90deg,
    #78a95d 0 15px,
    #8fbd70 15px 29px
  );
  content: "";
}

.vq-game-stage .vq-game-plant {
  position: absolute;
  z-index: 3;
  bottom: 63px;
  left: 50%;
  width: 180px;
  height: 175px;
  transform: translateX(-50%);
  transform-origin: center bottom;
  animation: vqGamePlantIdle 3.5s ease-in-out infinite;
}

.vq-game-stage .vq-game-stem {
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 8px;
  height: 65px;
  border-radius: 10px;
  background: linear-gradient(90deg, #397442, #72a84f);
  transform: translateX(-50%);
  transform-origin: bottom;
}

.vq-game-stage .vq-game-leaf {
  position: absolute;
  width: 55px;
  height: 30px;
  border: 2px solid rgba(37,91,46,.2);
  border-radius: 100% 0 100% 0;
  background: linear-gradient(135deg, #a9d96f, #4f963f);
  box-shadow: inset -5px -4px 0 rgba(34,94,43,.12);
  transform-origin: 0 100%;
}

.vq-game-stage .vq-game-leaf.left {
  bottom: 31px;
  left: 50%;
  transform: rotate(202deg);
}

.vq-game-stage .vq-game-leaf.right {
  bottom: 48px;
  left: 50%;
  transform: rotate(-20deg) scaleX(-1);
}

.vq-game-stage .vq-game-leaf.top {
  bottom: 65px;
  left: 50%;
  width: 43px;
  height: 24px;
  transform: rotate(-35deg) scaleX(-1);
}

.vq-game-stage .vq-game-seed {
  position: absolute;
  bottom: 8px;
  left: 50%;
  width: 22px;
  height: 15px;
  border-radius: 50%;
  background: linear-gradient(135deg, #d6a15c, #81502e);
  box-shadow: 0 3px 5px rgba(0,0,0,.18);
  transform: translateX(-50%) rotate(-15deg);
}

.vq-game-stage .vq-game-pot {
  position: absolute;
  bottom: 12px;
  left: 50%;
  width: 116px;
  height: 76px;
  border: 4px solid rgba(117,69,43,.18);
  border-top: 9px solid #d68b55;
  border-radius: 8px 8px 25px 25px;
  background: linear-gradient(90deg, #c87545, #e5a06a 50%, #bd7047);
  box-shadow: 0 9px 15px rgba(49,47,31,.17);
  transform: translateX(-50%);
}

.vq-game-stage .vq-game-pot::before {
  position: absolute;
  top: -10px;
  left: -5px;
  width: 118px;
  height: 13px;
  border-radius: 8px;
  background: #a96743;
  content: "";
}

.vq-game-stage .vq-game-sparkle {
  position: absolute;
  z-index: 4;
  color: #fff4b3;
  font-size: 23px;
  animation: vqSparkle 2.4s ease-in-out infinite;
}

.vq-game-stage .vq-game-sparkle.one {
  top: 34%;
  left: 23%;
}

.vq-game-stage .vq-game-sparkle.two {
  top: 48%;
  right: 20%;
  animation-delay: .8s;
}

.vq-game-stage[data-growth-phase="semente"] .vq-game-plant {
  height: 22px;
  animation: none;
}

.vq-game-stage[data-growth-phase="semente"] .vq-game-stem,
.vq-game-stage[data-growth-phase="semente"] .vq-game-leaf {
  display: none;
}

.vq-game-stage[data-growth-phase="semente"] .vq-game-plant::after {
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 22px;
  height: 15px;
  border-radius: 50%;
  background: linear-gradient(135deg, #d6a15c, #81502e);
  content: "";
  transform: translateX(-50%) rotate(-15deg);
}

.vq-game-stage[data-growth-phase="broto"] .vq-game-plant {
  height: 90px;
}

.vq-game-stage[data-growth-phase="broto"] .vq-game-stem {
  height: 36px;
}

.vq-game-stage[data-growth-phase="broto"] .vq-game-leaf {
  width: 37px;
  height: 22px;
}

.vq-game-stage[data-growth-phase="broto"] .vq-game-leaf.top {
  display: none;
}

.vq-game-stage[data-growth-phase="muda"] .vq-game-plant {
  height: 145px;
}

.vq-game-stage[data-growth-phase="muda"] .vq-game-stem {
  height: 91px;
}

.vq-game-stage[data-growth-phase="muda"] .vq-game-leaf {
  width: 59px;
  height: 34px;
}

.vq-game-stage[data-growth-phase="muda"] .vq-game-leaf.top {
  width: 45px;
  height: 28px;
}

.vq-game-stage .vq-game-label {
  position: absolute;
  z-index: 5;
  bottom: 13px;
  left: 50%;
  padding: 7px 15px;
  border: 1px solid rgba(255,255,255,.8);
  border-radius: 20px;
  background: rgba(255,255,255,.88);
  color: #355b37;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: .08em;
  text-transform: uppercase;
  white-space: nowrap;
  transform: translateX(-50%);
}

.vq-performance-stage.vq-adult-stage {
  background:
    radial-gradient(ellipse at 50% 80%, rgba(255,255,255,.95), transparent 65%),
    linear-gradient(135deg, #e8f1df, #f8f6ef) !important;
}

.vq-performance-stage.vq-adult-stage .vq-performance-stage-image {
  width: min(78%, 290px) !important;
  height: auto !important;
  min-height: 0 !important;
  max-height: 230px !important;
  object-fit: contain !important;
  border-radius: 0 !important;
  filter: drop-shadow(0 14px 12px rgba(32,61,43,.2));
  animation: vqAdultPlantFloat 4s ease-in-out infinite;
}

.vq-performance-stage.vq-adult-stage .vq-game-label {
  bottom: 13px;
}

@keyframes vqGamePlantIdle {
  0%, 100% { transform: translateX(-50%) rotate(-2deg); }
  50% { transform: translateX(-50%) rotate(2deg); }
}

@keyframes vqAdultPlantFloat {
  0%, 100% { transform: translateY(0) rotate(-1deg); }
  50% { transform: translateY(-8px) rotate(1deg); }
}

@keyframes vqSunPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.08); }
}

@keyframes vqCloudFloat {
  from { transform: translateX(0); }
  to { transform: translateX(25px); }
}

@keyframes vqSparkle {
  0%, 100% { opacity: .3; transform: scale(.8) rotate(0); }
  50% { opacity: 1; transform: scale(1.2) rotate(35deg); }
}

.vq-performance-info .vq-growth-progress {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 16px;
}

.vq-performance-info .vq-growth-progress-track {
  height: 9px;
  flex: 1;
  overflow: hidden;
  border-radius: 20px;
  background: #dce5d3;
}

.vq-performance-info .vq-growth-progress-track span {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #80a95e, #397442);
  transition: width .5s ease;
}

.vq-performance-info .vq-growth-progress strong {
  color: #355b37;
  font-size: .8rem;
}

.vq-performance-stage.vq-game-stage .vq-game-plant,
.vq-performance-stage.vq-game-stage .vq-game-leaf,
.vq-performance-stage.vq-game-stage .vq-game-sun,
.vq-performance-stage.vq-game-stage .vq-game-cloud,
.vq-performance-stage.vq-game-stage .vq-game-sparkle,
.vq-performance-stage.vq-adult-stage .vq-performance-stage-image {
  will-change: transform;
}

@media(max-width:760px) {
  .vq-performance-stage.vq-game-stage {
    min-height: 230px !important;
  }

  .vq-game-stage .vq-game-plant {
    transform: translateX(-50%) scale(.9);
    transform-origin: center bottom;
  }
}

@media(prefers-reduced-motion:reduce) {
  .vq-game-stage *,
  .vq-adult-stage .vq-performance-stage-image {
    animation: none !important;
    transition: none !important;
  }
}
`;

function instalarEstilosCultivo() {
  if (document.getElementById("vq-growth-game-styles")) return;

  const style = document.createElement("style");
  style.id = "vq-growth-game-styles";
  style.textContent = estiloCultivo;
  document.head.appendChild(style);
}

function criarIlustracaoCultivo(stage, phase, label) {
  stage.classList.add("vq-game-stage");
  stage.classList.remove("vq-adult-stage");
  stage.dataset.growthPhase = phase;

  const image = stage.querySelector(".vq-performance-stage-image");
  if (image) image.remove();

  const oldIcon = stage.querySelector(".vq-performance-stage-icon");
  if (oldIcon) oldIcon.remove();

  stage.innerHTML = `
    <div class="vq-game-sky" aria-hidden="true">
      <span class="vq-game-sun"></span>
      <span class="vq-game-cloud"></span>
    </div>

    <span class="vq-game-sparkle one" aria-hidden="true">✦</span>
    <span class="vq-game-sparkle two" aria-hidden="true">✧</span>

    <div class="vq-game-plant" aria-hidden="true">
      <span class="vq-game-stem"></span>
      <span class="vq-game-leaf left"></span>
      <span class="vq-game-leaf right"></span>
      <span class="vq-game-leaf top"></span>
    </div>

    <div class="vq-game-ground" aria-hidden="true"></div>
    <span class="vq-game-label">${label}</span>
  `;
}

function configurarFaseVisual(stage) {
  if (!stage || stage.dataset.vqStageReady === "true") return;

  const icon = stage.querySelector(".vq-performance-stage-icon");
  const image = stage.querySelector(".vq-performance-stage-image");

  if (!icon || !image) return;

  const iconText = icon.textContent.trim();

  const phases = {
    "🌱": {
      id: "semente",
      label: "Semente plantada",
      title: "Uma nova vida começa"
    },
    "🌿": {
      id: "broto",
      label: "Primeiros brotos",
      title: "Seu broto está crescendo"
    },
    "🪴": {
      id: "muda",
      label: "Pequena muda",
      title: "Sua muda está ganhando folhas"
    },
    "🌳": {
      id: "adulta",
      label: "Planta adulta",
      title: "Sua planta chegou à fase adulta"
    }
  };

  const phase = phases[iconText] || phases["🌱"];

  stage.dataset.vqStageReady = "true";

  if (phase.id === "adulta") {
    stage.classList.add("vq-adult-stage");
    stage.classList.remove("vq-game-stage");

    icon.remove();

    const label = document.createElement("span");
    label.className = "vq-game-label";
    label.textContent = phase.label;
    stage.appendChild(label);

    image.alt = phase.title;
    image.loading = "lazy";
    return;
  }

  criarIlustracaoCultivo(
    stage,
    phase.id,
    phase.label
  );
}


function atualizarBotaoMover() {
  const button = document.getElementById("savePlantRoom");

  if (!button) return;

  if (button.textContent.trim() !== "Mover planta") {
    button.textContent = "Mover planta";
  }

  if (button.getAttribute("aria-label") !== "Mover planta para outro cômodo") {
    button.setAttribute("aria-label", "Mover planta para outro cômodo");
  }

  if (button.title !== "Atualizar o cômodo onde esta planta está organizada") {
    button.title = "Atualizar o cômodo onde esta planta está organizada";
  }
}

function observarFichaDesempenho() {
  if (typeof document === "undefined" || !document.documentElement) return;

  instalarEstilosCultivo();

  const atualizar = () => {
    document
      .querySelectorAll(".vq-performance-stage")
      .forEach(configurarFaseVisual);

    atualizarBotaoMover();
  };

  atualizar();

  const observer = new MutationObserver(atualizar);

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });
}


if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      observarFichaDesempenho,
      { once: true }
    );
  } else {
    observarFichaDesempenho();
  }
}
