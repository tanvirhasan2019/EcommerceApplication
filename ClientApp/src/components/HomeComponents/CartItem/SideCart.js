import React, { Component} from "react";
import styled from "styled-components";
import imgTemp from "../images-com/NewFolder/kids.jpg";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import "./CartHeader.scss";
import { connect } from 'react-redux';
import { cartUpdate } from '../../../actions/cartItem';
import { Link } from 'react-router-dom';

class SideCart extends Component {
    constructor(props) {
        super();
        this.state= {
            cartOpen: false,
            closeCart:true

        }
    }

    deleteItem = (id) => {

        console.log('DELETE BUTTON PRESSED' +id);
        var all_cart_data = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
        console.log('CART DATA before ' + JSON.stringify(all_cart_data));
        let unmatchCart = all_cart_data.filter(item => {
            return item.id != id
        })
        console.log('CART DATA after unmatch' + JSON.stringify(unmatchCart));
        localStorage.setItem('cart', JSON.stringify(unmatchCart));
        this.props.cartUpdate();

    }
    render() {
        let { CartData, allProducts, cartUpdate } = this.props;
        console.log('CART  DATA  FROM sidecart -- ' + JSON.stringify(CartData));
        let count = 0;
        let products = [];
        let Quantity = [];

        try {

            if (CartData.Count > 0) {
                count = CartData.Count;

               if(allProducts.isLoading === false && allProducts.isLoading !== undefined)    
               {
                   allProducts.data.map(item => CartData.List.some(item2 => {

                       if (item.id === item2.id && (item2.quantity>0)) {
                           products.push({

                               id: item2.id,
                               quantity: item2.quantity,
                               title: item.title, 
                               Img: item.img.img1,
                               price : item.price
                           })
                       }
                   }

                   ))
                   
                  
                   // let result = result1.filter(o1 => result2.some(o2 => o1.id === o2.id));
                  // products = allProducts.data.filter(item => CartData.List.some(item2 => item.id === item2.id)) 
                  // Quantity = CartData.List.filter(item => products.filter(item2 => item.id === item2.id))
                }

               

            }else
                 {
                  count = 0;
                 }
        }catch{
           
            cartUpdate();

        }


       // console.log("Filter Data from Quantity array -- " + JSON.stringify(products));
        return (

            
                    <CartWrapper show={this.props.cartOpen}>
                       
                        <ul>
                            {products.map((item, index) => {
                                return (
                                    <li key={item.id} className="cart-item mb-4">
                                        <img
                                            width="35"
                                            // src={`../${item.image}`}
                                            src={atob(item.Img)}
                                            alt="cart item image"
                                        />
                                        <div className="mt-3">
                                            <h6 className="text-uppercase"> {item.title} </h6>
                                            <h6 className="text-title text-capitalize">
                                                {item.quantity} x {item.price} = {item.quantity*item.price}
                                            </h6>
                                        </div>
                                        <div>
                                            <Button
                                                onClick={()=>this.deleteItem(item.id)}
                                                variant="contained"
                                                color="secondary"
                                                startIcon={<DeleteIcon />}
                                                >
                                                Remove
                                             </Button>
                                        </div>


                                    </li>
                                );
                            })}
                        </ul>
                        <h4 className="text-capitalize text-main">
                            cart total : {CartData.Cost } $
                        </h4>
                        <div className="text-center my-5 row">
                   
                            <ArrowForwardIosIcon className="sidecart-close" onClick={this.props.Show} />

                            <Link to="/cart-item" className="main-link">
                            cart page
                            </Link>
                       
                        </div>


                        
                       
                </CartWrapper>

                   
                );
   
     }
}
const CartWrapper = styled.div`
  position: fixed;
  top: 60px;
  right: 0;
  width: 100%;
  height: 100%;
  background: #fafafa;
  z-index: 11;
  transform: ${props => (props.show ? "translateX(0)" : "translateX(100%)")};
  border-left: 4px solid #5fb7ea;
  transition: all 0.3s ease-in-out;
  @media (min-width: 576px) {
    width: 20rem;
  }
  overflow: scroll;
  padding: 2rem;
  ul {
    padding: 0 !important;
  }
  .cart-item {
    list-style-type: none;
  }
`;


const mapStateToProps = (state) => ({

    CartData: state.cartUpdate.data,
    allProducts: state.products

});

const mapDispatchToProps = {
    cartUpdate
};

export default connect(mapStateToProps, mapDispatchToProps)(SideCart);
