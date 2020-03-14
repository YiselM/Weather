import React, { Component } from 'react';
import ChartR from './ChartR';
import ChartV from './ChartV';
import HPS from './HPS';
import Table from './Table';
import './App.css';
import HSPsemanal from './HSPsemanal';
import ChartVX from './ChartVX';

class App extends Component {
  render() {
    return (
      <div className="principal">
        <nav className="navbar navbar-dark bg-dark">
          <a className="navbar-brand" href="index.html">🌤 Boletines Diarios UniGRID</a>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              

            </ul>
          </div>
        </nav>
        <div className="Centrado">
          
            <div className="Tabla1">
            <Table />
            </div>
          <div className="Tabla2">
            <HPS />
          </div>
          
          <div className="Cuadro">
            <ChartR />
          </div>
          <div className="Cuadro">
            <ChartV />
          </div>
          <div className="Cuadro">
            <HSPsemanal />
          </div>
          <div className="Cuadro">
            <ChartVX />
          </div>

        </div>
      </div>
    );
  }
}
export default App;
