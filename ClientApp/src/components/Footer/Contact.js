

import React, { useState, useCallback } from "react";
import { render } from "react-dom";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import { photos , Asus } from "./ShopPhotos";
import { NavMenu } from '../NavMenu';
import MapImage from '../../images/Location.png'
import ButtonAppBar from './ButtonAppBar'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './contact.css'
import Footer from './FooterLayout';


export default function Contact() {


    return (
        <div>
            <ButtonAppBar />
            <div className="container d-flex justify-content-center">
                <div className="profile-card">
                    <div className="profile-card__header">
                        
                        <h2 style={{color:'white'}} className="contact_h2">tanshen technology</h2>
                        <p style={{ color: 'white' }} className="contact_p">5th floor , New market comilla 3500</p>
                        <p style={{ color: 'white' }} className="contact_p">Phone- 01xxxxxxxxx</p>
                        <p style={{ color: 'white' }} className="contact_p">Phone- 01xxxxxxxxx</p>
                        <p style={{ color: 'white' }} className="contact_p">Email- tanshenit@gmail.com</p>
                        <div className="profile-card__header__link-social">
                            <a  href="" className="fa fa-facebook"></a>
                            <a  href="#" className="fa fa-instagram"></a>
                            <a  href="https://www.google.com/maps/place/New+Market,+%E0%A6%B6%E0%A6%B9%E0%A7%80%E0%A6%A6+%E0%A6%AE%E0%A7%81%E0%A6%A8%E0%A7%8D%E0%A6%B8%E0%A7%80+%E0%A6%95%E0%A6%AC%E0%A6%BF%E0%A6%B0+%E0%A6%89%E0%A6%A6%E0%A7%8D%E0%A6%A6%E0%A6%BF%E0%A6%A8+%E0%A6%B0%E0%A7%8B%E0%A6%A1,+Comilla/@23.4612637,91.180797,17.25z/data=!4m13!1m7!3m6!1s0x37547f2f884b0427:0xb57dddb03ae72907!2zTmV3IE1hcmtldCwg4Ka24Ka54KeA4KamIOCmruCngeCmqOCnjeCmuOCngCDgppXgpqzgpr_gprAg4KaJ4Kam4KeN4Kam4Ka_4KaoIOCmsOCni-CmoSwgQ29taWxsYQ!3b1!8m2!3d23.4612066!4d91.1816158!3m4!1s0x37547f2f884b0427:0xb57dddb03ae72907!8m2!3d23.4612066!4d91.1816158" className="fa fa-map-marker"></a>
                            <a  href="#" className="fa fa-youtube"></a>
                        </div>

                        <a  className="btn">We provide good service</a>
                    </div>

                    <div className="profile-card__footer">
                        <div className="profile-card__footer__item">
                            <p className="contact_p"><span></span>open 24 x 7 hours</p>
                        </div>
                        <div className="profile-card__footer__item">
                            <p className="contact_p"><span></span>open 24 x 7 hours</p>
                        </div>
                        <div className="profile-card__footer__item">
                            <p className="contact_p"><span></span>open 24 x 7 hours</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>



    );

   /* return (
        <div>
            <ButtonAppBar />
            <div className="container d-flex justify-content-center">
                   <div className="profile-card">
                      <div className="profile-card__header">
                        <div className="profile-card__header__pic">
                          <img src="./img/pic.png" alt="" />
                        </div>
                        <h2>John Doe</h2>
                        <p>Developer & Designer</p>
                        <div className="profile-card__header__link-social">
                          <a href="#" className="fab fa-facebook-f"></a>
                          <a href="#" className="fab fa-twitter"></a>
                          <a href="#" className="fab fa-github"></a>
                          <a href="#" className="fab fa-youtube"></a>
                        </div>

                        <a href="#" className="btn">Contact Me</a>
                      </div>

                      <div className="profile-card__footer">
                        <div className="profile-card__footer__item">
                          <p><span>120</span>Posts</p>
                        </div>
                        <div className="profile-card__footer__item">
                          <p><span>127</span>Following</p>
                        </div>
                        <div className="profile-card__footer__item">
                          <p><span>120k</span>Followers</p>
                        </div>
                      </div>
                   </div>
           </div>

       </div>



    ); */
}


