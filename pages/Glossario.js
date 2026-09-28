const GLOSSARY_TERMS = [
    {
        letter: "A",
        term: "Adaptação Climática",
        definition: "Ações tomadas em cidades para minimizar os danos projetados e atuais causados pelo aquecimento global, como construção de infraestruturas resilientes."
    },
    {
        letter: "A",
        term: "Albedo Urbano",
        definition: "Medida de refletividade das superfícies da cidade; telhados brancos possuem alto albedo (refletem calor), enquanto asfalto possui baixo albedo (absorve calor)."
    },
    {
        letter: "A",
        term: "Antropoceno",
        definition: "Época geológica atual, caracterizada pelo impacto significativo e global das atividades humanas sobre os ecossistemas terrestres."
    },
    {
        letter: "A",
        term: "Aquecimento Global",
        definition: "Aumento gradual da temperatura média dos oceanos e da atmosfera terrestre, causado principalmente por atividades humanas."
    },
    {
        letter: "A",
        term: "Arborização Urbana",
        definition: "Planejamento, plantio e manutenção continuada de árvores dentro dos limites de uma cidade, essencial para a regulação térmica."
    },
    {
        letter: "B",
        term: "Biodiversidade Urbana",
        definition: "A variedade de espécies de plantas, animais e micro-organismos que habitam e interagem no ecossistema das cidades."
    },
    {
        letter: "B",
        term: "Biovaleta",
        definition: "Canal linear com vegetação projetado para concentrar e filtrar a água das chuvas, reduzindo enchentes e a carga de poluentes nos rios."
    },
    {
        letter: "B",
        term: "Bosque Urbano",
        definition: "Pedaços de áreas florestadas que permanecem dentro da malha urbana, atuando como refúgios para a fauna e sumidouros de carbono."
    },
    {
        letter: "C",
        term: "Carbono Neutro (Net Zero)",
        definition: "Estado em que a quantidade de emissões de gases de efeito estufa produzida por uma cidade é totalmente compensada pelo sequestro ambiental."
    },
    {
        letter: "C",
        term: "Clima Urbano",
        definition: "O clima específico de uma área metropolitana, que difere das áreas rurais vizinhas devido às estruturas físicas e emissões térmicas locais."
    },
    {
        letter: "C",
        term: "Cobertura Arbórea",
        definition: "A porcentagem da área de uma cidade que é coberta pelas copas das árvores quando vista de cima."
    },
    {
        letter: "C",
        term: "Combustíveis Fósseis",
        definition: "Fontes de energia (como carvão, petróleo e gás natural) cuja queima é a principal causa do aquecimento global."
    },
    {
        letter: "C",
        term: "Conforto Térmico",
        definition: "A condição mental de satisfação com o ambiente térmico local, fortemente influenciada pela presença ou ausência de sombra vegetal."
    },
    {
        letter: "C",
        term: "Corredores Ecológicos",
        definition: "Faixas de vegetação contínuas que conectam parques e reservas isoladas na cidade, permitindo o fluxo seguro de espécies."
    },
    {
        letter: "C",
        term: "Crise Climática",
        definition: "Termo que enfatiza a urgência e as consequências desastrosas do aquecimento global acelerado, exigindo ação imediata."
    },
    {
        letter: "D",
        term: "Descarbonização",
        definition: "Processo de substituição de matrizes energéticas e materiais nas cidades para eliminar o lançamento de gás carbônico na atmosfera."
    },
    {
        letter: "D",
        term: "Desmatamento Urbano",
        definition: "Remoção gradual da vegetação original de uma área urbana para fins de especulação imobiliária ou infraestrutura viária."
    },
    {
        letter: "D",
        term: "Drenagem Sustentável",
        definition: "Técnicas alternativas ao asfalto e tubulações, utilizando o solo e plantas nativas para reter a água das chuvas no local."
    },
    {
        letter: "E",
        term: "Ecologia Urbana",
        definition: "Ramo da biologia que estuda a interação dos organismos vivos (humanos e não-humanos) com o ambiente construído das cidades."
    },
    {
        letter: "E",
        term: "Efeito Estufa",
        definition: "Fenômeno natural intensificado pela poluição humana, onde gases na atmosfera retêm o calor do Sol, não o deixando escapar para o espaço."
    },
    {
        letter: "E",
        term: "Emissões de GEE",
        definition: "Liberação de Gases de Efeito Estufa (como CO2 e metano) pelos transportes urbanos, indústrias e decomposição de lixo."
    },
    {
        letter: "E",
        term: "Enchentes Urbanas",
        definition: "Acúmulo descontrolado de água devido à excessiva impermeabilização do solo, agravado por tempestades mais intensas causadas pelas mudanças climáticas."
    },
    {
        letter: "E",
        term: "Espaços Azuis e Verdes",
        definition: "Redes integradas de vegetação (verde) e corpos d'água (azul) dentro das cidades, vitais para a refrigeração do ar."
    },
    {
        letter: "E",
        term: "Estresse Hídrico",
        definition: "Escassez de água disponível, um risco crescente para a sobrevivência da vegetação urbana em regiões afetadas por secas extremas."
    },
    {
        letter: "E",
        term: "Evapotranspiração",
        definition: "Processo biológico onde as plantas absorvem água do solo e a liberam como vapor pelas folhas, funcionando como um ar-condicionado natural."
    },
    {
        letter: "F",
        term: "Fachada Verde",
        definition: "Paredes e muros externos cobertos por plantas, que ajudam a isolar os prédios contra o calor excessivo, reduzindo o uso de energia."
    },
    {
        letter: "F",
        term: "Fitossanidade Urbana",
        definition: "Manejo e prevenção do adoecimento das árvores urbanas, garantindo que não se tornem um risco de queda durante tempestades."
    },
    {
        letter: "F",
        term: "Floresta Urbana",
        definition: "A totalidade das árvores encontradas em calçadas, quintais, praças e parques de uma região metropolitana."
    },
    {
        letter: "G",
        term: "Gentrificação Verde",
        definition: "Aumento exagerado do custo de vida em bairros após a instalação de infraestrutura ambiental, forçando a expulsão de residentes pobres."
    },
    {
        letter: "G",
        term: "Gases de Efeito Estufa (GEE)",
        definition: "Gases presentes na atmosfera que absorvem a radiação infravermelha, responsáveis pelo aquecimento do planeta."
    },
    {
        letter: "I",
        term: "Ilha de Calor Urbana",
        definition: "Fenômeno microclimático no qual o centro das cidades retém significativamente mais calor do que as áreas rurais periféricas devido ao asfalto, concreto e falta de árvores."
    },
    {
        letter: "I",
        term: "Impermeabilização do Solo",
        definition: "Cobertura do terreno natural com materiais não porosos (concreto, asfalto), que impede a recarga de aquíferos e gera enchentes superficiais."
    },
    {
        letter: "I",
        term: "Infraestrutura Verde",
        definition: "Uma rede interconectada de espaços naturais, semi-naturais e artificiais verdes que fornecem serviços ecossistêmicos à comunidade humana."
    },
    {
        letter: "J",
        term: "Jardim de Chuva",
        definition: "Pequenas depressões no terreno preenchidas com plantas nativas, projetadas para receber o escoamento rápido de água de ruas e telhados."
    },
    {
        letter: "J",
        term: "Justiça Climática",
        definition: "Abordagem que reconhece que as consequências do aquecimento global afetam desproporcionalmente as populações mais vulneráveis em áreas sem vegetação."
    },
    {
        letter: "M",
        term: "Metabolismo Urbano",
        definition: "Um modelo para entender o funcionamento de uma cidade, quantificando os fluxos de energia, água e materiais (e seus resíduos)."
    },
    {
        letter: "M",
        term: "Microclima",
        definition: "Condições atmosféricas de uma zona muito restrita, como o ar fresco e úmido mantido debaixo da copa de uma grande figueira na praça."
    },
    {
        letter: "M",
        term: "Mitigação Climática",
        definition: "Esforços estruturais e políticos focados em reduzir ou evitar ativamente a emissão de gases de efeito estufa."
    },
    {
        letter: "M",
        term: "Mudanças Climáticas",
        definition: "Alterações de longo prazo nas temperaturas e nos padrões climáticos do planeta, gerando secas severas ou temporais fora do normal."
    },
    {
        letter: "O",
        term: "Ondas de Calor",
        definition: "Períodos anormais de vários dias de temperaturas perigosamente altas, frequentemente exacerbados pela densidade do concreto urbano."
    },
    {
        letter: "P",
        term: "Pegada de Carbono",
        definition: "O cálculo total da quantidade de gases de efeito estufa gerados por nossas ações, dietas ou pelo consumo geral da cidade."
    },
    {
        letter: "P",
        term: "Permeabilidade",
        definition: "A capacidade física que o solo natural e as áreas verdes têm de deixar a água passar através de si em direção aos lençóis freáticos."
    },
    {
        letter: "P",
        term: "Planejamento Urbano Sensível à Água",
        definition: "Design urbano que integra o ciclo natural da água ao desenvolvimento imobiliário, reduzindo riscos de inundações."
    },
    {
        letter: "P",
        term: "Poluição Atmosférica",
        definition: "Acúmulo de partículas finas e gases tóxicos no ar das cidades; árvores grandes atuam como filtros que capturam parte dessas toxinas."
    },
    {
        letter: "R",
        term: "Resiliência Urbana",
        definition: "A capacidade sistêmica de uma cidade sobreviver, adaptar-se e crescer apesar de choques crônicos (como secas) e estresses agudos (como furacões)."
    },
    {
        letter: "S",
        term: "Sequestro de Carbono",
        definition: "Captura e armazenamento do dióxido de carbono atmosférico pela fotossíntese das plantas, fixando o carbono em seus troncos e raízes."
    },
    {
        letter: "S",
        term: "Serviços Ecossistêmicos",
        definition: "Os incontáveis benefícios e utilidades gratuitas que a natureza fornece à cidade, como purificação do ar, controle de ruídos e polinização."
    },
    {
        letter: "S",
        term: "Sustentabilidade Urbana",
        definition: "Padrão de desenvolvimento que atende às necessidades dos moradores atuais sem comprometer a capacidade de sobrevivência das gerações futuras."
    },
    {
        letter: "T",
        term: "Telhado Verde",
        definition: "Coberturas de construções preparadas com camadas de impermeabilizante, terra e plantas, diminuindo a temperatura interna dos prédios e filtrando chuva."
    },
    {
        letter: "V",
        term: "Vulnerabilidade Climática",
        definition: "O grau de exposição e incapacidade de uma área ou grupo populacional urbano de lidar com os efeitos adversos das mudanças do clima."
    }
];

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const alphabetFilterEl = document.getElementById("alphabetFilter");
const termsGridEl = document.getElementById("termsGrid");
const searchInputEl = document.getElementById("searchInput");

