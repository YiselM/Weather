import React, { Component } from 'react';
import CanvasJSReact from './canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var CanvasJS = CanvasJSReact.CanvasJS;


var dataPoints = [];
CanvasJS.addColorSet("Azulito",
    [//colorSet Array
        "#84BEFF",
    ]);

class ChartVX extends Component {
    render() {
        const options = {
            theme: "light2",
            animationEnabled: true,
            exportEnabled: true,
            zoomEnabled: true,
            title: {
                text: "Densidad de viento"
            },
            axisY: {
                title: "Watts",
                includeZero: false,
            },
            axisX: {
                title: "Días a la semana"
            },

            data: [{
                type: "column",
                toolTipContent: "{x}: {y}",
                dataPoints: dataPoints
            }]
        }

        return (
            <div>
                <CanvasJSChart options={options}
                    onRef={ref => this.chart = ref}
                />
                {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
            </div>
        );
    }

    componentDidMount() {

        var chart = this.chart;
        var updateChart = function () {
            fetch('https://api.weather.com/v2/pws/observations/hourly/7day?stationId=IATLNTIC4&format=json&units=m&apiKey=f040e0b1ecb0410980e0b1ecb04109b0')
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    let todayDate = new Date();
                    var v = 0;
                    let promd0 = 0;
                    let promd1 = 0;
                    let promd2 = 0;
                    let promd3 = 0;
                    let promd4 = 0;
                    let promd5 = 0;
                    let promd6 = 0;
                    let d0 = [],
                        d1 = [],
                        d2 = [],
                        d3 = [],
                        d4 = [],
                        d5 = [],
                        d6 = [];
                    for (var i = 0; i < data.observations.length; i++) {
                        v = (data.observations[i].metric.windspeedAvg) * (1000 / 3600)
                        if (v > 30) {
                            v = 0;
                        } else {
                            v = 0.001723483 * ((v) ^ 6) - 0.04935507 * ((v) ^ 5) + 0.01124858 * ((v) ^ 4) + 12.34628 * ((v) ^ 3) - 144.3604 * ((v) ^ 2) + 657.3997 * v - 1038.827;
                        }
                        var date1 = new Date(data.observations[i].obsTimeLocal);
                        //Sunday data
                        if (date1.getDay() === 0 && todayDate.getDay() === date1.getDay()) {
                            d0.push(v)
                        } else if (date1.getDay() === 1 && todayDate.getDay() >= date1.getDay()) {
                            d1.push(v)
                        } else if (date1.getDay() === 2 && todayDate.getDay() >= date1.getDay()) {
                            d2.push(v)
                        } else if (date1.getDay() === 3 && todayDate.getDay() >= date1.getDay()) {
                            d3.push(v)
                        } else if (date1.getDay() === 4 && todayDate.getDay() >= date1.getDay()) {
                            d4.push(v)
                        } else if (date1.getDay() === 5 && todayDate.getDay() >= date1.getDay()) {
                            d5.push(v)
                        } else if (date1.getDay() === 6 && todayDate.getDay() >= date1.getDay()) {
                            d6.push(v)
                        }
                    }
                    d0.forEach(x => {
                        promd0 = x + promd0
                    });
                    d1.forEach(x => {
                        promd1 = x + promd1;
                    });
                    d2.forEach(x => {
                        promd2 = x + promd2;
                    });
                    d3.forEach(x => {
                        promd3 = x + promd3;
                    });
                    d4.forEach(x => {
                        promd4 = x + promd4;
                    });
                    d5.forEach(x => {
                        promd5 = x + promd5;
                    });
                    d6.forEach(x => {
                        promd6 = x + promd6;
                    });
                    dataPoints = [
                        { label: "Lunes", y: Number(promd1.toFixed(3)) },
                        { label: "Martes", y: Number(promd2.toFixed(3)) },
                        { label: "Miercoles", y: Number(promd3.toFixed(3)) },
                        { label: "Jueves", y: Number(promd4.toFixed(3)) },
                        { label: "Viernes", y: Number(promd5.toFixed(3)) },
                        { label: "Sábado", y: Number(promd6.toFixed(3)) },
                        { label: "Domingo", y: Number(promd0.toFixed(3)) }]
                    //console.log(dataPoints);
                    chart.render();
                    chart.options.data[0].dataPoints = dataPoints;
                    dataPoints = [];
                });
        };
        setTimeout(function(){updateChart()}, 1000);
        setInterval(function(){updateChart()}, 900000);
    }


}

export default ChartVX;     