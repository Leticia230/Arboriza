import { auth } from "../pages/firebaseConfig.js";

function obterSufixoUsuario() {
  const uid = auth.currentUser?.uid;

  if (!uid) {
    return null;
  }

  return uid;
}

function chaveDoUsuario(tipo) {
  const uid = obterSufixoUsuario();

  if (!uid) {
    return null;
  }

  return `verdequest_${tipo}_${uid}`;
}

function lerDados(tipo) {
  const chave = chaveDoUsuario(tipo);

  if (!chave) return [];

  try {
    const dados = localStorage.getItem(chave);
    return dados ? JSON.parse(dados) : [];
  } catch (erro) {
    console.error(`Erro ao ler ${tipo}:`, erro);
    return [];
  }
}

function salvarDados(tipo, dados) {
  const chave = chaveDoUsuario(tipo);

  if (!chave) {
    console.error("Não foi possível salvar: usuário não autenticado.");
    return false;
  }

  try {
    localStorage.setItem(chave, JSON.stringify(dados));
    return true;
  } catch (erro) {
    console.error(`Erro ao salvar ${tipo}:`, erro);
    return false;
  }
}

export function obterJardim() {
  return lerDados("jardim");
}

export function salvarJardim(plantas) {
  return salvarDados("jardim", plantas);
}

export function obterCuidados() {
  return lerDados("cuidados");
}

export function salvarCuidados(cuidados) {
  return salvarDados("cuidados", cuidados);
}
