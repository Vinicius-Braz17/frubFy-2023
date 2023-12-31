import s from "./AbrirCardSaude.module.css";
import { useEffect, useState } from "react";

function AbrirCardSaude({ fecharPainel, BD, nome, Id, paht, pahtSaude }) {
  const dias = [
    {
      dia: "",
      id: 0,
    },
    {
      dia: "Segunda-feira",
      id: 1,
    },
    {
      dia: "Terça-feira",
      id: 2,
    },
    {
      dia: "Quarta-feira",
      id: 3,
    },
    {
      dia: "Quinta-feira",
      id: 4,
    },
    {
      dia: "Sexta-feira",
      id: 5,
    },
    {
      dia: "Sábado",
      id: 6,
    },
    {
      dia: "Domingo",
      id: 7,
    },
  ];

  const [KanB] = useState(BD || {});

  let colaborador = {};

  function renderizar() {
    let index = findIndex(KanB, Id);

    colaborador = KanB[index];
  }

  renderizar();

  const [c, setC] = useState(colaborador);
  const [cargos, setCargos] = useState([]);
  const [filiais, setFiliais] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4500/cargos", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setCargos(data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetch("http://localhost:4500/filiais", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setFiliais(data);
      })
      .catch((err) => console.log(err));
  }, []);

  function preencherDepartamentos() {
    var opcaoSelecionada = document.querySelector("#funcao").value;

    for (let i = 0; i < cargos.length; i++) {
      if (opcaoSelecionada === cargos[i].nome) {
        document.querySelector("#departamento").value = cargos[i].departamento;
        setC({ ...c, departamento: cargos[i].departamento });
      }
    }
  }

  function ToUpperCase(e) {
    var textoInserido = document.querySelector("#INP").value;
    document.querySelector("#INP").value = textoInserido.toUpperCase();
    HandleChange(e);
  }

  function HandleSelectChange(e) {
    var opcaoSelecionada = document.getElementById(e.target.name).value;

    setC({ ...c, [e.target.name]: opcaoSelecionada });
    console.log(c);
  }

  function HandleChange(e) {
    setC({ ...c, [e.target.name]: e.target.value });
    console.log(c);
  }

  function preencherFuncao() {
    var opcaoSelecionada = document.querySelector("#funcao").value;

    preencherDepartamentos();

    setC({ ...c, funcao: opcaoSelecionada });

    console.log(c);
  }

  function findIndex(e, n) {
    for (let i = 0; i < e.length; i++) {
      if (e[i].id === n) {
        return i;
      }
    }
  }

  function atualizarCard(cardAtualizado) {
    fetch(`http://localhost:4500${pahtSaude}/${Id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cardAtualizado),
    })
      .then((resp) => resp.json())
      .catch((err) => console.log(err));

      var CS = {
        nome: cardAtualizado.nome,
        telefone: cardAtualizado.telefone,
        departamento: cardAtualizado.departamento,
        funcao: cardAtualizado.funcao,
        salario: cardAtualizado.salario,
        diaInicio: cardAtualizado.diaInicio,
        diaFim: cardAtualizado.diaFim,
        escalaInicio: cardAtualizado.escalaInicio,
        escalaFim: cardAtualizado.escalaFim,
        filial: cardAtualizado.filial,
        id: cardAtualizado.id,
      }

      fetch(`http://localhost:4500${paht}/${Id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(CS),
    })
      .then((resp) => resp.json())
      .catch((err) => console.log(err));
  

    let APTO = document.querySelector("#apto");

    if (APTO != undefined && APTO.checked) {
      cardAtualizado.fase++;

      fetch(`http://localhost:4500${pahtSaude}/${Id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cardAtualizado),
      })
        .then((resp) => resp.json())
        .catch((err) => console.log(err));
    }
  }

  function moverFase(direcao, cardAtualizado) {
    if (cardAtualizado.fase === 4 || cardAtualizado.fase === 5) {
      alert("Você não pode mover cards concluídos, apenas atualizá-los");
    } else {
      if (cardAtualizado.fase === 6) {
        alert("Você não pode mover cards declinados");
      } else {
        if (direcao === 1) {
          let APTO = document.querySelector("#apto");

          if ((APTO != undefined && APTO.checked) || colaborador.fase < 3) {
            cardAtualizado.fase++;

            fetch(`http://localhost:4500${pahtSaude}/${Id}`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(cardAtualizado),
            })
              .then((resp) => resp.json())
              .catch((err) => console.log(err));
          } else {
            cardAtualizado.fase += 2;

            fetch(`http://localhost:4500${pahtSaude}/${Id}`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(cardAtualizado),
            })
              .then((resp) => resp.json())
              .catch((err) => console.log(err));
          }
        } else {
          cardAtualizado.fase--;

          fetch(`http://localhost:4500${pahtSaude}/${Id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(cardAtualizado),
          })
            .then((resp) => resp.json())
            .catch((err) => console.log(err));
        }
      }
    }
  }

  return (
    <section className={s.criarCard}>
      <h1>{nome}</h1>
      <button id={s.botaoX} onClick={fecharPainel}>
        X
      </button>

      <form>
        <div>
          <p>Nome: </p>
          <input
            id="INP"
            required
            autoComplete="off"
            name="nome"
            defaultValue={colaborador.nome}
            onKeyUp={ToUpperCase}
            type="text"
            placeholder="Digite o nome do candidato" /*onChange={HandleChange}*/
          />
        </div>

        <div>
          <p>Telefone: </p>
          <input
            type="text"
            required
            autoComplete="off"
            maxLength="15"
            name="telefone"
            onChange={HandleChange}
            defaultValue={colaborador.telefone}
            placeholder="Digite o numero de telefone do candidato"
          />
        </div>

        <div>
          <p>Cargo: </p>
          <select
            name="funcao"
            defaultValue={colaborador.funcao}
            required
            onClick={preencherDepartamentos}
            onKeyUp={preencherDepartamentos}
            onChange={preencherFuncao}
            id="funcao"
          >
            {cargos.map((op) => {
              if (op.nome === colaborador.funcao) {
                return (
                  <option id={op.nome} key={op.id} selected>
                    {op.nome}
                  </option>
                );
              } else {
                return (
                  <option id={op.nome} key={op.id}>
                    {op.nome}
                  </option>
                );
              }
            })}
          </select>
        </div>

        <div>
          <p>Departamento: </p>
          <input
            type="text"
            required
            id="departamento"
            name="departamento"
            onKeyUp={HandleChange}
            className={s.departamento}
            defaultValue={colaborador.departamento}
            placeholder="Campo preenchido automaticamente"
            readOnly
          />
        </div>

        <div>
          <p>Filial: </p>
          <select
            name="filial"
            required
            id="filial"
            onChange={HandleSelectChange}
          >
            {filiais.map((op) => {
              if (op.nome === colaborador.filial) {
                return (
                  <option id={op.nome} key={op.id} selected>
                    {op.nome}
                  </option>
                );
              } else {
                return (
                  <option id={op.nome} key={op.id}>
                    {op.nome}
                  </option>
                );
              }
            })}
          </select>
        </div>

        <div className={s.dataExame}>
          <p>Data do exame:</p>
          <input
            type="date"
            name="dataExame"
            defaultValue={colaborador.dataExame}
            onChange={HandleChange}
          />
        </div>

        <div className={s.dataExame}>
          <p>Horário do exame:</p>
          <input
            type="time"
            name="horarioExame"
            defaultValue={colaborador.horarioExame}
            onChange={HandleChange}
          />
        </div>

        <div className={s.dataExame}>
          <p>Clínica:</p>
          <input
            type="text"
            name="clinica"
            defaultValue={colaborador.clinica}
            autoComplete="off"
            onChange={HandleChange}
          />
        </div>

        {colaborador.fase === 3 && (
          <div className={s.resultadoExame}>
            <input type="checkbox" name="Status" id="apto" />
            <label>Candidato apto no exame médico</label>
          </div>
        )}

        <div className={s.buttonSubmit}>
          {colaborador.fase === 1 ? (
            <></>
          ) : (
          <button className={s.faseAnterior} onClick={() => moverFase(0, c)}>
            Fase anterior
          </button>)}
          <button onClick={() => atualizarCard(c)}>Atualizar card</button>
          <button className={s.fasePosterior} onClick={() => moverFase(1, c)}>
            Próxima fase
          </button>
        </div>
      </form>
    </section>
  );
}

export default AbrirCardSaude;
