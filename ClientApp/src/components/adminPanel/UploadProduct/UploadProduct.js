import React, { Component, Fragment } from 'react';
import './UploadProduct.scss';
import MenCategory from './Categories/MenCategory';


export default class UploadProduct extends Component {
   

    render() {
        return (

            <div className="upload-product-background">

             <MenCategory/>
     
            </div>
        );
    }
}
