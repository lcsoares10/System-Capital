import React from 'react';
import {Link} from 'react-router-dom'
import './styles.css';

import logo_nav from '../../assets/logo_x6.svg';
import icon_messages from '../../assets/icon_messages.png';
import icon_profile from '../../assets/icon_profile.png';

import { useAuthContext } from '../../Context/AuthContext';

//------------------------------------------------------------
function ContentHeader(){
    return(
        <nav>
            <Link to="/profile">
                <img className="logo-nav" src={logo_nav}  alt=""/>
            </Link>

            <div className="icons-button">
            <Link to="/messages"> <img src={icon_messages} alt=""/></Link>
            <Link to="/view-profile">  <img src={icon_profile} alt=""/></Link>
            </div>
        </nav>
    );
}

export default function HeaderBackground(props) {

    const { handleLogout } = useAuthContext();
    //console.log('Hearder 1');

    return (
        <header>
            {props.notLogin === true ? <ContentHeader/>:''}
            <button onClick={(e) => handleLogout(e)} >Logout</button>
        </header>
    );
}
