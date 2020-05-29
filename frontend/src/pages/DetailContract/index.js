import React from 'react';

import Container from '../../components/Container';
import HeaderBackground from '../../components/HeaderBackground';
import FooterBackground from '../../components/FooterBackground';

import CheckCircle from '@material-ui/icons/CheckCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';



import './styles.css';
//------------------------------------------------------------

export default function detailInvestment() {


    return (
        <Container>    
          <HeaderBackground notLogin={true}/>
          <main className="main-detail-contract">
            <div className="title-header">
              <h1 className="h1-">Investimento</h1>
              <p>contrato: con-00120</p>
            </div>

            <div className="content-contract">
                <p className="text-beige">Data de Inicio: <b className="text-white">19/05/2020</b></p>
                <p className="text-beige">Data de Termino: <b className="text-white">19/05/2020</b></p>
                <p className="text-beige">Prazo: <b className="text-white">19/05/2020</b></p>
                <p className="text-beige">Valor Investido: <b className="text-white">19/05/2020</b></p>
                <p className="text-beige">Dia do pagamento: <b className="text-white">19/05/2020</b></p>
                <p className="text-beige">Consultor: <b className="text-white">19/05/2020</b></p>          
            </div>


          </main>
        <FooterBackground notLogin={true}/>
        
      </Container>
    );
}
