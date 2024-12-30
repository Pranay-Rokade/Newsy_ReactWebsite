import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';

export default class App extends Component {
  render() {
    return (
      <div>
        <Navbar/>
        <News/>
        Your API key is: 6ebcb9e24291453f93d4514d9bb348d2
      </div>
    )
  }
}
