import React,{useState,useEffect} from 'react';
import moment from 'moment';

import Container from '../../../components/Container';
import HeaderBackground from '../../../components/HeaderBackground';
import FooterBackground from '../../../components/FooterBackground';

import List from '../../../components/List';
import {AllAssoatedinvestors} from '../../../controller/Consultant';
import convertCoinBr from '../../../utils/convertCoinBr';

//------------------------------------------------------------

export default function DetailIncome(props) {

  const [investors,setInvestors] = useState([]);
  const [totInvestors,setTotInvestors] = useState(0);

  useEffect(() => {

      async function getAssoatedinvestors() {
          const data = await AllAssoatedinvestors(props.match.params.id)
          setInvestors( data.rows);
          setTotInvestors(data.totrows);
      }
      setTimeout(() => {
        getAssoatedinvestors();
      }, 500);


    }, []);
    
//O css utilizado e o msm css da page dos investidores.css definido para pagina com listas
    return (
        <Container>    
          <HeaderBackground notLogin={true}/>
          <main className="main-view-list">
            <div className="title-header">
              <h1 className="h1-">Rendimentos Janeiro</h1>
            </div>

            <div className="section">
              <div className="detail">
                <p className="weight-thin">Total Faturado: <b className='text-white'>{totInvestors}</b></p>
              </div>

              <div className="content-list">
                <h2>Rendimento ao mes</h2>
                
                <div className="list">
                {
                  investors.map((investor,key)=>(
                    <List key={key} value_col_1={"Lucas Soares"} value_col_2={convertCoinBr(10)} value_col_3={10000.00} addClassCss_col_3="text-green"/>
                  ))  
                }
                </div>
              </div>

            </div>


          </main>
        <FooterBackground notLogin={true}/>
        
      </Container>
    );
}
