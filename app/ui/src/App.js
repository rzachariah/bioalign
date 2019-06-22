import React from 'react';
import logo from './logo.svg';
import './App.css';
import FormContainer from './containers/FormContainer';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Find protein matching a DNA strand
        </p>
      </header>
      <div className="col-md-6">
        <h4> Make an alignment request </h4>
        <FormContainer />
      </div>
    </div>
  );
}

export default App;
