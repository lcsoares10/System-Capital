import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Container from '../../../components/Container';
import HeaderBackground from '../../../components/HeaderBackground';
import FooterBackground from '../../../components/FooterBackground';

import List from '../../../components/List';
import { getAllInvestors } from '../../../controller/Adm';
import icon_new from '../../../assets/icon_new.png';

import './styles.css';
//------------------------------------------------------------

export default function InvestorRegisters(props) {
  const [investors, setInvestors] = useState([]);
  const [totInvestors, setTotInvestors] = useState(0);

  useEffect(() => {
    async function getAssoatedinvestors() {
      const data = await getAllInvestors(props.match.params.id);
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
          <Link
            to={{
              pathname: '/newUser',
              state: { type: 'investor', isEdit: false },
            }}
            style={{ position: 'absolute', right: '20px', marginTop: '7px' }}
          >
            <img src={icon_new} alt="" />
          </Link>
        </div>

        <div className="section">
          <div className="detail">
            <p className="weight-thin">
              Total de Investidores:&nbsp;
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
      <FooterBackground notLogin={true} notBack={true} />
    </Container>
  );
}