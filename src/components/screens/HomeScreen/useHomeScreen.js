import { useState } from 'react';
import { useGame } from '../../../context/GameContext';

/**
 * Hook de lógica e orquestração de estado para a HomeScreen.
 * Desacopla regras de interação da camada de renderização (View).
 */
export function useHomeScreen() {
  const {
    hasSavedGame,
    startNewGame,
    continueGame,
    gameState,
    soundEnabled,
    toggleSound,
    resetSave
  } = useGame();

  const [showConfirmNewGame, setShowConfirmNewGame] = useState(false);

  // Iniciar Aventura: se tiver save existente, pede confirmação
  const handleStartClick = () => {
    if (hasSavedGame) {
      setShowConfirmNewGame(true);
    } else {
      startNewGame();
    }
  };

  // Confirmar início de nova aventura sobrescrevendo o save anterior
  const handleConfirmStart = () => {
    setShowConfirmNewGame(false);
    startNewGame();
  };

  // Cancelar e fechar modal
  const handleCancelModal = () => {
    setShowConfirmNewGame(false);
  };

  return {
    gameState,
    hasSavedGame,
    soundEnabled,
    showConfirmNewGame,
    handlers: {
      onStartClick: handleStartClick,
      onConfirmStart: handleConfirmStart,
      onCancelModal: handleCancelModal,
      onContinueClick: continueGame,
      onToggleSound: toggleSound,
      onResetSave: resetSave
    }
  };
}
