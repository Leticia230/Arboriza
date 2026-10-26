
const STORAGE_KEY = "verdequest-state-v1";

export const integration = {
  async getUser() {
    // Futuramente, substituir pelo usuário autenticado
    // fornecido pelo sistema principal.
    return {
      id: "local-player",
      name: "Explorador Verde"
    };
  },

  async loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      console.warn("Não foi possível carregar o progresso:", error);
      return null;
    }
  },

  async saveState(state) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      return { ok: true };
    } catch (error) {
      console.error("Não foi possível salvar o progresso:", error);
      return { ok: false, error: "storage-error" };
    }
  },

  async clearState() {
    try {
      localStorage.removeItem(STORAGE_KEY);
      return { ok: true };
    } catch (error) {
      console.error("Não foi possível limpar o progresso:", error);
      return { ok: false, error: "storage-error" };
    }
  }
};
