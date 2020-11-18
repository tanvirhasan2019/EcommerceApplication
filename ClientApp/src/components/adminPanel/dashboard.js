import React, { Component, Fragment } from 'react';
import './dashboard.css';
import VerticalTabs from '../adminPanel/VerticalTabs';

import CustomLayout from '../../components/CustomLayout';
export class dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = { select:'NewProduct' };
    }

    render() {
        return (
            <CustomLayout>   
                <VerticalTabs/>
            </CustomLayout>
        );
    }
}
