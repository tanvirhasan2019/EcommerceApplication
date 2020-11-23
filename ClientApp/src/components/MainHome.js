import React, { Component, Fragment } from 'react';
import Tabs from './HomeComponents/ScrollableTabsButtonForce';


import './HomeComponents/Home.scss';
//import { fetchProducts } from '../actions/Products';
import { connect } from 'react-redux';
import { fetchProducts } from '../actions/Products';

class MainHome extends Component {

    componentDidMount = () => {
        const { fetchProducts, Data } = this.props;
        fetchProducts();
        console.log("DATA " + Data);
    };

    render() {
        const { fetchProducts } = this.props;
        return (
            <Fragment>
                <Tabs />
            </Fragment>
               );
    }
}
const mapStateToProps = (state) => ({

    Data: state.products.data

});


const mapDispatchToProps = {
    fetchProducts
};

export default connect(mapStateToProps, mapDispatchToProps)(MainHome);
