// src/elements/SortSelector.jsx
import React from 'react'; // Добавлен React
import style from '../css/universale.module.css';

const SortSelector = ({ setSortOption }) => {
  return (
    <div style={{ marginBottom: '20px' }}>
      <label>
        Сортировать:
        <select
          onChange={(e) => setSortOption(e.target.value)}
          style={{ marginLeft: '10px', padding: '5px', fontSize: 'inherit' }}
        >
          <option value="default">По умолчанию (А-Я)</option>
          <option value="popular">По популярности</option>
          <option value="new">По новизне</option>
          <option value="editor">Выбор редакции</option>
          <option value="rating">По рейтингу</option> {/* Новая опция */}
        </select>
      </label>
    </div>
  );
};

export default SortSelector;