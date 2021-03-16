﻿import React, { Component, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
//import Slider from '../../Slider';
//import Ringloader from '../../spinner/Ringloader';
//import ItemList from './ItemList';
//import TableList from './TableList';
import { connect } from 'react-redux';
import { useSelector } from 'react-redux';

import { useDispatch } from 'react-redux';
//import { fetchProducts } from '../../actions/Products';

import { orders } from '../../../../actions/Orders';


const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
});

class OrderItem extends Component {


    componentDidMount() {

        this.props.orders();

    }


    render() {


        let { items } = this.props;
        


        return (
            <div className="upload-product-background">

                <div className="d-flex justify-content-center header-txt-items">
                    CUSTOMIZE ITEMS
            </div>

                <div className="row" style={{ marginTop: '20px' }}>
                    <div class="container">
                       
                    </div>



                </div>

            </div>
        );
    }
}


const mapStateToProps = (state) => ({

    items: state.orders

});

const mapDispatchToProps = {
    orders
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderItem);

