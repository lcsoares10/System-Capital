import React,{useState,useEffect} from 'react';
//import icon_cash from '../../assets/icon_cash.png'
//import {Link} from 'react-router-dom';

import convertCoinBr from '../../utils/convertCoinBr';

import CheckCircle from '@material-ui/icons/CheckCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

import allContractPayMonth from '../../controller/Investor/allContractPayMonth';

const PaidOut = (props)=>(

    <ul>
        <li className="text-white">06/2020</li>
        <li class className="text-beige"Name="text-beige">{convertCoinBr(10000)}</li>
        <li><CheckCircle style={{color:"#25C00C"}}/></li>
    </ul>
)

const NotPay = (props)=>(

    <ul>
        <li className="text-white">03/2021</li>
        <li className="text-beige">R$ 1.000,00</li>
        <li><RemoveCircleIcon style={{color:"#2E2E2E"}}/></li>
    </ul>

)

function constructArrayPayMonth(data) {
    let months = [{}]
}

export default function ListContracts(props) {

    const [payMonths,setPayMonths] = useState({});

    useEffect(() => {

        async function getPayMonths() {
            const data = await allContractPayMonth(props.id_contract)
            setPayMonths( data );
        }
        setTimeout(() => {
          getPayMonths();
        }, 500);


      }, []);

    return(
        <div className="list-check-payments">


        </div>
    );
}
