//import React, { useState, useContext } from 'react';
import React, { useState } from 'react';
import { useHistory }  from 'react-router-dom';

/* Componentes propios*/
import Container from '../../components/Container';
import HeaderBackground from '../../components/HeaderBackground';
import FooterBackground from '../../components/FooterBackground';

import logo from '../../assets/logo_x6.png';
import './styles.css';
//------------------------------------------------------------

//import { AuthContext } from '../../Context/AuthContext';
import { useAuthContext } from '../../Context/AuthContext';

export default function Logon() {
    const [email, setEmail] = useState('consultant_59334@gmail.com');
    const [password, setpassword] = useState('59334');

    //const { handleLogon } = useContext(AuthContext);
    const { handleLogon } = useAuthContext();
    const history = useHistory();

    return (

        <Container>

            <HeaderBackground notLogin={false}/>

            <div className="content">
                <div className="main-login">
                    <img src={logo}/>

                    <form onSubmit={e=>handleLogon(e, email, password, history)}>
                        <div className="form-inputs">
                            <input type="text" value={email} placeholder="E-mail" onChange={e => setEmail(e.target.value)}></input>
                            <input type="password" value={password} placeholder="Senha"  onChange={e => setpassword(e.target.value)}></input>
                        </div>
                        <button>ACESSAR</button>
                    </form>
                </div>
            </div>
            <FooterBackground notLogin={true}/>
        </Container>
    );
}


