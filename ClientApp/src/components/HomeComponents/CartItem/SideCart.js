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

       
        
        var productStore = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

                return (
                    <CartWrapper show={this.props.cartOpen}>
                        <ul>
                            {productStore.map(item => {
                                return (
                                    <li key={item.id} className="cart-item mb-4">
                                        <img
                                            width="35"
                                            // src={`../${item.image}`}
                                            src={imgTemp}
                                            alt="cart item image"
                                        />
                                        <div className="mt-3">
                                            <h6 className="text-uppercase"> title </h6>
                                            <h6 className="text-title text-capitalize">
                                                Quan : {item.quantity}
                                            </h6>
                                        </div>
                                        <div>
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                startIcon={<DeleteIcon />}
                                                >
                                                Delete
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

    cartLen: state.cartUpdate.cartLen

});

const mapDispatchToProps = {
    cartUpdate
};

export default connect(mapStateToProps, mapDispatchToProps)(SideCart);
