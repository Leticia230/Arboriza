
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

    /*
     * Artigos de fontes reais.
     * As datas indicam o ano ou a data de publicação informada pela fonte.
     */
    const artigos = [
        {
            titulo: 'Vegetação em áreas urbanas: benefícios e custos associados',
            data: '20 de junho de 2013',
            fonte: 'Revista LABVERDE • USP',
            descricao:
                'Estudo sobre os benefícios e os custos da vegetação nas cidades, incluindo conforto ambiental e microclima.',
            palavrasChave: [
                'vegetação urbana',
                'áreas verdes',
                'benefícios',
                'custos',
                'microclima',
                'arborização'
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
                'vegetação urbana',
                'arborização',
                'praças',
                'Castanhal',
                'biodiversidade',
                'áreas verdes'
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
                'vegetação urbana',
                'árvores',
                'clima',
                'microclima',
                'temperatura',
                'espécies arbóreas'
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
                'vegetação urbana',
                'arborização',
                'crise climática',
                'planejamento',
                'políticas públicas',
                'árvores'
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
                'vegetação urbana',
                'praças',
                'árvores',
                'microclima',
                'temperatura',
                'qualidade de vida'
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
                'vegetação',
                'Antártida',
                'biodiversidade',
                'aquecimento global',
                'mudanças climáticas',
                'plantas'
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
                'vegetação urbana',
                'Maringá',
                'áreas verdes',
                'planejamento urbano',
                'arborização',
                'sustentabilidade'
            ],
            url: 'https://revistas.usp.br/paam/pt_BR/article/view/170737'
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
        cartao.append(titulo, informacoes);

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

    botaoLimpar.addEventListener('click', () => {
        campoPesquisa.value = '';
        renderizarArtigos(artigos);
        campoPesquisa.focus();
    });

    botaoVerTodos.addEventListener('click', () => {
        campoPesquisa.value = '';
        renderizarArtigos(artigos);
        campoPesquisa.focus();
    });

    // Exibe a busca inicial ao abrir a página.
    pesquisar();
});
