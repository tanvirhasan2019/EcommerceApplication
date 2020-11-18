import React, { Component, Fragment } from 'react';
import CustomNav from './adminPanel/CustomNav';

export default class CustomLayout extends Component {
   // static displayName = Layout.name;

    render() {
        return (
            <Fragment>
                <CustomNav />
                <div className="container-fluid">
                    {this.props.children}
                </div>

            </Fragment>


        );
    }
}
