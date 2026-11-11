const GLOSSARY_TERMS = [
    {
        letter: "A",
        term: "Adaptação Climática",
        definition: "Ajustes em sistemas humanos ou naturais para reduzir os danos causados pelas mudanças climáticas. Fonte: IPCC Glossário de mudanças climáticas."
    },
    {
        letter: "A",
        term: "Albedo Urbano",
        definition: "Capacidade das superfícies urbanas de refletir a energia solar. Fonte: USGS - Albedo e seus efeitos no clima."
    },
    {
        letter: "A",
        term: "Antropoceno",
        definition: "Termo usado para descrever a influência significativa das atividades humanas sobre o planeta; sua formalização como época geológica não foi aprovada oficialmente pela comunidade estratigráfica. Fonte: Comissão Internacional de Estratigrafia."
    },
    {
        letter: "A",
        term: "Aquecimento Global",
        definition: "Aumento da temperatura média global, principalmente devido às emissões humanas de gases de efeito estufa. Fonte: IPCC."
    },
    {
        letter: "A",
        term: "Arborização Urbana",
        definition: "Planejamento, plantio, conservação e manejo de árvores em ambientes urbanos. Fonte: FAO - Florestas urbanas."
    },
    {
        letter: "B",
        term: "Biodiversidade Urbana",
        definition: "Diversidade de espécies e ecossistemas presentes nas cidades e em suas áreas naturais. Fonte: Convenção sobre Diversidade Biológica Cities and Biodiversity Outlook."
    },
    {
        letter: "B",
        term: "Biovaleta",
        definition: "Canal vegetado que desacelera, filtra e facilita a infiltração da água da chuva. Fonte: São Paulo Urbanismo Jardins de chuva e biovaletas."
    },
    {
        letter: "B",
        term: "Bosque Urbano",
        definition: "Área arborizada situada dentro ou próximo da cidade, que oferece habitat para espécies e benefícios ambientais. Fonte: FAO Florestas urbanas e periurbanas."
    },
    {
        letter: "C",
        term: "Carbono Neutro (Net Zero)",
        definition: "Situação em que as emissões de gases de efeito estufa são equilibradas pela remoção desses gases da atmosfera. Fonte: IPCC Relatório sobre mitigação climática."
    },
    {
        letter: "C",
        term: "Clima Urbano",
        definition: "Condições climáticas de uma cidade, influenciadas por construções, vegetação, superfícies impermeáveis e atividades humanas. Fonte: Agência de Proteção Ambiental dos Estados Unidos (EPA) Ilhas de calor."
    },
    {
        letter: "C",
        term: "Cobertura Arbórea",
        definition: "Proporção do terreno coberta pela projeção das copas das árvores. Fonte: EPA Árvores urbanas e infraestrutura verde."
    },
    {
        letter: "C",
        term: "Combustíveis Fósseis",
        definition: "Fontes de energia, como carvão, petróleo e gás natural, formadas a partir de matéria orgânica antiga e responsáveis por emissões quando queimadas. Fonte: IPCC Glossário."
    },
    {
        letter: "C",
        term: "Conforto Térmico",
        definition: "Condição em que uma pessoa se sente termicamente confortável com o ambiente. Fonte: Normas de conforto térmico ASHRAE."
    },
    {
        letter: "C",
        term: "Corredores Ecológicos",
        definition: "Faixas de habitat que conectam áreas naturais e facilitam o deslocamento de espécies entre elas. Fonte: Convenção sobre Diversidade Biológica."
    },
    {
        letter: "C",
        term: "Crise Climática",
        definition: "Expressão que destaca a urgência dos impactos das mudanças climáticas e a necessidade de enfrentá-los. Fonte: ONU Ação climática."
    },
    {
        letter: "D",
        term: "Descarbonização",
        definition: "Redução das emissões de dióxido de carbono associadas à energia, aos transportes, à indústria e a outras atividades. Fonte: IPCC Mitigação das mudanças climáticas."
    },
    {
        letter: "D",
        term: "Desmatamento Urbano",
        definition: "Remoção da cobertura florestal ou arbórea em áreas urbanas, geralmente associada à expansão da ocupação humana. Fonte: FAO Recursos florestais urbanos."
    },
    {
        letter: "D",
        term: "Drenagem Sustentável",
        definition: "Estratégias que retêm, infiltram e filtram a água da chuva para reduzir alagamentos e poluição. Fonte: EPA - Infraestrutura verde e cinza."
    },
    {
        letter: "E",
        term: "Ecologia Urbana",
        definition: "Estudo das interações entre organismos vivos e o ambiente urbano, incluindo suas dimensões naturais e humanas. Fonte: Convenção sobre Diversidade Biológica Cities and Biodiversity Outlook."
    },
    {
        letter: "E",
        term: "Efeito Estufa",
        definition: "Fenômeno natural em que gases atmosféricos absorvem e emitem radiação infravermelha, retendo parte do calor terrestre. Fonte: IPCC - Glossário."
    },
    {
        letter: "E",
        term: "Emissões de GEE",
        definition: "Liberação de gases de efeito estufa na atmosfera por atividades humanas ou processos naturais. Fonte: IPCC - Glossário."
    },
    {
        letter: "E",
        term: "Enchentes Urbanas",
        definition: "Inundações em áreas urbanizadas, frequentemente agravadas pela impermeabilização do solo e pela insuficiência da drenagem. Fonte: EPA Gestão de águas pluviais."
    },
    {
        letter: "E",
        term: "Espaços Azuis e Verdes",
        definition: "Áreas urbanas com vegetação e corpos d'água, como parques, jardins, rios e lagos, que contribuem para o bem-estar e o equilíbrio ambiental. Fonte: ONU-Habitat."
    },
    {
        letter: "E",
        term: "Estresse Hídrico",
        definition: "Situação em que a demanda por água ou as necessidades ambientais se aproximam ou ultrapassam a disponibilidade de recursos hídricos. Fonte: ONU Objetivos de Desenvolvimento Sustentável, ODS 6."
    },
    {
        letter: "E",
        term: "Evapotranspiração",
        definition: "Processo combinado de evaporação da água do solo e de outras superfícies com a transpiração das plantas. Fonte: EPA Tipos de infraestrutura verde."
    },
    {
        letter: "F",
        term: "Fachada Verde",
        definition: "Fachada de edifício com vegetação instalada diretamente na parede ou em estruturas de suporte, podendo proporcionar sombra e reduzir o aquecimento. Fonte: EPA Redução das ilhas de calor."
    },
    {
        letter: "F",
        term: "Fitossanidade Urbana",
        definition: "Condição de saúde das árvores e demais plantas urbanas, incluindo prevenção, diagnóstico e controle de doenças e pragas. Fonte: Prefeitura de Macaé Manual de Arborização Urbana."
    },
    {
        letter: "F",
        term: "Floresta Urbana",
        definition: "Conjunto de árvores, grupos arbóreos e áreas florestadas localizados nas cidades e em suas proximidades. Fonte: FAO Florestas urbanas."
    },
    {
        letter: "G",
        term: "Gentrificação Verde",
        definition: "Processo em que melhorias ambientais e a valorização de uma região podem aumentar os custos de moradia e deslocar moradores de menor renda. Fonte: ONU-Habitat."
    },
    {
        letter: "G",
        term: "Gases de Efeito Estufa (GEE)",
        definition: "Gases atmosféricos que absorvem e emitem radiação infravermelha, como dióxido de carbono, metano e óxido nitroso. Fonte: IPCC - Glossário."
    },
    {
        letter: "I",
        term: "Ilha de Calor Urbana",
        definition: "Fenômeno em que determinadas áreas urbanas apresentam temperaturas superiores às de áreas rurais próximas, devido, entre outros fatores, às superfícies construídas e à escassez de vegetação. Fonte: EPA - Redução das ilhas de calor."
    },
    {
        letter: "I",
        term: "Impermeabilização do Solo",
        definition: "Cobertura do solo por materiais que dificultam ou impedem a infiltração da água, como asfalto e concreto. Fonte: EPA Infraestrutura verde e cinza."
    },
    {
        letter: "I",
        term: "Infraestrutura Verde",
        definition: "Rede de áreas naturais e soluções vegetadas que oferece benefícios ambientais e auxilia na gestão da água, na redução do calor e na conservação da biodiversidade. Fonte: EPA Pesquisa sobre infraestrutura verde."
    },
    {
        letter: "J",
        term: "Jardim de Chuva",
        definition: "Depressão vegetada que coleta água da chuva e favorece sua infiltração no solo, reduzindo o escoamento superficial. Fonte: EPA Tipos de infraestrutura verde."
    },
    {
        letter: "J",
        term: "Justiça Climática",
        definition: "Princípio que considera a distribuição desigual dos impactos climáticos e defende uma resposta justa, especialmente para as populações mais vulneráveis. Fonte: Convenção-Quadro das Nações Unidas sobre Mudança do Clima (UNFCCC)."
    },
    {
        letter: "M",
        term: "Metabolismo Urbano",
        definition: "Abordagem que analisa os fluxos de energia, água, alimentos, materiais e resíduos de uma cidade, como se ela fosse um sistema. Fonte: ONU-Habitat."
    },
    {
        letter: "M",
        term: "Microclima",
        definition: "Condições atmosféricas específicas de uma área pequena, que podem diferir das condições gerais da região. Fonte: Serviço Nacional de Meteorologia dos Estados Unidos (NWS)."
    },
    {
        letter: "M",
        term: "Mitigação Climática",
        definition: "Intervenções que reduzem as emissões de gases de efeito estufa ou aumentam sua remoção da atmosfera. Fonte: IPCC Glossário."
    },
    {
        letter: "M",
        term: "Mudanças Climáticas",
        definition: "Alterações persistentes nos padrões climáticos, incluindo temperatura e precipitação, decorrentes de fatores naturais e humanos. Fonte: IPCC Relatório sobre a ciência do clima."
    },
    {
        letter: "O",
        term: "Ondas de Calor",
        definition: "Períodos de calor extremo que persistem por vários dias, conforme critérios definidos para cada região. Fonte: Organização Meteorológica Mundial (OMM)."
    },
    {
        letter: "P",
        term: "Pegada de Carbono",
        definition: "Estimativa das emissões de gases de efeito estufa associadas a uma pessoa, produto, organização, atividade ou território. Fonte: GHG Protocol."
    },
    {
        letter: "P",
        term: "Permeabilidade",
        definition: "Capacidade de um material ou solo de permitir a passagem de fluidos, como a água. Fonte: EPA Infraestrutura verde e gestão pluvial."
    },
    {
        letter: "P",
        term: "Planejamento Urbano Sensível à Água",
        definition: "Abordagem de planejamento que incorpora o ciclo da água ao desenho e ao desenvolvimento das cidades, buscando melhorar a drenagem e reduzir impactos ambientais. Fonte: EPA Infraestrutura verde."
    },
    {
        letter: "P",
        term: "Poluição Atmosférica",
        definition: "Presença de gases, partículas ou outras substâncias no ar em concentrações capazes de prejudicar a saúde ou o ambiente. Fonte: Organização Mundial da Saúde (OMS) - Poluição do ar."
    },
    {
        letter: "R",
        term: "Resiliência Urbana",
        definition: "Capacidade de uma cidade e de seus sistemas de resistir, adaptar-se e recuperar-se de ameaças, crises e perturbações. Fonte: IPCC - Glossário."
    },
    {
        letter: "S",
        term: "Sequestro de Carbono",
        definition: "Captura e armazenamento de dióxido de carbono, por exemplo, por meio da absorção pelas plantas e armazenamento do carbono na biomassa e no solo. Fonte: IPCC Glossário."
    },
    {
        letter: "S",
        term: "Serviços Ecossistêmicos",
        definition: "Benefícios que as pessoas obtêm dos ecossistemas, como regulação climática, purificação da água, polinização e fornecimento de alimentos. Fonte: Convenção sobre Diversidade Biológica Cities and Biodiversity Outlook."
    },
    {
        letter: "S",
        term: "Sustentabilidade Urbana",
        definition: "Desenvolvimento das cidades que busca conciliar qualidade de vida, proteção ambiental, inclusão social e viabilidade econômica no presente e no futuro. Fonte: ONU Objetivo de Desenvolvimento Sustentável 11."
    },
    {
        letter: "T",
        term: "Telhado Verde",
        definition: "Cobertura de edifício preparada para receber vegetação e substrato, contribuindo para a retenção da água da chuva e a redução do aquecimento. Fonte: EPA Tipos de infraestrutura verde."
    }
];

