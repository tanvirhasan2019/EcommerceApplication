import React, { Component, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Alert from '@material-ui/lab/Alert';
//import Slider from '../../Slider';
//import Ringloader from '../../spinner/Ringloader';
//import ItemList from './ItemList';
//import TableList from './TableList';
import { connect } from 'react-redux';
import { useSelector } from 'react-redux';

import { useDispatch } from 'react-redux';
//import { fetchProducts } from '../../actions/Products';
import TableList  from './TableList';

import { orders } from '../../../../actions/Orders';

import SimpleBackdrop from '../../../spinner/SimpleBackdrop';


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
        console.log('REDUCER ITEMS')
        console.log({ items })
        let data_found = 0
       /* if (items.isLoading == false) {
            if (items.data.statusCode == 200) {
                data_found = 1 
            }
        } */

        try {
            if (items.isLoading == false) {
                if (items.data.clientorder.length > 0) {
                    data_found = 1
                }
            }
        }catch (error){
            data_found = 0
        }
       
        
        
       

        return (
            <div className="upload-product-background">

                <div className="d-flex justify-content-center header-txt-items">
                    ORDERED ITEMS
            </div>
                {
                    items.isLoading == true ? <SimpleBackdrop /> : null
                }
                <div className="row" style={{ marginTop: '20px' }}>
                    <div className="container-fluid">
                        {
                            items.isLoading == false && data_found == 1 ?
                                <TableList data={items.data.clientorder} /> : null
                        }

                        {
                            items.isLoading == false && data_found == 0 ?
                                <Alert variant="filled" severity="warning">
                                    {items.data.status}!</Alert> : null
                                
                        }
                       
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

/* {
   items.isLoading == false ? <TableList data={items.data.clientorder} /> : <SimpleBackdrop />     
} 

 {
                            items.isLoading == false && data_found == 1 ?
                                <TableList data={items.data.clientorder} /> : 'No Data : '
                        }

                        {
                            items.isLoading == false && data_found == 0 ?
                                items.data.status : null
                        }
 */