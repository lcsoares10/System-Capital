import React from 'react';

import Container from '../../components/Container';
import HeaderBackground from '../../components/HeaderBackground';
import FooterBackground from '../../components/FooterBackground';

import icon_profile_my from '../../assets/icon-profile-my.png';
import EditIcon from '@material-ui/icons/Edit';

import './styles.css';
//------------------------------------------------------------

export default function ViewProfile() {


    return (
        <Container className="container-login" >    
          <HeaderBackground notLogin={true}/>
          <main className="main-myprofile">
            <div className="title-header">
              <h1>Perfil</h1>
            </div>

            <div className="content-form">

              <div className="photo-ptofile">
                <img src={icon_profile_my} alt='photo-profile'/>
              </div>
              <form> 
                  <div className="upload-photo">
                    <label for="photo">ALTERAR FOTO</label>
                    <input id="photo"  type="file" style={{display:"none"}}/>
                  </div>
                  
                  <div className ='no-edit-form'>
                    <label for="nome" className="label">Nome</label>
                    <input type="text" value="Lucas"/>
                  </div>
                  <div className ='no-edit-form'>
                    <label for="sobreNome" className="label">Sobre nome</label>
                    <input type="text" value="da Silva Soares"/>
                  </div>

                  <div className ='edit-form'>
                    <label for="tel" className="label"> Telefone</label>
                    <input id="tel" type="text" value="(21) 9 96907-5358"/>
                    <EditIcon className="icon-edit"/>
                  </div>
                  
                  <div className='edit-form'>
                    <label for="email" className="label">Email</label>
                    <input type="email" value="lucasdasilvasoares10@gmail.com"/>
                    <EditIcon className="icon-edit"/>
                  </div>


              </form>
             

            </div>

          </main>
        <FooterBackground/>
        
      </Container>
    );
}
