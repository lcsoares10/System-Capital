import React, { useState, useEffect } from 'react';
import moment from 'moment';

import Container from '../../../components/Container';
import HeaderBackground from '../../../components/HeaderBackground';
import FooterBackground from '../../../components/FooterBackground';

import ListCheckPayments from '../../../components/ListCheckPayments';
import allContractPayMonth from '../../../controller/Investor/allContractPayMonth';
import convertCoinBr from '../../../utils/convertCoinBr';
import { useAuthContext } from '../../../Context/AuthContext';

import './styles.css';
//------------------------------------------------------------

export default function DetailInvestment(props) {
  const { user } = useAuthContext();
  const [payMonths, setPayMonths] = useState([]);
  const [contract, setContract] = useState([]);
  const [resetPage, setResetPage] = useState(false);

  useEffect(() => {
    async function getPayMonths() {
      const data = await allContractPayMonth(props.match.params.id);
      setPayMonths(data.payMonths);
      setContract(data.contract);
    }
    setTimeout(() => {
      getPayMonths();
    }, 500);
  }, [resetPage]);

  return (
    <Container>
      <HeaderBackground notLogin={true} />
      <main className="main-detail-investiment">
        <div className="title-header">
          <h1 className="h1-">Investimento</h1>
          <p>contrato: {String(contract.id).padStart(5, '0')}</p>
        </div>

        <div className="content-ivestment">
          <div className="detail-invest">
            <p className="weight-thin">
              Data da Aplicação:{' '}
              <b className="text-white">
                {' '}
                {moment(contract.begin).format('L')}
              </b>
            </p>
            <p className="weight-thin">
              Valor Investido:{' '}
              <b className="text-white">{convertCoinBr(contract.value)}</b>
            </p>
          </div>

          <div className="check-payments">
            {user.is_admin === 1 ? <h2>Pagos</h2> : <h2>Recebidos</h2>}
            <div className="list-check-payments">
              <ListCheckPayments
                payMonths={payMonths}
                isAdm={user.is_admin === 1 ? true : false}
                contractId={contract.id}
                contractValue={contract.value}
                handleSetResetPage={setResetPage}
              />
            </div>
          </div>
        </div>
      </main>
      <FooterBackground notBack={true} notLogin={true} />
    </Container>
  );
}
