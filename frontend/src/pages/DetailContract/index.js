import React, { useState,useEffect } from 'react';

//Components
import Container from '../../components/Container';
import HeaderBackground from '../../components/HeaderBackground';
import FooterBackground from '../../components/FooterBackground';
import Loading from '../../components/Loading';

//services
import findContract from '../../controller/Investor/findContract';
import findConsultant from '../../controller/Investor/findConsultant';

//Functions aux
import convertCoinBr from '../../services/convertCoinBr';
import convertDate from '../../services/convertDate';
import sumDate from '../../services/sumDate';

import './styles.css';

//------------------------------------------------------------

export default function DetailInvestment(props) {

  const [contract,setContract] = useState({});
  const [consultant,setConsultant] = useState({});

  useEffect(() => {

    async function getContract() {
        const data = await findContract(props.match.params.id)
        setContract( data );
        getConsultant(data.investor.id_consultant)
    }
    async function getConsultant(id_consultant) {
      setConsultant(await findConsultant(id_consultant));
    }

    setTimeout(() => {
      getContract();
    }, 500);
    

  }, []);

  if ( Object.entries(contract).length ===0) return <Loading/>;

    return (
        
        <Container>    
          <HeaderBackground notLogin={true}/>
          <main className="main-detail-contract">
            <div className="title-header">
              <h1 className="h1-">Investimento</h1>
              <p>contrato: con-{contract.id.toString().padStart('5', '0')}</p>
            </div>

            <div className="content-contract">
                <p className="text-beige">Data de Inicio: <b className="text-white">{convertDate(new Date(contract.begin))}</b></p>
                <p className="text-beige">Data de Termino: <b className="text-white">{convertDate(sumDate(contract.begin,1))}</b></p>
                <p className="text-beige">Prazo: <b className="text-white">12 Meses</b></p>
                <p className="text-beige">Valor Investido: <b className="text-white">{convertCoinBr(contract.value)}</b></p>
                <p className="text-beige">Dia do pagamento: <b className="text-white">{contract.day}</b></p>
                <p className="text-beige">Consultor: <b className="text-white">{consultant.name}</b></p>          
            </div>


          </main>
        <FooterBackground notLogin={true}/>
        
      </Container>
    );
}
