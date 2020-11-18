import React, { useState } from 'react';
import image1 from '../HomeComponents/images-com/img1.jpg';
import image2 from '../HomeComponents/images-com/img2.jpg';
import image3 from '../HomeComponents/images-com/img3.jpg';
import image4 from '../HomeComponents/images-com/img4.jpg';
import image5 from '../HomeComponents/images-com/img5.jpg';
import Carousel from 'react-bootstrap/Carousel';

export default function ControlledCarousel() {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    return (
        <Carousel activeIndex={index} interval={3000} onSelect={handleSelect}>
            <Carousel.Item style={{ width: '100%', height: '70vh' }}>
                <img
                    className="d-block w-100"
                    src={image1}
                    alt="First slide"
                />
                <Carousel.Caption>
                    <h3 style={{ lineHeight: '200%', fontSize: '2rem', color: 'white' }}>First slide label</h3>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item style={{ width: '100%', height: '70vh' }}>
                <img
                    className="d-block w-100"
                    src={image2}
                    alt="Second slide"
                />

                <Carousel.Caption>
                    <h3 style={{ lineHeight: '200%', fontSize: '2rem', color: 'white' }}>Second slide label</h3>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item style={{ width: '100%', height: '70vh' }}>
                <img
                    className="d-block w-100"
                    src={image3}
                    alt="Third slide"
                />

                <Carousel.Caption>
                    <h3 style={{ lineHeight: '200%', fontSize: '2rem', color: 'white' }}>Third slide label</h3>
                   
                </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item style={{ width: '100%', height: '70vh' }}>
                <img
                    className="d-block w-100"
                    src={image4}
                    alt="Third slide"
                />

                <Carousel.Caption>
                    <h3 style={{ lineHeight: '200%', fontSize: '2rem', color: 'white' }}>Forth slide label</h3>
                   
                </Carousel.Caption>
            </Carousel.Item>


            <Carousel.Item style={{ width: '100%', height: '70vh' }}>
                <img
                    className="d-block w-100"
                    src={image5}
                    alt="Third slide"
                />

                <Carousel.Caption>
                    <h3 style={{ lineHeight: '200%', fontSize: '2rem', color:'white' }}>Fifth slide label</h3>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}
