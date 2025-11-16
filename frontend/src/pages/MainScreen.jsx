// src/pages/MainScreen.jsx
import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useAppData } from '../data/useAppData';
import AppCard from '../elements/AppCard';
import SearchBar from '../elements/SearchBar';
import SortSelector from '../elements/SortSelector';
import style from '../css/universale.module.css';

const MainScreen = () => {
  const { loading, error, getAppsBySearch, getPopularApps, getNewApps, getEditorChoiceApps, apps } = useAppData();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('default'); // 'default', 'popular', 'new', 'editor', 'rating'
  const [filteredApps, setFilteredApps] = useState([]);
  const [searchParams] = useSearchParams();

  const selectedCategoryFromURL = searchParams.get('category');

  useEffect(() => {
    let results = getAppsBySearch(searchQuery);

    if (selectedCategoryFromURL) {
      results = results.filter(app => app.category === selectedCategoryFromURL);
    }

    switch (sortOption) {
      case 'popular':
        results = [...results].sort((a, b) => b.popularityScore - a.popularityScore);
        break;
      case 'new':
        results = results.filter(app => app.isNew).sort((a, b) => new Date(b.addedDate || '1970-01-01') - new Date(a.addedDate || '1970-01-01'));
        break;
      case 'editor':
        results = results.filter(app => app.isEditorChoice).sort((a, b) => b.popularityScore - a.popularityScore);
        break;
      case 'rating': // Новый case для сортировки по рейтингу
        results = [...results].sort((a, b) => b.rating - a.rating); // Сортировка по убыванию рейтинга
        break;
      case 'default':
      default:
        results = results.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    setFilteredApps(results);
  }, [searchQuery, sortOption, selectedCategoryFromURL, getAppsBySearch, getPopularApps, getNewApps, getEditorChoiceApps]);

  const showSpecialBlocks = !selectedCategoryFromURL && !searchQuery && sortOption === 'default';

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>
        {selectedCategoryFromURL ? `Приложения: ${selectedCategoryFromURL}` : 'Витрина приложений'}
      </h1>
      <Link to="/categories" className={style.button1}>Категории</Link>
      <SearchBar setSearchQuery={setSearchQuery} />
      <SortSelector setSortOption={setSortOption} />

      {showSpecialBlocks && (
        <>
          <h2>Популярные</h2>
          <div className={style.content_1}>
            {getPopularApps().slice(0, 4).map(app => (
              <AppCard key={`popular-${app.id}`} app={app} />
            ))}
          </div>

          <h2>Новинки</h2>
          <div className={style.content_1}>
            {getNewApps().slice(0, 4).map(app => (
              <AppCard key={`new-${app.id}`} app={app} />
            ))}
          </div>

          <h2>Выбор редакции</h2>
          <div className={style.content_1}>
            {getEditorChoiceApps().slice(0, 4).map(app => (
              <AppCard key={`editor-${app.id}`} app={app} />
            ))}
          </div>
        </>
      )}

      {!showSpecialBlocks ? (
        <h2>
          {!selectedCategoryFromURL && !searchQuery && sortOption !== 'default' ? (
            sortOption === 'popular' ? 'Популярные приложения' :
            sortOption === 'new' ? 'Новые приложения' :
            sortOption === 'editor' ? 'Выбор редакции' :
            sortOption === 'rating' ? 'Приложения по рейтингу' : 'Отсортированные приложения' // Обновляем заголовок
          ) : (
            selectedCategoryFromURL ? 'Результаты по категории' : 'Результаты поиска'
          )}
        </h2>
      ) : (
        <h2>Все приложения</h2>
      )}
      <div className={style.content_1}>
        {filteredApps.length > 0 ? (
          filteredApps.map(app => (
            <AppCard key={app.id} app={app} />
          ))
        ) : (
          <p>Приложения не найдены.</p>
        )}
      </div>
    </div>
  );
};

export default MainScreen;