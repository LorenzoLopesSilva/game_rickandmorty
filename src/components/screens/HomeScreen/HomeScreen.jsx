import { useHomeScreen } from './useHomeScreen';
import './HomeScreen.css';

/**
 * HomeScreen (View)
 * Responsável exclusivamente pela estrutura semântica, camadas visuais (HUD) e apresentação.
 * Toda a lógica de eventos e controle de estado é provida pelo hook useHomeScreen.
 */
export default function HomeScreen() {
  const {
    gameState,
    hasSavedGame,
    soundEnabled,
    showConfirmNewGame,
    handlers: {
      onStartClick,
      onConfirmStart,
      onCancelModal,
      onContinueClick,
      onToggleSound,
      onResetSave
    }
  } = useHomeScreen();

  return (
    <main className="home-screen" role="main">
      {/* Camada 0: Fundo (Background) */}
      <div 
        className="bg-layer" 
        style={{ backgroundImage: 'url(/images/bg_garagem.jpg)' }}
        aria-hidden="true"
      >
        <div className="bg-overlay"></div>
        <div className="vignette-overlay"></div>
        <div className="dimensional-fog"></div>
      </div>

      {/* Camada 1: Cenário Intermediário (Bancada e Objeto - Arma de Portais) */}
      <div className="midground-layer" aria-hidden="true">
        <div className="portal-gun-wrapper" title="Arma de Portais Quebrada emitindo radiação instável">
          <div className="energy-leak-glow"></div>
          <div className="spark-particle spark-1"></div>
          <div className="spark-particle spark-2"></div>
          <div className="spark-particle spark-3"></div>

          <img 
            src="/images/obj_arma_portais.png" 
            alt="Arma de portais com tubo de fluido verde radioativo quebrado" 
            className="portal-gun-img" 
          />
          
          <div className="portal-gun-shadow"></div>

          <div className="gun-status-hud">
            <span className="status-dot warning"></span>
            <span className="status-label">FREQ: ERROR // 0x42-ERR</span>
          </div>
        </div>
      </div>

      {/* Camada 2: Personagens (Foreground - Rick & Morty em choque/confusão) */}
      <div className="characters-layer" aria-label="Rick e Morty em choque ao ver a arma de portais quebrada">
        <div className="character-group">
          {/* Morty Tenso e Nervoso ao lado do Rick */}
          <div className="morty-container">
            <img 
              src="/images/morty_tense.png" 
              alt="Morty apavorado e suando frio" 
              className="character-img morty-img" 
            />
            <div className="character-shadow morty-shadow"></div>
            <div className="speech-bubble morty-bubble" aria-hidden="true">
              <span>Ah, cara... o que você fez, Rick?!</span>
            </div>
          </div>

          {/* Rick de Corpo Inteiro em Choque */}
          <div className="rick-container">
            <img 
              src="/images/rick_fullbody_shocked.png" 
              alt="Rick Sanchez de corpo inteiro em estado de choque e perplexidade" 
              className="character-img rick-img" 
            />
            <div className="character-shadow rick-shadow"></div>
          </div>
        </div>
      </div>

      {/* Camada Superior: HUD, Título e Menu Interativo */}
      <div className="ui-layer">
        {/* Topo: Controles e Informações de Dimensão */}
        <header className="top-hud">
          <div className="dimension-badge" title="Frequência Dimensional Atual">
            <span className="pulse-indicator"></span>
            <span className="badge-text">UNIVERSO: <strong>C-137</strong> (PORTAL OFFLINE)</span>
          </div>

          <div className="top-actions">
            {hasSavedGame && (
              <button 
                type="button" 
                onClick={onResetSave}
                className="hud-btn reset-btn" 
                title="Limpar progresso salvo no dispositivo"
                aria-label="Limpar progresso salvo"
              >
                Limpar Progresso
              </button>
            )}

            <button 
              type="button" 
              onClick={onToggleSound} 
              className="hud-btn sound-btn"
              title={soundEnabled ? 'Desativar Sons' : 'Ativar Sons'}
              aria-label={soundEnabled ? 'Desativar Sons' : 'Ativar Sons'}
            >
              {soundEnabled ? 'SOM LIGADO' : 'SOM MUDO'}
            </button>
          </div>
        </header>

        {/* Lado Direito: Identidade do Jogo e Painel de Ações Distribuídos */}
        <div className="hero-content-panel">
          {/* Bloco do Título (Com fundo suave translúcido para contraste) */}
          <div className="title-wrapper">
            <div className="series-eyebrow">
              <span className="franchise-title">RICK E MORTY</span>
            </div>
            
            <h1 id="game-title" className="main-title">
              <span className="title-prefix">O PARADOXO DO</span>
              <span className="portal-broken-highlight">PORTAL QUEBRADO</span>
            </h1>
          </div>

          {/* Console de Ações (Clean, sem scanner e sem excesso de elementos) */}
          <section className="action-card" aria-labelledby="game-title">
            {/* Status da Missão sutil e sem caixa pesada interna */}
            <div className="mission-brief">
              <span className="mission-tag">DIAGNÓSTICO DA ARMA</span>
              <p className="mission-text">
                Fluido dimensional instável. Viaje pelo multiverso, resolva os enigmas dos guardiões e recalibre o condensador.
              </p>
            </div>

            {/* Botões de Ação */}
            <div className="action-buttons-group">
              <button 
                type="button"
                className="action-btn btn-primary"
                onClick={onStartClick}
                autoFocus
                aria-label="Iniciar uma nova aventura multiversal"
              >
                <span className="btn-label">INICIAR AVENTURA</span>
              </button>

              <button 
                type="button"
                className={`action-btn btn-secondary ${!hasSavedGame ? 'disabled' : ''}`}
                onClick={onContinueClick}
                disabled={!hasSavedGame}
                aria-disabled={!hasSavedGame}
                aria-label={
                  hasSavedGame 
                    ? `Continuar progresso salvo na dimensão ${gameState.pontoAtual}` 
                    : 'Nenhum progresso salvo encontrado'
                }
              >
                <span className="btn-label">CONTINUAR PROGRESSO</span>
                {hasSavedGame && (
                  <span className="save-badge">Ponto {gameState.pontoAtual}</span>
                )}
              </button>
            </div>
          </section>
        </div>
      </div>

      {/* Modal de Confirmação Simples e Direto */}
      {showConfirmNewGame && (
        <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <div className="modal-card">
            <h2 id="modal-title" className="modal-title">Substituir Progresso Existente?</h2>
            <p className="modal-desc">
              Você já possui uma jornada em andamento (Ponto {gameState.pontoAtual}). 
              Iniciar uma nova aventura substituirá os dados salvos anteriormente.
            </p>
            <div className="modal-actions">
              <button 
                type="button"
                className="modal-btn modal-btn-cancel"
                onClick={onCancelModal}
              >
                Cancelar
              </button>
              <button 
                type="button"
                className="modal-btn modal-btn-confirm"
                onClick={onConfirmStart}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
