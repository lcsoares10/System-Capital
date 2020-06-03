import React from 'react';
import {Line} from 'react-chartjs-2';


export default function LineChart(props) {
  const state = {
    labels: ['Jan', 'Fev', 'Março',
             'Abr', 'Maio','Junho','Julho','Agosto','Setembro','Out','Nov','Dez'],
    datasets: [
      {
        label: 'Lucro',
        fill: true,
        lineTension: 0.5,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(255,255,255)',
        borderWidth: 2,
        data: props.data
      }
    ]
  }
        return (
          <div>
            <Line
              data={state}
              options={{
                title:{
                  display:true,
                  text:'Lucro',
                  fontSize:15
                },
                legend:{
                  display:false,
                  position:'right',
                }
              }}
            />
          </div>
        );
}