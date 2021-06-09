import React, { Component, Fragment } from 'react';
import './MenModalCustom.scss';
import img2 from '../images-com/img2.jpg';
import { notification } from 'antd';

import  EmptyImage  from '../../../images/Empty.png';

import NavigationIcon from '@material-ui/icons/Navigation';
import Fab from '@material-ui/core/Fab';
import { SideBySideMagnifier, GlassMagnifier, TOUCH_ACTIVATION } from "react-image-magnifiers";

import addToCart from '../NewFolder/cartItemStore';

import IncButton from './IncDecButton';
import { connect } from 'react-redux';
import { cartUpdate } from '../../../actions/cartItem';
import Typography from '@material-ui/core/Typography';


 class MenModalCustom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedImage: '',
            windowWidth: window.innerWidth,
            count:1
        }

    }

    handleResize = (e) => {
        this.setState({ windowWidth: window.innerWidth });
    };

    componentDidMount() {
        window.addEventListener("resize", this.handleResize);
    }

    componentWillUnmount() {
        window.addEventListener("resize", this.handleResize);
    } 

    SelectImage = (url) => {
        this.setState(
            {
                selectedImage: url
            }, () => {
               // console.log("URL SELECTED " + this.state.selectedImage);
            }
        )
    }

    cartCall = () => {

        let img = '';
        if (this.props.value.img !== null) {
            img = atob(this.props.value.img.img1);
        }
        addToCart(this.props.value.id, this.state.count, this.props.value.title, img, this.props.value.price);
        this.props.cartUpdate();


    }

    increase = () => {
      
        this.setState({ count: this.state.count + 1 })      
       
    }

    decrease = () => {
       
      
        if (this.state.count > 1) {    
            this.setState({ count: this.state.count - 1 })
        } else {
            let titleN = this.props.value.title;
            notification['warning']({
                message: ' ' + titleN,
                description:
                    'PLEASE CHOOSE VALID NUMBER',
                placement: 'bottomRight',
                duration:2,
               
               
                });
            }

        }

    
     

    render() {

       
      
        let img1 = '', img2 = '', img3 = '', img4 = '', img5 = '';
        //let Noimg = require('../images-com/img1.jpg');
        
        if (this.props.value.img !== null) {


            if (this.props.value.img.img1 !== undefined) {
                img1 = atob(this.props.value.img.img1);
            }


            if (this.props.value.img.img2 !== undefined) {
                img2 = atob(this.props.value.img.img2);
            }

            if (this.props.value.img.img3 !== undefined) {
                img3 = atob(this.props.value.img.img3);
            }

            if (this.props.value.img.img4 !== undefined) {
                img4 = atob(this.props.value.img.img4);
            }

            if (this.props.value.img.img5 !== undefined) {
                img5 = atob(this.props.value.img.img5);
            }





        } else {
            //selectedImage = require('../images-com/img1.jpg');
        }
        //console.log("COPY URL IMG " + selectedImage)
        return (
            <div className="container"
                style={{
                    width: '100%', backgroundColor: 'white', height: 'auto',
                    margin: '0px', padding: '0px'
                }}>

                <div className="row" style={{ margin: '0px', padding: '0px', height: 'auto' }}>

                    <div className="col-md-2 col-sm-2 d-flex flex-column justify-content-around" style={{ height: '80vh' }} >

                        <img onClick={this.SelectImage.bind(this, img1)} src={img1 || EmptyImage} alt="NO IMAGE" className="img-thumbnail" style={{ height:'20%' }} />
                        <img onClick={this.SelectImage.bind(this, img2)} src={img2 || EmptyImage} alt="NO IMAGE" className="img-thumbnail" style={{ height: '20%' }}  />
                        <img onClick={this.SelectImage.bind(this, img3)} src={img3 || EmptyImage} alt="NO IMAGE" className="img-thumbnail" style={{ height: '20%' }} />
                        <img onClick={this.SelectImage.bind(this, img4)} src={img4 || EmptyImage} alt="NO IMAGE" className="img-thumbnail" style={{ height: '20%' }}  />
                        <img onClick={this.SelectImage.bind(this, img5)} src={img5 || EmptyImage} alt="NO IMAGE" className="img-thumbnail" style={{ height: '20%' }} />

                    </div>

                    <div className="col-md-6 col-sm-10 d-flex justify-content-around selected-img">


                        {
                            (window.innerWidth <= 768) ? <GlassMagnifier
                                imageSrc={this.state.selectedImage || img1 || EmptyImage} style={{ width: '100%'}}
                                imageAlt="SOMETHING WENT WRONG"
                                magnifierSize="25%"

                            /> : <SideBySideMagnifier style={{ width: '100%'}}
                                    imageSrc={this.state.selectedImage || img1 || EmptyImage}
                                    imageAlt="NO IMAGE"
                                    magnifierSize="5%"
                               

                                />
                        }
                       
                    </div>

                    <div className="col-md-4 d-flex flex-column justify-content-around">

                        
                        <Typography className="price-text" variant="h5" gutterBottom>
                            PRICE &nbsp;{this.props.value.price} /-BDT
                        </Typography>

                        <div className="row flex-row justify-content-center align-items-md-center">
                            <div style={{ margin: 'auto'}}>
                                <IncButton style={{height:'48px'}} increase={this.increase} decrease={this.decrease} onChange={this.state.count}
                                    />
                            </div>
                            <div style={{ margin: '20px' }}>
                                <Fab style={{ height: '30px' }} onClick={this.cartCall} classname="add-to-cart-button" variant="extended" color="primary" aria-label="add" style={{ border: 'none' }}>
                                
                                <NavigationIcon
                                />
                                ADD TO CART
                            </Fab>
                            </div>
                        </div>

                        <div>
                           
                            <Typography className="price-text" style={{ borderBottom: '3px solid black' }} variant="h5" gutterBottom>
                                PRODUCT INFO
                            </Typography>
                            <div className="justify-content-start">
                                <div className="row" style={{ fontSize: '1rem' }}>
                                    
                                    <Typography style={{color:'green'}} variant="h6" gutterBottom>
                                        {this.props.value.title}
                                    </Typography>
                                </div>
                                <div className="row" style={{ fontSize: '.9rem', marginTop: '10px' , whiteSpace: 'pre-wrap' }}>
                                    
                                    
                                        
                                <Typography style={{ whiteSpace: 'pre-wrap' }} variant="body1" gutterBottom>
                                     {this.props.value.description}
                                 </Typography>
                                    
                                     
                                </div>


                            </div>
                        </div>

                    </div>

                </div>
            </div>

        );
    }
}


const mapStateToProps = (state) => ({


});
const mapDispatchToProps = {
    cartUpdate
};

export default connect(mapStateToProps, mapDispatchToProps)(MenModalCustom);

function onChange(value) {
    console.log('changed', value);
}

//{this.props.value.description}
