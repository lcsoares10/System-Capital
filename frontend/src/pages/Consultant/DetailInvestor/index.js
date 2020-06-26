import React, { useState, useEffect } from 'react';
import moment from 'moment';

import Container from '../../../components/Container';
import HeaderBackground from '../../../components/HeaderBackground';
import FooterBackground from '../../../components/FooterBackground';

import convertCoinBr from '../../../utils/convertCoinBr';

import { getInvestorAssociated } from '../../../controller/Consultant';
import { formatTel } from '../../../controller/formatsStrings';
import allContracts from '../../../controller/Investor/allContracts';

import './styles.css';
//------------------------------------------------------------

export default function DetailInvestment(props) {
  const [investor, setInvestor] = useState([]);
  const [contractsInvestor, setContractsInvestor] = useState([]);
  console.log(props.location.state);
  useEffect(() => {
    async function requestGetInvestorAssciated() {
      const dataInvestor = props.location.state.investor;
      const contractsInvestor = await allContracts(
        props.location.state.investor.id
      );
      setInvestor(dataInvestor.user);
      setContractsInvestor(contractsInvestor);
    }
    setTimeout(() => {
      requestGetInvestorAssciated();
    }, 500);
  }, []);

  let tel = investor.tel ? investor.tel : 0;
  tel = parseInt(tel);

  return (
    <Container>
      <HeaderBackground notLogin={true} />
      <main className="main-associated-investors">
        <div className="title-header">
          <h1 className="h1-">Investidor</h1>
          <p> &nbsp;{investor.name}</p>
        </div>
        <div className="content-detail-associated">
          <div className="detail-investor">
            <p className="weight-thin">
              Telefone:{' '}
              <b className="text-white">{formatTel(tel.toString())}</b>
            </p>
            <p style={{ marginTop: '10px' }} className="weight-thin">
              E-mail: <b className="text-white">{investor.email}</b>
            </p>
          </div>

          <div className="content-contracts">
            <h2>Contratos</h2>
            <div className="list-contracts">
              {contractsInvestor.map((contract) => (
                <div className="contracts">
                  <p>Cod: {contract.id.toString().padStart('5', '0')}</p>
                  <p>
                    Valor Investido:{' '}
                    <b style={{ color: 'green' }}>
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
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <FooterBackground notLogin={true} />
    </Container>
  );
}
