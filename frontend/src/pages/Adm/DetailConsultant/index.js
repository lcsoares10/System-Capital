import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

import Container from '../../../components/Container';
import HeaderBackground from '../../../components/HeaderBackground';
import FooterBackground from '../../../components/FooterBackground';
import Alert from '../../../components/Alert';
import api from '../../../services/api';
import convertCoinBr from '../../../utils/convertCoinBr';

import allContracts from '../../../controller/Investor/allContracts';
import { deleteUser, statusInvestor } from '../../../controller/user';
import { sendMessage } from '../../../controller/Adm';
import './styles.css';
import { Link } from 'react-router-dom';

import EditIcon from '@material-ui/icons/Edit';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CheckIcon from '@material-ui/icons/Check';
import DeleteIcon from '@material-ui/icons/Delete';
import {
  cpfMask,
  maskTel,
  durationContractMask,
} from '../../../utils/maskInputs';
import Swal from 'sweetalert2';

import { useAuthContext } from '../../../Context/AuthContext';

//------------------------------------------------------------

export default function DetailInvestment(props) {
  const history = useHistory();
  const { user } = useAuthContext();
  const [investor, setInvestor] = useState([]);
  const [userId, setUserId] = useState('');
  const [contractsInvestor, setContractsInvestor] = useState([]);
  const [investorConsultant, setInvestorConsultant] = useState({});
  const [statusContract, setStatusContract] = useState(0);

  useEffect(() => {
    async function requestGetInvestorAssciated() {
      const dataInvestor = props.location.state.stateLink;
      const contractsInvestor = await allContracts(
        props.location.state.stateLink.id
      );
      setInvestor(dataInvestor.user);
      setUserId(dataInvestor.id);
      if (dataInvestor.consultant) {
        setInvestorConsultant(dataInvestor.consultant.user);
      }

      setContractsInvestor(contractsInvestor);
    }
    setTimeout(() => {
      requestGetInvestorAssciated();
    }, 500);
  }, [
    statusContract,
    props.location.state.stateLink,
    props.location.state.stateLink.id,
  ]);

  async function handlleDeleteInvestor() {
    Swal.fire({
      title: 'Deletar',
      text:
        'Tem certeza que deseja deletar o investidor ' +
        investor.name +
        ' ' +
        investor.last_name +
        ' ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      camceçButtonText: 'Não',
      confirmButtonText: 'Sim, quero deletar!',
      background: '#121212',
    }).then(async (result) => {
      if (result.value) {
        const returnMessageApi = await deleteUser(userId, 'investor');
        if (returnMessageApi.hasOwnProperty('response')) {
          Swal.fire({
            title: 'Erro!',
            text: returnMessageApi.response.data.message,
            icon: 'error',
            confirmButtonText: 'OK',
            background: '#121212',
            confirmButtonColor: '#a0770a',
          });
        } else {
          Swal.fire({
            title: 'Sucesso',
            text: returnMessageApi,
            icon: 'success',
            confirmButtonText: 'OK',
            background: '#121212',
            confirmButtonColor: '#a0770a',
          });
          history.push('/investors');
        }
      }
    });
  }

  async function handlleStatusInvestor(newUser) {
    const returnMessageApi = await statusInvestor(investor.id, newUser);
    if (returnMessageApi.hasOwnProperty('response')) {
      Swal.fire({
        title: 'Erro!',
        text: returnMessageApi.response.data.message,
        icon: 'error',
        confirmButtonText: 'OK',
        background: '#121212',
        confirmButtonColor: '#a0770a',
      });
    } else {
      Swal.fire({
        title: 'Sucesso',
        text: returnMessageApi.data.message,
        icon: 'success',
        confirmButtonText: 'OK',
        background: '#121212',
        confirmButtonColor: '#a0770a',
      });
    }
  }

  async function handleSendMessage() {
    const { value: text } = await Swal.fire({
      input: 'textarea',
      title: 'Enviar mensagem para ' + investor.name,
      inputPlaceholder: 'Escreva sua mensagem aqui',
      inputAttributes: {
        'aria-label': 'Escreva sua mensagem aqui',
      },
      showCancelButton: true,
      background: '#121212',
    });

    if (text) {
      Swal.fire({
        text: text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        camceçButtonText: 'Não',
        confirmButtonText: 'Enviar, mensagem!',
        background: '#121212',
      }).then(async (result) => {
        if (result.value) {
          const returnMessageApi = await sendMessage(investor.id, text);
          if (returnMessageApi.hasOwnProperty('response')) {
            Swal.fire({
              title: 'Erro!',
              text: returnMessageApi.response.data.message,
              icon: 'error',
              confirmButtonText: 'OK',
              background: '#121212',
              confirmButtonColor: '#a0770a',
            });
          } else {
            Swal.fire({
              title: 'Sucesso',
              text: 'Mensagem enviada',
              icon: 'success',
              confirmButtonText: 'OK',
              background: '#121212',
              confirmButtonColor: '#a0770a',
            });
            //history.push('/investors');
          }
        }
      });
    }
  }

  let tel = investor.tel ? investor.tel : 0;
  tel = parseInt(tel);

  //INICIO DO COMPONENTE----------------------------------------------------------------------------
  return (
    <Container>
      <HeaderBackground notLogin={true} />
      <main className="main-ivestors">
        <div className="title-header">
          <h1 className="h1">Consultor</h1>

          {user.is_admin === 1 && (
            <div className="button-controler-user">
              <Link
                to={{
                  pathname: '/newUser',
                  state: {
                    user: investor,
                    userId,
                    type: 'investor',
                    isEdit: true,
                  },
                }}
              >
                {' '}
                <EditIcon
                  title="Editar"
                  style={{
                    backgroundColor: ' #a0770a',
                    padding: '2px',
                    borderRadius: '5px',
                    boxShadow: 'var(--shadow-bottom)',
                  }}
                />
              </Link>

              <Link to={`/consultants`}>
                {' '}
                {investor.active === 0 ? (
                  <CheckIcon
                    onClick={(e) =>
                      handlleStatusInvestor(
                        (investor.active === 0) &
                          (investor.user_activated === 0)
                          ? true
                          : false
                      )
                    }
                    style={{
                      margin: '0px 5px',
                      backgroundColor: 'green',
                      padding: '2px',
                      borderRadius: '5px',
                      boxShadow: 'var(--shadow-bottom)',
                    }}
                    title="Ativar"
                    alt="Ativar"
                  />
                ) : (
                  <HighlightOffIcon
                    onClick={(e) => handlleStatusInvestor(false)}
                    style={{
                      margin: '0px 5px',
                      backgroundColor: ' #a0770a',
                      padding: '2px',
                      borderRadius: '5px',
                      boxShadow: 'var(--shadow-bottom)',
                    }}
                    title="Desativar"
                  />
                )}
              </Link>

              <DeleteIcon
                onClick={(e) => handlleDeleteInvestor()}
                style={{
                  backgroundColor: 'red',
                  padding: '2px',
                  borderRadius: '5px',
                  boxShadow: 'var(--shadow-bottom)',
                  cursor: 'pointer',
                }}
                title="Excluir"
              />
            </div>
          )}
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
          }}
        >
          <p className="name_user">
            {' '}
            &nbsp;{investor.name}&nbsp;{investor.last_name}
          </p>
          {user.is_admin === 1 &&
            (investor.active === 1 ? (
              <span className="tag-active">ativo</span>
            ) : (
              <span className="tag-disabled">desativado</span>
            ))}
        </div>

        <div className="content-detail-investor">
          <div className="detail-investor">
            <p className="weight-thin">
              Cpf:{' '}
              <b className="text-white">{cpfMask(String(investor.identif))}</b>
            </p>
            <p className="weight-thin">
              Telefone: <b className="text-white">{maskTel(tel.toString())}</b>
            </p>
            <p styled={{ marginTop: '10px' }} className="weight-thin">
              E-mail: <b className="text-white">{investor.email}</b>
            </p>
            {user.is_admin === 1 && (
              <div className="enviar-mensage">
                <button onClick={(e) => handleSendMessage()}>
                  Enviar Mensagem
                </button>
              </div>
            )}
          </div>

          <div className="content-contracts"></div>
        </div>
      </main>
      <FooterBackground
        notLogin={true}
        notBack={true}
        backPage={'/investors'}
      />
    </Container>
  );
}
