import React, { Component } from 'react'
import spinner from './spinner.gif'

export class Spinner extends Component {
  render() {
    return (
      <div className="text-center">
        <img src={spinner} alt="Loading" />
      </div>
    )
  }
}

export default Spinner
