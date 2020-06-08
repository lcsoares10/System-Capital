import React, { useEffect,useState } from 'react';
import {Link} from 'react-router-dom';

import Container from '../../components/Container';
import HeaderBackground from '../../components/HeaderBackground';
import FooterBackground from '../../components/FooterBackground';
import LineChart from '../../components/ Graphics/line';
import ListContracts from '../../components/ListContracts';

import allContracts from '../../controller/Investor/allContracts';
import calculateProjection from '../../controller/Investor/calculateProjection';

import './styles.css'

//------------------------------------------------------------
import { useAuthContext } from '../../Context/AuthContext';

export default function Profile() {

  const { user } = useAuthContext();
  const [ contracts, setContracts ] = useState([]);
  const [dataProjection, setDataProjection] = useState([]);
  const [idContract, setIdContracts] = useState();

  useEffect(() => {
    // Create an scoped async function in the hook
    async function getContracts() {
      const contratos = await allContracts(user.id);
      setContracts(contratos);
      handleCalculationProjection(contratos[0].id);
    }
    getContracts();
    // Execute the created function directly

  }, []);

  function handleCalculationProjection(id_contract) {
    setIdContracts(id_contract);
    setDataProjection(calculateProjection(id_contract));
  }

  function filterId(id_contract) {
    return contracts.filter(contract => id_contract === contract.id)
  }

    return (
      <Container className="container-login" >
        <HeaderBackground notLogin={true}/>
          <main>
          <div className="title-header">
            <h1 className="h1-profile">Investimentos</h1>
            <select onChange={e => handleCalculationProjection(e.target.value)} className="select-contract" name="" id="">
            {/* <option value="">Selecionar</option> */}
              {
                contracts.map(contract=>(
                <option key={contract.id} value={contract.id}>
                  {contract.id.toString().padStart('5', '0')}</option>
                ))
              }
              </select>
          </div>

            <div className="content-projection">
              <p>PROJEÇÃO DE 12 MESES</p>
              <div className='graph'>
                <LineChart data={dataProjection}></LineChart>
              </div>
              <Link to={`/detail-investment/${idContract}`}>
                <button>Ver detalhes</button>
              </Link>
            </div>

            <h2>Contratos</h2>
            <ListContracts contracts={contracts}/>
          </main>
        <FooterBackground notLogin={true}/>

      </Container>
  );
}
