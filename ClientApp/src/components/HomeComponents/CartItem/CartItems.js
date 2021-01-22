import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import BreadCumbCart from './IconBreadcrumbs'; 
import Fab from '@material-ui/core/Fab';
import PaymentIcon from '@material-ui/icons/Payment';
import GentsProductCart from './GentsProductCart';
import ProductlistinCart from './ProductlistinCart';
import Layout from '../../Layout';
import { connect } from 'react-redux';

import './CartHeader.scss';

 class CartItems extends Component {
     render() {
         let { CartData } = this.props;
         let cost;
         try {

               if (CartData.Count > 0) {
                   cost = CartData.Cost;

                }
               else{
                   cost = 0;
                }
         } catch{
             cost = 0;

              } 

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
                    <div className="col-md-8 col-sm">
                       
                        <ProductlistinCart />           
                    </div>

                    <div className="col-md-4 col-sm"
                        style={{ width: '100%', height: '200px', position: 'fixed', right:'8px' }}>

                        <div className="d-flex flex-column justify-content-center align-items-center" style={{
                            width: '100%', height: '100%', backgroundColor: 'white',
                            marginTop: '10px', boxShadow:'3px 3px 3px 3px rgba(225, 218, 218, 0.64)'
                        }}>
                            <p className="Total-price-text" style={{ fontSize: '2rem' }}>Total {cost} Taka</p>

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


const mapStateToProps = (state) => ({

    CartData: state.cartUpdate.data,
   

});

const mapDispatchToProps = {
    
};

export default connect(mapStateToProps, mapDispatchToProps)(CartItems);