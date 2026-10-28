  import { initializeApp } from "https://www.gstatic.com/firebasejs/13.1.0/firebase-app.js";
  import { getAuth } from "https://www.gstatic.com/firebasejs/13.1.0/firebase-auth.js";
  import { getFirestore } from "https://www.gstatic.com/firebasejs/13.1.0/firebase-firestore.js";

  const firebaseConfig = {
    apiKey: "AIzaSyAYTrmKmwaCMX4yCTkgg5SHBvbNx7tpB5c",
    authDomain: "banco-1-a1642.firebaseapp.com",
    projectId: "banco-1-a1642",
    storageBucket: "banco-1-a1642.firebasestorage.app",
    messagingSenderId: "1009473944854",
    appId: "1:1009473944854:web:f2a4d9b9514352ceb66437"
  };

  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
  export const db = getFirestore(app);