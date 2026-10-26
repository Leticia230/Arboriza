
import { auth } from "./firebaseConfig.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/13.1.0/firebase-auth.js";

// Mostrar mensagens nos formulários
function mostrarMensagem(id, texto) {
  const elemento = document.getElementById(id);

  if (elemento) {
    elemento.textContent = texto;
  }
}

// CADASTRO
const cadastro = document.getElementById("register-form");

if (cadastro) {
  cadastro.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const nome = document.getElementById("register-name").value.trim();
    const email = document.getElementById("register-email").value.trim();
    const senha = document.getElementById("register-password").value;
    const confirmar = document.getElementById("register-confirm").value;

    if (senha !== confirmar) {
      mostrarMensagem("register-message", "As senhas não coincidem.");
      return;
    }

    try {
      const resultado = await createUserWithEmailAndPassword(
        auth,
        email,
        senha
      );

      await updateProfile(resultado.user, {
        displayName: nome
      });

      window.location.href = "Perfil.html";
    } catch (erro) {
      console.error(erro);
      mostrarMensagem(
        "register-message",
        "Não foi possível cadastrar. Confira os dados e tente novamente."
      );
    }
  });
}

// LOGIN
const login = document.getElementById("login-form");

if (login) {
  login.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const email = document.getElementById("login-email").value.trim();
    const senha = document.getElementById("login-password").value;

    try {
      await signInWithEmailAndPassword(auth, email, senha);
      window.location.href = "Perfil.html";
    } catch (erro) {
      console.error(erro);
      mostrarMensagem(
        "login-message",
        "Não foi possível entrar. Confira seu email e senha."
      );
    }
  });
}

// PROTEGER A PÁGINA DE PERFIL
if (window.location.pathname.toLowerCase().endsWith("/perfil.html")) {
  onAuthStateChanged(auth, (usuario) => {
    if (!usuario) {
      window.location.replace("Login.html");
      return;
    }

    const nome = document.getElementById("profile-name");
    const email = document.getElementById("profile-email");

    if (nome) {
      nome.textContent = usuario.displayName || "Usuário Arboriza";
    }

    if (email) {
      email.textContent = usuario.email || "";
    }
  });
}

// SAIR DA CONTA
const sair = document.getElementById("logout-button");

if (sair) {
  sair.addEventListener("click", async () => {
    try {
      await signOut(auth);
      window.location.href = "Login.html";
    } catch (erro) {
      console.error(erro);
      mostrarMensagem("profile-message", "Não foi possível sair da conta.");
    }
  });
}
