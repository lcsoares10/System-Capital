import React, { useState,useEffect } from 'react';

import Container from '../../components/Container';
import HeaderBackground from '../../components/HeaderBackground';
import FooterBackground from '../../components/FooterBackground';
import findContract from '../../controller/Investor/findContract';

import convertCoinBr from '../../services/convertCoinBr';

import './styles.css';
//------------------------------------------------------------

export default function DetailInvestment(props) {

  const [contract,setContract] = useState({});

  useEffect(() => {

    async function getContract() {
      setContract( await findContract(props.match.params.id));
    }

    getContract();

  }, []);


    return (
        <Container>    
          <HeaderBackground notLogin={true}/>
          <main className="main-detail-contract">
            <div className="title-header">
              <h1 className="h1-">Investimento</h1>
              <p>contrato: con-00120</p>
            </div>

            <div className="content-contract">
                <p className="text-beige">Data de Inicio: <b className="text-white">{contract.begin}</b></p>
                <p className="text-beige">Data de Termino: <b className="text-white">{contract.begin}</b></p>
                <p className="text-beige">Prazo: <b className="text-white">12 Meses</b></p>
                <p className="text-beige">Valor Investido: <b className="text-white">{convertCoinBr(contract.value)}</b></p>
                <p className="text-beige">Dia do pagamento: <b className="text-white">{contract.day}</b></p>
                <p className="text-beige">Consultor: <b className="text-white">id_consultant</b></p>          
            </div>


          </main>
        <FooterBackground notLogin={true}/>
        
      </Container>
    );
}
