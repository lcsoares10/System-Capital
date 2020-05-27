import React from 'react';

import Container from '../../components/Container';
import HeaderBackground from '../../components/HeaderBackground';
import FooterBackground from '../../components/FooterBackground';

import icon_cash from '../../assets/icon_cash.png'

import './styles.css'

//------------------------------------------------------------

export default function Profile() {


    return (
        <Container className="container-login" >    
          <HeaderBackground/>
            <main>
            <div className="title-header">
              <h1>Investimentos</h1>
              <select className="select-contract" name="" id="">
                  <option value="0001">0001</option>
                  <option value="0002">0002</option>
                  <option value="0003">0003</option>
                </select>
            </div>
            

              <div className="content-projection">
                <p>PROJEÇÃO DE 12 MESES</p>
                <div className='graph'>

                </div>
                <button>Ver detalhes</button>
              </div>

              <h2>Contratos</h2>

              <div className='content-list-contract'>

                <div className="indices-list">
                  <p>Código</p>
                  <p>Nome</p>
                  <p><img src={icon_cash} alt="icon"/></p>
                </div>
                <ul className="list-contract">
                  <li>
                    <p>cod-01</p>
                    <p>nome do contrato</p>
                    <p>R$ 10.000,00</p>
                  </li>
                  <li>
                    <p>cod-01</p>
                    <p>nome do contrato</p>
                    <p>R$ 10.000,00</p>
                  </li>
                  <li>
                    <p>cod-01</p>
                    <p>nome do contrato</p>
                    <p>R$ 10.000,00</p>
                  </li>
                </ul>
              </div>

            </main>
          <FooterBackground/>
        
        
        </Container>
    );
}