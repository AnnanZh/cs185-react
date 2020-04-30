import React, { Component } from 'react';
import csgo from '../videos/csgo.mp4'

export class Videos extends Component{
  render(){

    return (
    	<div className="vid">
    		<video width="640" height="360" src={csgo} controls="controls"/>
        <h2>Game Name: CS:GO</h2>
        <p><a href="https://store.steampowered.com/app/730/CounterStrike_Global_Offensive/">Game Website</a> Free to Play</p>
    	</div>
    	);
  }

}


export default Videos;