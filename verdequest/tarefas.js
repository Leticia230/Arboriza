const TIPOS_VALIDOS = ["rega", "adubacao", "poda", "limpeza", "outro"];
const RECORRENCIAS_VALIDAS = ["diaria", "semanal", "mensal"];

function dataLocal(date = new Date()) {
  const ano = date.getFullYear();
  const mes = String(date.getMonth() + 1).padStart(2, "0");
  const dia = String(date.getDate()).padStart(2, "0");
  return `${ano}-${mes}-${dia}`;
}

function normalizarData(valor) {
  if (!valor) return dataLocal();

  if (valor instanceof Date) {
    return dataLocal(valor);
  }

  const texto = String(valor).slice(0, 10);
  return /^\d{4}-\d{2}-\d{2}$/.test(texto) ? texto : dataLocal();
}

function obterDiaDaSemana(data) {
  const [ano, mes, dia] = normalizarData(data).split("-").map(Number);
  return new Date(ano, mes - 1, dia, 12).getDay();
}

function obterDiaDoMes(data) {
  return Number(normalizarData(data).slice(8, 10));
}

function obterChaveUnica() {
  if (globalThis.crypto?.randomUUID) {
    return globalThis.crypto.randomUUID();
  }

  return `tarefa-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function obterTarefas(planta) {
  if (!planta || !Array.isArray(planta.tarefas)) {
    if (planta) planta.tarefas = [];
    return [];
  }

  return planta.tarefas;
}

export function tarefaPrevista(tarefa, data) {
  if (!tarefa || !data) return false;

  const dataAlvo = normalizarData(data);
  const dataInicio = normalizarData(tarefa.dataInicio);

  if (dataAlvo < dataInicio) return false;

  const recorrencia = tarefa.recorrencia || "diaria";

  if (recorrencia === "diaria") return true;

  if (recorrencia === "semanal") {
    const diaInicial = tarefa.diaSemana ?? obterDiaDaSemana(dataInicio);
    return obterDiaDaSemana(dataAlvo) === Number(diaInicial);
  }

  if (recorrencia === "mensal") {
    const diaInicial = Number(tarefa.diaMes || obterDiaDoMes(dataInicio));
    const [ano, mes] = dataAlvo.split("-").map(Number);
    const ultimoDia = new Date(ano, mes, 0).getDate();

    return obterDiaDoMes(dataAlvo) === Math.min(diaInicial, ultimoDia);
  }

  return false;
}

export function tarefaConcluida(tarefa, data) {
  if (!tarefa || !Array.isArray(tarefa.conclusoes)) return false;

  const alvo = normalizarData(data);

  return tarefa.conclusoes.some(conclusao => {
    const dataConclusao = typeof conclusao === "string"
      ? conclusao
      : conclusao?.data;

    return normalizarData(dataConclusao) === alvo;
  });
}

function obterHoraAtual() {
  return new Date().toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit"
  });
}

function tipoParaNome(tipo) {
  const nomes = {
    rega: "Rega",
    adubacao: "Adubação",
    poda: "Poda",
    limpeza: "Limpeza",
    outro: "Outro cuidado"
  };

  return nomes[tipo] || "Cuidado";
}

export function concluirTarefa(planta, tarefaId, data = dataLocal()) {
  const tarefas = obterTarefas(planta);
  const tarefa = tarefas.find(item => String(item.id) === String(tarefaId));

  if (!tarefa) {
    throw new Error("Tarefa não encontrada.");
  }

  const dataConclusao = normalizarData(data);

  if (!tarefaPrevista(tarefa, dataConclusao)) {
    return false;
  }

  if (tarefaConcluida(tarefa, dataConclusao)) {
    return false;
  }

  if (!Array.isArray(tarefa.conclusoes)) {
    tarefa.conclusoes = [];
  }

  const hora = obterHoraAtual();

  tarefa.conclusoes.push({
    data: dataConclusao,
    hora
  });

  if (!Array.isArray(planta.cuidados)) {
    planta.cuidados = [];
  }

  if (tarefa.tipo !== "outro") {
    planta.cuidados.push({
      tipo: tarefa.tipo,
      nome: tarefa.titulo || tipoParaNome(tarefa.tipo),
      data: dataConclusao,
      hora,
      origem: "tarefa",
      tarefaId: tarefa.id
    });
  }

  return true;
}

export function desfazerConclusao(planta, tarefaId, data = dataLocal()) {
  const tarefa = obterTarefas(planta).find(
    item => String(item.id) === String(tarefaId)
  );

  if (!tarefa || !Array.isArray(tarefa.conclusoes)) {
    return false;
  }

  const alvo = normalizarData(data);
  const antes = tarefa.conclusoes.length;

  tarefa.conclusoes = tarefa.conclusoes.filter(conclusao => {
    const dataConclusao = typeof conclusao === "string"
      ? conclusao
      : conclusao?.data;

    return normalizarData(dataConclusao) !== alvo;
  });

  const removeu = tarefa.conclusoes.length < antes;

  if (removeu && Array.isArray(planta.cuidados)) {
    planta.cuidados = planta.cuidados.filter(registro => {
      if (registro?.origem !== "tarefa") return true;

      const mesmaTarefa =
        String(registro.tarefaId || "") === String(tarefa.id);

      const mesmaData = normalizarData(registro.data) === alvo;

      return !(mesmaTarefa && mesmaData);
    });
  }

  return removeu;
}

export function obterTarefasDoDia(planta, data = dataLocal()) {
  return obterTarefas(planta)
    .filter(tarefa => tarefaPrevista(tarefa, data))
    .map(tarefa => ({
      ...tarefa,
      concluida: tarefaConcluida(tarefa, data)
    }));
}

export function obterResumoTarefas(planta, data = dataLocal()) {
  const tarefas = obterTarefasDoDia(planta, data);
  const concluidas = tarefas.filter(tarefa => tarefa.concluida).length;

  return {
    total: tarefas.length,
    concluidas,
    pendentes: tarefas.length - concluidas,
    aproveitamento: tarefas.length
      ? Math.round((concluidas / tarefas.length) * 100)
      : 0
  };
}

export function criarTarefa(planta, dados = {}) {
  if (!planta) {
    throw new Error("Planta não informada.");
  }

  const titulo = String(dados.titulo || "").trim();
  const tipo = TIPOS_VALIDOS.includes(dados.tipo) ? dados.tipo : "outro";
  const recorrencia = RECORRENCIAS_VALIDAS.includes(dados.recorrencia)
    ? dados.recorrencia
    : "diaria";

  if (!titulo) {
    throw new Error("Digite um nome para a tarefa.");
  }

  if (!Array.isArray(planta.tarefas)) {
    planta.tarefas = [];
  }

  const dataInicio = normalizarData(dados.dataInicio);
  const tarefa = {
    id: obterChaveUnica(),
    titulo: titulo.slice(0, 100),
    tipo,
    recorrencia,
    dataInicio,
    diaSemana: obterDiaDaSemana(dataInicio),
    diaMes: obterDiaDoMes(dataInicio),
    conclusoes: [],
    criadaEm: new Date().toISOString()
  };

  planta.tarefas.push(tarefa);

  return tarefa;
}

export function excluirTarefa(planta, tarefaId) {
  if (!planta || !Array.isArray(planta.tarefas)) return false;

  const antes = planta.tarefas.length;

  planta.tarefas = planta.tarefas.filter(
    tarefa => String(tarefa.id) !== String(tarefaId)
  );

  return planta.tarefas.length < antes;
}
