import React, { useState, useEffect } from 'react';

import Container from '../../../components/Container';
import HeaderBackground from '../../../components/HeaderBackground';
import FooterBackground from '../../../components/FooterBackground';

import List from '../../../components/List';
import { AllAssoatedinvestors } from '../../../controller/Consultant';

import './styles.css';
//------------------------------------------------------------

export default function DetailInvestment(props) {
  const [investors, setInvestors] = useState([]);
  const [totInvestors, setTotInvestors] = useState(0);

  useEffect(() => {
    async function getAssoatedinvestors() {
      const data = await AllAssoatedinvestors(props.match.params.id);
      setInvestors(data.rows);
      setTotInvestors(data.totrows);
    }
    setTimeout(() => {
      getAssoatedinvestors();
    }, 500);
  }, [props.match.params.id]);

  return (
    <Container>
      <HeaderBackground notLogin={true} />
      <main className="main-view-list">
        <div className="title-header">
          <h1 className="h1-">Investidores</h1>
        </div>

        <div className="section">
          <div className="detail">
            <p className="weight-thin">
              Investidores associados:{' '}
              <b className="text-white">{totInvestors}</b>
            </p>
          </div>

          <div className="content-list">
            <h2>Lista de Investidores</h2>
            <div className="list">
              {investors.map((investor, key) => (
                <List
                  key={key}
                  value_col_1={`${investor.user.name} ${investor.user.last_name}`}
                  url={`/detailInvestor/${investor.user.name}`}
                  stateLink={investor}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
      <FooterBackground notLogin={true} />
    </Container>
  );
}
