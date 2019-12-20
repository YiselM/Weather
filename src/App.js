import React, { Component } from 'react';
import Chart from './Area Chart';
import './App.css';

class App extends Component {
  render() {    
    return (
<div>
<nav className="navbar navbar-dark bg-dark">
  <a className="navbar-brand" href="#">Weather 611 🌤 </a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNavDropdown">
    <ul className="navbar-nav">
      <li className="nav-item active">
        <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
      </li>
      
    </ul>
  </div>
</nav>
<div className="Radiacion">
  <Chart/>
</div>
</div>


    );
  }
}

export default App;
