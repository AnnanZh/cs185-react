import React, { Component } from 'react';
import Home from './Home'
import Experience from './Experience'
import Images from './Images'
import Videos from './Videos'
import Guestbook from './Guestbook'
import Movies from './Movies'



export class Body extends Component{
	displayContent =() => {
		var activeTab = this.props.activeTab
		if(activeTab===1)
			return <Home/>
		else if (activeTab==2) 
			return <Experience/>
		else if (activeTab==3)
			return <Images/>
		else if (activeTab==4)
			return <Videos/>
		else if (activeTab==5)
			return <Guestbook/>
		else
			return <Movies/>
	}
    render(){

    return (this.displayContent());
      
    }

}


export default Body;