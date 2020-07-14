import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

import Container from '../../../components/Container';
import HeaderBackground from '../../../components/HeaderBackground';
import FooterBackground from '../../../components/FooterBackground';
import Alert from '../../../components/Alert';

import convertCoinBr from '../../../utils/convertCoinBr';

import { formatTel } from '../../../controller/formatsStrings';
import allContracts from '../../../controller/Investor/allContracts';
import { deleteUser, statusInvestor } from '../../../controller/user';
import './styles.css';
import { Link } from 'react-router-dom';

import EditIcon from '@material-ui/icons/Edit';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CheckIcon from '@material-ui/icons/Check';
import DeleteIcon from '@material-ui/icons/Delete';
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
  }, [props.location.state.stateLink, props.location.state.stateLink.id]);

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

  async function handlleStatusInvestor() {
    const returnMessageApi = await statusInvestor(investor.id);
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
      history.push('/investors');
    }
  }

  let tel = investor.tel ? investor.tel : 0;
  tel = parseInt(tel);

  return (
    <Container>
      <HeaderBackground notLogin={true} />
      <main className="main-ivestors">
        <div className="title-header">
          <h1 className="h1">Investidor</h1>
          {user.is_admin && (
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

              <Link to={`/investors`}>
                {' '}
                {investor.active === 0 ? (
                  <CheckIcon
                    onClick={(e) => handlleStatusInvestor()}
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
                    onClick={(e) => handlleStatusInvestor()}
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
        <p className="name_user">
          {' '}
          &nbsp;{investor.name}&nbsp;{investor.last_name}
        </p>
        <div className="content-detail-investor">
          <div className="detail-investor">
            <p className="weight-thin">
              Telefone:{' '}
              <b className="text-white">{formatTel(tel.toString())}</b>
            </p>
            <p styled={{ marginTop: '10px' }} className="weight-thin">
              E-mail: <b className="text-white">{investor.email}</b>
            </p>
            {user.is_admin && (
              <p styled={{ marginTop: '10px' }} className="weight-thin">
                Consultor:{' '}
                <b className="text-white">{investorConsultant.name}</b>
              </p>
            )}
          </div>

          <div className="content-contracts">
            <h2>Contratos</h2>
            <div className="list-contracts">
              {contractsInvestor[0] ? (
                ''
              ) : (
                <div>
                  <Alert>Esse investor não possui contratos</Alert>;
                </div>
              )}
              {contractsInvestor.map((contract, key) => (
                <div className="contracts" key={key}>
                  <p>Cod: {contract.id.toString().padStart('5', '0')}</p>

                  <p>
                    Valor Investido:{' '}
                    <b styled={{ color: 'green' }}>
                      {convertCoinBr(contract.value)}
                    </b>
                  </p>
                  <p>
                    Dia de pagamento:{' '}
                    <b>{contract.day.toString().padStart('2', '0')}</b>
                  </p>
                  <div className="time-contract">
                    <p>Inicio: {moment(contract.begin).format('L')}</p>
                    <p>
                      Fim:{' '}
                      {moment(contract.begin)
                        .add(contract.time, 'months')
                        .format('L')}
                    </p>
                  </div>
                  <Link to={`/detail-investment/${contract.id}`}>
                    <button className="detail-pay"> PAGAMENTOS</button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
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
