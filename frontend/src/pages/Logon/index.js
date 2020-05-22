import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import { Container,Row,Col } from 'reactstrap';

/* Componentes propios*/
import HeaderBackground from '../../components/HeaderBackground';
import FooterBackground from '../../components/FooterBackground';

import handleLogon from '../../services/Logon.js'

import logo from '../../assets/logo_x6.png';
import './styles.css';
//------------------------------------------------------------


export default function Logon() {

    const [email,setEmail] = useState('');
    const [password,setpassword] = useState('');

    return (
        
        <Container className="container" fluid="sm">
          
            <HeaderBackground/>
            
            <div className="content">
                <img src={logo}/>
       
                <form onSubmit={e=>handleLogon(e,email,password)}> 
                    <div className="form-inputs">
                        <input type="text" placeholder="E-mail" onChange={e => setEmail(e.target.value)}></input>
                        <input type="password" placeholder="Senha" onChange={e => setpassword(e.target.value)}></input>
                    </div>
                    <button>ACESSAR</button>
                </form>
              
            </div>
            <FooterBackground/>
        </Container>
    );
}


