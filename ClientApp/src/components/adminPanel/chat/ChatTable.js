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
import SimpleBackdrop from '../../spinner/SimpleBackdrop';
import Alert from '@material-ui/lab/Alert';


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
 
 this.state = { Chat: [], loading : true , status: ' '};
}

async componentDidMount() {

        try {

            const token = await authService.getAccessToken()
            const response = await fetch('Chat/AllChatMessages', {
                headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            if (data.data) {
                this.setState({ Chat: data.data })
            }
            this.setState({status:data.status})
            this.setState({loading:false})

            console.log('after fetch Chat List ', { data })
           

        } catch (e) {
            console.log('ERROR CALLED')
        }

    }

 


    render() {
      

     
       

        return (
            <div className="upload-product-background">

                <div className="d-flex justify-content-center header-txt-items">
                    ALL CHAT
            </div>
                {
                    this.state.loading ? <SimpleBackdrop /> : null
                } 
                <div className="row" style={{ marginTop: '20px' }}>
                    
                    <div class="container">
                       
                        {
                            this.state.loading == false && this.state.Chat.length != 0 ?
                                <TableList data={this.state.Chat} /> : 'No Data '
                        }

                        {
                            this.state.loading == false && this.state.Chat.length == 0 ?
                                <Alert variant="filled" severity="warning">
                                    {this.state.status}!</Alert> : null
                                
                        }

                    </div>


                </div>

            </div>
        );
    }
}


/*
  {
     !this.state.loading ? <TableList data={this.state.Chat} /> : null
  } 
*/
