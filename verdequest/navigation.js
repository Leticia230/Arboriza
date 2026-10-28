import { auth, db } from "../pages/firebaseConfig.js";
import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/13.1.0/firebase-auth.js";

import {
  doc,
  getDoc,
  setDoc
} from "https://www.gstatic.com/firebasejs/13.1.0/firebase-firestore.js";

function aguardarUsuario() {
  return new Promise((resolve) => {
    if (auth.currentUser) {
      resolve(auth.currentUser);
      return;
    }

    const cancelar = onAuthStateChanged(auth, (usuario) => {
      cancelar();
      resolve(usuario);
    });
  });
}

function chaveLocal(uid) {
  return `verdequest-state-v1-${uid}`;
}

export const integration = {
  async getUser() {
    const usuario = await aguardarUsuario();

    if (!usuario) return null;

    return {
      id: usuario.uid,
      name: usuario.displayName || "Usuário Arboriza",
      email: usuario.email || ""
    };
  },

  async loadState() {
    try {
      const usuario = await aguardarUsuario();

      if (!usuario) return null;

      const chave = chaveLocal(usuario.uid);
      const referencia = doc(
        db,
        "usuarios",
        usuario.uid,
        "verdequest",
        "progresso"
      );

      const documento = await getDoc(referencia);

      if (documento.exists()) {
        const estado = documento.data().estado ?? null;

        if (estado) {
          localStorage.setItem(chave, JSON.stringify(estado));
        }

        return estado;
      }

      const salvo = localStorage.getItem(chave);
      return salvo ? JSON.parse(salvo) : null;
    } catch (erro) {
      console.warn("Não foi possível carregar o progresso:", erro);

      try {
        const usuario = await aguardarUsuario();
        if (!usuario) return null;

        const salvo = localStorage.getItem(chaveLocal(usuario.uid));
        return salvo ? JSON.parse(salvo) : null;
      } catch {
        return null;
      }
    }
  },

  async saveState(estado) {
    try {
      const usuario = await aguardarUsuario();

      if (!usuario) {
        return { ok: false, error: "not-authenticated" };
      }

      localStorage.setItem(
        chaveLocal(usuario.uid),
        JSON.stringify(estado)
      );

      const referencia = doc(
        db,
        "usuarios",
        usuario.uid,
        "verdequest",
        "progresso"
      );

      await setDoc(referencia, {
        estado,
        atualizadoEm: new Date().toISOString()
      }, { merge: true });

      return { ok: true };
    } catch (erro) {
      console.error("Não foi possível salvar o progresso:", erro);
      return { ok: false, error: "storage-error" };
    }
  },

  async clearState() {
    try {
      const usuario = await aguardarUsuario();

      if (!usuario) {
        return { ok: false, error: "not-authenticated" };
      }

      localStorage.removeItem(chaveLocal(usuario.uid));

      return { ok: true };
    } catch (erro) {
      console.error("Não foi possível limpar o progresso:", erro);
      return { ok: false, error: "storage-error" };
    }
  }
};
