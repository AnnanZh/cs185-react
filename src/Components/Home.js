import React, { Component } from 'react';
import me from '../images/me.jpeg'


export class Home extends Component{
  render(){
    return (
    	<div className="home">
			<h2>About Me</h2>
			<img src = {me} width="250" height="400"></img>
			<h2>Annan ZHANG 张安南</h2>
            <p2>Senior Computer Science Student at UC Santa Barbara</p2>
            <br></br>
            <p3>E-mail: annan_zhang AT ucsb.edu</p3>
            <br></br>
            <p3>Tel: (805) 689-3849</p3>
            <br></br>
            <p3>Address: 6750 El Colegio Road, Apt 302</p3>
    	</div>
    	);
  }

}


export default Home;