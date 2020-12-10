import React, { Component, Fragment } from 'react';
import { NavMenu } from './NavMenu';
import './HomeComponents/Layout.css';

import { connect } from 'react-redux';
import { cartUpdate } from '../actions/cartItem';

 class Layout extends Component {
  static displayName = Layout.name;

     render() {
         let { cartLen, cartUpdate } = this.props;
         console.log('LAYOUT -- ' + cartLen);
         cartUpdate();
      return (
          <Fragment>
              <NavMenu cartSize={cartLen} />
              <div className="container-fluid layout" style={{ marginTop:'60px' }}>
               {this.props.children}
             </div>
            
          </Fragment>

     
    );
  }
}

const mapStateToProps = (state) => ({

    cartLen: state.cartUpdate.cartLen

});

const mapDispatchToProps = {
    cartUpdate
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);