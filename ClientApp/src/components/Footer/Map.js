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
import { Shop } from "./ShopPhotos";
import { NavMenu } from '../NavMenu';
import MapImage from '../../images/Location.png'
import ButtonAppBar from './ButtonAppBar'
import Footer from './FooterLayout';

export default function Map() {
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
                <a style={{margin:'0px', padding:'0px'}} href="https://www.google.com/maps/place/New+Market,+%E0%A6%B6%E0%A6%B9%E0%A7%80%E0%A6%A6+%E0%A6%AE%E0%A7%81%E0%A6%A8%E0%A7%8D%E0%A6%B8%E0%A7%80+%E0%A6%95%E0%A6%AC%E0%A6%BF%E0%A6%B0+%E0%A6%89%E0%A6%A6%E0%A7%8D%E0%A6%A6%E0%A6%BF%E0%A6%A8+%E0%A6%B0%E0%A7%8B%E0%A6%A1,+Comilla/@23.4612637,91.180797,17.25z/data=!4m13!1m7!3m6!1s0x37547f2f884b0427:0xb57dddb03ae72907!2zTmV3IE1hcmtldCwg4Ka24Ka54KeA4KamIOCmruCngeCmqOCnjeCmuOCngCDgppXgpqzgpr_gprAg4KaJ4Kam4KeN4Kam4Ka_4KaoIOCmsOCni-CmoSwgQ29taWxsYQ!3b1!8m2!3d23.4612066!4d91.1816158!3m4!1s0x37547f2f884b0427:0xb57dddb03ae72907!8m2!3d23.4612066!4d91.1816158">
                      <img src={MapImage} className="img-fluid" alt="shop location"/> 
                 </a>
             </div>
            <Gallery photos={Shop} onClick={openLightbox} />
            <ModalGateway>
                {viewerIsOpen ? (
                    <Modal onClose={closeLightbox}>
                        <Carousel
                            currentIndex={currentImage}
                            views={Shop.map(x => ({
                                ...x,
                                srcset: x.srcSet,
                                caption: x.title
                            }))}
                        />
                    </Modal>
                ) : null}
            </ModalGateway>

            <Footer />
        </div>
    );
}


