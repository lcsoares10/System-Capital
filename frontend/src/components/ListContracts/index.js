import React from 'react';
import icon_cash from '../../assets/icon_cash.png'
import {Link} from 'react-router-dom';

import convertCoinBr from '../../services/convertCoinBr';

export default function ListContracts(props) {

    const contracts = props.contracts;

    return(
        <div className='content-list-contract'>
        <table className="list-contract">
          <thead>
            <tr >
              <th>Código</th>
              <th>Nome</th>
              <th><img src={icon_cash} alt="icon_cash"/></th>
            </tr>
          </thead>
          <tbody>

            {
                contracts.map(contract=>(

                  <tr key={contract.id}>
                    <td><Link to={`/detail-contract/${contract.id}`}><p>{contract.id.toString().padStart('5', '0')}</p></Link></td>
                    <td><p>con-{contract.id.toString().padStart('5', '0')}</p></td>
                    <td><p>{convertCoinBr(contract.value)}</p></td>
                  </tr>
                  
                ))
            }
          </tbody>
        </table>
      </div>
    );
}