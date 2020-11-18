import React, { Component, Fragment } from 'react';
import { NavMenu } from './NavMenu';
import './HomeComponents/Layout.css';

export default class Layout extends Component {
  static displayName = Layout.name;

  render () {
      return (
          <Fragment>
              <NavMenu />
              <div className="container-fluid layout">
               {this.props.children}
             </div>
            
          </Fragment>

     
    );
  }
}
