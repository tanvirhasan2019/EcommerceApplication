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
//import ItemList from './ItemList';
import TableList from './TableList';
import { connect } from 'react-redux';
import { useSelector } from 'react-redux';
import authService from '../../api-authorization/AuthorizeService'
import { useDispatch } from 'react-redux';
//import { fetchProducts } from '../../actions/Products';
//import { fetchProducts } from '../../../actions/Products';

import '../UploadProduct/UploadProduct.scss'


const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
});

export default class PostTable extends Component {

constructor(props) {
 super(props);
 
 this.state = { Post: [], loading : true };
}

async componentDidMount() {

        try {

            const token = await authService.getAccessToken()
           // console.log('Token', token)
            const response = await fetch('Post/AdminGetAllpost', {
                headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            this.setState({ Post: data.data })
            this.setState({loading:false})

            console.log('after fetch post ', { data })
            console.log('after fetch state ', this.state.Post)

        } catch (e) {
            console.log('ERROR CALLED')
        }

    }

 //async componentDidMount(){

  
   // <TableList data={items} />
//}


    render() {
      

     
       

        return (
            <div className="upload-product-background">

                <div className="d-flex justify-content-center header-txt-items">
                    ALL POST
            </div>

                <div className="row" style={{ marginTop: '20px' }}>
                    <div class="container">
                       {
                          !this.state.loading ? <TableList data={this.state.Post} /> : null
                       } 
                    </div>



                </div>

            </div>
        );
    }
}




