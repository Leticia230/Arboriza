import {
  obterTarefasDoDia,
  obterTarefas,
  tarefaPrevista,
  tarefaConcluida,
  concluirTarefa,
  desfazerConclusao,
  criarTarefa,
  excluirTarefa
} from "./tarefas.js";

function dataLocal(date = new Date()) {
  const ano = date.getFullYear();
  const mes = String(date.getMonth() + 1).padStart(2, "0");
  const dia = String(date.getDate()).padStart(2, "0");
  return `${ano}-${mes}-${dia}`;
}

function converterData(valor) {
  if (!valor) return new Date();

  if (valor instanceof Date) return new Date(valor);

  const texto = String(valor).slice(0, 10);

  if (/^\d{4}-\d{2}-\d{2}$/.test(texto)) {
    const [ano, mes, dia] = texto.split("-").map(Number);
    return new Date(ano, mes - 1, dia, 12);
  }

  const data = new Date(valor);
  return Number.isNaN(data.getTime()) ? new Date() : data;
}

function escaparHTML(valor) {
  return String(valor ?? "").replace(/[&<>"']/g, caractere => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[caractere]);
}

function nomeMes(data) {
  return data.toLocaleDateString("pt-BR", {
    month: "long",
    year: "numeric"
  });
}

function formatarData(data) {
  return converterData(data).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  });
}

function adicionarMes(data, quantidade) {
  const resultado = new Date(data);
  const diaOriginal = resultado.getDate();

  resultado.setDate(1);
  resultado.setMonth(resultado.getMonth() + quantidade);

  const ultimoDia = new Date(
    resultado.getFullYear(),
    resultado.getMonth() + 1,
    0
  ).getDate();

  resultado.setDate(Math.min(diaOriginal, ultimoDia));
  return resultado;
}

function tipoLabel(tipo) {
  const nomes = {
    rega: "Rega",
    adubacao: "Adubação",
    poda: "Poda",
    limpeza: "Limpeza",
    outro: "Outro cuidado"
  };

  return nomes[tipo] || "Cuidado";
}

function tipoIcone(tipo) {
  const icones = {
    rega: "💧",
    adubacao: "🌿",
    poda: "✂️",
    limpeza: "🍃",
    outro: "✦"
  };

  return icones[tipo] || "✦";
}

