

import React, { useState, useCallback } from "react";
import { render } from "react-dom";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import { Router, Laptop, Desktop, Toner, Accessories , Security} from "./ShopPhotos";
import { NavMenu } from '../NavMenu';
import MapImage from '../../images/Location.png'
import ButtonAppBar from './ButtonAppBar'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Footer from './FooterLayout';


export default function Brands() {

    const [currentImageRouter, setCurrentImageRouter] = useState(0);
    const [viewerIsOpenRouter, setViewerIsOpenRouter] = useState(false);

    const [currentImageLaptop, setCurrentImageLaptop] = useState(0);
    const [viewerIsOpenLaptop, setViewerIsOpenLaptop] = useState(false);

    const [currentImageSecurity, setCurrentImageSecurity] = useState(0);
    const [viewerIsOpenSecurity, setViewerIsOpenSecurity] = useState(false);


    const [currentImageDesktop, setCurrentImageDesktop] = useState(0);
    const [viewerIsOpenDesktop, setViewerIsOpenDesktop] = useState(false);

    const [currentImageToner, setCurrentImageToner] = useState(0);
    const [viewerIsOpenToner, setViewerIsOpenToner] = useState(false);

    const [currentImageAccessories, setCurrentImageAccessories] = useState(0);
    const [viewerIsOpenAccessories, setViewerIsOpenAccessories] = useState(false);


  // const [currentImage, setCurrentImage] = useState(0);
  // const [viewerIsOpen, setViewerIsOpen] = useState(false);

   /* const openLightbox = useCallback((event, { photo, index }) => {
        setCurrentImage(index);
        setViewerIsOpen(true);
    }, []);

    const closeLightbox = () => {
        setCurrentImage(0);
        setViewerIsOpen(false);
    }; */


   const openLightboxLaptop = useCallback((event, { photo, index }) => {
        setCurrentImageLaptop(index);
        setViewerIsOpenLaptop(true);
    }, []);

    const closeLightboxLaptop = () => {
        setCurrentImageLaptop(0);
        setViewerIsOpenLaptop(false);
    };



const openLightboxDesktop = useCallback((event, { photo, index }) => {
        setCurrentImageDesktop(index);
        setViewerIsOpenDesktop(true);
    }, []);

    const closeLightboxDesktop = () => {

        setCurrentImageDesktop(0);
        setViewerIsOpenDesktop(false);
    };



const openLightboxRouter = useCallback((event, { photo, index }) => {
        setCurrentImageRouter(index);
        setViewerIsOpenRouter(true);
    }, []);

    const closeLightboxRouter = () => {
        setCurrentImageRouter(0);
        setViewerIsOpenRouter(false);
    };


 const openLightboxToner = useCallback((event, { photo, index }) => {
        setCurrentImageToner(index);
        setViewerIsOpenToner(true);
    }, []);

    const closeLightboxToner = () => {
        setCurrentImageToner(0);
        setViewerIsOpenToner(false);
    };


 const openLightboxAccessories = useCallback((event, { photo, index }) => {
        setCurrentImageAccessories(index);
        setViewerIsOpenAccessories(true);
    }, []);

    const closeLightboxAccessories = () => {
        setCurrentImageAccessories(0);
        setViewerIsOpenAccessories(false);

    };

    const openLightboxSecurity = useCallback((event, { photo, index }) => {
        setCurrentImageSecurity(index);
        setViewerIsOpenSecurity(true);
    }, []);

    const closeLightboxSecurity = () => {
        setCurrentImageSecurity(0);
        setViewerIsOpenSecurity(false);
    }; 



    return (
        <div>
            <ButtonAppBar />
           <div className="container">
            <div style={{margin:'0px'}} className="row">

                 <Button className="col-12" variant="contained" color="secondary">
                         LAPTOP
                 </Button>
            </div>
            <Gallery photos={Laptop} onClick={openLightboxLaptop} />
            <ModalGateway>
                {viewerIsOpenLaptop ? (
                    <Modal onClose={closeLightboxLaptop}>
                        <Carousel
                            currentIndex={currentImageLaptop}
                            views={Laptop.map(x => ({
                                ...x,
                                srcset: x.srcSet,
                                caption: x.title
                            }))}
                        />
                    </Modal>
                ) : null}
            </ModalGateway>



              

                  

                <div style={{ margin: '0px' }} className="row">

                    <Button className="col-12" variant="contained" color="secondary">
                        DESKTOP
                    </Button>

                </div>
                <Gallery photos={Desktop} onClick={openLightboxDesktop} />
                <ModalGateway>
                    {viewerIsOpenDesktop ? (
                        <Modal onClose={closeLightboxDesktop}>
                            <Carousel
                                currentIndex={currentImageDesktop}
                                views={Desktop.map(x => ({
                                    ...x,
                                    srcset: x.srcSet,
                                    caption: x.title
                                }))}
                            />
                        </Modal>
                    ) : null}
                </ModalGateway>



                <div style={{ margin: '0px' }} className="row">

                    <Button className="col-12" variant="contained" color="secondary">
                        TONER
                    </Button>

                </div>
                <Gallery photos={Toner} onClick={openLightboxToner} />
                <ModalGateway>
                    {viewerIsOpenToner ? (
                        <Modal onClose={closeLightboxToner}>
                            <Carousel
                                currentIndex={currentImageToner}
                                views={Toner.map(x => ({
                                    ...x,
                                    srcset: x.srcSet,
                                    caption: x.title
                                }))}
                            />
                        </Modal>
                    ) : null}
                </ModalGateway>



                <div style={{ margin: '0px' }} className="row">

                    <Button className="col-12" variant="contained" color="secondary">
                        NETWORKING
                    </Button>

                </div>
                <Gallery photos={Router} onClick={openLightboxRouter} />
                <ModalGateway>
                    {viewerIsOpenRouter ? (
                        <Modal onClose={closeLightboxRouter}>
                            <Carousel
                                currentIndex={currentImageRouter}
                                views={Router.map(x => ({
                                    ...x,
                                    srcset: x.srcSet,
                                    caption: x.title
                                }))}
                            />
                        </Modal>
                    ) : null}
                </ModalGateway>




                <div style={{ margin: '0px' }} className="row">

                    <Button className="col-12" variant="contained" color="secondary">
                        ACCESSORIES
                    </Button>

                </div>
                <Gallery photos={Accessories} onClick={openLightboxAccessories} />
                <ModalGateway>
                    {viewerIsOpenAccessories ? (
                        <Modal onClose={closeLightboxAccessories}>
                            <Carousel
                                currentIndex={currentImageAccessories}
                                views={Accessories.map(x => ({
                                    ...x,
                                    srcset: x.srcSet,
                                    caption: x.title
                                }))}
                            />
                        </Modal>
                    ) : null}
                </ModalGateway>



                <div style={{ margin: '0px' }} className="row">

                    <Button className="col-12" variant="contained" color="secondary">
                        SECURITY
                    </Button>

                </div>
                <Gallery photos={Security} onClick={openLightboxSecurity} />
                <ModalGateway>
                    {viewerIsOpenSecurity ? (
                        <Modal onClose={closeLightboxSecurity}>
                            <Carousel
                                currentIndex={currentImageSecurity}
                                views={Security.map(x => ({
                                    ...x,
                                    srcset: x.srcSet,
                                    caption: x.title
                                }))}
                            />
                        </Modal>
                    ) : null}
                </ModalGateway>


           </div>
            <Footer/>
       </div>



    );
}


