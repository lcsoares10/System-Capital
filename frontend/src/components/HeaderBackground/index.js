import React from 'react';
import './styles.css';

import logo_nav from '../../assets/logo_x6.svg';
import icon_messages from '../../assets/icon_messages.png';
import icon_profile from '../../assets/icon_profile.png';
//------------------------------------------------------------
function ContentHeader(){
    return(
        <nav>
            <img className="logo-nav" src={logo_nav}  alt=""/>
            <div className="icons-button">
                <img src={icon_messages} alt=""/>
                <img src={icon_profile} alt=""/>
            </div>
        </nav>
    );
}

export default function HeaderBackground(props) {

    return (
        <header>
            {props.notLogin === true ? <ContentHeader/>:''}
        </header>
    );
}
