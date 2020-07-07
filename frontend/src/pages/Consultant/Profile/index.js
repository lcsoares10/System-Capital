import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Container from '../../../components/Container';
import HeaderBackground from '../../../components/HeaderBackground';
import FooterBackground from '../../../components/FooterBackground';
import LineChart from '../../../components/ Graphics/line';
import DoughnutChart from '../../../components/ Graphics/doughnut';

import allContracts from '../../../controller/Investor/allContracts';
import calculateProjection from '../../../controller/Investor/calculateProjection';
import { AllAssoatedinvestors } from '../../../controller/Consultant';
import { getYeldYear } from '../../../controller/Consultant';
// import api from '../../services/api';

import './styles.css';

//------------------------------------------------------------
import { useAuthContext } from '../../../Context/AuthContext';

export default function Profile() {
  const { user } = useAuthContext();
  const [contracts, setContracts] = useState([]);
  const [dataProjection, setDataProjection] = useState({
    values: [],
    months: [],
  });
  const [totInvestors, setTotInvestors] = useState(0);

  useEffect(() => {
    // Create an scoped async function in the hook
    async function getContracts() {
      const data = await AllAssoatedinvestors(user.id);
      setContracts(contracts);
      setTotInvestors(data.totrows);
    }
    getContracts();
    //Execute the created function directly
  }, []);

  /**Por causa das execuções asyncronas do React
   * handleCalculationProjection só pode ser carregada quando
   * contracts tiver valor
   */
  useEffect(() => {
    async function handleYealdYear() {
      const dateCurrent = new Date();
      const data = await getYeldYear(user.id, moment(dateCurrent).year());

      setDataProjection(handleProjection(data.yield_year));
    }
    handleYealdYear();
  }, []);

  function handleProjection(data) {
    let values = data.map((month, count) => {
      return String(month.value);
    });
    let months = data.map((month) => {
      return month.month;
    });
    return { values, months };
  }

  console.log(dataProjection);
  return (
    <Container className="container-login">
      <HeaderBackground notLogin={true} />
      <main>
        <div className="title-header">
          <h1 className="h1-profile">Dashboard</h1>
        </div>
        <div className="dashboard">
          <div className="content-projection">
            <p>Rendimento</p>
            <div className="graph pie">
              <LineChart data={dataProjection}></LineChart>
            </div>
            <Link to={`/incomeConsultant/${user.id}`}>
              <button>Ver detalhes</button>
            </Link>
          </div>
          <div className="content-investor">
            <h3>Investidores Associados</h3>
            <div className="detail-associated">
              <span>{totInvestors}</span>
              <Link to={`/associatedInvestors/${user.id}`}>
                <button>Ver detalhes</button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <FooterBackground
        viewAddUser={true}
        newUser={'investor'}
        notLogin={true}
        notBack={false}
      />
    </Container>
  );
}
