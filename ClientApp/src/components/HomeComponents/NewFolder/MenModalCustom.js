import React, { Component, Fragment } from 'react';
import './MenModalCustom.scss';
import img2 from '../images-com/img2.jpg';
import { notification } from 'antd';
import { toaster } from 'evergreen-ui';

import NavigationIcon from '@material-ui/icons/Navigation';
import Fab from '@material-ui/core/Fab';
import { SideBySideMagnifier, GlassMagnifier, TOUCH_ACTIVATION } from "react-image-magnifiers";

import addToCart from '../NewFolder/cartItemStore';

import IncButton from './IncDecButton';
import { connect } from 'react-redux';
import { cartUpdate } from '../../../actions/cartItem';

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
            img = atob(this.props.value.img[0].img1);
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
                    margin: '0px', padding: '0px'
                }}>

                <div className="row" style={{ margin: '0px', padding: '0px', height: 'auto' }}>

                    <div className="col-md-2 col-sm-2 d-flex flex-column justify-content-around" style={{ height: '80vh' }} >

                        <img onClick={this.SelectImage.bind(this, img1)} src={img1 || Noimg} alt="NO IMAGE" className="img-thumbnail" style={{ height:'20%' }} />
                        <img onClick={this.SelectImage.bind(this, img2)} src={img2 || Noimg} alt="NO IMAGE" className="img-thumbnail" style={{ height: '20%' }}  />
                        <img onClick={this.SelectImage.bind(this, img3)} src={img3 || Noimg} alt="NO IMAGE" className="img-thumbnail" style={{ height: '20%' }} />
                        <img onClick={this.SelectImage.bind(this, img4)} src={img4 || Noimg} alt="NO IMAGE" className="img-thumbnail" style={{ height: '20%' }}  />
                        <img onClick={this.SelectImage.bind(this, img5)} src={img5 || Noimg} alt="NO IMAGE" className="img-thumbnail" style={{ height: '20%' }} />

                    </div>

                    <div className="col-md-6 col-sm-10 d-flex justify-content-around selected-img">


                        {
                            (window.innerWidth <= 768) ? <GlassMagnifier
                                imageSrc={this.state.selectedImage || img1 || Noimg} style={{ width: '100%'}}
                                imageAlt="SOMETHING WENT WRONG"
                                magnifierSize="25%"

                            /> : <SideBySideMagnifier style={{ width: '100%'}}
                                imageSrc={this.state.selectedImage || img1 || Noimg}
                                imageAlt="NO IMAGE"
                               

                                />
                        }
                       
                    </div>

                    <div className="col-md-4 d-flex flex-column justify-content-around">

                        <div className="price-text">PRICE {this.props.value.price} /-BDT</div>

                        <div className="row flex-row justify-content-center">
                            <div style={{ margin: '20px', height:'48px' }}>
                                <IncButton style={{height:'48px'}} increase={this.increase} decrease={this.decrease} onChange={this.state.count}
                                    />
                            </div>
                            <div style={{ margin: '20px' }}>
                            <Fab  onClick={this.cartCall} classname="add-to-cart-button" variant="extended" color="primary" aria-label="add" style={{ border: 'none' }}>
                                
                                <NavigationIcon
                                />
                                ADD TO CART
                            </Fab>
                            </div>
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


const mapStateToProps = (state) => ({


});
const mapDispatchToProps = {
    cartUpdate
};

export default connect(mapStateToProps, mapDispatchToProps)(MenModalCustom);

function onChange(value) {
    console.log('changed', value);
}