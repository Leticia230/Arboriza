
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
                        <a href="artigos.html" class="nav-link">Artigos</a>
                        <a href="Glossario.html" class="nav-link">Glossário</a>
                        <a href="midia.html" class="nav-link">Mídia</a>
                    </nav>

                    <div class="header-actions">
                        <a href="Login.html" class="login-button">
                            Entrar
                        </a>

                        <a
                            href="Login.html"
                            class="profile-link"
                            aria-label="Acessar minha conta"
                            title="Acessar minha conta"
                        >
                            <svg
                                class="profile-icon"
                                viewBox="0 0 24 24"
                                fill="none"
                                aria-hidden="true"
                            >
                                <circle
                                    cx="12"
                                    cy="8"
                                    r="4"
                                    stroke="currentColor"
                                    stroke-width="1.8"
                                />

                                <path
                                    d="M4.5 21C4.5 16.9 7.5 14 12 14C16.5 14 19.5 16.9 19.5 21"
                                    stroke="currentColor"
                                    stroke-width="1.8"
                                    stroke-linecap="round"
                                />
                            </svg>

                            <span>Minha conta</span>
                        </a>
                    </div>

                </div>
            </header>
        `;

        // Marca a página atual na navegação.
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

