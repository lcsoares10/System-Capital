import React from 'react';

import Container from '../../components/Container';
import HeaderBackground from '../../components/HeaderBackground';
import FooterBackground from '../../components/FooterBackground';

import icon_profile_m from '../../assets/icon_profile_m.png';

import './styles.css';
//------------------------------------------------------------

export default function Messages() {


    return (
        <Container className="container-login" >    
          <HeaderBackground notLogin={true}/>
          <main className="main-msg">
            <div className="title-header">
              <h1>Suas Mensagens</h1>
            </div>

            <div className="content-message">

              <div className="message">
                <div>
                  <img src={icon_profile_m} alt=""/>
                </div>
                <div className="text">
                  <h3>Calos Eduardo</h3>
                  <p>Queremos captar empreendedores, que queiram 
                      participar do programa com o principal objetivo 
                      de formar especialistas nos...</p>
                </div>
                <div className="status">
                  <span className='notification-read'></span>
                  <p>20 minutos</p>
                </div>
              </div>

              <div className="message bg-message-deals">
                <div>
                  <img src={icon_profile_m} alt=""/>
                </div>
                <div className="text">
                  <h3>Calos Eduardo</h3>
                  <p>Queremos captar empreendedores, que queiram 
                      participar do programa com o principal objetivo 
                      de formar especialistas nos...</p>
                </div>
                <div className="status">
                  <span className='notification-read hide-icon-alert'></span>
                  <p>20 minutos</p>
                </div>
              </div>

              <div className="message">
                <div>
                  <img src={icon_profile_m} alt=""/>
                </div>
                <div className="text">
                  <h3>Calos Eduardo</h3>
                  <p>Queremos captar empreendedores, que queiram 
                      participar do programa com o principal objetivo 
                      de formar especialistas nos...</p>
                </div>
                <div className="status">
                  <span className='notification-read'></span>
                  <p>20 minutos</p>
                </div>
              </div>

            </div>

          </main>
        <FooterBackground/>
        
      </Container>
    );
}
