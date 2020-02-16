import React, { Component } from 'react';
import './App.css';
var Data = [];
var HSP = 0;
class HPS extends Component {
  render() {    
    return (
    <div>        
        <button type="button" className="btn btn-primary">
         Horas sol pico <span className="badge badge-light" id = "demo"></span >
        </button>
    </div>
    );
}
componentDidMount() {
    var updateData = function () {
    fetch('https://api.weather.com/v2/pws/observations/all/1day?stationId=IPUERTOC4&format=json&units=e&apiKey=f040e0b1ecb0410980e0b1ecb04109b0')
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        var n = 0;
        for (var i = 0; i < data.observations.length; i++) {
             n = new Date(data.observations[i].obsTimeLocal) 
            Data.push({
                x: n.getHours(),
                y: n.getMinutes(), 
                z: data.observations[i].solarRadiationHigh
            });
            //console.log(Data)
        }
        //console.log(Data.length);
        if(Data.length > 1){
            var m = []; //minutos
            var h = 0;
            var temp = 0;
            for (var j = 0; j < Data.length - 1; j++) {
                m[j] = Data[j + 1].y - Data[j].y
                //Aquí hago la resta de los minutos
                if(m[j] < 0){
                    //Si los minutos son negativos
                    h = Data[j + 1].x - 1 //Conversion de la hora para ver el tiempo transcurrido
                    temp = Data[j + 1].y + 60;
                    h = h - Data[j].x;
                    temp = temp - Data[j].y;
                    m[j] = h*60 + temp;

                }
            }
            //console.log(m)
        }
        for (var u = 0; u < m.length; u++){
            HSP = HSP + (m[u]*Data[u + 1].z)/60;
        }
        document.getElementById("demo").innerHTML = HSP+" w/m²";
        console.log(HSP)
        Data = [];
        HSP = 0;
    });
};
setInterval(function(){updateData()}, 1000);  
}
}
export default HPS;