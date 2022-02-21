import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state={
      name: "oldName",
      
    }
    this.changeName = this.changeName.bind(this);
    
  }

  changeName() {
    this.setState({name: "newName"}, ()=>{})
    console.log(123);
  };


  render() {
    return (
      <button onClick={ this.changeName }> { this.state.name } </button>
    );
  }
}


  
// function App(props) {
//   return (
//     <button>{ props.children }</button>
//   );
// }

export default App;
