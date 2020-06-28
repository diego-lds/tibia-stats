import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import formatterCreatureName from '../utils/formatterCreatureName';


const parseLoot = (item, total) => ([
  item.itemName,
  parseFloat((parseInt(item.times) / total * 100).toFixed(2))  
])


export default props => {
    const { 
        kills,
        loot,
        name   ,
     } = props.data;

     const total = parseInt(kills);
     const chartData = loot.map(item => parseLoot(item, total));
     const creatureName = formatterCreatureName(name);

     const lootLength = chartData.length;
     console.log(chartData)
    const options = {
      chart: {
        type: 'column'
      },
      title: {
        useHTML: true,
        text: `<div style="display:grid;text-align:center">
        <span>Pecentagem de items dropados de ${name}</span>
        <div>
          <img src="assets/creatures/${creatureName}.gif" height="64" width="64" alt=""></img>
        </div>
              </div>`,
      },
      xAxis: {
          type: 'category',
          labels: {
              rotation: -45,
              style: {
                  fontSize: '13px',
                  fontFamily: 'Verdana, sans-serif'
              }
          }
      },
      yAxis:{
        max:100,
      },
      legend: {
          enabled: false
      },
      tooltip: {
        enabled: false,
      },
      plotOptions: {
            series: {
                pointWidth: lootLength > 50 ? 5 : null
            }
        },
      series: [{
        name: 'Loot',
         data: chartData,
        dataLabels: {
            enabled: true,
            rotation:null,
            color: '#FFFFFF',
            align: 'center',
            format: '{point.y:.2f}%', // two decimal
            y: 10, // 10 pixels down from the top
            style: {
                fontSize: lootLength > 50 ? '8px' : '10px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    }],
    credits:{
      enabled:false
    }
      };

    return <HighchartsReact highcharts={Highcharts} options={options} />

}