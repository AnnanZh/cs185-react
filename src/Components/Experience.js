import React, { Component } from 'react';
import patent from '../images/patent.jpeg'

export class Experience extends Component{
  render(){
    return (
    	<div className="experience">
			<h2>Software Intern</h2>
			<img src = {patent} width="250" height="400"></img>
      <br></br>
			<p>I am always looking for chances to put what I have learned into practice. 
          During the summer of my freshman year, I joined Shanghai STEP Robotics Co., 
          Ltd, a leading robotics public company in China, as a software intern. There, 
          I received training and participated in the design of a control system. 
          The biggest challenge to me was to design an algorithm based on Matrix deformation 
          in Linear Algebra that simulated the rotating trajectory of the six-axis cables. 
          By combining the Mathematics that I learned with my C++ programming skills, 
          I successfully completed the design of several control units, including all the 
          corner cases for the robot. What made me especially proud is that our Simulation 
          Control System Device obtained a National Utility Model Patent in China.
          (the photo above is the Patent)    
      </p>
    	</div>
    	);
  }

}



export default Experience;