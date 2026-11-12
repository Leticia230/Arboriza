document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-pesquisa');
    const campoPesquisa = document.getElementById('campo-pesquisa');
    const listaArtigos = document.getElementById('lista-artigos');
    const contadorResultados = document.getElementById('contador-resultados');
    const mensagemVazia = document.getElementById('mensagem-vazia');
    const botaoLimpar = document.getElementById('limpar-pesquisa');
    const botaoVerTodos = document.getElementById('ver-todos');

    if (
        !form ||
        !campoPesquisa ||
        !listaArtigos ||
        !contadorResultados ||
        !mensagemVazia
    ) {
        console.error('Arboriza: elementos da tela Pesquisa não encontrados.');
        return;
    }

    const artigos = [
        {
            titulo: 'Vegetação em áreas urbanas: benefícios e custos associados',
            data: '20 de junho de 2013',
            fonte: 'Revista LABVERDE • USP',
            descricao:
                'Estudo sobre os benefícios e os custos da vegetação nas cidades, incluindo conforto ambiental e microclima.',
            palavrasChave: [
                'vegetação urbana', 'áreas verdes', 'benefícios',
                'custos', 'microclima', 'arborização'
            ],
            url: 'https://revistas.usp.br/revistalabverde/pt_BR/article/view/61885'
        },
        {
            titulo: 'Entre a vegetação e o concreto: análise da arborização urbana nas praças de Castanhal, PA',
            data: '2021',
            fonte: 'Revista Paisagem e Ambiente • USP',
            descricao:
                'Pesquisa sobre a arborização de praças públicas, áreas verdes, biodiversidade nativa e sustentabilidade.',
            palavrasChave: [
                'vegetação urbana', 'arborização', 'praças',
                'Castanhal', 'biodiversidade', 'áreas verdes'
            ],
            url: 'https://revistas.usp.br/paam/pt_BR/article/view/176557'
        },
        {
            titulo: 'Influência de espécies arbóreas no microclima urbano de cidades brasileiras',
            data: '2025',
            fonte: 'GEOUSP • USP',
            descricao:
                'Estudo sobre como diferentes espécies de árvores influenciam o microclima e podem contribuir para o planejamento urbano.',
            palavrasChave: [
                'vegetação urbana', 'árvores', 'clima',
                'microclima', 'temperatura', 'espécies arbóreas'
            ],
            url: 'https://revistas.usp.br/geousp/pt_BR/article/view/222664'
        },
        {
            titulo: 'Planos diretores de arborização urbana como estratégia de mitigação e adaptação à crise climática',
            data: '2025',
            fonte: 'Revista Paisagem e Ambiente • USP',
            descricao:
                'Artigo sobre o planejamento da floresta urbana, políticas públicas e estratégias para enfrentar a crise climática.',
            palavrasChave: [
                'vegetação urbana', 'arborização', 'crise climática',
                'planejamento', 'políticas públicas', 'árvores'
            ],
            url: 'https://revistas.usp.br/paam/pt_BR/article/view/233967'
        },
        {
            titulo: 'A influência da arborização de praças públicas no microclima',
            data: '2025',
            fonte: 'Revista Paisagem e Ambiente • USP',
            descricao:
                'Pesquisa sobre a relação entre a vegetação em praças, o microclima urbano e a qualidade de vida.',
            palavrasChave: [
                'vegetação urbana', 'praças', 'árvores',
                'microclima', 'temperatura', 'qualidade de vida'
            ],
            url: 'https://revistas.usp.br/paam/pt_BR/article/view/233434'
        },
        {
            titulo: 'Antarctic greening is constrained by biology and requires field validation',
            data: '14 de agosto de 2026',
            fonte: 'Nature Geoscience',
            descricao:
                'Artigo científico que discute o aumento da vegetação em regiões da Antártida e as limitações dos dados usados para avaliar essa mudança.',
            palavrasChave: [
                'vegetação', 'Antártida', 'biodiversidade',
                'aquecimento global', 'mudanças climáticas', 'plantas'
            ],
            url: 'https://www.nature.com/articles/s41561-026-02076-0'
        },
        {
            titulo: 'O verde da cidade verde: do marketing urbano à construção de um patrimônio coletivo',
            data: '2020',
            fonte: 'Revista Paisagem e Ambiente • USP',
            descricao:
                'Análise da arborização de Maringá e da importância de avaliar a qualidade e os cuidados com as áreas verdes urbanas.',
            palavrasChave: [
                'vegetação urbana', 'Maringá', 'áreas verdes',
                'planejamento urbano', 'arborização', 'sustentabilidade'
            ],
            url: 'https://revistas.usp.br/paam/pt_BR/article/view/170737'
        },

        // Novos artigos

        {
            titulo: 'Biodiversidade na arborização urbana: seleção de espécies nativas em conformidade com fitofisionomia local',
            data: '2026',
            fonte: 'Revista Paisagem e Ambiente • USP',
            descricao:
                'Pesquisa que apresenta critérios para escolher árvores nativas adequadas às cidades, considerando a biodiversidade, os biomas e os benefícios ambientais.',
            palavrasChave: [
                'biodiversidade', 'espécies nativas', 'árvores',
                'biomas', 'arborização', 'vegetação urbana'
            ],
            url: 'https://revistas.usp.br/paam/pt_BR/article/view/231958'
        },
        {
            titulo: 'Arborização urbana e ilhas de calor no município de São José dos Campos, Estado de São Paulo',
            data: '2026',
            fonte: 'Revista Biociências • UNITAU',
            descricao:
                'Estudo que investiga a relação entre a cobertura vegetal e as ilhas de calor, analisando diferenças de temperatura em bairros de São José dos Campos.',
            palavrasChave: [
                'ilhas de calor', 'temperatura', 'São José dos Campos',
                'arborização', 'aquecimento urbano', 'clima'
            ],
            url: 'https://periodicos.unitau.br/biociencias/article/view/4043'
        },
        {
            titulo: 'Arborização urbana e percepção térmica: uma abordagem ao sentido de lugar na praça Jardim das Acácias, Três Lagoas–MS',
            data: '2025',
            fonte: 'Ciência Geográfica',
            descricao:
                'Pesquisa que relaciona a arborização de uma praça ao conforto térmico, à sustentabilidade e à percepção dos espaços públicos pela população.',
            palavrasChave: [
                'conforto térmico', 'praças', 'arborização',
                'Três Lagoas', 'sustentabilidade', 'vegetação'
            ],
            url: 'https://ppg.revistas.uema.br/index.php/cienciageografica/article/view/4343'
        },
        {
            titulo: 'O Fenômeno de Ilhas de Calor e o Papel da Arborização Urbana Para Mitigá-lo',
            data: '2023',
            fonte: 'Revista Nacional de Gerenciamento de Cidades',
            descricao:
                'Artigo que analisa como a infraestrutura verde e a arborização podem ajudar a reduzir os efeitos das ilhas de calor em Ituverava, no interior de São Paulo.',
            palavrasChave: [
                'ilhas de calor', 'arborização', 'Ituverava',
                'infraestrutura verde', 'temperatura', 'clima urbano'
            ],
            url: 'https://publicacoes.amigosdanatureza.org.br/index.php/cidades_verdes/pt_BR/article/view/3737'
        },
        {
            titulo: 'Recursos naturais de conforto térmico: um enfoque urbano',
            data: '2011',
            fonte: 'Revista da Sociedade Brasileira de Arborização Urbana',
            descricao:
                'Revisão sobre o uso da vegetação e de outros recursos naturais para amenizar temperaturas, manter a umidade do ar e melhorar o conforto térmico nas cidades.',
            palavrasChave: [
                'conforto térmico', 'vegetação', 'umidade',
                'temperatura', 'arborização', 'clima urbano'
            ],
            url: 'https://revistas.ufpr.br/revsbau/article/view/66487'
        },
        {
            titulo: 'Arborização urbana no município de Três Rios-RJ: espécies utilizadas e a percepção de seus benefícios pela população',
            data: '2013',
            fonte: 'Revista da Sociedade Brasileira de Arborização Urbana',
            descricao:
                'Estudo que avalia as espécies de árvores presentes em bairros de Três Rios e a percepção dos moradores sobre os benefícios da arborização.',
            palavrasChave: [
                'Três Rios', 'árvores', 'espécies arbóreas',
                'população', 'áreas verdes', 'arborização urbana'
            ],
            url: 'https://revistas.ufpr.br/revsbau/article/view/66422'
        },
        {
            titulo: 'A vegetação urbana a serviço do conforto térmico: uma proposta para um bairro metropolitano de São Paulo, Brasil',
            data: '2019',
            fonte: 'Labor & Engenho • UNICAMP',
            descricao:
                'Pesquisa que propõe o uso da cobertura vegetal e da infraestrutura verde para melhorar o conforto térmico em um bairro da região metropolitana de São Paulo.',
            palavrasChave: [
                'São Paulo', 'conforto térmico', 'infraestrutura verde',
                'cobertura vegetal', 'ilhas de calor', 'arborização'
            ],
            url: 'https://periodicos.sbu.unicamp.br/ojs/index.php/labore/article/view/8654619'
        },
        {
            titulo: 'O efeito de resfriamento causado pela arborização como uma solução para o aquecimento urbano: um estudo de caso em Teresina',
            data: '2020',
            fonte: 'Research, Society and Development',
            descricao:
                'Estudo sobre como as árvores podem contribuir para diminuir as temperaturas em regiões urbanas, ajudando a combater as ilhas de calor.',
            palavrasChave: [
                'Teresina', 'resfriamento urbano', 'aquecimento',
                'ilhas de calor', 'árvores', 'temperatura'
            ],
            url: 'https://rsdjournal.org/rsd/user/setLocale/pt_BR?source=%2Findex.php%2Frsd%2Farticle%2Fview%2F9870'
        },
        {
            titulo: 'Benefícios da arborização em praças urbanas: o caso de Cuiabá/MT',
            data: '2013',
            fonte: 'Revista Eletrônica em Gestão, Educação e Tecnologia Ambiental',
            descricao:
                'Pesquisa que investiga como as árvores presentes em praças de Cuiabá influenciam o microclima e as condições de conforto ambiental para os frequentadores.',
            palavrasChave: [
                'Cuiabá', 'praças urbanas', 'microclima',
                'conforto ambiental', 'árvores', 'arborização'
            ],
            url: 'https://periodicos.ufsm.br/reget/article/view/7695'
        }
    ];

    function normalizar(texto) {
        return texto
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .trim();
    }

    function criarCartao(artigo) {
        const cartao = document.createElement('article');
        cartao.className = 'artigo-card';

        const titulo = document.createElement('h2');
        titulo.textContent = artigo.titulo;

        const descricao = document.createElement('p');
        descricao.className = 'artigo-descricao';
        descricao.textContent = artigo.descricao;

        const informacoes = document.createElement('div');
        informacoes.className = 'artigo-informacoes';

        const data = document.createElement('span');
        data.className = 'artigo-data';
        data.textContent = `Publicado em: ${artigo.data}`;

        const fonte = document.createElement('span');
        fonte.className = 'artigo-fonte';
        fonte.textContent = artigo.fonte;

        const link = document.createElement('a');
        link.className = 'artigo-link';
        link.href = artigo.url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.textContent = 'Saiba mais...';
        link.setAttribute(
            'aria-label',
            `Ler o artigo: ${artigo.titulo} (${artigo.fonte})`
        );

        informacoes.append(data, fonte, link);
        cartao.append(titulo, descricao, informacoes);

        return cartao;
    }

    function renderizarArtigos(lista) {
        listaArtigos.replaceChildren();

        const fragmento = document.createDocumentFragment();

        lista.forEach((artigo) => {
            fragmento.appendChild(criarCartao(artigo));
        });

        listaArtigos.appendChild(fragmento);

        const quantidade = lista.length;

        contadorResultados.textContent =
            quantidade === 1
                ? '1 artigo encontrado'
                : `${quantidade} artigos encontrados`;

        mensagemVazia.hidden = quantidade !== 0;
        listaArtigos.hidden = quantidade === 0;
    }

    function pesquisar() {
        const termo = normalizar(campoPesquisa.value);

        if (!termo) {
            renderizarArtigos(artigos);
            return;
        }

        const resultados = artigos.filter((artigo) => {
            const conteudo = normalizar([
                artigo.titulo,
                artigo.data,
                artigo.fonte,
                artigo.descricao,
                ...artigo.palavrasChave
            ].join(' '));

            return conteudo.includes(termo);
        });

        renderizarArtigos(resultados);
    }

    form.addEventListener('submit', (evento) => {
        evento.preventDefault();
        pesquisar();
    });

    campoPesquisa.addEventListener('input', pesquisar);

    botaoLimpar?.addEventListener('click', () => {
        campoPesquisa.value = '';
        renderizarArtigos(artigos);
        campoPesquisa.focus();
    });

    botaoVerTodos?.addEventListener('click', () => {
        campoPesquisa.value = '';
        renderizarArtigos(artigos);
        campoPesquisa.focus();
    });

    pesquisar();
});
