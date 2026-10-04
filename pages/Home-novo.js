// Carrossel do hero: cada ícone é uma pergunta/motivo.
// Troca o fundo, o cartão (ícone + pergunta + texto) e avança sozinho.
(function () {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const slides = hero.querySelectorAll('.hero-slide');
    const tabs = hero.querySelectorAll('.benefit-item');
    const info = hero.querySelector('.hero-info');
    if (!tabs.length || !info) return;

    const iconBox = info.querySelector('.hero-info-icon');
    const eyebrow = info.querySelector('.hero-info-eyebrow');
    const question = info.querySelector('.hero-info-question');
    const text = info.querySelector('.hero-info-text');

    const DURACAO = 7000; // 7 segundos por pergunta (igual ao --slide-duration do CSS)
    const reduzirMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let atual = -1;
    let timer = null;
    let pausado = false;

    function preencherCartao(n) {
        const tab = tabs[n];
        const svg = tab.querySelector('.benefit-icon svg');

        iconBox.innerHTML = '';
        if (svg) iconBox.appendChild(svg.cloneNode(true));

        eyebrow.textContent = 'Motivo ' + (n + 1) + ' de ' + tabs.length;
        question.textContent = tab.dataset.question;
        text.textContent = tab.dataset.text;
    }

    function mostrar(n) {
        const novo = (n + tabs.length) % tabs.length;
        const mudou = novo !== atual;
        atual = novo;

        // Fundo
        slides.forEach((slide, i) => slide.classList.toggle('active', i === atual));

        // Menu: remove, força reflow e adiciona de novo para reiniciar a barrinha
        tabs.forEach((tab, i) => {
            tab.classList.remove('active');
            tab.setAttribute('aria-pressed', i === atual ? 'true' : 'false');
        });
        void hero.offsetWidth;
        tabs[atual].classList.add('active');

        // Cartão com um fade rápido
        if (mudou) {
            const alvo = atual;
            info.classList.add('trocando');
            setTimeout(() => {
                if (alvo !== atual) return; // o usuário já clicou em outro
                preencherCartao(alvo);
                info.classList.remove('trocando');
            }, 200);
        }
    }

    function agendar() {
        clearTimeout(timer);
        if (reduzirMovimento || pausado) return;
        timer = setTimeout(() => {
            mostrar(atual + 1);
            agendar();
        }, DURACAO);
    }

    function pausar() {
        pausado = true;
        hero.classList.add('paused');
        clearTimeout(timer);
    }

    function retomar() {
        pausado = false;
        hero.classList.remove('paused');
        mostrar(atual); // reinicia a barrinha para ficar alinhada ao timer
        agendar();
    }

    tabs.forEach((tab, i) => {
        tab.addEventListener('click', () => {
            mostrar(i);
            agendar();
        });
    });

    // Pausa quando o mouse está sobre o menu ou o cartão (não se aplica ao toque)
    [info, hero.querySelector('.benefits-wrapper')].forEach(area => {
        if (!area) return;
        area.addEventListener('pointerenter', e => {
            if (e.pointerType === 'mouse') pausar();
        });
        area.addEventListener('pointerleave', e => {
            if (e.pointerType === 'mouse') retomar();
        });
    });

    mostrar(0);
    agendar();
})();