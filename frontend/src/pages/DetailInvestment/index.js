import React from 'react';

import Container from '../../components/Container';
import HeaderBackground from '../../components/HeaderBackground';
import FooterBackground from '../../components/FooterBackground';

import ListCheckPayments from '../../components/ListCheckPayments';

import './styles.css';
//------------------------------------------------------------

export default function detailInvestment(props) {


    return (
        <Container>    
          <HeaderBackground notLogin={true}/>
          <main className="main-detail-investiment">
            <div className="title-header">
              <h1 className="h1-">Investimento</h1>
              <p>contrato: con-00120</p>
            </div>

            <div className="content-ivestment">
              <div className="detail-invest">
                <p className="weight-thin">Data da Aplicao: <b className='text-white'> 16/05/2020</b></p>
                <p className="weight-thin">Valor Investido: <b className='text-white'>R$ 10.000,00</b></p>
              </div>

              <div className="check-payments">
                <h2>Recebidos</h2>
                <div className="list-check-payments">

                <ListCheckPayments id_contract={props.match.params.id}/>

                </div>
              </div>

            </div>


          </main>
        <FooterBackground notLogin={true}/>
        
      </Container>
    );
}
