
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('cards-container');
    const sectionTitle = document.getElementById('section-title');

    const buttons = {
        podcast: document.getElementById('btn-podcast'),
        filmes: document.getElementById('btn-filmes'),
        documentarios: document.getElementById('btn-documentarios')
    };

    if (!container || !sectionTitle) {
        console.error(
            'Arboriza: não foi encontrado o container de mídia ou o título da seção.'
        );
        return;
    }

    // Catálogo de conteúdos com links diretos.
    // Os links são abertos em uma nova aba.
    const midias = {
        podcast: [
            {
                titulo: 'O erro que tornou as cidades brasileiras mais quentes',
                descricao:
                    'Uma conversa sobre a retirada de árvores e plantas nativas das cidades e os impactos dessa mudança no ambiente urbano.',
                tipo: 'Podcast • Mesa da Rita',
                icone: '🎧',
                url: 'https://open.spotify.com/episode/1nFSuAJahFB452837j9LON',
                textoLink: 'Ouvir no Spotify'
            },
            {
                titulo: 'Paisagismo sustentável das cidades',
                descricao:
                    'Conheça discussões sobre paisagismo, planejamento de áreas verdes e a relação entre as pessoas e a natureza.',
                tipo: 'Podcast • Habitability',
                icone: '🌿',
                url: 'https://open.spotify.com/episode/2eN8gK31oMagX32HXNXjwc',
                textoLink: 'Ouvir no Spotify'
            },
            {
                titulo: 'Mudanças climáticas e cidades',
                descricao:
                    'Uma conversa sobre os desafios climáticos e a adaptação dos ambientes urbanos.',
                tipo: 'Podcast • Saúde É Pública',
                icone: '🌎',
                url: 'https://open.spotify.com/episode/1eMgzt2O9KCAKGs0FdfC3z',
                textoLink: 'Ouvir no Spotify'
            },
            {
                titulo: 'O futuro sustentável de São José',
                descricao:
                    'Uma discussão sobre planejamento urbano, sustentabilidade e soluções ambientais para as cidades.',
                tipo: 'Podcast • Cidades Sustentáveis',
                icone: '🏙️',
                url: 'https://open.spotify.com/episode/1CwHnNiIs7Bt9iqXk1l1xS',
                textoLink: 'Ouvir no Spotify'
            }
        ],

        filmes: [
            {
                titulo: 'Arborização urbana: como, onde e por quê plantar árvores na cidade',
                descricao:
                    'Vídeo educativo sobre a importância das árvores nas cidades e os cuidados necessários para a arborização urbana.',
                tipo: 'Vídeo educativo',
                icone: '🎬',
                url: 'https://www.youtube.com/watch?v=vPSLhqgRF1o',
                textoLink: 'Assistir no YouTube'
            }
        ],

        
        documentarios: [
            {
                titulo: 'Arborização urbana: cidades mais verdes',
                descricao:
                    'Reportagem sobre o plantio de árvores, a criação de corredores verdes em São Paulo e o uso da vegetação para ajudar a combater enchentes.',
                tipo: 'Reportagem • TV Aparecida',
                icone: '🌳',
                url: 'https://www.youtube.com/watch?v=PumtOE5d1Wg',
                textoLink: 'Assistir à reportagem'
            },
            {
                titulo: 'Arborização urbana',
                descricao:
                    'Podcast da USP sobre como as árvores ajudam a amenizar o clima, reduzir a poluição e melhorar a qualidade ambiental nas cidades.',
                tipo: 'Podcast • Jornal da USP',
                icone: '🎙️',
                url: 'https://jornal.usp.br/podcast/cidade-em-movimento-8-arborizacao-urbana/',
                textoLink: 'Ouvir o episódio'
            },
            {
                titulo: 'Um córrego que desafiou o concreto de São Paulo',
                descricao:
                    'Conheça a história do córrego Tiquatira e a transformação da região em um parque linear, com o plantio de milhares de árvores.',
                tipo: 'Podcast ambiental • ((o))eco',
                icone: '🌿',
                url: 'https://oeco.org.br/podcast/um-corrego-que-desafiou-o-concreto-de-sao-paulo/',
                textoLink: 'Conhecer a história'
            },
            {
                titulo: 'A importância da arborização para a arquitetura das cidades',
                descricao:
                    'Conversa com o arquiteto paisagista Benedito Abbud sobre espaços verdes, conforto térmico, sombra e cidades mais agradáveis para as pessoas.',
                tipo: 'Podcast • CAU/BR',
                icone: '🏙️',
                url: 'https://caubr.gov.br/cau-podcast-destaca-importancia-da-arborizacao-para-a-arquitetura-das-cidades/',
                textoLink: 'Acessar o conteúdo'
            }
        ]

    };

    const titulos = {
        podcast: 'Podcasts em destaque',
        filmes: 'Vídeos sobre arborização urbana',
        documentarios: 'Conteúdos especiais sobre sustentabilidade'
    };

    // Atualiza os nomes das abas sem modificar seus IDs.
    if (buttons.filmes) {
        buttons.filmes.textContent = 'Vídeos';
    }

    if (buttons.documentarios) {
        buttons.documentarios.textContent = 'Conteúdos especiais';
    }

    function criarCard(midia) {
        const card = document.createElement('article');
        card.className = 'midia-card';

        const icone = document.createElement('div');
        icone.className = 'midia-card-icone';
        icone.setAttribute('aria-hidden', 'true');
        icone.textContent = midia.icone;

        const conteudo = document.createElement('div');
        conteudo.className = 'midia-card-conteudo';

        const tipo = document.createElement('span');
        tipo.className = 'midia-card-tipo';
        tipo.textContent = midia.tipo;

        const titulo = document.createElement('h3');
        titulo.className = 'midia-card-titulo';
        titulo.textContent = midia.titulo;

        const descricao = document.createElement('p');
        descricao.className = 'midia-card-descricao';
        descricao.textContent = midia.descricao;

        const link = document.createElement('a');
        link.className = 'midia-card-link';
        link.href = midia.url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.textContent = midia.textoLink;

        link.setAttribute(
            'aria-label',
            `${midia.textoLink}: ${midia.titulo}`
        );

        conteudo.append(tipo, titulo, descricao, link);
        card.append(icone, conteudo);

        return card;
    }

    function switchTab(categoria) {
        if (!midias[categoria]) {
            console.warn(`Arboriza: categoria inválida: ${categoria}`);
            return;
        }

        // Atualiza a aparência e a acessibilidade das abas.
        Object.entries(buttons).forEach(([nome, botao]) => {
            if (!botao) return;

            const ativo = nome === categoria;

            botao.classList.toggle('midia-tab-ativa', ativo);
            botao.classList.toggle('midia-tab-inativa', !ativo);
            botao.setAttribute('aria-pressed', String(ativo));
        });

        // Atualiza o título da seção.
        sectionTitle.textContent = titulos[categoria];

        // Limpa os cartões anteriores.
        container.replaceChildren();

        // Cria os cartões da categoria selecionada.
        const fragmento = document.createDocumentFragment();

        midias[categoria].forEach((midia) => {
            fragmento.appendChild(criarCard(midia));
        });

        container.appendChild(fragmento);
    }

    // Adiciona os eventos aos botões existentes.
    Object.entries(buttons).forEach(([categoria, botao]) => {
        if (!botao) return;

        botao.addEventListener('click', () => {
            switchTab(categoria);
        });
    });

    // Mantém compatibilidade com onclick="switchTab(...)"
    // caso essa chamada ainda exista no HTML.
    window.switchTab = switchTab;

    // Exibe a primeira categoria ao abrir a página.
    switchTab('podcast');
});
