import React, { useState } from 'react';

import Container from '../../components/Container';
import HeaderBackground from '../../components/HeaderBackground';
import FooterBackground from '../../components/FooterBackground';

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
          type="text"
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
        <label htmlFor="doneContract" className="label">
          Final do Contrato
        </label>
        <input
          type="date"
          id="doneContract"
          value={props.doneContract}
          onChange={(e) => props.handleDoneContract(e.target.value)}
        />
      </div>
    </div>
  );
};

export default function NewUser() {
  const newInvestor = true;

  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [tel, setTel] = useState('');
  const [email, setEmail] = useState('');

  const [valueInvest, setValueInvest] = useState(0);
  const [startContract, setStartContract] = useState('');
  const [doneContract, setDoneContract] = useState('');

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
          <form>
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
                value=""
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
                type="text"
                value={tel}
                onChange={(e) => setTel(e.target.value)}
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
                doneContract={doneContract}
                handleDoneContract={setDoneContract}
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
