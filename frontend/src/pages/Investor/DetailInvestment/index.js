import React, { useState, useEffect } from 'react';
import moment from 'moment';

import Container from '../../../components/Container';
import HeaderBackground from '../../../components/HeaderBackground';
import FooterBackground from '../../../components/FooterBackground';

import ListCheckPayments from '../../../components/ListCheckPayments';
import allContractPayMonth from '../../../controller/Investor/allContractPayMonth';
import convertCoinBr from '../../../utils/convertCoinBr';

import './styles.css';
//------------------------------------------------------------

export default function DetailInvestment(props) {
  const [payMonths, setPayMonths] = useState([]);
  const [contract, setContract] = useState([]);

  useEffect(() => {
    async function getPayMonths() {
      const data = await allContractPayMonth(props.match.params.id);
      setPayMonths(data.payMonths);
      setContract(data.contract);
    }
    setTimeout(() => {
      getPayMonths();
    }, 500);
  }, [props.match.params.id]);

  return (
    <Container>
      <HeaderBackground notLogin={true} />
      <main className="main-detail-investiment">
        <div className="title-header">
          <h1 className="h1-">Investimento</h1>
          <p>contrato: {contract.id}</p>
        </div>

        <div className="content-ivestment">
          <div className="detail-invest">
            <p className="weight-thin">
              Data da Aplicao:{' '}
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
            <h2>Recebidos</h2>
            <div className="list-check-payments">
              <ListCheckPayments payMonths={payMonths} />
            </div>
          </div>
        </div>
      </main>
      <FooterBackground notBack={true} notLogin={true} />
    </Container>
  );
}
