import React, { Component } from 'react';
import i00 from '../images/00.jpeg'
import i01 from '../images/01.jpeg'
import i02 from '../images/02.jpeg'
import i03 from '../images/03.jpeg'
import i04 from '../images/04.jpeg'
import i05 from '../images/05.jpeg'
import i06 from '../images/06.jpeg'
import i07 from '../images/07.jpeg'
import { SRLWrapper } from 'simple-react-lightbox';

function ImageComponent(){
    return (
    	<div className="ImageComponent">
            <SRLWrapper>
                <img src={i00} height = "200px" width="320px"></img>
                <img src={i01} height = "200px" width="320px"></img>
                <img src={i02} height = "200px" width="320px"></img>
                <img src={i03} height = "200px" width="320px"></img>
                <img src={i04} height = "200px" width="320px"></img>
                <img src={i05} height = "200px" width="320px"></img>
                <img src={i06} height = "200px" width="320px"></img>
                <img src={i07} height = "200px" width="320px"></img>
            </SRLWrapper>
    	</div>
    );
  }

export default ImageComponent;