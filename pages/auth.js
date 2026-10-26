
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from "https://www.gstatic.com/firebasejs/13.1.0/firebase-auth.js";

import { auth } from "./firebaseConfig.js";

export async function cadastrar(email, senha) {
    return await createUserWithEmailAndPassword(
        auth,
        email,
        senha
    );
}

export async function entrar(email, senha) {
    return await signInWithEmailAndPassword(
        auth,
        email,
        senha
    );
}

export async function sair() {
    return await signOut(auth);
}
