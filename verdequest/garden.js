import {
  obterJardim,
  salvarJardim
} from "./storage.js";

let catalogoAtual = [];

function escaparHTML(valor) {
  return String(valor ?? "").replace(/[&<>"']/g, caractere => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[caractere]);
}

function avisarJardimAtualizado() {
  window.dispatchEvent(new Event("verdequest-jardim-atualizado"));
}

function encontrarPlanta(id) {
  return catalogoAtual.find(
    planta => String(planta.id) === String(id)
  );
}

function renderizarJardim() {
  const container = document.getElementById("gardenList");
  if (!container) return;

  const jardim = obterJardim();

  if (jardim.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <p>Seu jardim está começando a florescer.</p>
        <p>Explore o catálogo e adicione suas primeiras plantas!</p>
        <a class="button button-primary" href="#catalogo">
          Explorar plantas
        </a>
      </div>
    `;
    return;
  }

  container.innerHTML = jardim.map(item => {
    const planta = encontrarPlanta(item.id);
    const nome = planta?.name ?? planta?.nome ?? item.nome ?? "Planta";
    const imagem = planta?.image ?? planta?.imagem ?? item.imagem ?? "";

    return `
      <article class="garden-item">
        ${imagem ? `
          <img
            src="${escaparHTML(imagem)}"
            alt="${escaparHTML(nome)}"
            loading="lazy"
          >
        ` : ""}

        <div>
          <h3>${escaparHTML(nome)}</h3>
          <p>Faz parte do seu jardim pessoal.</p>
        </div>

        <button
          class="button button-outline"
          type="button"
          data-remover-planta="${escaparHTML(item.id)}"
          aria-label="Remover ${escaparHTML(nome)} do jardim"
        >
          Remover
        </button>
      </article>
    `;
  }).join("");
}

export function adicionarPlanta(id) {
  const planta = encontrarPlanta(id);

  if (!planta) {
    return {
      sucesso: false,
      mensagem: "Não foi possível encontrar essa planta no catálogo."
    };
  }

  const jardim = obterJardim();

  if (jardim.some(item => String(item.id) === String(id))) {
    return {
      sucesso: false,
      mensagem: "Essa planta já está no seu jardim."
    };
  }

  const imagem = planta.image ?? planta.imagem ?? "";

  jardim.push({
    id: planta.id,
    nome: planta.name ?? planta.nome ?? "Planta",
    imagem
  });

  if (!salvarJardim(jardim)) {
    return {
      sucesso: false,
      mensagem: "Não foi possível salvar. Verifique o navegador."
    };
  }

  renderizarJardim();
  avisarJardimAtualizado();

  return {
    sucesso: true,
    mensagem: "Planta adicionada ao seu jardim!"
  };
}

export function removerPlanta(id) {
  const jardim = obterJardim().filter(
    item => String(item.id) !== String(id)
  );

  if (!salvarJardim(jardim)) {
    return {
      sucesso: false,
      mensagem: "Não foi possível salvar a alteração."
    };
  }

  renderizarJardim();
  avisarJardimAtualizado();

  return {
    sucesso: true,
    mensagem: "Planta removida do seu jardim."
  };
}

export function iniciarJardim(plantas) {
  catalogoAtual = Array.isArray(plantas) ? plantas : [];

  const container = document.getElementById("gardenList");
  if (!container) return;

  if (container.dataset.iniciado !== "true") {
    container.addEventListener("click", evento => {
      const botao = evento.target.closest("[data-remover-planta]");
      if (!botao) return;

      const resultado = removerPlanta(
        botao.dataset.removerPlanta
      );

      if (!resultado.sucesso) {
        console.error(resultado.mensagem);
      }
    });

    container.dataset.iniciado = "true";
  }

  renderizarJardim();
  avisarJardimAtualizado();
}
