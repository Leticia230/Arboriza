class SiteFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer class="site-footer">
        <div class="footer-container">
          <div class="footer-brand">
            <img class="footer-logo" src="../assets/logo-branca.png" alt="Logo Arboriza">
            
            <p>
              Mais árvores.<br>
              Cidades mais frescas.
            </p>
          </div>

          <p class="copyright">Copyright © 2026 – Arboriza</p>

          <div class="footer-message">
            <div class="footer-leaf">
              <svg viewBox="0 0 64 64" aria-hidden="true">
                <path d="M32 58V25"></path>
                <path d="M32 35C20 34 12 27 10 17C22 17 30 23 32 35Z"></path>
                <path d="M32 43C44 42 52 35 54 25C42 25 34 31 32 43Z"></path>
              </svg>
            </div>

            <p>
              Juntos por cidades<br>
              mais verdes.
            </p>
            
          </div>
        </div>
      </footer>
    `;
  }
}

customElements.define('site-footer', SiteFooter);