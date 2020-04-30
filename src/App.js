import React, { Component } from 'react';
import './App.css'
import Body from './Components/Body'
import TabList from './Components/TabList'

export class App extends Component{
  constructor(){
    super();
    this.state ={
      activeTab: 1
    }
    this.changeTab = (id) => {
      this.setState({
        activeTab: id
      })
    }
  }
  render(){
    const tabs = [
    {
      id:1,
      title: 'Home'
    },

    {
      id:2,
      title: 'Experience'
    },

    {
      id:3,
      title: 'Images'
    },

    {
      id:4,
      title: 'Videos'
    }

    ]

    return(

      <div className= "body">
        <h1>Welcome to Annan ZHANG's Homepage</h1>
        <hr></hr>
        <div className ="nav-bar"> 
          <TabList tabs={tabs} 
          changeTab={this.changeTab}
          activeTab={this.state.activeTab} />
        </div>
        <div className ="main-body">
          <Body activeTab={this.state.activeTab}/>
        </div>
      </div>
      );
  }
}

export default App;