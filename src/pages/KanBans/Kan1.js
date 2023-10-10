import Navegacao from '../PagHome/Navegacao'
import ColunaKanBan from "../ElementosKanBans/ColunaKanBan"
import s from './Kan1.module.css'
import { useEffect, useState } from "react"
import Card from '../ElementosKanBans/Card'
import CriarCard from '../ElementosKanBans/CriarCard'
import AbrirCard from '../ElementosKanBans/AbrirCard'

function Kan1({tipoKanBan, DataKanBan, BD, BDsaude, BDTI}) {
    
    const [KanB, setKanB] = useState([])

    useEffect(
        () => {
        fetch(`http://localhost:4500${BD}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
         .then((resp) => resp.json())
        .then((data) => {
        setKanB(data)
    })
    .catch((err) => console.log(err))
        },[]
    )


    const [visualizacao, setVisualizacao] = useState()

    function abrirVisualizacao(e, i) {
        setVisualizacao(<AbrirCard fecharPainel={fecharVisualizacao} nome={e} Id={i} BD={KanB} paht={BD} pahtSaude={BDsaude}/>)
    }

    function fecharVisualizacao() {
        setVisualizacao()
    }
    

    var [CriacaoCard, setCC] = useState([])
    function createProject() {
        if(KanB.length === 0) {
            var  IDs = 1
            setCC([<CriarCard fecharPainel={closeCardCreation} BD={BD} Ids={IDs}/>])
        }
        else {
            var IDs = (KanB[KanB.length - 1].id) + 1
            setCC([<CriarCard fecharPainel={closeCardCreation} BD={BD} Ids={IDs}/>])
        }       
    }

    function closeCardCreation() {
        setCC([])
    }

    

    var coluna1 = <ColunaKanBan nome={"Triagem"} botao={(<button title='Crie um novo card' onClick={createProject}>+</button>)}/>;
    var coluna2 = <ColunaKanBan nome={"Primeira Etapa"}/>;
    var coluna3 = <ColunaKanBan nome={"Saúde e conta bancária"}/>;
    var coluna4 = <ColunaKanBan nome={"Segunda Etapa"}/>;
    var coluna5 = <ColunaKanBan nome={"Conferência 2ª etapa"}/>;
    var coluna6 = <ColunaKanBan nome={"Emissão e envio contratos"}/>;
    var coluna7 = <ColunaKanBan nome={"Onboarding"}/>;
    var coluna8 = <ColunaKanBan nome={"Declínio"}/>;

    function showKB() {
        var C = []
        var C2 = []
        var C3 = []
        var C4 = []
        var C5 = []
        var C6 = []
        var C7 = []
        var C8 = []

        for (let i = 0; i < KanB.length; i++) {
            if (KanB[i].fase === 1) {
                C.push(<Card nomeC={KanB[i].nome} funcao={KanB[i].funcao} telefone={KanB[i].telefone} filial={KanB[i].filial} abrir={() => abrirVisualizacao(KanB[i].nome, KanB[i].id)}/>)
                coluna1 = <ColunaKanBan nome={"Triagem"}  Cards={C} botao={(<button title='Crie um novo card' onClick={createProject}>+</button>)}/>
            }  
            else if (KanB[i].fase === 2) {
                C2.push(<Card nomeC={KanB[i].nome} funcao={KanB[i].funcao} telefone={KanB[i].telefone} filial={KanB[i].filial} abrir={() => abrirVisualizacao(KanB[i].nome, KanB[i].id)}/>)
                coluna2 = <ColunaKanBan nome={"Primeira Etapa"}  Cards={C2}/>
            }
            else if (KanB[i].fase === 3) {
                C3.push(<Card nomeC={KanB[i].nome} funcao={KanB[i].funcao} telefone={KanB[i].telefone} filial={KanB[i].filial} abrir={() => abrirVisualizacao(KanB[i].nome, KanB[i].id)}/>)
                coluna3 = <ColunaKanBan nome={"Saúde e conta bancária"}  Cards={C3}/>
            }
            else if (KanB[i].fase === 4) {
                C4.push(<Card nomeC={KanB[i].nome} funcao={KanB[i].funcao} telefone={KanB[i].telefone} filial={KanB[i].filial} abrir={() => abrirVisualizacao(KanB[i].nome, KanB[i].id)}/>)
                coluna4 = <ColunaKanBan nome={"Segunda Etapa"}  Cards={C4}/>
            }
            else if (KanB[i].fase === 5) {
                C5.push(<Card nomeC={KanB[i].nome} funcao={KanB[i].funcao} telefone={KanB[i].telefone} filial={KanB[i].filial} abrir={() => abrirVisualizacao(KanB[i].nome, KanB[i].id)}/>)
                coluna5 = <ColunaKanBan nome={"Conferência 2ª etapa"}  Cards={C5}/>
            }
            else if (KanB[i].fase === 6) {
                C6.push(<Card nomeC={KanB[i].nome} funcao={KanB[i].funcao} telefone={KanB[i].telefone} filial={KanB[i].filial} abrir={() => abrirVisualizacao(KanB[i].nome, KanB[i].id)}/>)
                coluna6 = <ColunaKanBan nome={"Emissão e envio contratos"}  Cards={C6}/>
            }
            else if (KanB[i].fase === 7) {
                C7.push(<Card nomeC={KanB[i].nome} funcao={KanB[i].funcao} telefone={KanB[i].telefone} filial={KanB[i].filial} abrir={() => abrirVisualizacao(KanB[i].nome, KanB[i].id)}/>)
                coluna7 = <ColunaKanBan nome={"Onboarding"}  Cards={C7}/>
            } 
            else if (KanB[i].fase === 8) {
                C8.push(<Card nomeC={KanB[i].nome} funcao={KanB[i].funcao} telefone={KanB[i].telefone} filial={KanB[i].filial} abrir={() => abrirVisualizacao(KanB[i].nome, KanB[i].id)}/>)
                coluna8 = <ColunaKanBan nome={"Declinio"}  Cards={C8}/>
            } 
    }
}

showKB()
        
    return (
        <>
        {visualizacao}
            <Navegacao tipoKanBan={tipoKanBan} DataKanBan={DataKanBan} saude={BDsaude}/>    
            <section className={s.KanBan}>
                {coluna1}
                {coluna2}
                {coluna3}
                {coluna4}
                {coluna5}
                {coluna6}
                {coluna7}
                {coluna8}
            </section>
            {CriacaoCard}
        </>
    )
}

export default Kan1