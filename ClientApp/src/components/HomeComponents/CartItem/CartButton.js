import React, { Component, Fragment } from 'react';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import './CustomizeProduct.scss';
import SideCart from '../CartItem/SideCart';
import { cartUpdate } from '../../../actions/cartItem';
import { connect } from 'react-redux';


class CartButton extends Component {

    constructor(props) {
        super(props);
        this.state = { ShowSideCart:false };
    }

    Show = () => {

      
        this.setState({
            ShowSideCart: !this.state.ShowSideCart
        })


    }
   
    render() {
       

        let { CartData, cartUpdate } = this.props;
        console.log('CART  DATA  FROM CartButtn -- ' + JSON.stringify(CartData));
        let count=0;
        let totalPrice = 0;


        try {
            if (CartData.Count > 0) {
                count = CartData.Count;
                totalPrice = CartData.Cost;
            } else {
                count = 0;
            }
        } catch{
            //count = 0;
           // console.log("Layout Catch called");
            cartUpdate();

        }

        return (
            <> 

                {
                    count>0 ? 
                    
                    this.state.ShowSideCart ? <SideCart cartOpen={this.state.ShowSideCart} Show={this.Show} /> :

                        (
                            <div className="cart_button_reminder" onClick={this.Show}>
                                <div className="top">

                                    <div className="button_image">
                                        <ShoppingBasketIcon className="crt-icon" />
                                    </div>
                                    <h2>{count} items</h2>

                                </div>
                                <div className="bottom">
                                        <h2 className="bottom-price"> {totalPrice} </h2>
                                </div>
                            </div>
                        ) :null
                }

          
            </>
          
        );
    }
}

const mapStateToProps = (state) => ({

    CartData: state.cartUpdate.data

});
const mapDispatchToProps = {
    cartUpdate
};

export default connect(mapStateToProps, mapDispatchToProps)(CartButton);

