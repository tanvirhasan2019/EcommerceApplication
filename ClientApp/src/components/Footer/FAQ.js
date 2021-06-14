//import React from "react";
//import ReactDOM from "react-dom";
//import MapExample from "./MapExample";


/*export default function Map () {
    return (
        <>
            <NavMenu />
            <div className="container">
                <MapExample />
            </div>
        </>
        )

} */

import React, { useState, useCallback } from "react";
import { render } from "react-dom";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import { photos } from "./ShopPhotos";
import { NavMenu } from '../NavMenu';
import MapImage from '../../images/Location.png'
import ButtonAppBar from './ButtonAppBar'

export default function FAQ() {
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
            <div className="row">
                <img src={MapImage} className="img-fluid" alt="shop location" />
            </div>
            <Gallery photos={photos} onClick={openLightbox} />
            <ModalGateway>
                {viewerIsOpen ? (
                    <Modal onClose={closeLightbox}>
                        <Carousel
                            currentIndex={currentImage}
                            views={photos.map(x => ({
                                ...x,
                                srcset: x.srcSet,
                                caption: x.title
                            }))}
                        />
                    </Modal>
                ) : null}
            </ModalGateway>
        </div>
    );
}


