import React, { useState, useCallback } from "react";
import { render } from "react-dom";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import { photos } from "./ShopPhotos";
import { NavMenu } from '../NavMenu';
import MapImage from '../../images/Location.png'
import ButtonAppBar from './ButtonAppBar'
import UserCards from './UserCards'
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';


export default function AboutUS() {
    const [currentImage, setCurrentImage] = useState(0);
    const [viewerIsOpen, setViewerIsOpen] = useState(false);

    const openLightbox = useCallback((event, { photo, index }) => {
        setCurrentImage(index);
        setViewerIsOpen(true);
    }, []);

    const closeLightbox = () => {
        setCurrentImage(0);
        setViewerIsOpen(false);
    };

    return (
        <div>
            <ButtonAppBar />
            <div className="container-fluid">
                <div className="col-12">
                    <UserCards />
                 </div>

                  <div className="col-12">
                      <Paper style={{padding:'20px'}} variant="outlined">
                          
                          <Typography  variant="h6" gutterBottom>
	                          About Star Tech
			              </Typography>

                          <Typography   variant="body1" gutterBottom>
	                          Star Tech has been founded on 1 March 2007. From then to now, Star Tech has won the heart of many people and now is a country-wide renowned brand. That has been possible due to the hard work Star Tech has done to satisfy its customers. Having the aim to satisfy customers, providing customers with their required products, and being true to their motto, “Customers Come First,” has brought Star Tech to the top of the E-Commerce Site and also is one of the largest Computer and Technology product retailers. Star Tech has over 300 employees and is growing more and more, working diligently to fulfill the Main Criteria of Star Tech’s Motto or Vision. Star Tech is located in 4 central territories, Dhaka, Gazipur, Chattogram, Khulna, and Rangpur, and has 13 outlets from where you can get your desired tech products. There are nine outlets in Dhaka alone because Dhaka is the capital city, 
                              there is one outlet in Gazipur, one outlet in Chattogram, one outlet in Khulna, and the final outlet is in Rangpur.
			              </Typography>

                          <Typography style={{marginTop:'30px'}} variant="h6" gutterBottom>
	                        The Main Goal and Aim
			              </Typography>

                          <Typography   variant="body1" gutterBottom>
	                                We are Star Tech, and we are here to help you with all your technology needs. We aim to provide all the requirements of our customers and help them satisfy their needs, wants, and desires. We delight in seeing our customers happy and satisfied with our resiliency in providing them with their products. Our complete focus is on the customers. We keep tabs and records on what our customers want, and we try our level best to bring that for them. We are already providing our customers with the delivery system so that they can order online and receive their products from their area. They do not have to travel long distances to get their desired product.

			              </Typography>

                          <Typography style={{marginTop:'30px'}} variant="h6" gutterBottom>
	                        
			              </Typography>

                          <Typography   variant="body1" gutterBottom>
	                         
			              </Typography>

                       </Paper>
                     
                 </div>
            </div>

        </div>
    );
}


