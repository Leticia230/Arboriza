// Dados do glossário (exemplo baseado nos termos exibidos na página)
const GLOSSARY_TERMS = [
  {
    letter: "A",
    term: "Abiótico",
    definition: "Elemento não vivo do ambiente, como temperatura, água, luz solar, solo e umidade, que influencia os seres vivos."
  },
  {
    letter: "A",
    term: "Adaptação climática",
    definition: "Conjunto de medidas utilizadas para reduzir os impactos causados pelas mudanças climáticas sobre pessoas, cidades e ecossistemas."
  },
  {
    letter: "A",
    term: "Albedo",
    definition: "Capacidade de uma superfície de refletir a radiação solar. Superfícies claras geralmente possuem maior albedo e absorvem menos calor."
  },
  {
    letter: "A",
    term: "Arborização urbana",
    definition: "Presença e planejamento de árvores e outras plantas em áreas urbanas, como ruas, praças, parques e calçadas."
  },
  {
    letter: "A",
    term: "Assoreamento",
    definition: "Acúmulo de sedimentos em rios, córregos e lagos, frequentemente provocado pela erosão do solo e pela remoção da vegetação."
  },
  {
    letter: "A",
    term: "Aquecimento global",
    definition: "Aumento da temperatura média do planeta associado principalmente à intensificação do efeito estufa causada pelas atividades humanas."
  }
];

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const alphabetFilterEl = document.getElementById("alphabetFilter");
const termsGridEl = document.getElementById("termsGrid");
const searchInputEl = document.getElementById("searchInput");
const viewAllBtn = document.getElementById("viewAllBtn");

let activeLetter = null;

function lettersWithTerms() {
  return new Set(GLOSSARY_TERMS.map((t) => t.letter));
}

function buildAlphabet() {
  const available = lettersWithTerms();
  alphabetFilterEl.innerHTML = "";

  ALPHABET.forEach((letter) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = letter;
    btn.disabled = !available.has(letter);
    if (letter === activeLetter) btn.classList.add("active");

    btn.addEventListener("click", () => {
      activeLetter = activeLetter === letter ? null : letter;
      buildAlphabet();
      renderTerms();
    });

    alphabetFilterEl.appendChild(btn);
  });
}

function renderTerms() {
  const query = searchInputEl.value.trim().toLowerCase();

  const filtered = GLOSSARY_TERMS.filter((item) => {
    const matchesLetter = !activeLetter || item.letter === activeLetter;
    const matchesQuery =
      !query ||
      item.term.toLowerCase().includes(query) ||
      item.definition.toLowerCase().includes(query);
    return matchesLetter && matchesQuery;
  });

  termsGridEl.innerHTML = "";

  if (filtered.length === 0) {
    const empty = document.createElement("p");
    empty.textContent = "Nenhum termo encontrado.";
    empty.style.gridColumn = "1 / -1";
    empty.style.textAlign = "center";
    empty.style.color = "#6b756c";
    termsGridEl.appendChild(empty);
    return;
  }

  filtered.forEach((item) => {
    const card = document.createElement("div");
    card.className = "term-card";
    card.innerHTML = `<h3>${item.term}</h3><p>${item.definition}</p>`;
    termsGridEl.appendChild(card);
  });
}

searchInputEl.addEventListener("input", renderTerms);

viewAllBtn.addEventListener("click", () => {
  activeLetter = null;
  searchInputEl.value = "";
  buildAlphabet();
  renderTerms();
});

buildAlphabet();
renderTerms();