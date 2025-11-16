// main.jsx
import { StrictMode } from 'react'
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
// Измените строку импорта:
import { AppDataProvider } from './data/useAppData.jsx'; // Добавлено .jsx
// Или, если ваша сборка настроена на автоматическое разрешение расширений, следующая строка может работать и без .jsx,
// но лучше указать явно, чтобы избежать ошибки:
// import { AppDataProvider } from './data/useAppData';

import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
      <BrowserRouter>
          <AppDataProvider>
            <App />
          </AppDataProvider>
      </BrowserRouter>
  </StrictMode>
)