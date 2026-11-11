
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('cards-container');
    const sectionTitle = document.getElementById('section-title');

    const campoPesquisa = document.getElementById('campo-pesquisa-midia');
    const botaoLimpar = document.getElementById('limpar-pesquisa-midia');
    const contador = document.getElementById('contador-midia');
    const mensagemVazia = document.getElementById('mensagem-vazia-midia');

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

    let categoriaAtual = 'podcast';

    const midias = {
        podcast: [
            {
                titulo: 'O erro que tornou as cidades brasileiras mais quentes',
                descricao:
                    'Uma conversa sobre a retirada de árvores e plantas nativas das cidades e os impactos dessa mudança no ambiente urbano.',
                tipo: 'Podcast • Mesa da Rita',
                data: '18 de agosto de 2026',
                icone: '🎧',
                palavrasChave: ['árvores', 'cidades', 'calor', 'vegetação', 'plantas'],
                url: 'https://open.spotify.com/episode/1nFSuAJahFB452837j9LON',
                textoLink: 'Ouvir no Spotify'
            },
            {
                titulo: 'Paisagismo sustentável das cidades',
                descricao:
                    'Conheça discussões sobre paisagismo, planejamento de áreas verdes e a relação entre as pessoas e a natureza.',
                tipo: 'Podcast • Habitability',
                data: '28 de novembro de 2022',
                icone: '🌿',
                palavrasChave: ['paisagismo', 'sustentabilidade', 'áreas verdes'],
                url: 'https://open.spotify.com/episode/2eN8gK31oMagX32HXNXjwc',
                textoLink: 'Ouvir no Spotify'
            },
            {
                titulo: 'Mudanças climáticas e cidades',
                descricao:
                    'Uma conversa sobre os desafios climáticos e a adaptação dos ambientes urbanos.',
                tipo: 'Podcast • Saúde É Pública',
                data: '3 de março de 2022',
                icone: '🌎',
                palavrasChave: ['clima', 'aquecimento global', 'cidades'],
                url: 'https://open.spotify.com/episode/1eMgzt2O9KCAKGs0FdfC3z',
                textoLink: 'Ouvir no Spotify'
            },
            {
                titulo: 'O futuro sustentável de São José',
                descricao:
                    'Uma discussão sobre planejamento urbano, sustentabilidade e soluções ambientais para as cidades.',
                tipo: 'Podcast • Cidades Sustentáveis',
                data: '26 de setembro de 2025',
                icone: '🏙️',
                palavrasChave: ['São José', 'planejamento', 'sustentabilidade'],
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
                data: '15 de junho de 2023',
                icone: '🎬',
                palavrasChave: ['plantio', 'árvores', 'cidade', 'arborização'],
                url: 'https://www.youtube.com/watch?v=vPSLhqgRF1o',
                textoLink: 'Assistir no YouTube'
            },
            {
                titulo: 'Arborização Urbana: descubra os benefícios de deixar as cidades mais verdes',
                descricao:
                    'Reportagem da TV Aparecida sobre o plantio de milhares de árvores em São Paulo, a criação de corredores verdes e a contribuição da vegetação para combater enchentes.',
                tipo: 'Reportagem • TV Aparecida',
                data: '25 de setembro de 2025',
                icone: '🌳',
                palavrasChave: [
                    'São Paulo', 'corredores verdes', 'enchentes',
                    'plantio', 'árvores', 'arborização'
                ],
                url: 'https://www.youtube.com/watch?v=PumtOE5d1Wg',
                textoLink: 'Assistir no YouTube'
            },
            {
                titulo: 'Arborização Urbana: a importância das árvores para quem mora nas cidades',
                descricao:
                    'Animação educativa que apresenta como as árvores contribuem para a saúde dos habitantes e para a qualidade ambiental das cidades.',
                tipo: 'Vídeo educativo • Conhecendo a Madeira',
                data: '25 de fevereiro de 2021',
                icone: '🌱',
                palavrasChave: [
                    'saúde', 'árvores', 'cidades', 'qualidade de vida',
                    'vegetação', 'arborização'
                ],
                url: 'https://www.youtube.com/watch?v=0HnlR6CXPOo',
                textoLink: 'Assistir no YouTube'
            },
            {
                titulo: 'Restauração ecológica: como recuperar ecossistemas degradados?',
                descricao:
                    'Conheça técnicas de recuperação de florestas, rios e outros ambientes degradados, além da importância da restauração para a biodiversidade.',
                tipo: 'Vídeo educativo • Florestal Brasil',
                data: '21 de março de 2025',
                icone: '🌿',
                palavrasChave: [
                    'reflorestamento', 'restauração ecológica',
                    'florestas', 'biodiversidade', 'ecossistemas'
                ],
                url: 'https://www.youtube.com/watch?v=8TCDUfzocUY',
                textoLink: 'Assistir no YouTube'
            },
            {
                titulo: 'Participação Popular: Arborização urbana',
                descricao:
                    'Programa da TV Câmara que discute a distribuição desigual de árvores nas cidades brasileiras, os benefícios da arborização e as políticas públicas para ampliar as áreas verdes.',
                tipo: 'Programa • TV Câmara',
                data: '14 de janeiro de 2026',
                icone: '🏙️',
                palavrasChave: [
                    'políticas públicas', 'áreas verdes', 'árvores',
                    'desigualdade ambiental', 'cidades', 'arborização'
                ],
                url: 'https://www.camara.leg.br/tv/participacao-popular/1238332-participacao-popular-arborizacao-urbana/',
                textoLink: 'Assistir ao programa'
            },
            {
                titulo: 'Arborização Urbana: a importância da árvore para as cidades',
                descricao:
                    'Vídeo educativo produzido pela equipe de Educação Ambiental de Osasco, apresentando os benefícios das árvores para o ambiente urbano.',
                tipo: 'Vídeo educativo • Prefeitura de Osasco',
                data: ' 21 de setembro de 2021',
                icone: '🌳',
                palavrasChave: [
                    'Osasco', 'árvores', 'educação ambiental',
                    'arborização', 'cidades'
                ],
                url: 'https://www.youtube.com/watch?v=nK87EbxVLu0',
                textoLink: 'Assistir no YouTube'
            },
            {
                titulo: 'Nesta rua tem um bosque',
                descricao:
                    'Vídeo educativo que apresenta a importância dos espaços verdes nas cidades e a relação entre arborização, ilhas de calor e qualidade de vida.',
                tipo: 'Vídeo educativo • Espaço Ciência Viva',
                data: '1 de março de 2021',
                icone: '🌲',
                palavrasChave: [
                    'bosque', 'ilhas de calor', 'espaços verdes',
                    'educação ambiental', 'árvores'
                ],
                url: 'https://www.youtube.com/watch?v=c_oR0iqLzzs',
                textoLink: 'Assistir no YouTube'
            }
        ],

        documentarios: [
            {
                titulo: 'Arborização urbana: cidades mais verdes',
                descricao:
                    'Reportagem sobre o plantio de árvores, a criação de corredores verdes em São Paulo e o uso da vegetação para ajudar a combater enchentes.',
                tipo: 'Reportagem • TV Aparecida',
                data: '25 de setembro de 2025',
                icone: '🌳',
                palavrasChave: ['São Paulo', 'corredores verdes', 'enchentes'],
                url: 'https://www.youtube.com/watch?v=PumtOE5d1Wg',
                textoLink: 'Assistir à reportagem'
            },
            {
                titulo: 'Arborização urbana',
                descricao:
                    'Podcast da USP sobre como as árvores ajudam a amenizar o clima, reduzir a poluição e melhorar a qualidade ambiental nas cidades.',
                tipo: 'Podcast • Jornal da USP',
                data: '23 de janeiro de 2025',
                icone: '🎙️',
                palavrasChave: ['USP', 'poluição', 'clima', 'árvores'],
                url: 'https://jornal.usp.br/podcast/cidade-em-movimento-8-arborizacao-urbana/',
                textoLink: 'Ouvir o episódio'
            },
            {
                titulo: 'Um córrego que desafiou o concreto de São Paulo',
                descricao:
                    'Conheça a história do córrego Tiquatira e a transformação da região em um parque linear, com o plantio de milhares de árvores.',
                tipo: 'Podcast ambiental • ((o))eco',
                data: '20 de maio de 2026',
                icone: '🌿',
                palavrasChave: ['Tiquatira', 'parque linear', 'São Paulo'],
                url: 'https://oeco.org.br/podcast/um-corrego-que-desafiou-o-concreto-de-sao-paulo/',
                textoLink: 'Conhecer a história'
            },
            {
                titulo: 'A importância da arborização para a arquitetura das cidades',
                descricao:
                    'Conversa com o arquiteto paisagista Benedito Abbud sobre espaços verdes, conforto térmico, sombra e cidades mais agradáveis para as pessoas.',
                tipo: 'Podcast • CAU/BR',
                data: '01 de junho de 2026',
                icone: '🏙️',
                palavrasChave: ['arquitetura', 'conforto térmico', 'paisagismo'],
                url: 'https://caubr.gov.br/cau-podcast-destaca-importancia-da-arborizacao-para-a-arquitetura-das-cidades/',
                textoLink: 'Acessar o conteúdo'
            }
        ]
    };

    const titulos = {
        podcast: 'Podcasts em destaque',
        filmes: 'Vídeos sobre arborização urbana',
        documentarios: 'Documentários e conteúdos especiais'
    };

    const nomesCategorias = {
        podcast: 'podcasts',
        filmes: 'vídeos',
        documentarios: 'documentários'
    };

    function normalizar(texto) {
        return String(texto || '')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .trim();
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

        const data = document.createElement('span');
        data.className = 'midia-card-data';
        data.textContent = `Publicado em: ${midia.data}`;

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

        conteudo.append(tipo, titulo, descricao, data, link);
        card.append(icone, conteudo);

        return card;
    }

    function pesquisarMidias() {
        const termo = normalizar(campoPesquisa?.value || '');

        const resultados = midias[categoriaAtual].filter((midia) => {
            const conteudo = normalizar([
                midia.titulo,
                midia.descricao,
                midia.tipo,
                midia.data,
                ...(midia.palavrasChave || [])
            ].join(' '));

            return conteudo.includes(termo);
        });

        renderizarMidias(resultados);
    }

    function renderizarMidias(lista) {
        container.replaceChildren();

        const fragmento = document.createDocumentFragment();

        lista.forEach((midia) => {
            fragmento.appendChild(criarCard(midia));
        });

        container.appendChild(fragmento);

        if (contador) {
            const quantidade = lista.length;

            contador.textContent = quantidade === 1
                ? `1 ${categoriaAtual === 'podcast' ? 'conteúdo encontrado' : 'conteúdo encontrado'}`
                : `${quantidade} ${nomesCategorias[categoriaAtual]} encontrados`;
        }

        if (mensagemVazia) {
            mensagemVazia.hidden = lista.length !== 0;
        }

        container.hidden = lista.length === 0;
    }

    function switchTab(categoria) {
        if (!midias[categoria]) {
            console.warn(`Arboriza: categoria inválida: ${categoria}`);
            return;
        }

        categoriaAtual = categoria;

        Object.entries(buttons).forEach(([nome, botao]) => {
            if (!botao) return;

            const ativo = nome === categoria;

            botao.classList.toggle('midia-tab-ativa', ativo);
            botao.classList.toggle('midia-tab-inativa', !ativo);

            botao.setAttribute('aria-pressed', String(ativo));
        });

        sectionTitle.textContent = titulos[categoria];

        if (campoPesquisa) {
            campoPesquisa.value = '';
        }

        if (botaoLimpar) {
            botaoLimpar.hidden = true;
        }

        pesquisarMidias();
    }

    Object.entries(buttons).forEach(([categoria, botao]) => {
        if (!botao) return;

        botao.addEventListener('click', () => {
            switchTab(categoria);
        });
    });

    if (campoPesquisa) {
        campoPesquisa.addEventListener('input', () => {
            const possuiTexto = campoPesquisa.value.trim().length > 0;

            if (botaoLimpar) {
                botaoLimpar.hidden = !possuiTexto;
            }

            pesquisarMidias();
        });
    }

    if (botaoLimpar) {
        botaoLimpar.addEventListener('click', () => {
            campoPesquisa.value = '';
            botaoLimpar.hidden = true;

            pesquisarMidias();
            campoPesquisa.focus();
        });
    }

    window.switchTab = switchTab;

    switchTab('podcast');
});
