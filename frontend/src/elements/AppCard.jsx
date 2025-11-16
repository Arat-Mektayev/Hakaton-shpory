// src/elements/AppCard.jsx
import { Link } from 'react-router-dom';
import { useAppData } from '../data/useAppData'; // Используем для получения данных
import styles from "../css/universale.module.css"; // CSS

function AppCard({ app }) {
  return (
    <Link to={`/app/${app.id}`} style={{ textDecoration: 'none', color: 'inherit' }} className={styles.card_link}> {/* Добавим класс для стилизации */}
      <div className={styles.cardbody} id="app-card"> {/* Добавим id для демонстрации */}
        <img src={app.icon} alt={app.name} className={styles.cardphoto} />
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', margin: '0 5%' }}>
          <p className={styles.cardname}>{app.name}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '0 5%' }}>
              <span style={{ fontSize: '0.8em' }}>★ {app.rating}</span>
              <span style={{ fontSize: '0.8em' }}>{app.category}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default AppCard;