import React,{useState,useEffect} from 'react';
import moment from 'moment';

import Container from '../../../components/Container';
import HeaderBackground from '../../../components/HeaderBackground';
import FooterBackground from '../../../components/FooterBackground';

import convertCoinBr from '../../../utils/convertCoinBr';

import './styles.css';
//------------------------------------------------------------

export default function DetailInvestment(props) {

  const [investors,setInvestors] = useState([]);
  const [totInvestors,setTotInvestors] = useState(0);

  useEffect(() => {



    }, []);
    

    return (
        <Container>    
          <HeaderBackground notLogin={true}/>
          <main className="main-associated-investors">
            <div className="title-header">
              <h1 className="h1-">Investidor</h1>
              <p> &nbsp;Lucas Soares</p>
            </div>
            <div className="content-detail-associated">
              <div className="detail-investor">
                <p className="weight-thin">Telefone: <b className='text-white'>asd</b></p>
                <p className="weight-thin">E-mail: <b className='text-white'>as</b></p>
              </div>

              <div className="content-contracts">
                <h2>Contratos</h2>
                <div className="list-contracts">
                  <div className="contracts">
                    <p>Cod:001</p>
                    <p>Valor Investido: <b style={{color :"green"}}>10.000,00</b></p>
                    <div className="time-contract">
                      <p>Inicio: 01/20</p>
                      <p>Fim: 01/21</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
         

          </main>
        <FooterBackground notLogin={true}/>
        
      </Container>
    );
}
