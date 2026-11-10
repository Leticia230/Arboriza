
const TIPOS_CUIDADO = {
  rega: {
    nome: "Rega",
    descricao: "Verifique a umidade do substrato antes de regar."
  },
  adubacao: {
    nome: "Adubação",
    descricao: "Confira se a planta está no período adequado de adubação."
  },
  poda: {
    nome: "Poda",
    descricao: "Retire folhas secas ou partes danificadas quando necessário."
  },
  limpeza: {
    nome: "Limpeza",
    descricao: "Remova delicadamente a poeira das folhas."
  }
};

function dataAtual() {
  const agora = new Date();

  const ano = agora.getFullYear();
  const mes = String(agora.getMonth() + 1).padStart(2, "0");
  const dia = String(agora.getDate()).padStart(2, "0");

  return `${ano}-${mes}-${dia}`;
}

function normalizarHistorico(historico) {
  return Array.isArray(historico)
    ? historico.filter(item =>
        item &&
        typeof item.tipo === "string" &&
        typeof item.data === "string"
      )
    : [];
}

export function obterTiposCuidado() {
  return Object.entries(TIPOS_CUIDADO).map(([id, cuidado]) => ({
    id,
    ...cuidado
  }));
}

export function obterOrientacaoCuidado(planta) {
  if (!planta) return null;

  return {
    rega: planta.water || "Verifique a umidade do substrato antes de regar.",
    adubacao: "A frequência depende da espécie, do substrato, da estação e do desenvolvimento da planta. Consulte uma orientação específica antes de adubar.",
    poda: "Retire folhas secas, amareladas ou danificadas quando necessário.",
    limpeza: "Limpe delicadamente as folhas com um pano macio quando houver acúmulo de poeira."
  };
}

export function obterHistoricoCuidados(planta) {
  return normalizarHistorico(planta?.cuidados)
    .sort((a, b) => {
      const dataA = new Date(`${a.data}T${a.hora || "00:00:00"}`);
      const dataB = new Date(`${b.data}T${b.hora || "00:00:00"}`);

      return dataB - dataA;
    });
}

export function obterCuidadosDoDia(planta) {
  const hoje = dataAtual();

  return obterHistoricoCuidados(planta)
    .filter(item => item.data === hoje);
}

export function cuidadoRealizadoHoje(planta, tipo) {
  return obterCuidadosDoDia(planta)
    .some(item => item.tipo === tipo);
}

export function registrarCuidado(planta, tipo) {
  if (!planta || !TIPOS_CUIDADO[tipo]) {
    return {
      sucesso: false,
      mensagem: "Não foi possível registrar esse cuidado."
    };
  }

  const historico = normalizarHistorico(planta.cuidados);
  const hoje = dataAtual();

  const jaRegistrado = historico.some(item =>
    item.tipo === tipo && item.data === hoje
  );

  if (jaRegistrado) {
    return {
      sucesso: false,
      mensagem: "Esse cuidado já foi registrado hoje."
    };
  }

  const agora = new Date();

  const novoRegistro = {
    id: globalThis.crypto?.randomUUID?.() ||
      `cuidado-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    tipo,
    nome: TIPOS_CUIDADO[tipo].nome,
    data: hoje,
    hora: agora.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit"
    }),
    registradoEm: agora.toISOString()
  };

  return {
    sucesso: true,
    mensagem: "Cuidado registrado!",
    historico: [...historico, novoRegistro],
    registro: novoRegistro
  };
}

export function removerRegistroCuidado(planta, registroId) {
  if (!planta || !registroId) return null;

  return normalizarHistorico(planta.cuidados)
    .filter(item => item.id !== registroId);
}

export function formatarDataCuidado(data) {
  if (!data || !/^\d{4}-\d{2}-\d{2}$/.test(data)) {
    return "Data não informada";
  }

  const [ano, mes, dia] = data.split("-");

  return `${dia}/${mes}/${ano}`;
}

/*
 * Compatibilidade com a inicialização anterior do index.html.
 * O diário separado foi substituído pelo histórico individual
 * de cada planta no jardim.
 */
export async function iniciarCuidados() {
  return true;
}

export function atualizarPlantasCuidados() {
  return true;
}
