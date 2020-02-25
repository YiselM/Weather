import React, { Component } from 'react';
import CanvasJSReact from './canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

var dataPoints =[];
class HSPsemanal extends Component {
	render() {
		const options = {
			theme: "light2",
			animationEnabled: true,
			exportEnabled: true,
			zoomEnabled: true,
			title: {
				text: "Hora solar pico semanal"
			},
			axisY: {
				title: "Wh/m²",
				includeZero: false,
			},
			axisX: {
				title: "Días"
			},
				
			data: [{
				type: "column",
				toolTipContent: "{label}: {y}",
				dataPoints: dataPoints
			}]
		}
		
		return (
			<div>
			<CanvasJSChart options = {options} 
				 onRef={ref => this.chart = ref}
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
		
	}

	componentDidMount() {
        //Para obtener los elementos sin repetir de una lista
		Array.prototype.unique=function(a){
            return function(){return this.filter(a)}}(function(a,b,c){return c.indexOf(a,b+1)<0
          });

		var chart = this.chart;
		var updateChart = function () {
		fetch('https://api.weather.com/v2/pws/observations/hourly/7day?stationId=IPUERTOC4&format=json&units=e&apiKey=f040e0b1ecb0410980e0b1ecb04109b0')
		.then(function(response) {
			return response.json();
		})
		.then(function(data) {
            var dia = 0;
            var semana = [];
            var D = 0;
            var L = 0;
            var M = 0;
            var Mier = 0;
            var J = 0;
            var V = 0;
            var S = 0;
            var hspsemanal = [];
            var dias=['D', 'L', 'M', 'Mier', 'J', 'V', 'S'];
			for (var i = 0; i < data.observations.length; i++) {
                dia = new Date(data.observations[i].obsTimeLocal)
                semana[i] = dias[dia.getDay()];
                //console.log(semana[i])
                if (dia.getDay() === 0){
                    //console.log("es domingo") //Guarda el indice [i]
                    //Aqui tengo que hacer el calculo de la hora solar pico para cada día
                    D = (D + data.observations[i].solarRadiationHigh);
                }
                if (dia.getDay() === 1){
                    L = (L + data.observations[i].solarRadiationHigh);
                }
                if (dia.getDay() === 2){
                    M = (M + data.observations[i].solarRadiationHigh);
                }
                if (dia.getDay() === 3){
                    Mier = (Mier + data.observations[i].solarRadiationHigh);
                }
                if (dia.getDay() === 4){
                    J = (J + data.observations[i].solarRadiationHigh);
                }
                if (dia.getDay() === 5){
                    V = (V + data.observations[i].solarRadiationHigh);
                }
                if (dia.getDay() === 6){
                    S = (S + data.observations[i].solarRadiationHigh);
                }
            }
            //console.log(semana)
            semana = semana.unique();
            D = D/1000;
            L = L/1000;
            M = M/1000;
            Mier = Mier/1000;
            J = J/1000;
            V = V/1000;
            S = S/1000;
            for(var k = 0; k<semana.length; k++){
                if(semana[k] === 'D'){
                    hspsemanal[k] = D
                }
                if(semana[k] === 'L'){
                    hspsemanal[k] = L
                }
                if(semana[k] === 'M'){
                    hspsemanal[k] = M
                }
                if(semana[k] === 'Mier'){
                    hspsemanal[k] = Mier
                }
                if(semana[k] === 'J'){
                    hspsemanal[k] = J
                }
                if(semana[k] === 'V'){
                    hspsemanal[k] = V
                }
                if(semana[k] === 'S'){
                    hspsemanal[k] = S
                }
            };
            for(var j = 0; j< hspsemanal.length; j++){
                dataPoints.push({
                    label: semana[j],  
                    y: hspsemanal[j]
                });   
            }
            //console.log(L)
            //console.log(hspsemanal)
            //console.log(semana)
            //console.log(dataPoints);
            //console.log(semana.length)
			chart.render();
			chart.options.data[0].dataPoints = dataPoints;
            dataPoints = [];
            
		});
		//dataPoints.shift();
	};
	setInterval(function(){updateChart()}, 1000);
	
	}
}
export default HSPsemanal;                           