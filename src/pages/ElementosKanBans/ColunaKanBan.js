import s from './ColunaKanBan.module.css'

function ColunaKanBan({nome, Cards, botao}) {    

    return (
        <section className={s.colKB}>
                <p>{botao}{nome}</p>

            <div id='col'>
                {Cards}
            </div>
        </section>
    )
}

export default ColunaKanBan;