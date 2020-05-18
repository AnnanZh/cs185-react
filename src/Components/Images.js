import React, { Component } from 'react';
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