class SiteHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <header class="site-header">
                <div class="header-container">

                    <div class="brand">
                        <a href="Home.html" aria-label="Ir para a página inicial">
                            <img
                                class="brand-logo"
                                src="../assets/logo.png"
                                alt="Logo Arboriza"
                            >
                        </a>

                        <span class="brand-text">
                            Mais árvores.<br>
                            Cidades mais frescas.
                        </span>
                    </div>

                    <nav class="main-navigation" aria-label="Navegação principal">
                        <a href="Home.html" class="nav-link">Início</a>
                        <a href="Artigos.html" class="nav-link">Artigos</a>
                        <a href="Glossario.html" class="nav-link">Glossário</a>
                        <a href="Midia.html" class="nav-link">Mídia</a>
                    </nav>

                    <div class="header-actions">
                        <a href="Login.html" class="login-button">
                            Entrar
                        </a>
                    </div>

                </div>
            </header>
        `;

        const paginaAtual = (
            location.pathname.split('/').pop() || 'Home.html'
        ).toLowerCase();

        this.querySelectorAll('.nav-link').forEach((link) => {
            const destino = link.getAttribute('href').toLowerCase();

            if (destino === paginaAtual) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            }
        });
    }
}

if (!customElements.get('site-header')) {
    customElements.define('site-header', SiteHeader);
}

