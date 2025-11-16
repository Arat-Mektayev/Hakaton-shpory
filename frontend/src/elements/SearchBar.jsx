// src/elements/SearchBar.jsx
import React from 'react'; // Добавлен React
import style from '../css/universale.module.css';

const SearchBar = ({ setSearchQuery }) => {
  return (
    <div id="search-bar" style={{ padding: '15px' }}> {/* Добавим id для демонстрации и отступ */}
      <input
        type="text"
        placeholder="Поиск приложений..."
        onChange={(e) => setSearchQuery(e.target.value)} // Вызывает функцию из MainScreen
        style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }} // boxSizing учитывает padding в ширине
      />
    </div>
  );
};

export default SearchBar;