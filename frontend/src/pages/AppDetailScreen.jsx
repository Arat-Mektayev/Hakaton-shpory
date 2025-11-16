// src/pages/AppDetailScreen.jsx
import React, { useState } from 'react'; // Добавлен React
import { useParams, useNavigate } from 'react-router-dom';
import { useAppData } from '../data/useAppData';
import ScreenshotGallery from '../elements/ScreenshotGallery';
import style from '../css/universale.module.css';
import AppCard from '../elements/AppCard';

const AppDetailScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getAppById, getSimilarApps } = useAppData();
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [selectedScreenshotIndex, setSelectedScreenshotIndex] = useState(0);

  const app = getAppById(id);
  const similarApps = app ? getSimilarApps(app) : [];

  if (!app) {
    return <div>Приложение не найдено</div>;
  }

  const openGallery = (index) => {
    setSelectedScreenshotIndex(index);
    setGalleryOpen(true);
  };

  return (
    <div style={{ padding: '20px' }}>
      <button onClick={() => navigate(-1)} className={style.button1}>Назад</button>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', margin: '20px' }}>
        <img src={app.icon} alt={app.name} style={{ width: '100px', height: '100px' }} />
        <div>
          <h1>{app.name}</h1>
          <p>Разработчик: {app.developer}</p>
          <p>Категория: {app.category}</p>
          <p>Возрастной рейтинг: {app.ageRating}</p>
          <p>Рейтинг: ★ {app.rating}</p>
        </div>
      </div>
      <p>{app.description}</p>

      {/* КНОПКА СКАЧИВАНИЯ/УСТАНОВКИ */}
      <div style={{ margin: '20px' }}>
        <a href={"http://127.0.0.1:8000/data/apk/app.apk"} download> {/* Используем app.FilePath из данных Django */}
          <button className={style.button1}> {/* Или используйте свой CSS класс для кнопки */}
            Установить
          </button>
        </a>
      </div>

      <h3>Скриншоты:</h3>
      <div style={{ display: 'flex', gap: '10px', overflowX: 'auto' }}>
        {app.screenshots.map((screenshot, index) => (
          <img
            key={index}
            src={screenshot}
            alt={`Скриншот ${index + 1}`}
            style={{ width: '150px', height: 'auto', cursor: 'pointer' }}
            onClick={() => openGallery(index)}
          />
        ))}
      </div>

      <h3>Похожие приложения:</h3>
      <div className={style.content_1}>
        {similarApps.slice(0, 4).map(similarApp => (
          <AppCard key={similarApp.id} app={similarApp} />
        ))}
      </div>

      {galleryOpen && (
        <ScreenshotGallery
          screenshots={app.screenshots}
          initialIndex={selectedScreenshotIndex}
          onClose={() => setGalleryOpen(false)}
        />
      )}
    </div>
  );
};

export default AppDetailScreen;