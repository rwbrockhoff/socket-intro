import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client'

class App extends Component {
  constructor(){
    super()
    this.state = {
      messages: [],
      input: ''
    }
    this.socket = io('localhost:3001', function(data){
      console.log('d', data)
    });
    
    
  }

  componentDidMount(){
    this.socket.on('newinput', data => {
      this.setState({messages: [data, ...this.state.messages]})
    })
  }

  try = (e) => {
    let newMessage = this.state.input
    this.socket.emit('join', `${this.state.input}`)
  }
  


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Socket.io</h1>
        </header>
        <p className="App-intro">
          <input type='text' onChange={(e)=>this.setState({input: e.target.value})}/>
          <button onClick={this.try}>submit</button>
          <p>{this.state.messages}</p>
        </p>
      </div>
    );
  }
}

export default App;