const GLOSSARY_REFERENCES = [
    "AMERICAN SOCIETY OF HEATING, REFRIGERATING AND AIR-CONDITIONING ENGINEERS (ASHRAE). Standard 55: Thermal Environmental Conditions for Human Occupancy. [S. 1.], [s. d.]. Disponível em: https://www.ashrae.org/technical-resources/bookstore/standard-55-thermal-environmental-conditions-for-human-occupancy. Acesso em: 11 nov. 2026.",
    "CONVENÇÃO SOBRE DIVERSIDADE BIOLÓGICA (CBD). Cities and Biodiversity Outlook. [S. 1.], [s. d.]. Disponível em: https://wedocs.unep.org/items/1daa7b60-7c5e-4531-af24-9cafcf0c136c. Acesso em: 11 nov. 2026.",
    "CONVENÇÃO SOBRE DIVERSIDADE BIOLÓGICA (CBD). Convention on Biological Diversity. [S. 1.], [s. d.]. Disponível em: https://www.cbd.int/. Acesso em: 11 nov. 2026.",
    "ESTADOS UNIDOS. Environmental Protection Agency (EPA). Green and Gray Infrastructure Research. [S. 1.], [s. d.]. Disponível em: https://www.epa.gov/water-research/green-and-gray-infrastructure-research. Acesso em: 11 nov. 2026.",
    "ESTADOS UNIDOS. Environmental Protection Agency (EPA). Reduce Heat Islands. [S. 1.], [s. d.]. Disponível em: https://www.epa.gov/green-infrastructure/reduce-heat-islands. Acesso em: 11 nov. 2026.",
    "ESTADOS UNIDOS. Environmental Protection Agency (EPA). Types of Green Infrastructure. [S. 1.], [s. d.]. Disponível em: https://www.epa.gov/green-infrastructure/types-green-infrastructure. Acesso em: 11 nov. 2026.",
    "ESTADOS UNIDOS. Environmental Protection Agency (EPA). Urban Street Trees and Green Infrastructure. [S. 1.], [s. d.]. Disponível em: https://www.epa.gov/water-research/urban-street-trees-and-green-infrastructure. Acesso em: 11 nov. 2026.",
    "FOOD AND AGRICULTURE ORGANIZATION OF THE UNITED NATIONS (FAO). Urban Forestry. [S. 1.], [s. d.]. Disponível em: https://www.fao.org/forestry-fao/urbanforestry/87025/en/. Acesso em: 11 nov. 2026.",
    "GREENHOUSE GAS PROTOCOL (GHG PROTOCOL). GHG Protocol. [S. 1.], [s. d.]. Disponível em: https://ghgprotocol.org/. Acesso em: 11 nov. 2026.",
    "INTERGOVERNMENTAL PANEL ON CLIMATE CHANGE (IPCC). Annex II: Glossary. [S. I.], [s. d.]. Disponível em: https://www.ipcc.ch/report/ar6/wg2/chapter/annex-ii/. Acesso em: 11 nov. 2026.",
    "INTERGOVERNMENTAL PANEL ON CLIMATE CHANGE (IPCC). Climate Change 2021: The Physical Science Basis. [S. 1.], 2021. Disponível em: https://www.ipcc.ch/report/ar6/wg1/. Acesso em: 11 nov. 2026.",
    "INTERGOVERNMENTAL PANEL ON CLIMATE CHANGE (IPCC). Climate Change 2022: Mitigation of Climate Change. [S. 1.], 2022. Disponível em: https://www.ipcc.ch/report/ar6/wg3/. Acesso em: 11 nov. 2026.",
    "INTERNATIONAL COMMISSION ON STRATIGRAPHY. International Commission on Stratigraphy. [S. 1.], [s. d.]. Disponível em: https://stratigraphy.org/. Acesso em: 11 nov. 2026.",
    "MACAÉ (RJ). Prefeitura Municipal. Manual de Arborização Urbana. Macaé, [s. d.]. Disponível em: https://macae.rj.gov.br/midia/conteudo/arquivos/1764864676.pdf. Acesso em: 11 nov. 2026.",
    "NAÇÕES UNIDAS. Climate Action. [S. 1.], [s. d.]. Disponível em: https://www.un.org/en/climatechange. Acesso em: 11 nov. 2026.",
    "NAÇÕES UNIDAS. Sustainable Development Goal 6: Clean Water and Sanitation. [S. I.], [s. d.]. Disponível em: https://sdgs.un.org/goals/goal6. Acesso em: 11 nov. 2026.",
    "NAÇÕES UNIDAS. Sustainable Development Goal 11: Sustainable Cities and Communities. [S. 1.], [s. d.]. Disponível em: https://sdgs.un.org/goals/goalll. Acesso em: 11 nov. 2026.",
    "NATIONAL WEATHER SERVICE (NWS). National Weather Service. [S. 1.], [s. d.]. Disponível em: https://www.weather.gov/. Acesso em: 11 nov. 2026.",
    "ORGANIZAÇÃO METEOROLÓGICA MUNDIAL (OMM). World Meteorological Organization. [S. 1.], [s. d.]. Disponível em: https://wmo.int/. Acesso em: 11 nov. 2026.",
    "ORGANIZAÇÃO MUNDIAL DA SAÚDE (OMS). Air Pollution. [S. 1.], [s. d.]. Disponível em: https://www.who.int/health-topics/air-pollution. Acesso em: 11 nov. 2026.",
    "SÃO PAULO (Município). São Paulo Urbanismo. Jardins de chuva e biovaletas. São Paulo, [s. d.] Disponível em: https://prefeitura.sp.gov.br/web/sp_urbanismo/w/325416. Acesso em: 11 nov. 2026.",
    "UNITED NATIONS FRAMEWORK CONVENTION ON CLIMATE CHANGE (UNFCCC). Climate Risk Insurance and Risk Financing in the Context of Climate Justice. [S. 1.], [s. d.]. Disponível em: https://unfccc.int/sites/default/files/resource/Climate%20Risk%20Insurance%20and%20Risk%20Financing%20in%20the%20Context%20of%20Climate%20Justice.pdf. Acesso em: 11 nov. 2026.",
    "UNITED NATIONS HUMAN SETTLEMENTS PROGRAMME (UN-HABITAT). UN-Habitat. [S. 1.], [s. d.]. Disponível em: https://unhabitat.org/. Acesso em: 11 nov. 2026.",
    "UNITED STATES GEOLOGICAL SURVEY (USGS). Albedo and Its Importance: How It Can Affect Climate. [S. 1.], [s. d.]. Disponível em: https://www.usgs.gov/news/landsat-science-teams-crystal-schaaf-discusses-albedo-its-importance-and-how-it-can-affect. Acesso em: 11 nov. 2026."
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