// src/elements/ScreenshotGallery.jsx
import { useState } from 'react';
import style from '../css/universale.module.css'; // Или создайте отдельный CSS модуль

const ScreenshotGallery = ({ screenshots, initialIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? screenshots.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === screenshots.length - 1 ? 0 : prevIndex + 1));
  };

  const handleImageClick = (e) => {
    // Закрываем галерею при клике на фоновое изображение, но не на навигационные стрелки
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      }}
      onClick={handleImageClick}
    >
      <button onClick={onClose} style={{ position: 'absolute', top: '20px', right: '20px', color: 'white', background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' }}>×</button>
      <button onClick={goToPrevious} style={{ position: 'absolute', left: '20px', color: 'white', background: 'none', border: 'none', fontSize: '36px', cursor: 'pointer' }}>&#8249;</button>
      <img
        src={screenshots[currentIndex]}
        alt={`Скриншот ${currentIndex + 1}`}
        style={{ maxWidth: '90%', maxHeight: '90%', objectFit: 'contain' }}
        onClick={(e) => e.stopPropagation()} // Не закрываем при клике на изображение
      />
      <button onClick={goToNext} style={{ position: 'absolute', right: '20px', color: 'white', background: 'none', border: 'none', fontSize: '36px', cursor: 'pointer' }}>&#8250;</button>
    </div>
  );
};

export default ScreenshotGallery;