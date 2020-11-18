import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import BreadCumbCart from './IconBreadcrumbs'; 
import Fab from '@material-ui/core/Fab';
import PaymentIcon from '@material-ui/icons/Payment';
import GentsProductCart from './GentsProductCart';
import StationaryProductCart from './StationaryProductCart';
import Layout from '../../Layout';

import './CartHeader.scss';
 class CartItems extends Component {
    render() {
        return (
            <Layout>

               <div className="row cart-header">
                  <div className="col-md-6 d-flex flex-column">
                    <p className="text-header">Your Cart</p>
                    <p className="text-sub-header d-flex justify-content-start align-items-end">Products</p>
                  </div>
                  <div className="col-md-6 d-flex justify-content-end">
                    <BreadCumbCart style={{ color: 'white', marginRight:'10px' }} />
                   </div>
                </div>

                <div className="row">
                    <div className="col-md-8">
                        <GentsProductCart />
                        <StationaryProductCart />

                        <button type="button" className="btn btn-primary btn-lg btn-block">
                            Update Cart
                        </button>
                    </div>

                    <div className="col-md-4"
                        style={{ width: '100%', height:'200px' }}>

                        <div className="d-flex flex-column justify-content-center align-items-center" style={{
                            width: '100%', height: '100%', backgroundColor: 'white',
                            marginTop: '10px', boxShadow:'3px 3px 3px 3px rgba(225, 218, 218, 0.64)'
                        }}>
                            <p className="Total-price-text" style={{ fontSize: '2rem' }}>Total 200.0 BDT </p>


                          

                            <Link to="/checkout" > <Fab variant="extended" color="primary" aria-label="add"
                                style={{width:'100%'}}
                            >
                                  <PaymentIcon /> 
                                Proceed to Checkout
                             </Fab>

                           </Link>

                        </div>
                    </div>

                </div>



                
            </Layout>
        );
    }
}
export default CartItems
