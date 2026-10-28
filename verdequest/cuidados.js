import {
  obterCuidados,
  salvarCuidados
} from "./storage.js";

import { obterJardim } from "./storage.js";

function escaparHTML(valor) {
  return String(valor ?? "").replace(/[&<>"']/g, caractere => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[caractere]);
}

function formatarData(data) {
  if (!data) return "Data não informada";

  const partes = data.split("-");
  if (partes.length !== 3) return data;

  return `${partes[2]}/${partes[1]}/${partes[0]}`;
}

function preencherPlantas() {
  const seletor = document.getElementById("carePlant");
  if (!seletor) return;

  const plantaSelecionada = seletor.value;
  const jardim = obterJardim();

  seletor.innerHTML = `
    <option value="">Selecione uma planta</option>
    ${jardim.map(planta => `
      <option value="${escaparHTML(planta.id)}">
        ${escaparHTML(planta.nome ?? "Planta")}
      </option>
    `).join("")}
  `;

  if (jardim.some(planta => String(planta.id) === plantaSelecionada)) {
    seletor.value = plantaSelecionada;
  }
}

function renderizarHistorico() {
  const container = document.getElementById("careHistory");
  if (!container) return;

  const cuidados = obterCuidados();

  if (cuidados.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <p>Nenhum cuidado registrado ainda.</p>
        <p>Registre o primeiro cuidado das plantas do seu jardim.</p>
      </div>
    `;
    return;
  }

  const cuidadosOrdenados = [...cuidados].sort((a, b) =>
    String(b.data).localeCompare(String(a.data))
  );

  container.innerHTML = cuidadosOrdenados.map(cuidado => `
    <article class="care-entry">
      <div>
        <h3>${escaparHTML(cuidado.plantaNome)}</h3>
        <p>${escaparHTML(cuidado.tipo)}</p>
      </div>
      <time datetime="${escaparHTML(cuidado.data)}">
        ${escaparHTML(formatarData(cuidado.data))}
      </time>
      <button
        class="button button-outline"
        type="button"
        data-remover-cuidado="${escaparHTML(cuidado.id)}"
      >
        Excluir
      </button>
    </article>
  `).join("");
}

function registrarCuidado(evento) {
  evento.preventDefault();

  const seletor = document.getElementById("carePlant");
  const tipo = document.getElementById("careType");
  const data = document.getElementById("careDate");

  if (!seletor || !tipo || !data) return;

  const jardim = obterJardim();
  const planta = jardim.find(
    item => String(item.id) === seletor.value
  );

  if (!planta) {
    alert("Adicione uma planta ao seu jardim antes de registrar cuidados.");
    return;
  }

  if (!data.value) {
    alert("Selecione a data do cuidado.");
    return;
  }

  const cuidados = obterCuidados();

  cuidados.push({
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    plantaId: planta.id,
    plantaNome: planta.nome ?? "Planta",
    tipo: tipo.value,
    data: data.value
  });

  if (!salvarCuidados(cuidados)) {
    alert("Não foi possível salvar o cuidado. Tente novamente.");
    return;
  }

  renderizarHistorico();

  data.value = "";
  tipo.value = "Rega";
}

function removerCuidado(id) {
  const cuidados = obterCuidados().filter(
    cuidado => String(cuidado.id) !== String(id)
  );

  if (!salvarCuidados(cuidados)) {
    alert("Não foi possível excluir esse registro.");
    return;
  }

  renderizarHistorico();
}

export function iniciarCuidados() {
  const formulario = document.getElementById("careForm");
  const historico = document.getElementById("careHistory");

  if (formulario && !formulario.dataset.iniciado) {
    formulario.addEventListener("submit", registrarCuidado);
    formulario.dataset.iniciado = "true";
  }

  if (historico && !historico.dataset.iniciado) {
    historico.addEventListener("click", evento => {
      const botao = evento.target.closest("[data-remover-cuidado]");
      if (!botao) return;

      removerCuidado(botao.dataset.removerCuidado);
    });

    historico.dataset.iniciado = "true";
  }

  preencherPlantas();
  renderizarHistorico();
}

export function atualizarPlantasCuidados() {
  preencherPlantas();
}
