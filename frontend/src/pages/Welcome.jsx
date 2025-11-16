import style from "../css/universale.module.css"

function Welcome() {
    return(
        <div className = {style.content_1}>
            <div className={style.welcome_text_block}>
                <span className={style.welcome_title} >Контора *********</span>
                <br/>
                <span className={style.welcome_text}>
                    A Lorem Ipsum egy egyszerû szövegrészlete, szövegutánzata a betûszedõ és nyomdaiparnak. A Lorem Ipsum az 1500-as évek óta standard szövegrészletként szolgált az iparban; mikor egy ismeretlen nyomdász összeállította a betûkészletét és egy példa-könyvet vagy szöveget nyomott papírra, ezt használta. Nem csak 5 évszázadot élt túl, de az elektronikus betûkészleteknél is változatlanul megmaradt. Az 1960-as években népszerûsítették a Lorem Ipsum részleteket magukbafoglaló Letraset lapokkal, és legutóbb softwarekkel mint például az Aldus Pagemaker.
                </span>
            </div>


            <div className={style.three_d_block} >
                
            </div>
        </div>
    )
}



export default Welcome;