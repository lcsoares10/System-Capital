import React from 'react';
import icon_cash from '../../assets/icon_cash.png'
import {Link} from 'react-router-dom';

import convertCoinBr from '../../services/convertCoinBr';

import CheckCircle from '@material-ui/icons/CheckCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';



const PaidOut = ()=>(

    <ul>
        <li className="text-white">06/2020</li>
        <li class className="text-beige"Name="text-beige">R$ 1.000,00</li>
        <li><CheckCircle style={{color:"#25C00C"}}/></li>
    </ul>
)

const NotPay = ()=>(

    <ul>
        <li className="text-white">03/2021</li>
        <li className="text-beige">R$ 1.000,00</li>
        <li><RemoveCircleIcon style={{color:"#2E2E2E"}}/></li>
    </ul>
    
)

export default function ListContracts(props) {


    const contracts = props.contracts;

    return(
        <div className="list-check-payments">
 
            {
                contracts.map(contract=>(

                    


                        
                ))
            }

        </div>
    );
}