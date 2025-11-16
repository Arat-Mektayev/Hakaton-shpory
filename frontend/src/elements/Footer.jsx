
import style from "../css/universale.module.css";


function Footer() {
    return (
        <footer>
            <div className={style.footer_text_block}>
                <h4>Команда "Шпоры"</h4>
                Участники: <br/>
                Шарбан Сильвиу<br/>
                Пипенко Константин<br/>
                Рыбаков Тимофей<br/>
                <br/>
            </div>
        </footer>
    )
}

export default Footer;