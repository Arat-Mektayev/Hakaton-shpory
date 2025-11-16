// src/data/useAppData.jsx
import React, { useState, useEffect, useContext, createContext } from 'react';

const AppDataContext = createContext();

export const useAppData = () => {
  const context = useContext(AppDataContext);
  if (!context) {
    throw new Error('useAppData must be used within an AppDataProvider');
  }
  return context;
};

// Вспомогательная функция для преобразования структуры данных от Django к ожидаемой структуре React
const transformAppData = (djangoApp) => {
  return {
    id: djangoApp.ID.toString(), // ID из Django может быть числом, React ожидает строку для key
    name: djangoApp.Name,
    developer: djangoApp.Developer,
    category: djangoApp.Category,
    rating: djangoApp.Rate, // Rate -> rating
    ageRating: djangoApp.Age, // Age -> ageRating
    description: djangoApp.Description,
    icon: djangoApp.IconPath, // IconPath -> icon
    screenshots: djangoApp.Screenshots,
    tags: djangoApp.tags,
    isNew: djangoApp.isNew,
    isEditorChoice: djangoApp.isEditorChoice,
    popularityScore: djangoApp.popularityScore,
    addedDate: `2024-11-${(djangoApp.ID % 28 + 1).toString().padStart(2, '0')}T10:00:00Z` // Простой пример
  };
};

export const AppDataProvider = ({ children }) => {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/apps/');
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const data = await response.json();
        const transformedApps = data.map(transformAppData);
        setApps(transformedApps);
      } catch (err) {
        setError(err.message);
        console.error("Error loading apps from Django API: ", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Зависимости остались прежними

  const getAppById = (id) => apps.find(app => app.id === id);

  const getAppsByCategory = (category) => apps.filter(app => app.category === category);

  const getAppsBySearch = (query) => {
    if (!query) return apps;
    const q = query.toLowerCase();
    return apps.filter(app =>
      app.name.toLowerCase().includes(q) ||
      app.tags.some(tag => tag.toLowerCase().includes(q))
    );
  };

  const getPopularApps = () => [...apps].sort((a, b) => b.popularityScore - a.popularityScore);

  const getNewApps = () => apps.filter(app => app.isNew);

  const getEditorChoiceApps = () => apps.filter(app => app.isEditorChoice);

  const getSimilarApps = (targetApp) => {
    if (!targetApp) return [];
    const tagBased = apps.filter(app => app.id !== targetApp.id && app.tags.some(tag => targetApp.tags.includes(tag)));
    if (tagBased.length > 0) {
      return tagBased;
    }
    return apps.filter(app => app.id !== targetApp.id && app.category === targetApp.category);
  };

  return (
    <AppDataContext.Provider value={{
      apps,
      loading,
      error,
      getAppById,
      getAppsByCategory,
      getAppsBySearch,
      getPopularApps,
      getNewApps,
      getEditorChoiceApps,
      getSimilarApps
    }}>
      {children}
    </AppDataContext.Provider>
  );
};