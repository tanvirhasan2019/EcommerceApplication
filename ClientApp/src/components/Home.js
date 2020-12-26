import React, { Component, Fragment } from 'react';

import ControlledCarousel from './HomeComponents/ControlledCarousel';
import Tabs from './HomeComponents/ScrollableTabsButtonForce';
import PaginationExampleCompact from './HomeComponents/PaginationExampleCompact';
import FooterLayout from './FooterLayout';
import Layout from './Layout';

import CartButton from './HomeComponents/CartItem/CartButton';

import './HomeComponents/Home.scss';


export class Home extends Component {
 
    render() {

        localStorage.removeItem('cart');

        return (
            <Layout>
             
              
              <div className="row carousel-div">
                    <div className="col-12">
                        <ControlledCarousel/>
                    </div>
               
              </div>


           

              <div className="row">
                  <div className="col-12 tab-content">
                      <Tabs />
                  </div>
              </div>

                
                <CartButton />
                
              
              <div className="row">
                  <PaginationExampleCompact />
              </div>

              <div className="row">
                  <FooterLayout />
                </div>
            </Layout>
        
    );
  }
}




