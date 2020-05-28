import React from 'react';

import Container from '../../components/Container';
import HeaderBackground from '../../components/HeaderBackground';
import FooterBackground from '../../components/FooterBackground';

import icon_profile_my from '../../assets/icon-profile-my.png';
import EditIcon from '@material-ui/icons/Edit';

import './styles.css';
//------------------------------------------------------------

export default function detailInvestment() {


    return (
        <Container className="container-login" >    
          <HeaderBackground notLogin={true}/>
          <main className="main-myprofile">
            <div className="title-header">
              <h1>Investimento</h1>
              <p>contrato: con-00120</p>
            </div>

            <div className="content-ivestment">
              <div className="detail-invest">
                <p>Data da Aplicaço: 16/05/2020</p>
                <p>Valor Investido: R$ 10.000,00</p>
              </div>

            </div>

          </main>
        <FooterBackground/>
        
      </Container>
    );
}
