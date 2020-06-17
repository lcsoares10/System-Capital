import React from 'react';
//import icon_cash from '../../assets/icon_cash.png'
//import {Link} from 'react-router-dom';

import convertCoinBr from '../../utils/convertCoinBr';

import CheckCircle from '@material-ui/icons/CheckCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

const PayOut = (props)=>(

    <ul>
        <li className="text-white">{props.comp}</li>
        <li className="text-beige">{convertCoinBr(props.value)}</li>
        <li>
            {
                (props.payOut === 1 ?<CheckCircle style={{color:"#25C00C"}}/>:<RemoveCircleIcon style={{color:"#2E2E2E"}}/>)
            }
            
        </li>
    </ul>
)

export default function ListContracts(props) {



    return(
        <div className="list-check-payments">
            {
                props.payMonths.map((payMonth,key)=>(
                    <div key={key}>
                     <PayOut  payOut={payMonth.pay} value={payMonth.value} comp={payMonth.competence_}/>
                    </div>
                ))
            }
        </div>
    );
}
