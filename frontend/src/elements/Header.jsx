// src/elements/Header.jsx
import { Link } from "react-router-dom";
import style from "../css/universale.module.css";


function Header() {
    return (
        <header>
            <div>
                <h1>
                    <a href="/main">
                        <img src="..\src\assets\logo.svg"  width='100%' alt="RuStore Logo" />
                    </a>
                </h1>
            </div>
            <nav>
                {/* Обновим ссылки */}
                <Link to={"/main"}> <button className={style.button1} >Главная</button> </Link>
                <Link to={"/categories"}><button className={style.button1} >Категории</button></Link>
                {/* Убираем регистрацию из хедера, если не планируется */}
                {/* <Link to={"/login"} ><button className={`${style.button1} ${style.addstyle}`} >Регистрация</button> </Link> */}
            </nav>
        </header>
    )
}

export default Header;