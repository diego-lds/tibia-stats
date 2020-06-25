import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import formatterCreatureName from '../utils/formatterCreatureName';

const baseUrl = "https://static.tibia.com/images/library/";

const parseLoot = (item, total) => ({
    name: item.itemName,
    y: parseFloat((parseInt(item.times) / total * 100).toFixed(2)),
})


export default props => {
    const { 
        kills,
        loot,
        name   ,
     } = props.data;

     const total = parseInt(kills);
     const chartData = loot.map(item => parseLoot(item, total));
     const creatureName = formatterCreatureName(name);
     
    const options = {
        chart: {
          type: 'pie',
          backgroundColor: 'transparent',   
        },
        plotOptions: {
            pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %'
              }
            }
          },
        title: {
          useHTML: true,
          text: `<div style="display:grid;text-align:center">
          <span>${name}</span>
          <div>
            <img src="assets/creatures/${creatureName}.gif" height="64" width="64" alt=""></img>
          </div>
                </div>`,
        },
        series: [{
            name: `${name}'s loot`,
            data: chartData
          }]
      };


    return(
               <HighchartsReact highcharts={Highcharts} options={options} />
      
    )
}