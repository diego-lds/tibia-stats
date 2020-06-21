import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

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
          text: name,
        },
        series: [{
            name: `${name}'s loot`,
            data: chartData
          }]
      };


    return(
        <div>
               <HighchartsReact className="teste" highcharts={Highcharts} options={options} />
        </div>
    )
}