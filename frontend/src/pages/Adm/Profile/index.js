import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Container from '../../../components/Container';
import HeaderBackground from '../../../components/HeaderBackground';
import FooterBackground from '../../../components/FooterBackground';

import {
  getAllInvestors,
  getAllConsultants,
  getAllContracts,
} from '../../../controller/Adm';
import { AllAssoatedinvestors } from '../../../controller/Consultant';
// import api from '../../services/api';

import './styles.css';

//------------------------------------------------------------
import { useAuthContext } from '../../../Context/AuthContext';

export default function AdmProfile() {
  const { user } = useAuthContext();

  const [totInvestors, setTotInvestors] = useState(0);
  const [totConsultants, setTotConsultants] = useState(0);
  const [totInvestorAssociated, setTotInvestorAssociated] = useState(0);
  const [totalPendenciesConsultants, setTotalPendenciesConsultants] = useState(
    0
  );
  const [totalPendenciesInvestors, setTotalPendenciesInvestors] = useState(0);
  const [totalPendenciesContracts, setTotalPendenciesContracts] = useState(0);
  //const [totalPendencies, setTotalPendencies] = useState(0);

  const [investors, setInvestors] = useState([]); //Investidores pendentes
  const [consultants, setConsultants] = useState([]); //Consultores Pendentes
  const [contracts, setContracts] = useState([]); //Contratos Pendentes

  useEffect(() => {
    // Create an scoped async function in the hook
    async function getTotals() {
      const datai = await getAllInvestors();
      setTotInvestors(datai.totrows);

      const datac = await getAllConsultants();
      setTotConsultants(datac.totrows);

      const datainvestorA = await AllAssoatedinvestors(user.id);
      setTotInvestorAssociated(datainvestorA.totrows);
      const dataContracts = await getAllContracts();

      //Sum evidencias
      getPendenciasConsultants(datac.rows);
      getPendenciasInvestors(datai.rows);
      getPendenciasContracts(dataContracts.rows);
    }

    getTotals();
  }, []);

  //Filtra investidores desativados
  function getPendenciasInvestors(rows) {
    const pendencies = rows.filter((investor) => {
      return investor.user.active === 0;
    });
    setInvestors(pendencies);
    setTotalPendenciesInvestors(pendencies.length);
  }
  //Filtra Consultores Desativados
  function getPendenciasConsultants(rows) {
    const pendencies = rows.filter((consultant) => {
      return consultant.user.active === 0;
    });
    setConsultants(pendencies);
    setTotalPendenciesConsultants(pendencies.length);
  }
  //Filtra Contratos Desativados
  function getPendenciasContracts(rows) {
    console.log(rows);
    const pendencies = rows.filter((contract) => {
      return contract.contract_active === 0;
    });
    setContracts(pendencies);
    setTotalPendenciesConsultants(pendencies.length);
  }

  return (
    <Container className="container-login">
      <HeaderBackground notLogin={true} />
      <main>
        <div className="title-header">
          <h1 className="h1-profile">Dashboard</h1>
        </div>
        <div className=" dashboard-adm">
          <div className="content-panel">
            <h3>Pendências</h3>
            <div className="detail-content">
              <span>
                {totalPendenciesConsultants +
                  totalPendenciesInvestors +
                  totalPendenciesContracts}
              </span>
              <div>
                <Link
                  to={{
                    pathname: `/pendencies`,
                    state: { investors, consultants, contracts },
                  }}
                >
                  <button>Visualizar</button>
                </Link>
              </div>
            </div>
          </div>
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
              <Link to={`/consultants`}>
                <button>Gerenciar</button>
              </Link>
            </div>
          </div>

          <div className="content-panel">
            <h3>Investidores Associados</h3>
            <div className="detail-content">
              <span>{totInvestorAssociated}</span>
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
