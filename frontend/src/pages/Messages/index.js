import React from 'react';

import Container from '../../components/Container';
import HeaderBackground from '../../components/HeaderBackground';
import FooterBackground from '../../components/FooterBackground';

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

            </div>
          </main>
        <FooterBackground/>
        
      </Container>
    );
}
