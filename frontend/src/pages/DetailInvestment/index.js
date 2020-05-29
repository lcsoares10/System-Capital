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

                  <ul>
                    <li className="text-white">06/2020</li>
                    <li class className="text-beige"Name="text-beige">R$ 1.000,00</li>
                    <li><CheckCircle style={{color:"#25C00C"}}/></li>
                  </ul>

                  <ul>
                    <li className="text-white">07/2020</li>
                    <li className="text-beige">R$ 1.000,00</li>
                    <li><CheckCircle style={{color:"#25C00C"}} /></li>
                  </ul>

                  <ul>
                    <li className="text-white">08/2020</li>
                    <li className="text-beige">R$ 1.000,00</li>
                    <li><CheckCircle style={{color:"#25C00C"}}/></li>
                  </ul>

                  <ul>
                    <li className="text-white">09/2020</li>
                    <li className="text-beige">R$ 1.000,00</li>
                    <li><CheckCircle style={{color:"#25C00C"}}/></li>
                  </ul>

                  <ul>
                    <li className="text-white">10/2020</li>
                    <li className="text-beige">R$ 1.000,00</li>
                    <li><CheckCircle style={{color:"#25C00C"}}/></li>
                  </ul>
                  <ul>
                    <li className="text-white">11/2020</li>
                    <li className="text-beige">R$ 1.000,00</li>
                    <li><RemoveCircleIcon style={{color:"#2E2E2E"}}/></li>
                  </ul>
                  <ul>
                    <li className="text-white">12/2020</li>
                    <li className="text-beige">R$ 1.000,00</li>
                    <li><RemoveCircleIcon style={{color:"#2E2E2E"}}/></li>
                  </ul>
                  <ul>
                    <li className="text-white">01/2021</li>
                    <li className="text-beige">R$ 1.000,00</li>
                    <li><RemoveCircleIcon style={{color:"#2E2E2E"}}/></li>
                  </ul>
                  <ul>
                    <li className="text-white">02/2021</li>
                    <li className="text-beige">R$ 1.000,00</li>
                    <li><RemoveCircleIcon style={{color:"#2E2E2E"}}/></li>
                  </ul>
                  <ul>
                    <li className="text-white">03/2021</li>
                    <li className="text-beige">R$ 1.000,00</li>
                    <li><RemoveCircleIcon style={{color:"#2E2E2E"}}/></li>
                  </ul>

                </div>
              </div>

            </div>


          </main>
        <FooterBackground notLogin={true}/>
        
      </Container>
    );
}
