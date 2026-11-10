import { auth, db } from "../pages/firebaseConfig.js";

import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/13.1.0/firebase-firestore.js";

function obterReferencia(tipo) {
  const uid = auth.currentUser?.uid;

  if (!uid) {
    throw new Error("Usuário não autenticado.");
  }

  return doc(db, "usuarios", uid, "verdequest", tipo);
}

export async function obterDados(tipo) {
  try {
    const referencia = obterReferencia(tipo);
    const resultado = await getDoc(referencia);

    if (!resultado.exists()) {
      return [];
    }

    const dados = resultado.data().itens;
    return Array.isArray(dados) ? dados : [];

  } catch (erro) {
    console.error(`Erro ao buscar ${tipo} no Firestore:`, erro);
    throw erro;
  }
}

export async function salvarDados(tipo, dados) {
  try {
    if (!Array.isArray(dados)) {
      throw new Error("Os dados precisam estar em formato de lista.");
    }

    const referencia = obterReferencia(tipo);

    await setDoc(referencia, {
      itens: dados,
      atualizadoEm: serverTimestamp()
    });

    return true;

  } catch (erro) {
    console.error(`Erro ao salvar ${tipo} no Firestore:`, erro);
    return false;
  }
}

export async function obterJardim() {
  return obterDados("jardim");
}

export async function salvarJardim(plantas) {
  return salvarDados("jardim", plantas);
}

export async function obterCuidados() {
  return obterDados("cuidados");
}

export async function salvarCuidados(cuidados) {
  return salvarDados("cuidados", cuidados);
}
