﻿import React, { Component, Fragment } from 'react';
import '.././MenItems.scss'
import img3 from '../images-com/NewFolder/ladies.jpg';
import ModelMenProduct from './ModalMenProduct';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import RadioButtonGrp from '../NewFolder/RadioButtonGrp';
import RadioColor from '../NewFolder/RadioButtonColor';



class LadiesItem extends Component {

    render() {
        let titleImage = " ";
        if (this.props.value.img !== null) {
            titleImage = atob(this.props.value.img[0].img1);
        } else {
            titleImage = require('../images-com/NewFolder/ladies.jpg');
        }
        return (
            <div className="col-sm-6 col-md-4 card-items">
                <div className="card shadow mb-5 bg-white rounded">
                    <img className="card-img-top" src={titleImage} alt="Card image cap" />
                    <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
                    </div>

                    <div className="card-footer">
                        <p className="price-text">BDT: 200</p>
                    </div>


                    <div className="card-footer">
                        <div className="row d-flex justify-content-around">
                            <div className="size-text align-items-center">SIZE</div>
                            <RadioButtonGrp className="align-items-center" />
                        </div>
                    </div>

                    <div className="card-footer">
                        <div className="d-flex justify-content-around">
                            <div className="align-self-center color-text">COLOR</div>
                            <RadioColor className="align-self-center" />
                        </div>
                    </div>

                    <div className="card-footer" style={{ margin: '0px', padding: '0px' }}>

                        <button type="button" class="cart-btn"><span><i><ShoppingCartIcon style={{ textAlign: 'center', marginRight: '10px' }} /></i></span>ADD TO CART</button>

                    </div>

                    <div className="card-footer" style={{ margin: '0px', padding: '0px' }}>

                        <ModelMenProduct className="view-btn" />
                    </div>


                </div>
            </div>
        );
    }
} export default LadiesItem
