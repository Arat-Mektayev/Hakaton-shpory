// src/pages/OnboardingScreen.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.svg'; // Используем ваш логотип
import style from '../css/universale.module.css'; // Или создайте отдельный CSS модуль

const OnboardingScreen = () => {
  const navigate = useNavigate();
  const [showDemo, setShowDemo] = useState(false);
  const [demoStep, setDemoStep] = useState(0);

  const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');

  useEffect(() => {
    if (hasSeenOnboarding === 'true') {
      navigate('/main', { replace: true });
    }
  }, [hasSeenOnboarding, navigate]);

  const handleStart = () => {
    localStorage.setItem('hasSeenOnboarding', 'true');
    if (showDemo) {
      setDemoStep(1); // Начинаем демонстрацию
    } else {
      navigate('/main');
    }
  };

  const handleDemoNext = () => {
    if (demoStep < 3) { // Предположим, 3 шага
      setDemoStep(prev => prev + 1);
    } else {
      navigate('/main');
    }
  };

  if (hasSeenOnboarding === 'true') {
    return null; // Не рендерим, если уже видели
  }

  // Простая демонстрация - подсветка элементов (без библиотеки)
  // В реальности используйте react-joyride или аналог
  const renderDemoOverlay = () => {
    if (!showDemo) return null;

    const steps = [
      { target: 'header', text: 'Это шапка приложения' },
      { target: 'search-bar', text: 'Здесь можно искать приложения' },
      { target: 'app-card', text: 'Это карточка приложения. Нажмите, чтобы посмотреть подробности.' }
    ];

    if (demoStep >= steps.length) {
      return null; // Заканчиваем демонстрацию
    }

    const currentStep = steps[demoStep];

    return (
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000, pointerEvents: 'none'
      }}>
        {/* Простая "подсветка" - просто прямоугольник над элементом */}
        {/* Реализация будет зависеть от точного позиционирования target элемента */}
        <div style={{
          position: 'absolute',
          top: currentStep.target === 'header' ? '0px' : currentStep.target === 'search-bar' ? '10vh' : '20vh',
          left: '0px',
          width: '100%',
          height: currentStep.target === 'header' ? '10vh' : currentStep.target === 'search-bar' ? '6vh' : '40vh',
          border: '3px solid yellow',
          pointerEvents: 'auto'
        }}></div>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '10px',
          zIndex: 1001
        }}>
          <p>{currentStep.text}</p>
          <button onClick={handleDemoNext}>Далее</button>
        </div>
      </div>
    );
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <img src={logo} alt="RuStore Logo" width="144" height="36" />
      <h1>Добро пожаловать в RuStore!</h1>
      <p>Откройте для себя мир российских приложений</p>
      <div>
        <label>
          <input
            type="checkbox"
            checked={showDemo}
            onChange={(e) => setShowDemo(e.target.checked)}
          />
          Показать, как пользоваться?
        </label>
      </div>
      <button className={style.button1} onClick={handleStart}>
        Начать
      </button>
      {renderDemoOverlay()}
    </div>
  );
};

export default OnboardingScreen;