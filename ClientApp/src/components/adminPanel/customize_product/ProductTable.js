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
import Slider from '../../Slider';
import Ringloader from '../../spinner/Ringloader';
import ItemList from './ItemList';
import TableList from './TableList';
import { connect } from 'react-redux';
import { useSelector } from 'react-redux';

import { useDispatch } from 'react-redux';
//import { fetchProducts } from '../../actions/Products';
import { fetchProducts } from '../../../actions/Products';

import '../UploadProduct/UploadProduct.scss'


const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
});

class ProductTable extends Component {

    render() {
        let { fetchProducts } = this.props;
        fetchProducts();

        //let { items } = this.props;
        var items=[]

        //const items = this.props;

        // const dispatch = useDispatch();
        //dispatch(fetchProducts())
        /*useEffect(() => {
            fetchProducts()
                .catch(error => {
                    console.log("Loading authors failed: " + error);
                });
        }, []) */

        // const productList = useSelector(state => state.products);

        // const items = []

        /* if (productList.isLoading === false && productList.isLoading !== undefined)
         {
             productList.data.map(item => {
                 items.push(item);
                 
             })
     
             //console.log('LIST OF PRODUCT IS  ' + JSON.stringify(productList))
         } */


        //console.log('LOADING ALL PRODUCT IS ' + loading);



        return (
            <div className="upload-product-background">

                <div className="d-flex justify-content-center header-txt-items">
                    CUSTOMIZE ITEMS
            </div>

                <div className="row" style={{ marginTop: '20px' }}>
                    <div class="container">
                        <TableList data={items} />
                    </div>



                </div>

            </div>
        );
    }
}


const mapStateToProps = (state) => ({

    //CartSize: state.cartUpdate.data
    items: state.products

});

const mapDispatchToProps = {
    fetchProducts
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductTable);

