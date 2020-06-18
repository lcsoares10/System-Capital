import react from 'react';

import Container from '../../components/Container';
import HeaderBackground from '../../components/HeaderBackground';
import FooterBackground from '../../components/FooterBackground';


import styled from 'styled-components';


const contract =()=>{
    return(

        <div className="inputs-contracts">
            <h2>Cadastro do Contrato</h2>
            <div className ='edit-form'>
                <label for="tel" className="label"> Valor Investido</label>
                <input id="tel" type="text"  value={user}/>
                <EditIcon className="icon-edit"/>
            </div>
            
            <div className='edit-form'>
                <label for="email" className="label">Incio do contrato</label>
                <input type="email"  value={email}/>
                <EditIcon className="icon-edit"/>
            </div>  

            <div className='edit-form'>
                <label for="email" className="label">Final do</label>
                <input type="email"  value={email}/>
                <EditIcon className="icon-edit"/>
            </div>  
        </div>
    )
}

export default function Newuser() {

    return(

        <Container className="container-login" >   
          <HeaderBackground notLogin={true}/>
          <main className="main-myprofile">
            <div className="title-header">
              <h1>Perfil</h1>
            </div>

            <div className="content-form">

              <form >
                  
                  <div className ='no-edit-form'>
                    <label for="nome" className="label">Nome</label>
                    <input type="text" readonly='true' value={user.name}/>
                  </div>
                  <div className ='no-edit-form'>
                    <label for="sobreNome" className="label">Sobre nome</label>
                    <input type="text" readonly='true' value={user.last_name}/>
                  </div>

                  <div className ='edit-form'>
                    <label for="tel" className="label"> Telefone</label>
                    <input id="tel" type="text" onChange={e => setTel(e.target.value)} value={user}/>
                    <EditIcon className="icon-edit"/>
                  </div>
                  
                  <div className='edit-form'>
                    <label for="email" className="label">Email</label>
                    <input type="email" onChange={e => setEmail(e.target.value)} value={email}/>
                    <EditIcon className="icon-edit"/>
                  </div>  

                    <button style={{'padding': '10px 90px','margin-top':'30px' }}>SALVAR</button>
          
              </form>
             

            </div>

          </main>
        <FooterBackground notLogin={true}/>
        
      </Container>

    ) 

}