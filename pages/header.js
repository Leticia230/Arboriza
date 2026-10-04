class SiteHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header class="site-header">
        <div class="header-container">
          <a href="Home.html" class="brand">
            <img class="brand-logo" src="../assets/logo.png" alt="Logo Arboriza">
            <span class="brand-text">
              Mais árvores.<br>
              Cidades mais frescas.
            </span>
          </a>

          <nav class="main-navigation">
            <a href="Home.html" class="nav-link">Início</a>
            <a href="artigos.html" class="nav-link">Artigos</a>
            <a href="Glossario.html" class="nav-link">Glossário</a>
            <a href="midia.html" class="nav-link">Mídia</a>
          </nav>
        </div>
      </header>
    `;

    // Marca o link da página atual como ativo
    const paginaAtual = location.pathname.split('/').pop() || 'Home.html';
    this.querySelectorAll('.nav-link').forEach(link => {
      if (link.getAttribute('href') === paginaAtual) {
        link.classList.add('active');
      }
    });
  }
}

customElements.define('site-header', SiteHeader);