let activeLetter = null;

function lettersWithTerms() {
    return new Set(
        GLOSSARY_TERMS.map((term) => term.letter)
    );
}

function getLetterFromQuery(query) {
    if (query.length === 1 && /^[a-z]$/i.test(query)) {
        return query.toUpperCase();
    }

    return null;
}

function buildAlphabet() {
    const available = lettersWithTerms();

    const typedLetter = getLetterFromQuery(
        searchInputEl.value.trim()
    );

    alphabetFilterEl.innerHTML = "";

    ALPHABET.forEach((letter) => {
        const button = document.createElement("button");

        button.type = "button";
        button.textContent = letter;
        button.disabled = !available.has(letter);

        if (
            letter === activeLetter ||
            letter === typedLetter
        ) {
            button.classList.add("active");
        }

        button.addEventListener("click", () => {
            searchInputEl.value = "";

            if (activeLetter === letter) {
                activeLetter = null;
            } else {
                activeLetter = letter;
            }

            buildAlphabet();
            renderTerms();
        });

        alphabetFilterEl.appendChild(button);
    });
}

function renderTerms() {
    const query = searchInputEl.value
        .trim()
        .toLowerCase();

    const typedLetter = getLetterFromQuery(query);

    const filtered = GLOSSARY_TERMS.filter((item) => {
        const matchesLetter =
            !activeLetter ||
            item.letter === activeLetter;

        let matchesQuery;

        if (!query) {
            matchesQuery = true;
        } else if (typedLetter) {
            matchesQuery =
                item.letter === typedLetter;
        } else {
            matchesQuery =
                item.term.toLowerCase().includes(query) ||
                item.definition.toLowerCase().includes(query);
        }

        return matchesLetter && matchesQuery;
    });

    termsGridEl.innerHTML = "";

    if (filtered.length === 0) {
        const empty = document.createElement("p");

        empty.className = "empty-message";
        empty.textContent = "Nenhum termo encontrado.";

        termsGridEl.appendChild(empty);

        return;
    }

    filtered.forEach((item) => {
        const card = document.createElement("article");

        card.className = "term-card";

        const title = document.createElement("h3");
        title.textContent = item.term;

        const definition = document.createElement("p");
        definition.textContent = item.definition;

        card.appendChild(title);
        card.appendChild(definition);

        termsGridEl.appendChild(card);
    });
}

searchInputEl.addEventListener("input", () => {
    activeLetter = null;
    buildAlphabet();
    renderTerms();
});

buildAlphabet();
renderTerms();