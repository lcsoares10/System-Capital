import React, { useEffect, useContext, useState } from 'react';
import {Link} from 'react-router-dom';

import Container from '../../components/Container';
import HeaderBackground from '../../components/HeaderBackground';
import FooterBackground from '../../components/FooterBackground';

import LineChart from '../../components/ Graphics/line';

import icon_cash from '../../assets/icon_cash.png'

import allContracts from '../../controller/Investor';

import './styles.css'

//------------------------------------------------------------
import { useAuthContext } from '../../Context/AuthContext';

export default function Profile() {

  const { user, setUser } = useAuthContext();
  const [ contracts, setContracts ] = useState([]);

  useEffect(() => {
    // Create an scoped async function in the hook
    async function getContracts() {
      setContracts( await allContracts(user.id_user) );
    }
    // Execute the created function directly
    getContracts();
  }, []);

    return (
      <Container className="container-login" >
        <HeaderBackground notLogin={true}/>
          <main>
          <div className="title-header">
            <h1 className="h1-profile">Investimentos</h1>
            <select className="select-contract" name="" id="">

              {
                  contracts.map((contract)=>{
                  return(<option value={contract.id}>{contract.id}</option>)
                  })
              }
              </select>
          </div>

            <div className="content-projection">
              <p>PROJEÇÃO DE 12 MESES</p>
              <div className='graph'>
                <LineChart></LineChart>
              </div>
              <Link to="/detail-investment">
                <button>Ver detalhes</button>
              </Link>
            </div>

            <h2>Contratos</h2>

            <div className='content-list-contract'>
              <table className="list-contract">
                <tr>
                  <th>Código</th>
                  <th>Nome</th>
                  <th><img src={icon_cash} alt="icon_cash"/></th>
                </tr>
                <Link to="/detail-contract">

                </Link>
                <tr>
                  <td><Link to="/detail-contract"><p>cod-01</p></Link></td>
                  <td><p>nome do contrato</p></td>
                  <td><p>R$ 10.000,00</p></td>
                </tr>
                <tr>
                  <td><p>cod-01</p></td>
                  <td><p>nome do contrato</p></td>
                  <td><p>R$ 10.000,00</p></td>
                </tr>
                <tr>
                  <td><p>cod-01</p></td>
                  <td><p>nome do contrato</p></td>
                  <td><p>R$ 10.000,00</p></td>
                </tr>
              </table>
            </div>
          </main>
        <FooterBackground notLogin={true}/>

      </Container>
  );
}
