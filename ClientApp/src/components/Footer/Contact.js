

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

export default function Contact() {


    return (
        <div>
            <ButtonAppBar />
            <div className="container d-flex justify-content-center">
                <div className="profile-card">
                    <div className="profile-card__header">
                        
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


