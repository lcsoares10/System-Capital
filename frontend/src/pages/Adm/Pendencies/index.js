import React, { useState, useEffect } from 'react';

import Container from '../../../components/Container';
import HeaderBackground from '../../../components/HeaderBackground';
import FooterBackground from '../../../components/FooterBackground';

import List from '../../../components/List';
import { getAllConsultants } from '../../../controller/Adm';

import './styles.css';
//------------------------------------------------------------

export default function ConsultantRegisters(props) {
  console.log(props.location.state);
  const consultants = props.location.state.consultants;
  const investors = props.location.state.investors;

  //Tendo criar um search
  // function handleSearch(valueInput) {
  //   setValudeInput(valueInput);
  //   console.log(valudeInput);
  //   let searchConsultants = consultants.filter((consultant) => {
  //     return consultant.user.name
  //       .toLowerCase()
  //       .includes(valudeInput.toLowerCase());
  //   });
  //   if (searchConsultants.length !== 0) {
  //     setconsultants(searchConsultants);
  //   }
  //   console.log(consultants);
  // }

  return (
    <Container>
      <HeaderBackground notLogin={true} />
      <main className="main-view-list">
        <div className="title-header">
          <h1 className="h1-">Pendências de Aprovação </h1>
        </div>

        <div className="section">
          <div className="content-list">
            <h2>Consultores</h2>
            <div className="list">
              {consultants.map((consultant, key) => (
                <List
                  key={key}
                  value_col_1={`${consultant.user.name} ${consultant.user.last_name}`}
                  url={`/detailConsultant/${consultant.user.name}`}
                  stateLink={consultant}
                  backgroundColor={consultant.user.active === 0 ? true : false}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="section">
          <div className="content-list" style={{ marginTop: '0px' }}>
            <h2 style={{ marginTop: '0px' }}>Investidores </h2>
            <div className="list">
              {investors.map((investor, key) => (
                <List
                  key={key}
                  value_col_1={`${investor.user.name} ${investor.user.last_name}`}
                  url={`/detailInvestor/${investor.user.name}`}
                  stateLink={investor}
                  backgroundColor={investor.user.active === 0 ? true : false}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
      <FooterBackground notLogin={true} notBack={true} />
    </Container>
  );
}
