// src/App.jsx
import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import Header from "./elements/Header.jsx";
// Убедитесь, что Footer не использует position: fixed/absolute, если хотите флекс-метод
import Footer from './elements/Footer.jsx';
// Импортируем новые компоненты
import OnboardingScreen from './pages/OnboardingScreen';
import MainScreen from './pages/MainScreen';
import AppDetailScreen from './pages/AppDetailScreen';
import CategoriesScreen from './pages/CategoriesScreen';

// Обновим структуру
function App() {
  return (
    // Обертка для флекс-раскладки
    <div className="app-wrapper">
      <Header />
      {/* Контейнер для основного контента (Header + MainContent + Footer займут минимум 100vh) */}
      <div className="main-content">
        <Routes>
            <Route path="/" element={
                localStorage.getItem('hasSeenOnboarding') === 'true' ? <Navigate to="/main" replace /> : <OnboardingScreen />
            } />
            <Route path="/main" element={<MainScreen />} />
            <Route path="/app/:id" element={<AppDetailScreen />} />
            <Route path="/categories" element={<CategoriesScreen />} />
            <Route path="/info" element={<Navigate to="/main" replace />} />
            <Route path="/login" element={<Navigate to="/main" replace />} />
            <Route path="*" element={<Navigate to="/main" replace />} />
        </Routes>
      </div>
      <Footer />
      <Toaster
          position="bottom-right"
          expand={false}
          richColors
          closeButton
      />
    </div>
  )
}
export default App