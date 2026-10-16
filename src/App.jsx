import { GameProvider, useGame } from './context/GameContext';
import HomeScreen from './components/screens/HomeScreen/HomeScreen';
import TutorialScreen from './components/screens/TutorialScreen/TutorialScreen';
import './App.css';

function MainApp() {
  const { currentScreen, setCurrentScreen, gameState } = useGame();

  if (currentScreen === 'home') {
    return <HomeScreen />;
  }

  if (currentScreen === 'tutorial') {
    return <TutorialScreen onCompleteTutorial={() => setCurrentScreen('map')} />;
  }

  // Telas subsequentes em desenvolvimento (Mapa Multiversal, etc.)
  return (
    <div className="next-screen-container">
      <div className="next-screen-card">
        <div className="portal-spinner" aria-hidden="true"></div>
        <h1 className="next-screen-title">
          {currentScreen === 'tutorial' ? 'SALA DE ESTAR DOS SMITH' : 'MAPA MULTIVERSAL'}
        </h1>
        <p className="next-screen-desc">
          {currentScreen === 'tutorial' 
            ? 'O Sr. Meeseeks está se materializando para orientar a investigação...' 
            : `Carregando Dimensão #${gameState.pontoAtual} na frequência C-137...`}
        </p>
        <button 
          type="button"
          className="back-btn"
          onClick={() => setCurrentScreen('home')}
        >
          Retornar à Garagem
        </button>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <GameProvider>
      <MainApp />
    </GameProvider>
  );
}
