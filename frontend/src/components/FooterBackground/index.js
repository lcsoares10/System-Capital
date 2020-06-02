import React, { useEffect } from 'react';
import './styles.css';

import { useAuthContext } from '../../Context/AuthContext';

//------------------------------------------------------------
function ContentFooter(props){
    return(
            <p className='text-white'>{props.textview1}, <b className='text-beige'>{props.textview2}</b></p>
    );
}

export default function FooterBackground(props) {

  const { user } = useAuthContext();
  //console.log('Footer 1');

  return (

      <footer>
          {/* {props.notLogin === true ? <ContentFooter textview1="Bem Vindo" textview2="Lucas Soares"/>:''} */}
          {props.notLogin === true ? <ContentFooter textview1="Bem Vindo" textview2={user.name}/>:''}
      </footer>
  );
}
