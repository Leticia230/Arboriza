const moedaBRL = valor =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(Number.isFinite(valor) ? valor : 0);

const itensIniciais = [
  { id: "plantas", nome: "Plantas e mudas", detalhe: "Espécies escolhidas para seu jardim", quantidade: 3, preco: 25 },
  { id: "vasos", nome: "Vasos e jardineiras", detalhe: "Recipientes para acomodar as plantas", quantidade: 3, preco: 30 },
  { id: "substrato", nome: "Terra e substrato", detalhe: "Mistura adequada para o cultivo", quantidade: 2, preco: 18 },
  { id: "drenagem", nome: "Pedras para drenagem", detalhe: "Material para ajudar no escoamento", quantidade: 1, preco: 15 },
  { id: "adubo", nome: "Adubo e fertilizante", detalhe: "Nutrientes para o desenvolvimento", quantidade: 1, preco: 22 },
  { id: "ferramentas", nome: "Ferramentas e acessórios", detalhe: "Pequenos itens para o cuidado diário", quantidade: 1, preco: 35 }
];

let itens = itensIniciais.map(item => ({ ...item }));
let proximoId = 1;
let inicializado = false;

function criarId() {
  return `personalizado-${proximoId++}`;
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

function numeroValido(valor, minimo = 0, maximo = 1000000) {
  const numero = Number(valor);
  if (!Number.isFinite(numero)) return minimo;
  return Math.min(maximo, Math.max(minimo, numero));
}

function campoNumero(valor, atributos = "") {
  return `<input type="number" min="0" step="0.01" value="${numeroValido(valor)}" ${atributos}>`;
}

function renderizarSimulador() {
  const container = document.querySelector("#simulator");
  if (!container) return;

  container.innerHTML = `
    <div class="vq-sim-layout">
      <section class="vq-sim-builder">
        <h3>Monte seu orçamento</h3>
        <p class="vq-sim-intro">
          Ajuste os preços e as quantidades de acordo com seu projeto.
          Os valores começam como estimativas editáveis.
        </p>

        <div class="vq-sim-items" id="vqSimItems">
          ${itens.map(item => `
            <div class="vq-sim-item" data-item-id="${escaparHTML(item.id)}">
              <label>
                ${escaparHTML(item.nome)}
                <small>${escaparHTML(item.detalhe)}</small>
              </label>
              ${campoNumero(item.quantidade, 'data-quantity aria-label="Quantidade de ' + escaparHTML(item.nome) + '" step="1" max="10000"')}
              ${campoNumero(item.preco, 'data-price aria-label="Preço unitário de ' + escaparHTML(item.nome) + '" max="1000000"')}
            </div>
          `).join("")}
        </div>

        <div class="vq-sim-extra">
          <label>
            Nome do material personalizado
            <input id="vqSimCustomName" type="text" maxlength="80" placeholder="Ex.: pedras decorativas">
          </label>
          <label>
            Preço unitário (R$)
            <input id="vqSimCustomPrice" type="number" min="0" max="1000000" step="0.01" value="0">
          </label>
          <label>
            Quantidade
            <input id="vqSimCustomQuantity" type="number" min="1" max="10000" step="1" value="1">
          </label>
          <div>
            <button type="button" class="vq-sim-secondary" id="vqSimAddItem">Adicionar material</button>
          </div>
        </div>
      </section>

      <aside class="vq-sim-summary">
        <p class="vq-eyebrow vq-eyebrow-dark">RESUMO DO PROJETO</p>
        <h3>Seu investimento</h3>
        <p class="vq-sim-total-label">Estimativa total</p>
        <output class="vq-sim-total" id="vqSimTotal" aria-live="polite">R$ 0,00</output>

        <div class="vq-sim-breakdown">
          <span>Materiais e plantas</span>
          <strong id="vqSimSubtotal">R$ 0,00</strong>
        </div>
        <div class="vq-sim-breakdown">
          <span>Reserva para imprevistos</span>
          <strong id="vqSimReserveValue">R$ 0,00</strong>
        </div>
        <div class="vq-sim-breakdown">
          <span>Itens no orçamento</span>
          <strong id="vqSimItemCount">0</strong>
        </div>

        <div class="vq-sim-extra">
          <label>
            Reserva adicional (%)
            <input id="vqSimReserve" type="number" min="0" max="100" step="1" value="10">
          </label>
          <label>
            Desconto (%)
            <input id="vqSimDiscount" type="number" min="0" max="100" step="1" value="0">
          </label>
        </div>

        <div class="vq-sim-actions">
          <button type="button" class="vq-button vq-button-dark" id="vqSimPrint">Imprimir orçamento</button>
          <button type="button" class="vq-sim-secondary" id="vqSimReset">Restaurar valores</button>
        </div>

        <p class="vq-sim-note">
          Esta é uma estimativa, não uma cotação. Preços de plantas, vasos,
          substratos, entrega e instalação variam conforme a região e o fornecedor.
        </p>
      </aside>
    </div>
  `;

  conectarEventos();
  atualizarTotais();
}

function lerValoresDaTela() {
  document.querySelectorAll("#vqSimItems .vq-sim-item").forEach(linha => {
    const id = linha.dataset.itemId;
    const item = itens.find(registro => registro.id === id);
    if (!item) return;

    const quantidade = linha.querySelector("[data-quantity]");
    const preco = linha.querySelector("[data-price]");

    item.quantidade = numeroValido(quantidade?.value, 0, 10000);
    item.preco = numeroValido(preco?.value, 0, 1000000);

    if (quantidade) quantidade.value = item.quantidade;
    if (preco) preco.value = item.preco;
  });
}

function calcularOrcamento() {
  const subtotal = itens.reduce((total, item) => {
    return total + numeroValido(item.quantidade) * numeroValido(item.preco);
  }, 0);

  const reservaPercentual = numeroValido(
    document.querySelector("#vqSimReserve")?.value ?? 10,
    0,
    100
  );

  const descontoPercentual = numeroValido(
    document.querySelector("#vqSimDiscount")?.value ?? 0,
    0,
    100
  );

  const desconto = subtotal * descontoPercentual / 100;
  const baseComDesconto = subtotal - desconto;
  const reserva = baseComDesconto * reservaPercentual / 100;
  const total = baseComDesconto + reserva;

  return {
    subtotal,
    desconto,
    reserva,
    total,
    quantidadeItens: itens.filter(item => item.quantidade > 0).length
  };
}

function atualizarTotais() {
  const container = document.querySelector("#simulator");
  if (!container) return;

  lerValoresDaTela();

  const resultado = calcularOrcamento();

  const total = container.querySelector("#vqSimTotal");
  const subtotal = container.querySelector("#vqSimSubtotal");
  const reserva = container.querySelector("#vqSimReserveValue");
  const contagem = container.querySelector("#vqSimItemCount");

  if (total) total.textContent = moedaBRL(resultado.total);
  if (subtotal) {
    subtotal.textContent = resultado.desconto > 0
      ? `${moedaBRL(resultado.subtotal - resultado.desconto)} (com desconto)`
      : moedaBRL(resultado.subtotal);
  }
  if (reserva) reserva.textContent = moedaBRL(resultado.reserva);
  if (contagem) contagem.textContent = resultado.quantidadeItens;
}

function conectarEventos() {
  const container = document.querySelector("#simulator");
  if (!container) return;

  container.querySelectorAll("[data-quantity], [data-price]").forEach(campo => {
    campo.addEventListener("input", atualizarTotais);
    campo.addEventListener("change", atualizarTotais);
  });

  container.querySelector("#vqSimReserve")?.addEventListener("input", atualizarTotais);
  container.querySelector("#vqSimDiscount")?.addEventListener("input", atualizarTotais);

  container.querySelector("#vqSimAddItem")?.addEventListener("click", () => {
    const nomeCampo = container.querySelector("#vqSimCustomName");
    const precoCampo = container.querySelector("#vqSimCustomPrice");
    const quantidadeCampo = container.querySelector("#vqSimCustomQuantity");

    const nome = nomeCampo.value.trim();
    const preco = numeroValido(precoCampo.value, 0, 1000000);
    const quantidade = numeroValido(quantidadeCampo.value, 1, 10000);

    if (!nome) {
      nomeCampo.setCustomValidity("Digite o nome do material.");
      nomeCampo.reportValidity();
      nomeCampo.setCustomValidity("");
      nomeCampo.focus();
      return;
    }

    itens.push({
      id: criarId(),
      nome,
      detalhe: "Material adicionado por você",
      quantidade,
      preco
    });

    renderizarSimulador();
  });

  container.querySelector("#vqSimReset")?.addEventListener("click", () => {
    itens = itensIniciais.map(item => ({ ...item }));
    renderizarSimulador();
  });

  container.querySelector("#vqSimPrint")?.addEventListener("click", imprimirOrcamento);
}

function imprimirOrcamento() {
  lerValoresDaTela();

  const resultado = calcularOrcamento();
  const linhas = itens
    .filter(item => item.quantidade > 0)
    .map(item => `
      <tr>
        <td>${escaparHTML(item.nome)}</td>
        <td>${item.quantidade}</td>
        <td>${moedaBRL(item.preco)}</td>
        <td>${moedaBRL(item.quantidade * item.preco)}</td>
      </tr>
    `).join("");

  const janela = window.open("", "_blank");

  if (!janela) {
    alert("O navegador bloqueou a janela de impressão. Permita pop-ups para imprimir o orçamento.");
    return;
  }

  janela.document.write(`
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Orçamento VerdeQuest</title>
      <style>
        body { margin: 35px auto; max-width: 850px; padding: 0 22px; color: #26332a; font: 14px Arial, sans-serif; }
        h1 { color: #203d2b; font-size: 30px; }
        p { line-height: 1.6; }
        table { width: 100%; border-collapse: collapse; margin-top: 24px; }
        th, td { padding: 12px 8px; border-bottom: 1px solid #ddd; text-align: left; }
        th { color: #203d2b; background: #f1f3ec; }
        .total { margin-top: 28px; font-size: 24px; font-weight: bold; }
        .nota { margin-top: 25px; color: #666; font-size: 12px; }
        @media print { body { margin: 0; } }
      </style>
    </head>
    <body>
      <h1>VerdeQuest</h1>
      <p>Estimativa de materiais para seu projeto de jardim</p>
      <p>Data: ${new Date().toLocaleDateString("pt-BR")}</p>
      <table>
        <thead><tr><th>Item</th><th>Qtd.</th><th>Preço unitário</th><th>Total</th></tr></thead>
        <tbody>${linhas}</tbody>
      </table>
      <p>Subtotal com desconto: ${moedaBRL(resultado.subtotal - resultado.desconto)}</p>
      <p>Reserva para imprevistos: ${moedaBRL(resultado.reserva)}</p>
      <p class="total">Total estimado: ${moedaBRL(resultado.total)}</p>
      <p class="nota">Estimativa editável, sujeita à variação de preços, disponibilidade, frete e custos de instalação.</p>
      <script>window.onload = () => window.print();<\/script>
    </body>
    </html>
  `);

  janela.document.close();
}

export function iniciarSimulador() {
  const container = document.querySelector("#simulator");
  if (!container) return;

  inicializado = true;
  renderizarSimulador();
}

export function obterOrcamento() {
  lerValoresDaTela();
  return calcularOrcamento();
}