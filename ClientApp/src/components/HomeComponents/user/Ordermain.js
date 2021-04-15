import React, { Component, Fragment } from 'react';

import Layout from '../../Layout';
import { NavMenu } from '../../NavMenu'

import Orderlist from './Orderlist'



export default class Ordermain extends Component {


    

    render() {
        return (
            <div>
                <NavMenu />
                <div className="container" style={{marginTop:'50px'}}>
                    <Orderlist />
                </div>
            </div>
        );
    }
}

