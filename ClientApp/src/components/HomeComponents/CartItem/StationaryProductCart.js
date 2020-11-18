import React, { Component, Fragment } from 'react';
import demoImg from '../images-com/NewFolder/rice.jpg';

import DeleteIcon from '@material-ui/icons/Delete';

import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';

import './CustomizeProduct.scss';



class StationaryProductCart extends Component {
    render() {

        return (
            <Fragment>

                <div className="row product-back">

                    <div className="col-md-3">
                        <img src={demoImg} className="rounded float-left cart-image" alt="..." />
                    </div>
                    <div className="col-md-6 d-flex flex-column justify-content-around">


                        <div style={{ fontSize: '1rem' }}>
                            Product title
                        </div>
                        <div style={{ fontSize: '.8rem' }}>
                            Size : small<br />
                            Color : Black
                        </div>
                        <div style={{ fontSize: '.8rem' }}>
                            Price : 200 BDT
                        </div>

                    </div>

                    <div className="col-md-3 d-flex flex-column justify-content-around">


                        <TextField
                            label="Kg"
                            id="outlined-start-adornment"
                            
                            InputProps={{
                                startAdornment: <InputAdornment position="start"></InputAdornment>,
                            }}
                            variant="outlined"
                        />

                        <Button
                            variant="contained"
                            color="secondary"
                            startIcon={<DeleteIcon />}
                        >
                            Delete
                         </Button>

                    </div>

                </div>




            </Fragment>
        );
    }
}
export default StationaryProductCart
