import React, { Component, Fragment } from 'react';
import './Checkout.scss';
import HorizontalLabelPositionBelowStepper from './HorizontalLabelPositionBelowStepper';

class Payment extends Component {
    render() {
        return (

            <Fragment style={{width:'100%', height:'100vh'}}>

                <div className="check-backgrnd">
                    <HorizontalLabelPositionBelowStepper />
                </div>

            </Fragment>
        );
    }
}
export default Payment
