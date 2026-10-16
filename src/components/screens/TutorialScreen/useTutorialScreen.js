import { useState, useEffect, useCallback } from 'react';
import { useGame } from '../../../context/GameContext';
import { audioService } from '../../../services/audioService';

export const TUTORIAL_STEPS = [
  {
    id: 'regras',
    category: 'INSTRUÇÕES INICIAIS',
    stepLabel: 'Passo 1 de 3',
    dialog: 'Oooooh yeah! Eu sou o Sr. Meeseeks, olhem para mim! O Rick quebrou a Arma de Portais e precisamos explorar dimensões para consertá-la!'
  },
  {
    id: 'navegacao',
    category: 'NAVEGAÇÃO MULTIVERSAL',
    stepLabel: 'Passo 2 de 3',
    dialog: 'Em cada dimensão, você deve responder à pergunta do Guardião local para coletar tesouros e partes da equação (pistas)!'
  },
  {
    id: 'objetivo',
    category: 'OBJETIVO DA MISSÃO',
    stepLabel: 'Passo 3 de 3',
    dialog: 'Ao final, você organizará as pistas no seu Inventário para montar o código e resolver o enigma final! Vamos nessa?!'
  }
];

/**
 * Hook de lógica do Tutorial do Sr. Meeseeks
 * Controla os passos sequenciais, navegação por teclado e finalização.
 */
export function useTutorialScreen({ onCompleteTutorial } = {}) {
  const { setCurrentScreen, soundEnabled, toggleSound } = useGame();
  const [step, setStep] = useState(0);

  const totalSteps = TUTORIAL_STEPS.length;
  const isFirstStep = step === 0;
  const isLastStep = step === totalSteps - 1;
  const currentStepData = TUTORIAL_STEPS[step];

  // Concluir Tutorial
  const finishTutorial = useCallback(() => {
    audioService.playPortalActivation();
    if (typeof onCompleteTutorial === 'function') {
      onCompleteTutorial();
    } else {
      setCurrentScreen('map');
    }
  }, [onCompleteTutorial, setCurrentScreen]);

  // Avançar Etapa
  const handleNext = useCallback(() => {
    if (isLastStep) {
      finishTutorial();
    } else {
      audioService.playClick();
      setStep(prev => Math.min(prev + 1, totalSteps - 1));
    }
  }, [isLastStep, finishTutorial, totalSteps]);

  // Retroceder Etapa
  const handlePrev = useCallback(() => {
    if (step > 0) {
      audioService.playClick();
      setStep(prev => prev - 1);
    }
  }, [step]);

  // Pular Tutorial diretamente para o mapa
  const handleSkip = useCallback(() => {
    finishTutorial();
  }, [finishTutorial]);

  // Suporte à navegação por teclado (Enter, Espaço e Setas)
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ignora se estiver interagindo com elementos de input/form
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        handleSkip();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, handleSkip]);

  return {
    step,
    totalSteps,
    isFirstStep,
    isLastStep,
    currentStepData,
    soundEnabled,
    handlers: {
      onNext: handleNext,
      onPrev: handlePrev,
      onSkip: handleSkip,
      onToggleSound: toggleSound
    }
  };
}
