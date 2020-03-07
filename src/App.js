import React, { Component } from 'react';
import ChartR from './ChartR';
import ChartV from './ChartV';
import HPS from './HPS';
import './App.css';
import HSPsemanal from './HSPsemanal';
import ChartVX from './ChartVX';

class App extends Component {

  render() {    
    return (
<div className="principal">
<nav className="navbar navbar-dark bg-dark">
  <a className="navbar-brand" href="#">Weather 🌤 </a>
  <div className="collapse navbar-collapse" id="navbarNavDropdown">
    <ul className="navbar-nav">
      <li className="nav-item active">
        <a className="nav-link" href="index.html">Home <span className="sr-only">(current)</span></a>
      </li>
      
    </ul>
  </div>
</nav>
<div className="Radiacion">
  <ChartR/>
</div>
<div className="Viento">
  <ChartV/>
</div>
<div className="HSPsemanal">
  <HSPsemanal/>
</div>
<div className="VX">
  <ChartVX/>
</div>


<div className="HSPH">
  <HPS/>
</div>


</div>


    );
  }
}

export default App;
