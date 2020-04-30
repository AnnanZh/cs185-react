import React, { Component } from 'react';
import BackToTop from "react-back-to-top-button";
import Popup from "reactjs-popup";
import SimpleReactLightbox from "simple-react-lightbox";
import ImageComponent from './ImageComponents';

export class Images extends Component{
  render(){

    return (
    	<div className="gallary">
			<SimpleReactLightbox>
				<ImageComponent />
			</SimpleReactLightbox>
    	</div>
    	);
  }
}


export default Images;