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
  },
  {
    letter: "A",
    term: "Albedo urbano",
    definition: "Capacidade das superfícies de refletirem ou absorverem radiação solar, influenciando a temperatura urbana."
  },
  {
    letter: "C",
    term: "Cobertura do solo",
    definition: "Tipo de superfície predominante em uma área, como vegetação, concreto ou asfalto."
  },
  {
    letter: "C",
    term: "Corredores verdes",
    definition: "Faixas contínuas de vegetação que conectam parques e áreas naturais, favorecendo a circulação de ar fresco e a biodiversidade."
  },
  {
    letter: "E",
    term: "Efeito Canyon urbano",
    definition: "Acúmulo de calor em ruas estreitas cercadas por prédios altos. Consequência: redução da ventilação natural e intensificação do calor local."
  },
  {
    letter: "E",
    term: "Efeito de ilha de frescor",
    definition: "Áreas verdes que criam bolsões de temperaturas mais baixas em meio ao calor urbano. Consequência: melhora da qualidade de vida e redução da demanda por ar-condicionado."
  },
  {
    letter: "F",
    term: "Fragmentação verde",
    definition: "Quebra de áreas contínuas de vegetação em pequenos espaços isolados. Consequência: perda de eficiência no resfriamento e redução da biodiversidade."
  },
  {
    letter: "I",
    term: "Ilha de calor superficial",
    definition: "Fenômeno medido pela temperatura da superfície (solo, telhados, pavimentos), geralmente mais elevada em áreas urbanas."
  },
  {
    letter: "I",
    term: "Ilha de calor urbana",
    definition: "Fenômeno em que áreas urbanas ficam mais quentes que áreas rurais."
  },
  {
    letter: "I",
    term: "Impermeabilização do solo",
    definition: "Cobertura do solo por concreto e asfalto, impedindo a infiltração de água. Consequência: aumento da temperatura e maior risco de enchentes."
  },
  {
    letter: "I",
    term: "Infraestrutura verde",
    definition: "Parques, telhados verdes e corredores ecológicos que ajudam a reduzir o calor urbano."
  },
  {
    letter: "M",
    term: "Microclima urbano",
    definition: "Condições climáticas específicas de uma área urbana, influenciadas pela vegetação."
  },
  {
    letter: "M",
    term: "Mitigação climática",
    definition: "Estratégias que utilizam vegetação para reduzir os impactos do aquecimento urbano e das mudanças climáticas."
  },
  {
    letter: "P",
    term: "Poluição térmica",
    definition: "Alteração do equilíbrio térmico natural devido ao excesso de calor gerado por atividades humanas. Consequência: impacto negativo na fauna, flora e no bem-estar humano."
  },
  {
    letter: "S",
    term: "Stress térmico",
    definition: "Condição em que o corpo humano sofre devido ao excesso de calor e à baixa capacidade de resfriamento. Consequência: aumento de doenças cardiovasculares e respiratórias."
  },
  {
    letter: "S",
    term: "Supressão vegetal",
    definition: "Remoção de vegetação."
  }
];

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const alphabetFilterEl = document.getElementById("alphabetFilter");
const termsGridEl = document.getElementById("termsGrid");
const searchInputEl = document.getElementById("searchInput");

let activeLetter = null;

function lettersWithTerms() {
  return new Set(GLOSSARY_TERMS.map((t) => t.letter));
}

// Verifica se a busca digitada é uma única letra (ex: "a", "B")
function getLetterFromQuery(query) {
  if (query.length === 1 && /^[a-z]$/i.test(query)) {
    return query.toUpperCase();
  }
  return null;
}

function buildAlphabet() {
  const available = lettersWithTerms();
  const typedLetter = getLetterFromQuery(searchInputEl.value.trim().toLowerCase());

  alphabetFilterEl.innerHTML = "";

  ALPHABET.forEach((letter) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = letter;
    btn.disabled = !available.has(letter);

    // Destaca a letra clicada OU a letra digitada na busca
    if (letter === activeLetter || letter === typedLetter) {
      btn.classList.add("active");
    }

    btn.addEventListener("click", () => {
      // Clicar numa letra também preenche e limpa a busca de texto,
      // evitando conflito entre os dois modos de filtro
      searchInputEl.value = "";
      activeLetter = activeLetter === letter ? null : letter;
      buildAlphabet();
      renderTerms();
    });

    alphabetFilterEl.appendChild(btn);
  });
}

function renderTerms() {
  const query = searchInputEl.value.trim().toLowerCase();
  const typedLetter = getLetterFromQuery(query);

  const filtered = GLOSSARY_TERMS.filter((item) => {
    const matchesLetter = !activeLetter || item.letter === activeLetter;

    let matchesQuery;
    if (!query) {
      matchesQuery = true;
    } else if (typedLetter) {
      // Busca de uma única letra: filtra pelos termos daquela inicial
      matchesQuery = item.letter === typedLetter;
    } else {
      // Busca normal: procura no termo e na definição
      matchesQuery =
        item.term.toLowerCase().includes(query) ||
        item.definition.toLowerCase().includes(query);
    }

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

searchInputEl.addEventListener("input", () => {
  // Ao digitar, também atualiza o destaque do alfabeto
  buildAlphabet();
  renderTerms();
});

buildAlphabet();
renderTerms();