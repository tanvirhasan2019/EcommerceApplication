

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


export default function Brands() {
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
           <div className="container">
            <div style={{margin:'0px'}} className="row">

                 <Button className="col-12" variant="contained" color="secondary">
                         ASUS
                 </Button>
            </div>
            <Gallery photos={Asus} onClick={openLightbox} />
            <ModalGateway>
                {viewerIsOpen ? (
                    <Modal onClose={closeLightbox}>
                        <Carousel
                            currentIndex={currentImage}
                            views={Asus.map(x => ({
                                ...x,
                                srcset: x.srcSet,
                                caption: x.title
                            }))}
                        />
                    </Modal>
                ) : null}
            </ModalGateway>



               <div style={{margin:'0px'}} className="row">

                     <Button className="col-12" variant="contained" color="secondary">
                           LENOVO
                    </Button>
                        
                    </div>
                    <Gallery photos={Asus} onClick={openLightbox} />
                    <ModalGateway>
                        {viewerIsOpen ? (
                            <Modal onClose={closeLightbox}>
                                <Carousel
                                    currentIndex={currentImage}
                                    views={Asus.map(x => ({
                                        ...x,
                                        srcset: x.srcSet,
                                        caption: x.title
                                    }))}
                                />
                            </Modal>
                        ) : null}
                    </ModalGateway>



                    <div style={{margin:'0px'}} className="row">

                     <Button  className="col-12" variant="contained" color="secondary">
                           TONER
                    </Button>
                        
                    </div>
                    <Gallery photos={Asus} onClick={openLightbox} />
                    <ModalGateway>
                        {viewerIsOpen ? (
                            <Modal onClose={closeLightbox}>
                                <Carousel
                                    currentIndex={currentImage}
                                    views={Asus.map(x => ({
                                        ...x,
                                        srcset: x.srcSet,
                                        caption: x.title
                                    }))}
                                />
                            </Modal>
                        ) : null}
                    </ModalGateway>
           </div>

       </div>



    );
}


