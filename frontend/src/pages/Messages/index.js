import React,{useEffect,useState} from 'react';
import { useAuthContext } from '../../Context/AuthContext';

import api from '../../services/api';

import Container from '../../components/Container';
import HeaderBackground from '../../components/HeaderBackground';
import FooterBackground from '../../components/FooterBackground';
import Message from '../../components/Message';

import './styles.css';
//------------------------------------------------------------


export default function Messages() {

  const { user } = useAuthContext();
  const [messages,setMessages] = useState([]);

  useEffect(()=>{
    async function getMessages() {

      try {
        const { data } = await api.get(`/users/${user.id_user}/messages`);
        console.log(data.data);
        setMessages(data.data);
  
      } catch (error) {
          console.log(error);
      }
    }
    getMessages();
  },[])
  console.log(messages);
    return (

        <Container>    
          <HeaderBackground notLogin={true}/>
          <main className="main-msg">
            <div className="title-header">
              <h1>Suas Mensagens</h1>
            </div>

            <div className="content-message">

            {
             
              messages.length === 0 ? <h3 className="text-white">Voce nao possui menssagens</h3> : ''
            }
            {
              messages.map((message,key)=>{
                console.log(message.users[0].MessageUserView.viewed)
                if(message.users[0].MessageUserView.viewed === 0) {
                  return (<Message messagem={message.messagem} user_send={message.user_send} key={key} viewed={message.users[0].MessageUserView.viewed} />);
                }
                return <Message key={key} messagem={message.messagem} user_send={message.user_send} viewed={message.users[0].MessageUserView.viewed} />
              })
            }

            </div>

          </main>
        <FooterBackground notLogin={true}/>
        
      </Container>
    );
}
