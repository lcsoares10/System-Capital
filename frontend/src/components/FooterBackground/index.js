import React from 'react';
import './styles.css';
//------------------------------------------------------------
function ContentFooter(props){
    return(
            <p className='text-white'>{props.textview1}, <b className='text-beige'>{props.textview2}</b></p>
    );
}

export default function FooterBackground(props) {

    return (

        <footer>
            {props.notLogin === true ? <ContentFooter textview1="Bem Vindo" textview2="Lucas Soares"/>:''}
        </footer>
    );
}
