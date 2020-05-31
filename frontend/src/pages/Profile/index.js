import React, { useEffect, useContext } from 'react';
import {Link} from 'react-router-dom';

import Container from '../../components/Container';
import HeaderBackground from '../../components/HeaderBackground';
import FooterBackground from '../../components/FooterBackground';

import LineChart from '../../components/ Graphics/line';

import icon_cash from '../../assets/icon_cash.png'

import './styles.css'

//------------------------------------------------------------
//import { AuthContext } from '../../Context/AuthContext';
import { useAuthContext } from '../../Context/AuthContext';

export default function Profile() {

  //const { user } = useContext(AuthContext);
  //const { user } = useAuthContext();

  const { user, setUser } = useAuthContext();
  //setUser({...user, name: 'Igor'});
  //console.log(user);

  useEffect(()=> {
      console.log(user);
  }, []);

    return (
      <Container className="container-login" >
        <HeaderBackground notLogin={true}/>
          <main>
          <div className="title-header">
            <h1 className="h1-profile">Investimentos</h1>
            <select className="select-contract" name="" id="">
                <option value="0001">0001</option>
                <option value="0002">0002</option>
                <option value="0003">0003</option>
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
                  <th><img src={icon_cash} alt="icon"/></th>
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
