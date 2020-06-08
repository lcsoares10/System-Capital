import React,{useState} from 'react';

import api from '../../services/api';

import Container from '../../components/Container';
import HeaderBackground from '../../components/HeaderBackground';
import FooterBackground from '../../components/FooterBackground';

import icon_profile_my from '../../assets/icon-profile-my.png';
import EditIcon from '@material-ui/icons/Edit';

import './styles.css';
//------------------------------------------------------------
import { useAuthContext } from '../../Context/AuthContext';

async function handdleInpuntTel(value) {

    try {
      const { data } = await api.get(`/consultants/${value}`);
      console.log(data.user.name);
      return data.user;

    } catch (error) {
        console.log(error);
        return error;
    }

}

async function handdleInpuntEmail(value) {

  try {
    const { data } = await api.get(`/consultants/${value}`);
    console.log(data.user.name);
    return data.user;

  } catch (error) {
      console.log(error);
      return error;
  }

}




export default function ViewProfile() {


    const { user } = useAuthContext();
    const [tel,setTel] = useState(user.email);
    const [email,setEmail] = useState(user.email);
 
    console.log(user)
 
    return (
        <Container className="container-login" >    
          <HeaderBackground notLogin={true}/>
          <main className="main-myprofile">
            <div className="title-header">
              <h1>Perfil</h1>
            </div>

            <div className="content-form">

              <div className="photo-ptofile">
                <img src={icon_profile_my}/>
              </div>
              <form> 
                  <div className="upload-photo">
                    <label for="photo">ALTERAR FOTO</label>
                    <input id="photo"  type="file" style={{display:"none"}}/>
                  </div>
                  
                  <div className ='no-edit-form'>
                    <label for="nome" className="label">Nome</label>
                    <input type="text" readonly='true' value={user.name}/>
                  </div>
                  <div className ='no-edit-form'>
                    <label for="sobreNome" className="label">Sobre nome</label>
                    <input type="text" readonly='true' value={user.name}/>
                  </div>

                  <div className ='edit-form'>
                    <label for="tel" className="label"> Telefone</label>
                    <input id="tel" type="text" onChange={e => setTel(e.target.value)} value={tel}/>
                    <EditIcon className="icon-edit"/>
                  </div>
                  
                  <div className='edit-form'>
                    <label for="email" className="label">Email</label>
                    <input type="email" onChange={e => setEmail(e.target.value)} value={email}/>
                    <EditIcon className="icon-edit"/>
                  </div>


              </form>
             

            </div>

          </main>
        <FooterBackground notLogin={true}/>
        
      </Container>
    );
}
