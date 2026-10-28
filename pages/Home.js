document.addEventListener("DOMContentLoaded", () => {
    const internalLinks = document.querySelectorAll('a[href^="#"]');

    internalLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            const targetId = link.getAttribute("href");
            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    });

    const brand = document.querySelector(".brand");

    if (brand) {
        brand.addEventListener("click", (event) => {
            const target = document.querySelector("#inicio");

            if (!target) {
                return;
            }

            event.preventDefault();

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }
});

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

    const DURACAO = 7000; 
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

        slides.forEach((slide, i) => slide.classList.toggle('active', i === atual));

        tabs.forEach((tab, i) => {
            tab.classList.remove('active');
            tab.setAttribute('aria-pressed', i === atual ? 'true' : 'false');
        });
        void hero.offsetWidth;
        tabs[atual].classList.add('active');

        if (mudou) {
            const alvo = atual;
            info.classList.add('trocando');
            setTimeout(() => {
                if (alvo !== atual) return; 
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
        mostrar(atual);
        agendar();
    }

    tabs.forEach((tab, i) => {
        tab.addEventListener('click', () => {
            mostrar(i);
            agendar();
        });
    });

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