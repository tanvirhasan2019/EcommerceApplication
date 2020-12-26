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
    render() {
        let { CartData, allProducts, cartUpdate } = this.props;
       // console.log('CART  DATA  FROM CartButtn -- ' + JSON.stringify(CartData));
        let count = 0;
        let products = [];

        try {

            if (CartData.Count > 0) {
                count = CartData.Count;

               if(allProducts.isLoading === false && allProducts.isLoading !== undefined)    
               {
                  // let result = result1.filter(o1 => result2.some(o2 => o1.id === o2.id));
                  products = allProducts.data.filter(item => CartData.List.some(item2=>item.id === item2.id))   
               }
            }else
                 {
                  count = 0;
                 }
        }catch{
           
            cartUpdate();

        }
       // console.log("Filter Data from list to cart -- " + JSON.stringify(products));
                return (
                    <CartWrapper show={this.props.cartOpen}>
                        <ul>
                            {products.map(item => {
                                return (
                                    <li key={item.id} className="cart-item mb-4">
                                        <img
                                            width="35"
                                            // src={`../${item.image}`}
                                            src={atob(item.img[0].img1)}
                                            alt="cart item image"
                                        />
                                        <div className="mt-3">
                                            <h6 className="text-uppercase"> { item.title} </h6>
                                            <h6 className="text-title text-capitalize">
                                                Quan : {count}
                                            </h6>
                                        </div>
                                        <div>
                                            <Button
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
                            cart total : $200
                        </h4>
                        <div className="text-center my-5">
                            <Link to="/cart" className="main-link">
                                cart page
                            </Link>
                        </div>


                        <ArrowForwardIosIcon className="sidecart-close" onClick={this.props.Show} />
                       
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
  z-index: 2;
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
