import { createContext, useContext, useState, useEffect } from 'react';
import { storageService, INITIAL_GAME_STATE } from '../services/storageService';
import { audioService } from '../services/audioService';

const GameContext = createContext(null);

export function GameProvider({ children }) {
  const [currentScreen, setCurrentScreen] = useState('home'); // 'home', 'tutorial', 'map', etc.
  const [gameState, setGameState] = useState(INITIAL_GAME_STATE);
  const [hasSavedGame, setHasSavedGame] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Inicializa o estado a partir do storageService
  useEffect(() => {
    const loaded = storageService.loadGame();
    setGameState(loaded);
    setHasSavedGame(storageService.hasValidProgress(loaded));
  }, []);

  // Sincroniza configuração de áudio com o audioService
  const toggleSound = () => {
    setSoundEnabled(prev => {
      const next = !prev;
      audioService.setEnabled(next);
      if (next) audioService.playClick();
      return next;
    });
  };

  // Iniciar nova aventura
  const startNewGame = () => {
    const newState = { ...INITIAL_GAME_STATE };
    setGameState(newState);
    storageService.saveGame(newState);
    setHasSavedGame(true);
    audioService.playPortalActivation();
    setCurrentScreen('tutorial');
  };

  // Continuar progresso salvo
  const continueGame = () => {
    if (!hasSavedGame) return;
    const loaded = storageService.loadGame();
    setGameState(loaded);
    audioService.playClick();
    setCurrentScreen('map');
  };

  // Reset de fábrica (limpa save)
  const resetSave = () => {
    storageService.clearSave();
    setHasSavedGame(false);
    setGameState({ ...INITIAL_GAME_STATE });
    audioService.playClick();
  };

  return (
    <GameContext.Provider
      value={{
        currentScreen,
        setCurrentScreen,
        gameState,
        setGameState,
        hasSavedGame,
        startNewGame,
        continueGame,
        resetSave,
        soundEnabled,
        toggleSound
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame deve ser utilizado dentro de um GameProvider');
  }
  return context;
}
