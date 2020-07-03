import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Container from '../../../components/Container';
import HeaderBackground from '../../../components/HeaderBackground';
import FooterBackground from '../../../components/FooterBackground';
import LineChart from '../../../components/ Graphics/line';
import DoughnutChart from '../../../components/ Graphics/doughnut';

import allContracts from '../../../controller/Investor/allContracts';
import calculateProjection from '../../../controller/Investor/calculateProjection';

// import api from '../../services/api';

import './styles.css';

//------------------------------------------------------------
import { useAuthContext } from '../../../Context/AuthContext';

export default function Profile() {
  const { user } = useAuthContext();
  const [contracts, setContracts] = useState([]);
  const [dataProjection, setDataProjection] = useState({});

  useEffect(() => {
    // Create an scoped async function in the hook
    async function getContracts() {
      const contracts = await allContracts(user.id);
      setContracts(contracts);
    }
    getContracts();
    //Execute the created function directly
  }, []);

  /**Por causa das execuções asyncronas do React
   * handleCalculationProjection só pode ser carregada quando
   * contracts tiver valor
   */
  useEffect(() => {
    if (contracts.length) handleCalculationProjection(contracts[0].id);
  }, [contracts]);

  async function handleCalculationProjection(id_contract) {
    const [contract] = contracts.filter((item) => item.id == id_contract);
    setDataProjection(calculateProjection(contract));
  }

  console.log(user);

  return (
    <Container className="container-login">
      <HeaderBackground notLogin={true} />
      <main>
        <div className="title-header">
          <h1 className="h1-profile">Dashboard</h1>
        </div>
        <div className="dashboard">
          <div className="content-projection">
            <p>Investidores Associados</p>
            <div className="graph pie">
              <DoughnutChart></DoughnutChart>
            </div>

            <Link to={`/associatedInvestors/${user.id}`}>
              <button>Ver detalhes</button>
            </Link>
          </div>

          <div className="content-projection">
            <p>Rendimento</p>
            <div className="graph pie">
              <LineChart data={dataProjection}></LineChart>
            </div>
            <Link to={`/incomeConsultant/${user.id}`}>
              <button>Ver detalhes</button>
            </Link>
          </div>
        </div>
      </main>
      <FooterBackground
        viewAddUser={true}
        newUser={'investor'}
        notLogin={true}
      />
    </Container>
  );
}