export function renderizarCalendario({
  container,
  planta,
  dataInicial = null,
  salvar = async () => true,
  aoAtualizar = null
} = {}) {
  if (!container) {
    throw new Error("O elemento do calendário não foi encontrado.");
  }

  if (!planta) {
    throw new Error("A planta do calendário não foi informada.");
  }

  let selecionada = dataLocal(converterData(dataInicial || new Date()));
  let mesVisivel = converterData(selecionada);
  let ocupado = false;

  const hoje = dataLocal();

  function tarefasDoMes() {
    const tarefas = obterTarefas(planta);
    const ano = mesVisivel.getFullYear();
    const mes = mesVisivel.getMonth();
    const ultimoDia = new Date(ano, mes + 1, 0).getDate();
    const resultado = new Map();

    for (let dia = 1; dia <= ultimoDia; dia++) {
      const data = dataLocal(new Date(ano, mes, dia, 12));
      const previstas = tarefas.filter(tarefa => tarefaPrevista(tarefa, data));

      if (previstas.length) {
        const concluidas = previstas.filter(tarefa =>
          tarefaConcluida(tarefa, data)
        ).length;

        resultado.set(data, {
          total: previstas.length,
          concluidas,
          completas: concluidas === previstas.length
        });
      }
    }

    return resultado;
  }

  function renderizarGrade() {
    const ano = mesVisivel.getFullYear();
    const mes = mesVisivel.getMonth();

    const primeiroDia = new Date(ano, mes, 1, 12);
    const inicioGrade = new Date(primeiroDia);
    inicioGrade.setDate(primeiroDia.getDate() - primeiroDia.getDay());

    const marcadores = tarefasDoMes();
    const diasSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

    const cabecalho = diasSemana.map(dia =>
      `<span class="vq-calendar-weekday">${dia}</span>`
    ).join("");

    const dias = [];

    for (let indice = 0; indice < 42; indice++) {
      const data = new Date(inicioGrade);
      data.setDate(inicioGrade.getDate() + indice);

      const chave = dataLocal(data);
      const pertenceAoMes = data.getMonth() === mes;
      const marcador = marcadores.get(chave);

      const classes = [
        "vq-cal-day",
        pertenceAoMes ? "" : "is-outside",
        chave === selecionada ? "is-selected" : "",
        chave === hoje ? "is-today" : "",
        marcador ? "has-tasks" : "",
        marcador?.completas ? "is-complete" : ""
      ].filter(Boolean).join(" ");

      let marcadorHTML = "";

      if (marcador) {
        marcadorHTML = `
          <span class="vq-calendar-day-marker ${marcador.completas ? "is-complete" : ""}"
                aria-label="${marcador.concluidas} de ${marcador.total} tarefas concluídas">
          </span>`;
      }

      dias.push(`
        <button
          type="button"
          class="${classes}"
          data-calendar-date="${chave}"
          aria-label="${formatarData(chave)}${marcador ? `, ${marcador.total} tarefas` : ""}"
          aria-pressed="${chave === selecionada ? "true" : "false"}"
          ${pertenceAoMes ? "" : 'tabindex="-1"'}
        >
          <span>${data.getDate()}</span>
          ${marcadorHTML}
        </button>
      `);
    }

    return `
      <div class="vq-calendar-week">
        ${cabecalho}
      </div>
      <div class="vq-calendar-grid">
        ${dias.join("")}
      </div>
    `;
  }

  function renderizarTarefasDoDia() {
    const tarefas = obterTarefasDoDia(planta, selecionada);

    if (!tarefas.length) {
      return `
        <div class="vq-calendar-empty">
          <span aria-hidden="true">🌱</span>
          <div>
            <strong>Um dia sem tarefas agendadas</strong>
            <p>Você pode descansar ou adicionar um cuidado para esta data.</p>
          </div>
        </div>
      `;
    }

    return `
      <div class="vq-calendar-task-list">
        ${tarefas.map(tarefa => {
          const concluida = tarefa.concluida || tarefaConcluida(tarefa, selecionada);

          return `
            <article class="vq-calendar-task ${concluida ? "is-done" : ""}">
              <span class="vq-calendar-task-icon" aria-hidden="true">
                ${tipoIcone(tarefa.tipo)}
              </span>

              <div class="vq-calendar-task-copy">
                <strong>${escaparHTML(tarefa.titulo)}</strong>
                <small>${tipoLabel(tarefa.tipo)} · ${escaparHTML(
                  tarefa.recorrencia === "diaria" ? "Diariamente" :
                  tarefa.recorrencia === "semanal" ? "Semanalmente" :
                  "Mensalmente"
                )}</small>
                <span class="vq-calendar-task-status">
                  ${concluida ? "Concluída" : "Pendente"}
                </span>
              </div>

              <label class="vq-calendar-check" title="${concluida ? "Desfazer conclusão" : "Marcar como concluída"}">
                <input
                  type="checkbox"
                  data-toggle-task="${escaparHTML(tarefa.id)}"
                  ${concluida ? "checked" : ""}
                  aria-label="${concluida ? "Desfazer" : "Concluir"}: ${escaparHTML(tarefa.titulo)}"
                >
                <span aria-hidden="true"></span>
              </label>

              <button
                type="button"
                class="vq-calendar-delete"
                data-delete-task="${escaparHTML(tarefa.id)}"
                aria-label="Excluir tarefa ${escaparHTML(tarefa.titulo)}"
                title="Excluir tarefa"
              >×</button>
            </article>
          `;
        }).join("")}
      </div>
    `;
  }

  function renderizarFormulario() {
    return `
      <form class="vq-calendar-task-form" id="vqCalendarTaskForm">
        <div class="vq-calendar-form-heading">
          <div>
            <strong>Adicionar tarefa</strong>
            <p>Crie um lembrete para esta planta.</p>
          </div>
          <span aria-hidden="true">＋</span>
        </div>

        <label class="vq-calendar-form-field">
          <span>Nome da tarefa</span>
          <input
            type="text"
            name="titulo"
            maxlength="100"
            placeholder="Ex.: observar a umidade do substrato"
            required
          >
        </label>

        <div class="vq-calendar-form-row">
          <label class="vq-calendar-form-field">
            <span>Tipo de cuidado</span>
            <select name="tipo">
              <option value="rega">Rega</option>
              <option value="adubacao">Adubação</option>
              <option value="poda">Poda</option>
              <option value="limpeza">Limpeza</option>
              <option value="outro">Outro</option>
            </select>
          </label>

          <label class="vq-calendar-form-field">
            <span>Repetição</span>
            <select name="recorrencia">
              <option value="diaria">Diária</option>
              <option value="semanal">Semanal</option>
              <option value="mensal">Mensal</option>
            </select>
          </label>
        </div>

        <p class="vq-calendar-form-note">
          A repetição é um lembrete configurável por você, não uma recomendação automática da espécie.
        </p>

        <button type="submit" class="vq-calendar-add-button">
          Adicionar à agenda
        </button>
        <p class="vq-calendar-feedback" role="status" aria-live="polite"></p>
      </form>
    `;
  }

  function renderizar() {
    const tarefasDoDia = obterTarefasDoDia(planta, selecionada);
    const feitas = tarefasDoDia.filter(tarefa =>
      tarefaConcluida(tarefa, selecionada)
    ).length;

    container.innerHTML = `
      <div class="vq-calendar">
        <div class="vq-calendar-top">
          <div>
            <p class="vq-eyebrow vq-eyebrow-dark">SUA ROTINA VERDE</p>
            <h4>Agenda de cuidados</h4>
            <p class="vq-calendar-selected-date">${formatarData(selecionada)}</p>
          </div>

          <div class="vq-calendar-month-nav">
            <button type="button" data-calendar-prev aria-label="Mês anterior">‹</button>
            <strong>${escaparHTML(nomeMes(mesVisivel))}</strong>
            <button type="button" data-calendar-next aria-label="Próximo mês">›</button>
          </div>
        </div>

        ${renderizarGrade()}

        <div class="vq-calendar-legend">
          <span><i class="is-pending"></i> Há tarefas</span>
          <span><i class="is-completed"></i> Todas concluídas</span>
          <span><i class="is-current"></i> Hoje</span>
        </div>

        <section class="vq-calendar-day-panel">
          <div class="vq-calendar-day-heading">
            <div>
              <p class="vq-eyebrow vq-eyebrow-dark">DIA SELECIONADO</p>
              <h4>Cuidados programados</h4>
            </div>
            <span class="vq-calendar-day-count">
              ${feitas}/${tarefasDoDia.length}
            </span>
          </div>

          ${renderizarTarefasDoDia()}
        </section>

        ${renderizarFormulario()}
      </div>
    `;
  }

  async function atualizarDepoisDaAcao() {
    if (ocupado) return;

    ocupado = true;
    const formulario = container.querySelector("#vqCalendarTaskForm");
    const feedback = formulario?.querySelector(".vq-calendar-feedback");

    if (feedback) feedback.textContent = "Salvando…";

    try {
      const resultado = await salvar();

      if (resultado === false) {
        throw new Error("O salvamento não foi confirmado.");
      }

      renderizar();
      aoAtualizar?.();
    } catch (erro) {
      console.error("Erro ao salvar tarefa:", erro);
      if (feedback) {
        feedback.textContent = "Não foi possível salvar. Tente novamente.";
      }
      renderizar();
    } finally {
      ocupado = false;
    }
  }

  container.addEventListener("click", async event => {
    const anterior = event.target.closest("[data-calendar-prev]");
    const proximo = event.target.closest("[data-calendar-next]");
    const dia = event.target.closest("[data-calendar-date]");
    const excluir = event.target.closest("[data-delete-task]");

    if (anterior) {
      mesVisivel = adicionarMes(mesVisivel, -1);
      renderizar();
      return;
    }

    if (proximo) {
      mesVisivel = adicionarMes(mesVisivel, 1);
      renderizar();
      return;
    }

    if (dia) {
      selecionada = dia.dataset.calendarDate;
      mesVisivel = converterData(selecionada);
      renderizar();
      return;
    }

    if (excluir) {
      const confirmar = window.confirm("Deseja excluir esta tarefa e sua agenda futura?");
      if (!confirmar) return;

      excluirTarefa(planta, excluir.dataset.deleteTask);
      await atualizarDepoisDaAcao();
    }
  });

  container.addEventListener("change", async event => {
    const checkbox = event.target.closest("[data-toggle-task]");
    if (!checkbox) return;

    const tarefaId = checkbox.dataset.toggleTask;

    try {
      if (checkbox.checked) {
        concluirTarefa(planta, tarefaId, selecionada);
      } else {
        desfazerConclusao(planta, tarefaId, selecionada);
      }

      await atualizarDepoisDaAcao();
    } catch (erro) {
      console.error("Erro ao atualizar tarefa:", erro);
      renderizar();
    }
  });

  container.addEventListener("submit", async event => {
    if (event.target.id !== "vqCalendarTaskForm") return;

    event.preventDefault();

    if (ocupado) return;

    const formulario = event.target;
    const dados = new FormData(formulario);

    const titulo = String(dados.get("titulo") || "").trim();
    const tipo = String(dados.get("tipo") || "outro");
    const recorrencia = String(dados.get("recorrencia") || "diaria");

    if (!titulo) return;

    try {
      criarTarefa(planta, {
        titulo,
        tipo,
        recorrencia,
        dataInicio: selecionada
      });

      await atualizarDepoisDaAcao();
    } catch (erro) {
      console.error("Erro ao criar tarefa:", erro);
      const feedback = formulario.querySelector(".vq-calendar-feedback");
      if (feedback) feedback.textContent = erro.message || "Não foi possível criar a tarefa.";
    }
  });

  renderizar();

  return {
    atualizar: renderizar,
    obterDataSelecionada: () => selecionada
  };
}
