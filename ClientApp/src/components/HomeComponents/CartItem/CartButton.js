import React, { Component, Fragment } from 'react';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import './CustomizeProduct.scss';
import SideCart from '../CartItem/SideCart';
import styled from "styled-components";


export default class CartButton extends Component {

    constructor(props) {
        super(props);
        this.state = { ShowSideCart:false };
    }

    Show = () => {

        console.log("---- show Button called");
        this.setState({
            ShowSideCart: !this.state.ShowSideCart
        })


    }
   
    render() {
       
       
      // console.log("SIDE CART " + this.state.ShowSideCart);
       

        return (
            <> 

                {
                    this.state.ShowSideCart ? <SideCart cartOpen={this.state.ShowSideCart} Show={this.Show} /> :

                        (
                            <div className="cart_button_reminder" onClick={this.Show}>
                                <div className="top">

                                    <div className="button_image">
                                        <ShoppingBasketIcon className="crt-icon" />
                                    </div>
                                    <h2>5  ITEMS </h2>

                                </div>
                                <div className="bottom">
                                    <h2 className="bottom-price"> 100 $  </h2>
                                </div>
                            </div>
                        )
                }

          
            </>
          
        );
    }
}


