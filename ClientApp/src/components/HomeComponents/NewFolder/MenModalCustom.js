import React, { Component, Fragment } from 'react';
import './MenModalCustom';
import img2 from '../images-com/img2.jpg';
import RadioButtonGrp from '../NewFolder/RadioButtonGrp';
import RadioColor from '../NewFolder/RadioButtonColor';
import { InputNumber } from 'antd';
import { toaster } from 'evergreen-ui';

import NavigationIcon from '@material-ui/icons/Navigation';
import Fab from '@material-ui/core/Fab';

export default class MenModalCustom extends Component {
  

    render() {
        return (
            <div className="container"
                style={{
                    width: '100%', backgroundColor: 'white', height: '80vh',
                    margin: '0px', padding:'0px'
                }}>

                <div className="row" style={{ margin: '0px', padding: '0px', height:'100%' }}>

                    <div className="col-md-2 d-flex flex-column justify-content-around">

                        <img src={img2} alt="IMAGE 1" className="img-thumbnail all-img"/>
                        <img src={img2} alt="IMAGE 2" className="img-thumbnail all-img"/>
                        <img src={img2} alt="IMAGE 3" className="img-thumbnail all-img"/>
                        <img src={img2} alt="IMAGE 4" className="img-thumbnail all-img"/>
                        <img src={img2} alt="IMAGE 5" className="img-thumbnail all-img" />

                    </div>

                    <div className="col-md-6 d-flex justify-content-around">
                        <img src={img2} alt="MAIN IMAGE" className="img-thumbnail selected-img" />
                    </div>

                    <div className="col-md-4 d-flex flex-column justify-content-around">

                        <div className="price-text">PRICE : 200.0 BDT</div>

                        <div className="row flex-row justify-content-start">
                            <div className="align-self-center" style={{ marginRight:'10px' }}>SIZE </div>
                            <RadioButtonGrp className="align-self-center" />
                        </div>

                        <div className="row flex-row justify-content-start">
                            <div className="align-self-center" >COLOR </div>
                            <RadioColor className="align-self-center" />
                        </div>

                        <div className="row flex-row justify-content-start">
                            <div className="align-self-center" style={{ marginRight: '10px' }} >QUANTITY </div>
                            <InputNumber size="large" min={1} max={10} defaultValue={1} onChange={onChange} style={{ marginRight: '10px' }} />

                            <Fab variant="extended" color="primary" aria-label="add" style={{ border:'none' }}>
                                <NavigationIcon className="ShoppingCart" onClick={() =>
                                    toaster.success(
                                        'Item Added to Cart',
                                        {
                                            duration: 5
                                        }
                                    )
                                }

                                />
                                ADD TO CART
                            </Fab>
                        </div>

                        <div className="price-text">PRODUCT INFO </div>

                        <div className="justify-content-start">

                            <div className="row" style={{ fontSize: '1rem' }}>
                                TITLE
                            </div>
                            <div className="row" style={{ fontSize: '.9rem', marginTop:'10px' }}>
                                card title 
                            </div>
                            <div className="row" style={{ fontSize: '1rem', marginTop:'20px' }}>
                                DESCRIPTION
                            </div>
                            <div className="row" style={{ fontSize: '.9rem', marginTop: '10px' }}>
                            This card has supporting text below as a natural lead-in to additional content.
                            </div>

                            
                        </div>
                    </div>

                </div>
            </div>
                      
        );
    }
}

function onChange(value) {
    console.log('changed', value);
}
