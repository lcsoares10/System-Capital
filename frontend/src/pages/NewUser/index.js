import React, { useState } from 'react';

import Container from '../../components/Container';
import HeaderBackground from '../../components/HeaderBackground';
import FooterBackground from '../../components/FooterBackground';

import { createUser } from '../../controller/user';
import { useAuthContext } from '../../Context/AuthContext';

const Contract = (props) => {
  return (
    <div className="inputs-contracts">
      <h3 style={{ margin: '28px auto' }}>Cadastrar Contrato</h3>
      <div className="edit-form">
        <label htmlFor="valueInvest" className="label">
          Valor Investido
        </label>
        <span className="icon-prefix">R$</span>
        <input
          id="valueInvest"
          type="number"
          value={props.valueInvest}
          onChange={(e) => props.handlevalueInvest(e.target.value)}
        />
      </div>

      <div className="edit-form">
        <label htmlFor="startContract" className="label">
          Incio do contrato
        </label>
        <input
          type="date"
          id="startContract"
          value={props.startContract}
          onChange={(e) => props.handleStartContract(e.target.value)}
        />
      </div>

      <div className="edit-form">
        <label htmlFor="handleTimeContract" className="label">
          Duração do contrato
        </label>
        <input
          type="number"
          id="doneCohandleTimeContractntract"
          value={props.timeContract}
          onChange={(e) => props.handleTimeContract(e.target.value)}
        />
      </div>
    </div>
  );
};

export default function NewUser() {
  //Variavel que fara o controle de criação de usuario ou consultor
  const newInvestor = false;
  const { user } = useAuthContext();

  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [tel, setTel] = useState('');
  const [email, setEmail] = useState('');

  const [valueInvest, setValueInvest] = useState(0);
  const [startContract, setStartContract] = useState('');
  const [timeContract, setTimeContract] = useState('');

  //Função para tratar a requisição que será feita de um novo usuário.
  async function handleNewIncident(e) {
    e.preventDefault();
    const data = {
      login: name,
      email,
      name,
      last_name: lastName,
      tel,
      id_consultant: user.id,

      begin: startContract,
      time: timeContract,
      value: valueInvest,
    };
    const returnMessage = await createUser(newInvestor ? true : false, data);
    alert(returnMessage);
    return;
  }

  return (
    <Container className="container-login">
      <HeaderBackground notLogin={true} />
      <main className="main-myprofile">
        <div className="title-header">
          {newInvestor ? (
            <h1>Cadastro Investidor</h1>
          ) : (
            <h1>Cadastro Consultor</h1>
          )}
        </div>

        <div className="content-form">
          <form onSubmit={handleNewIncident}>
            <div className="edit-form">
              <label htmlFor="nome" className="label">
                Nome
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="edit-form">
              <label htmlFor="sobreNome" className="label">
                Sobre nome
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div className="edit-form">
              <label htmlFor="tel" className="label">
                Telefone
              </label>
              <input
                id="tel"
                type="tel"
                value={tel}
                onChange={() => {}}
                placeholder="(21) 969075358"
                onInput={(e) => setTel(e.target.value)}
                pattern="[0-9]{11}"
              />
            </div>

            <div className="edit-form">
              <label htmlFor="email" className="label">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {newInvestor && (
              <Contract
                valueInvest={valueInvest}
                handlevalueInvest={setValueInvest}
                startContract={startContract}
                handleStartContract={setStartContract}
                timeContract={timeContract}
                handleTimeContract={setTimeContract}
              />
            )}
            <button style={{ padding: '10px 90px', marginTop: '30px' }}>
              SALVAR
            </button>
          </form>
        </div>
      </main>
      <FooterBackground notLogin={true} />
    </Container>
  );
}
