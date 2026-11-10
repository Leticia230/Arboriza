import {
  obterJardim,
  salvarJardim as salvarJardimBanco
} from "./storage.js";

let catalogo = [];

export async function iniciarJardim(plantas = []) {
  catalogo = Array.isArray(plantas) ? plantas : [];

  try {
    await obterJardim();
    return true;
  } catch (erro) {
    console.error("Erro ao iniciar jardim:", erro);
    return false;
  }
}

export async function obterPlantasJardim() {
  try {
    return await obterJardim();
  } catch (erro) {
    console.error("Erro ao carregar plantas do jardim:", erro);
    return [];
  }
}

export async function salvarJardim(plantas) {
  return salvarJardimBanco(plantas);
}

export async function adicionarPlanta(id, comodo = "A definir") {
  const planta = catalogo.find(
    item => String(item.id) === String(id)
  );

  if (!planta) {
    return {
      sucesso: false,
      mensagem: "Planta não encontrada."
    };
  }

  try {
    const jardim = await obterJardim();

    const jaExiste = jardim.some(
      item => String(item.id) === String(id)
    );

    if (jaExiste) {
      return {
        sucesso: false,
        mensagem: "Essa planta já está no jardim."
      };
    }

    jardim.push({
      id: planta.id,
      nome: planta.name || planta.nome || "Planta",
      imagem: planta.image || planta.imagem || "",
      comodo,
      adicionadaEm: new Date().toISOString(),
      cuidados: []
    });

    const salvo = await salvarJardimBanco(jardim);

    if (!salvo) {
      return {
        sucesso: false,
        mensagem: "Não foi possível salvar no banco de dados."
      };
    }

    return {
      sucesso: true,
      mensagem: "Planta adicionada ao jardim."
    };

  } catch (erro) {
    console.error("Erro ao adicionar planta:", erro);

    return {
      sucesso: false,
      mensagem: "Ocorreu um erro ao adicionar a planta."
    };
  }
}

export async function atualizarComodo(id, comodo) {
  try {
    const jardim = await obterJardim();

    const planta = jardim.find(
      item => String(item.id) === String(id)
    );

    if (!planta) {
      return {
        sucesso: false,
        mensagem: "Planta não encontrada."
      };
    }

    planta.comodo = comodo;

    const salvo = await salvarJardimBanco(jardim);

    return salvo
      ? { sucesso: true, mensagem: "Cômodo atualizado." }
      : {
          sucesso: false,
          mensagem: "Não foi possível salvar o cômodo."
        };

  } catch (erro) {
    console.error("Erro ao atualizar cômodo:", erro);

    return {
      sucesso: false,
      mensagem: "Ocorreu um erro ao atualizar o cômodo."
    };
  }
}

export async function removerPlanta(id) {
  try {
    const jardim = await obterJardim();

    const atualizado = jardim.filter(
      item => String(item.id) !== String(id)
    );

    if (atualizado.length === jardim.length) {
      return {
        sucesso: false,
        mensagem: "Planta não encontrada no jardim."
      };
    }

    const salvo = await salvarJardimBanco(atualizado);

    return salvo
      ? { sucesso: true, mensagem: "Planta removida." }
      : {
          sucesso: false,
          mensagem: "Não foi possível remover a planta."
        };

  } catch (erro) {
    console.error("Erro ao remover planta:", erro);

    return {
      sucesso: false,
      mensagem: "Ocorreu um erro ao remover a planta."
    };
  }
}