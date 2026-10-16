/**
 * Serviço de Armazenamento Local (localStorage)
 * Responsável pela persistência e validação do estado do jogo.
 * Conforme especificado nas diretrizes do GEMINI.md.
 */

const STORAGE_KEY = 'rick_morty_portal_paradox_save';

export const INITIAL_GAME_STATE = {
  pontoAtual: 1,
  pontosConcluidos: [],
  tesouros: [],
  pistas: [],
  inventarioOrdem: []
};

export const storageService = {
  /**
   * Carrega o estado salvo ou retorna o estado inicial.
   */
  loadGame() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return { ...INITIAL_GAME_STATE };

      const parsed = JSON.parse(data);
      if (parsed && typeof parsed.pontoAtual === 'number') {
        return {
          pontoAtual: parsed.pontoAtual,
          pontosConcluidos: Array.isArray(parsed.pontosConcluidos) ? parsed.pontosConcluidos : [],
          tesouros: Array.isArray(parsed.tesouros) ? parsed.tesouros : [],
          pistas: Array.isArray(parsed.pistas) ? parsed.pistas : [],
          inventarioOrdem: Array.isArray(parsed.inventarioOrdem) ? parsed.inventarioOrdem : []
        };
      }
      return { ...INITIAL_GAME_STATE };
    } catch (error) {
      console.warn('[storageService] Erro ao ler progresso:', error);
      return { ...INITIAL_GAME_STATE };
    }
  },

  /**
   * Salva o estado atual no localStorage.
   */
  saveGame(state) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      return true;
    } catch (error) {
      console.error('[storageService] Erro ao salvar progresso:', error);
      return false;
    }
  },

  /**
   * Limpa o save game do localStorage.
   */
  clearSave() {
    try {
      localStorage.removeItem(STORAGE_KEY);
      return true;
    } catch (error) {
      console.error('[storageService] Erro ao limpar progresso:', error);
      return false;
    }
  },

  /**
   * Verifica se o estado salvo possui progresso real do jogador.
   */
  hasValidProgress(state) {
    if (!state) return false;
    return (
      state.pontoAtual > 1 ||
      (Array.isArray(state.pontosConcluidos) && state.pontosConcluidos.length > 0) ||
      (Array.isArray(state.tesouros) && state.tesouros.length > 0) ||
      (Array.isArray(state.pistas) && state.pistas.length > 0)
    );
  }
};
