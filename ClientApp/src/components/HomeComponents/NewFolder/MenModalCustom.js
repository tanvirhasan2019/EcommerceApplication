import React, { Component, Fragment } from 'react';
import './MenModalCustom';
import img2 from '../images-com/img2.jpg';
import { InputNumber } from 'antd';
import { toaster } from 'evergreen-ui';

import NavigationIcon from '@material-ui/icons/Navigation';
import Fab from '@material-ui/core/Fab';
import { SideBySideMagnifier,MOUSE_ACTIVATION,TOUCH_ACTIVATION} from "react-image-magnifiers";

export default class MenModalCustom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedImage:''
        }

    }

    SelectImage = (url) => {
        this.setState(
            {
                selectedImage : url
            }, () => {
                console.log("URL SELECTED " + this.state.selectedImage);
            }
        )
    }

    render() {

        // let { selectedImage } = this.props.value.img[0].img1;
        //let selectedImage = " ";
        //let { selectedImage } = this.state;
        let img1 = '', img2 = '', img3 = '', img4 = '', img5='';
        let Noimg = require('../images-com/img1.jpg');

        if (this.props.value.img !== null) {


            if (this.props.value.img[0].img1 !== undefined) {
                img1 = atob(this.props.value.img[0].img1);
            }


            if (this.props.value.img[0].img2 !== undefined) {
                img2 = atob(this.props.value.img[0].img2);
            }

            if (this.props.value.img[0].img3 !== undefined) {
                img3 = atob(this.props.value.img[0].img3);
            }

            if (this.props.value.img[0].img4 !== undefined) {
                img4 = atob(this.props.value.img[0].img4);
            }

            if (this.props.value.img[0].img5 !== undefined) {
                img5 = atob(this.props.value.img[0].img5);
            }

           

          

        } else {
            //selectedImage = require('../images-com/img1.jpg');
        }
        //console.log("COPY URL IMG " + selectedImage)
        return (
            <div className="container"
                style={{
                    width: '100%', backgroundColor: 'white', height: 'auto',
                    margin: '0px', padding:'0px'
                }}>

                <div className="row" style={{ margin: '0px', padding: '0px', height: 'auto'}}>
                   
                    <div className="col-md-2 d-flex flex-column justify-content-around" style={{ height: '80vh'}} >

                        <img onClick={this.SelectImage.bind(this, img1)} src={img1 || Noimg} alt="NO IMAGE" className="img-thumbnail all-img" style={{height:'20%'}} />
                        <img onClick={this.SelectImage.bind(this, img2)} src={img2 || Noimg} alt="NO IMAGE" className="img-thumbnail all-img" style={{ height: '20%' }} />
                        <img onClick={this.SelectImage.bind(this, img3)} src={img3 || Noimg} alt="NO IMAGE" className="img-thumbnail all-img" style={{ height: '20%' }}/>
                        <img onClick={this.SelectImage.bind(this, img4)} src={img4 || Noimg} alt="NO IMAGE" className="img-thumbnail all-img" style={{ height: '20%' }}/>
                        <img onClick={this.SelectImage.bind(this, img5)} src={img5 || Noimg} alt="NO IMAGE" className="img-thumbnail all-img" style={{ height: '20%' }}/>

                    </div>
                   
                    <div className="col-md-6 d-flex justify-content-around selected-img">
                        <SideBySideMagnifier style={{ width: '100%' }}
                            imageSrc={this.state.selectedImage || img1 || Noimg}
                            imageAlt="NO IMAGE"
                           
                           
                        />
                        
                    </div>

                    <div className="col-md-4 d-flex flex-column justify-content-around">

                        <div className="price-text">PRICE : 200.0 BDT</div>

                        <div className="row flex-row justify-content-start">
                            <div className="align-self-center" style={{ marginRight: '10px' }} >QUANTITY </div>
                            <InputNumber size="large" min={1} max={10} defaultValue={1} onChange={onChange} style={{ marginRight: '10px' }} />

                            <Fab variant="extended" color="primary" aria-label="add" style={{ border: 'none' }}>
                                <NavigationIcon  className="ShoppingCart" onClick={() =>
                                    toaster.success(
                                        
                                        'Item Added to Cart',
                                        {
                                            duration: 5
                                        }
                                    )
                                }

                                />
                                ADD TO CART
                            </Fab>
                        </div>

                        <div>
                            <div className="price-text">PRODUCT INFO </div>
                            <div className="justify-content-start">
                             <div className="row" style={{ fontSize: '1rem' }}>
                                    {this.props.value.title}
                                </div>
                              <div className="row" style={{ fontSize: '.9rem', marginTop: '10px' }}>
                                    {this.props.value.description}
                               </div>


                         </div>
                        </div>
                      
                    </div>

                </div>
            </div>
                      
        );
    }
}

function onChange(value) {
    console.log('changed', value);
}
