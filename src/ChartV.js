import React, { Component } from 'react';
import CanvasJSReact from './canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var CanvasJS = CanvasJSReact.CanvasJS;

var dataPoints =[];
CanvasJS.addColorSet("Azulito",
[//colorSet Array
"#84BEFF",              
]);

class ChartV extends Component {
	render() {
		const options = {
			theme: "light2",
			animationEnabled: true,
			exportEnabled: true,
			zoomEnabled: true,
			colorSet: "Azulito",
			title: {
				text: "Velocidad del Viento"
			},
			axisY: {
				title: "Velocidad (m/s)",
				includeZero: false,
			},
			axisX: {
				title: "Hora"
			},
			data: [{
				type: "stepLine",
				toolTipContent: "Velocidad: {y}",
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
		var chart = this.chart;
		var updateChart = function () {
		fetch('https://api.weather.com/v2/pws/observations/all/1day?stationId=IATLNTIC4&format=json&units=m&apiKey=f040e0b1ecb0410980e0b1ecb04109b0')
		.then(function(response) {
			return response.json();	
		})
		.then(function(data) {
			var v = 0;
			var power = 0;
			var PV = [];
			var hoy = new Date();
			hoy = hoy.getDay()
			for (var i = 0; i < data.observations.length; i++) {
				v = (data.observations[i].metric.windspeedAvg)*(10/36)
				if (v < 4 || v > 14) {
					power = 0 + power
				}
				else {
					power = power + (0.001723483 * ((v) ^ 6) - 0.04935507 * ((v) ^ 5) + 0.01124858 * ((v) ^ 4) + 12.34628 * ((v) ^ 3) - 144.3604 * ((v) ^ 2) + 657.3997 * v - 1038.827)*(5/60)
				}
				dataPoints.push({
                    x: new Date(data.observations[i].obsTimeLocal),
                    y: Number(v.toFixed(3)) 
                    
				});
			}
			power = power/10
			power = Number(power.toFixed(3))
			//console.log(power)
			PV[hoy] = power;
			//Cambiar esto por node
			localStorage.setItem('PV', JSON.stringify(PV));
	

			
			chart.render();
			chart.options.data[0].dataPoints = dataPoints;
			dataPoints = [];
		})
		.catch(function(error) {
			
		  });
	};
	setTimeout(function(){updateChart()}, 1000);
	setInterval(function(){updateChart()}, 900000);
	
	}
}
export default ChartV;     