import React, { Component, Fragment } from 'react';
import { NavMenu } from './NavMenu';
import './HomeComponents/Layout.css';

import { connect } from 'react-redux';
import { cartUpdate } from '../actions/cartItem';

 class Layout extends Component {
  static displayName = Layout.name;

     render() {
         let { CartSize, cartUpdate } = this.props;
         console.log('CART  DATA  FROM LAYOUT -- ' + JSON.stringify(CartSize));
         let count;

         

         try {
             if (CartSize.Count > 0) {
                 count = CartSize.Count;
             } else {
                 count = 0;
             }
         } catch{
             //count = 0;
             console.log("Layout Catch called");
            cartUpdate();

         }
         //cartUpdate();
      return (
          <Fragment>
              <NavMenu cartSize={count} />
              <div className="container-fluid layout" style={{ marginTop:'60px' }}>
               {this.props.children}
             </div>
            
          </Fragment>

     
    );
  }
}

const mapStateToProps = (state) => ({

    CartSize: state.cartUpdate.data

});

const mapDispatchToProps = {
    cartUpdate
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);