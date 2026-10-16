import { useTutorialScreen } from './useTutorialScreen';
import './TutorialScreen.css';

/**
 * TutorialScreen (View)
 * Segunda tela do jogo: Apresenta o Sr. Meeseeks na sala dos Smith
 * orientando o jogador sobre as regras, navegação e objetivo final.
 */
export default function TutorialScreen({ onCompleteTutorial }) {
  const {
    step,
    totalSteps,
    isFirstStep,
    isLastStep,
    currentStepData,
    soundEnabled,
    handlers: {
      onNext,
      onPrev,
      onSkip,
      onToggleSound
    }
  } = useTutorialScreen({ onCompleteTutorial });

  return (
    <main className="tutorial-screen" role="main">
      {/* Camada 0: Fundo da Sala dos Smith */}
      <div 
        className="tutorial-bg" 
        style={{ backgroundImage: 'url(/images/bg_sala_smith.jpg)' }}
        aria-hidden="true"
      >
        <div className="tutorial-bg-overlay"></div>
        <div className="tutorial-vignette"></div>
      </div>

      {/* Camada 1: Sr. Meeseeks em Destaque */}
      <div className="meeseeks-layer" aria-label="Sr. Meeseeks animado orientando o jogador">
        <div className="meeseeks-container">
          <img 
            src="/images/char_meeseeks.png" 
            alt="Sr. Meeseeks entusiasmado sorrindo e apontando" 
            className="meeseeks-img" 
          />
          <div className="meeseeks-shadow"></div>
        </div>
      </div>

      {/* Camada 2: HUD Superior e Console de Diálogo */}
      <div className="tutorial-ui-layer">
        {/* Barra Superior */}
        <header className="tutorial-top-hud">
          <div className="tutorial-badge">
            <span className="pulse-dot"></span>
            <span className="badge-text">SALA DE ESTAR DOS SMITH // FASE DE ORIENTAÇÃO</span>
          </div>

          <div className="tutorial-top-actions">
            <button 
              type="button" 
              onClick={onSkip}
              className="hud-btn skip-btn"
              title="Pular introdução e ir direto ao mapa"
              aria-label="Pular introdução"
            >
              Pular Tutorial
            </button>

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

        {/* Caixa de Diálogo do Sr. Meeseeks */}
        <section className="dialog-panel" aria-labelledby="speaker-name">
          {/* Cabeçalho do Orador */}
          <div className="dialog-header">
            <div className="speaker-badge">
              <span id="speaker-name" className="speaker-name">SR. MEESEEKS</span>
            </div>

            <div className="step-tracker" aria-label={`Passo ${step + 1} de ${totalSteps}`}>
              <span className="step-category">{currentStepData.category}</span>
              <div className="step-dots" aria-hidden="true">
                {Array.from({ length: totalSteps }).map((_, idx) => (
                  <span 
                    key={idx} 
                    className={`step-dot ${idx === step ? 'active' : ''} ${idx < step ? 'completed' : ''}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Texto de Fala (com aria-live para acessibilidade) */}
          <div 
            className="dialog-body" 
            aria-live="polite" 
            key={currentStepData.id}
          >
            <p className="dialog-text">
              {currentStepData.dialog}
            </p>
          </div>

          {/* Ações e Navegação */}
          <footer className="dialog-footer">
            <div className="keyboard-hint" aria-hidden="true">
              <span>Espaço ou Enter para avançar</span>
            </div>

            <div className="dialog-actions">
              {!isFirstStep && (
                <button 
                  type="button" 
                  onClick={onPrev}
                  className="dialog-btn btn-back"
                  aria-label="Retornar à fala anterior"
                >
                  Voltar
                </button>
              )}

              <button 
                type="button" 
                onClick={onNext}
                className={`dialog-btn ${isLastStep ? 'btn-finish' : 'btn-next'}`}
                autoFocus
                aria-label={isLastStep ? 'Ir para o Mapa Multiversal' : 'Avançar para a próxima orientação'}
              >
                {isLastStep ? 'Ir para o Mapa' : 'Avançar'}
              </button>
            </div>
          </footer>
        </section>
      </div>
    </main>
  );
}
