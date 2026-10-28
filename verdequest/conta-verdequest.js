import { auth } from "../pages/firebaseConfig.js";

import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/13.1.0/firebase-auth.js";

import { integration } from "./navigation.js";

const elemento = (id) => document.getElementById(id);

function mostrarMensagem(texto) {
  const mensagem = elemento("accountMessage");
  if (mensagem) mensagem.textContent = texto;
}

function formatarPontuacao(estado) {
  if (!estado || typeof estado !== "object") {
    return "0 pontos";
  }

  const possiveisCampos = [
    estado.pontuacao,
    estado.pontuação,
    estado.pontos,
    estado.score,
    estado.points,
    estado.sementes,
    estado.xp,
    estado.experiencia,
    estado.experiência,
    estado.stats?.pontuacao,
    estado.stats?.pontos,
    estado.stats?.score,
    estado.stats?.points,
    estado.progresso?.pontuacao,
    estado.progresso?.pontos,
    estado.progresso?.score,
    estado.usuario?.pontuacao,
    estado.usuario?.pontos,
    estado.usuario?.score,
    estado.jogador?.pontuacao,
    estado.jogador?.pontos,
    estado.jogador?.score
  ];

  for (const valor of possiveisCampos) {
    if (
      valor !== undefined &&
      valor !== null &&
      valor !== "" &&
      Number.isFinite(Number(valor))
    ) {
      return `${Number(valor).toLocaleString("pt-BR")} pontos`;
    }
  }

  return "0 pontos";
}

function atualizarDadosUsuario(usuario) {
  const nome = usuario.displayName?.trim() || "Usuário Arboriza";

  const avatar = elemento("accountAvatar");
  const nomeMenu = elemento("accountMenuName");
  const nomeConta = elemento("accountName");
  const email = elemento("accountEmail");

  if (avatar) {
    avatar.textContent = Array.from(nome)[0]?.toLocaleUpperCase("pt-BR") || "U";
  }

  if (nomeMenu) nomeMenu.textContent = nome;
  if (nomeConta) nomeConta.textContent = nome;
  if (email) email.textContent = usuario.email || "E-mail não informado";
}

async function carregarProgresso() {
  const pontuacao = elemento("accountScore");

  if (pontuacao) {
    pontuacao.textContent = "Carregando...";
  }

  try {
    const estado = await integration.loadState();

    if (pontuacao) {
      pontuacao.textContent = formatarPontuacao(estado);
    }
  } catch (erro) {
    console.error("Erro ao carregar o progresso:", erro);

    if (pontuacao) {
      pontuacao.textContent = "Indisponível";
    }
  }
}

let usuarioAtual = null;
let carregamentoEmAndamento = false;

onAuthStateChanged(
  auth,
  async (usuario) => {
    if (!usuario) {
      usuarioAtual = null;
      window.location.replace("../pages/Login.html");
      return;
    }

    usuarioAtual = usuario;
    atualizarDadosUsuario(usuario);

    if (carregamentoEmAndamento) return;

    carregamentoEmAndamento = true;

    try {
      await carregarProgresso();
    } finally {
      carregamentoEmAndamento = false;
    }
  },
  (erro) => {
    console.error("Erro ao verificar autenticação:", erro);
    mostrarMensagem("Não foi possível verificar sua sessão. Atualize a página.");
  }
);

const botaoSair = elemento("logoutButton");

if (botaoSair) {
  botaoSair.addEventListener("click", async () => {
    if (!usuarioAtual) {
      mostrarMensagem("Nenhum usuário conectado.");
      return;
    }

    botaoSair.disabled = true;
    mostrarMensagem("Saindo da sua conta...");

    try {
      await signOut(auth);
      window.location.replace("../pages/Login.html");
    } catch (erro) {
      console.error("Erro ao sair da conta:", erro);
      mostrarMensagem("Não foi possível sair. Tente novamente.");
      botaoSair.disabled = false;
    }
  });
}
