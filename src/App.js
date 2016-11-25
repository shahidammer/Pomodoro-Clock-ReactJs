import React, { Component } from 'react';
import './App.css';
import PodomoroClock from './components/PodomoroClock';

class App extends Component {
  render() {
    return (
      <div className="App">
        <PodomoroClock />
      </div>
    );
  }
}

export default App;
