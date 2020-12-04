import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Planets from './components/planets';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <Planets uri="http://localhost:3001/staticPlanets"/>
      {/* Add reuseable planet component with new URI here: */}
      <hr />
        <Planets uri="http://localhost:3001/starTrekPlanets"/>
    </div>
  );
}

export default App;
