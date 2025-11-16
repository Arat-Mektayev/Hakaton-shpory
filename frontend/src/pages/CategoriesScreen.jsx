// src/pages/CategoriesScreen.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Используем Link вместо navigate
import { useAppData } from '../data/useAppData';
import style from '../css/universale.module.css';

const CategoriesScreen = () => {
  const { apps } = useAppData();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const uniqueCategories = [...new Set(apps.map(app => app.category))];
    setCategories(uniqueCategories);
  }, [apps]);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Категории</h1>
      <Link to="/main" className={style.button1}>Назад</Link>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', padding: '20px'}}>
        {categories.map((category, index) => (
          <Link
            key={index}
            to={`/main?category=${encodeURIComponent(category)}`} // Формируем URL с параметром
            style={{ textDecoration: 'none' }} // Убираем подчеркивание у ссылки
          >
            <button className={style.button1}>
              {category}
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoriesScreen;