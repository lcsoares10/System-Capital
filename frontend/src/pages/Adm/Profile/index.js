import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Container from '../../../components/Container';
import HeaderBackground from '../../../components/HeaderBackground';
import FooterBackground from '../../../components/FooterBackground';

import { getAllInvestors, getAllConsultants } from '../../../controller/Adm';
// import api from '../../services/api';

import './styles.css';

//------------------------------------------------------------
import { useAuthContext } from '../../../Context/AuthContext';

export default function AdmProfile() {
  const { user } = useAuthContext();

  const [totInvestors, setTotInvestors] = useState(0);
  const [totConsultants, setTotConsultants] = useState(0);

  useEffect(() => {
    // Create an scoped async function in the hook
    async function getInvestors() {
      const data = await getAllInvestors();
      setTotInvestors(data.totrows);
    }
    async function getConsultants() {
      const data = await getAllConsultants();
      setTotConsultants(data.totrows);
    }

    getInvestors();
    getConsultants();
    //Execute the created function directly
  }, []);

  return (
    <Container className="container-login">
      <HeaderBackground notLogin={true} />
      <main>
        <div className="title-header">
          <h1 className="h1-profile">Dashboard</h1>
        </div>
        <div className=" dashboard-adm">
          <div className="content-panel">
            <h3>Investidores</h3>
            <div className="detail-content">
              <span>{totInvestors}</span>
              <Link to={`/investors`}>
                <button>Gerenciar</button>
              </Link>
            </div>
          </div>
          <div className="content-panel">
            <h3>Consultores</h3>
            <div className="detail-content">
              <span>{totConsultants}</span>
              <Link to={`/associatedInvestors/${user.id}`}>
                <button>Gerenciar</button>
              </Link>
            </div>
          </div>
          <div className="content-panel">
            <h3>Pendências</h3>
            <div className="detail-content">
              <span>{totConsultants}</span>
              <div>
                <Link to={`/associatedInvestors/${user.id}`}>
                  <button>Visualizar</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <FooterBackground
        viewAddUser={false}
        newUser={'investor'}
        notLogin={true}
        notBack={false}
      />
    </Container>
  );
}
