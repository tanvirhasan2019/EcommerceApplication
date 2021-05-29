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
import SimpleBackdrop from '../../spinner/SimpleBackdrop';

import '../UploadProduct/UploadProduct.scss'


const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
});

export default class UserTable extends Component {

constructor(props) {
 super(props);
 
 this.state = { Users: [], loading : true , status: ''};
}

async componentDidMount() {

        try {

            const token = await authService.getAccessToken()
           // console.log('Token', token)
            const response = await fetch('Admin/GetAllUser', {
                headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            if (data.data) {
                this.setState({ Users: data.data })
            }
           // this.setState({ Users: data.data })
            this.setState({status:data.status})
            this.setState({loading:false})

            console.log('after fetch UserList ', { data })
            console.log('after fetch state ', this.state.Users)

        } catch (e) {
            console.log('ERROR CALLED')
        }

    }



    render() {
      

     
       

        return (
            <div className="upload-product-background">

                <div className="d-flex justify-content-center header-txt-items">
                    ALL USERS
            </div>

                {
                    this.state.loading ? <SimpleBackdrop /> : null
                } 

                <div className="row" style={{ marginTop: '20px' }}>
                   
                     <div class="container">
                        
                        {
                            this.state.loading == false && this.state.Users.length != 0 ?
                                <TableList data={this.state.Users} /> : 'No Data : '
                        }

                        {
                            this.state.loading == false && this.state.Users.length == 0 ?
                                this.state.status : null
                        }
                     </div> 

                </div>

            </div>
        );
    }
}


/* {
    !this.state.loading ? <TableList data={this.state.Users} /> : null
   }

 */

