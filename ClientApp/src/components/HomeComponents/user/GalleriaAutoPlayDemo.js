import React, { Component } from 'react';
import { Image } from 'antd';

//import 'primereact/resources/themes/saga-blue/theme.css';
//import 'primereact/resources/primereact.min.css';
//import 'primeicons/primeicons.css';
//import { PhotoService } from '../service/PhotoService';
import { Galleria } from 'primereact/galleria';

const url = "data:image/jpeg;base64,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"


 /* var images = [
    {
        itemImageSrc : url ,
        thumbnailImageSrc : url ,
        alt: "Description for Image 1",
        title: "Title 1"
    },
    {
        itemImageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq9VIvY8t3XOPidSQkOF7j9ofHNWx3wdHpgSlnI7gh-MDnfZNNR8WeAqZ0KMQsIE4oDh8&usqp=CAU",
        thumbnailImageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq9VIvY8t3XOPidSQkOF7j9ofHNWx3wdHpgSlnI7gh-MDnfZNNR8WeAqZ0KMQsIE4oDh8&usqp=CAU",
        alt: "Description for Image 2",
        title: "Title 1"
    },
    {
        itemImageSrc: url,
        thumbnailImageSrc: url,
        alt: "Description for Image 3",
        title: "Title 1"
    },
    {
        itemImageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq9VIvY8t3XOPidSQkOF7j9ofHNWx3wdHpgSlnI7gh-MDnfZNNR8WeAqZ0KMQsIE4oDh8&usqp=CAU",
        thumbnailImageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq9VIvY8t3XOPidSQkOF7j9ofHNWx3wdHpgSlnI7gh-MDnfZNNR8WeAqZ0KMQsIE4oDh8&usqp=CAU",
        alt: "Description for Image 2",
        title: "Title 1"
    },
    {
        itemImageSrc: "https://www.searchenginejournal.com/wp-content/uploads/2018/10/How-to-Boost-Your-Images%E2%80%99-Visibility-on-Google-Images-760x400.png",
        thumbnailImageSrc: "https://www.searchenginejournal.com/wp-content/uploads/2018/10/How-to-Boost-Your-Images%E2%80%99-Visibility-on-Google-Images-760x400.png",
        alt: "Description for Image 3",
        title: "Title 1"
    },
    {
        itemImageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq9VIvY8t3XOPidSQkOF7j9ofHNWx3wdHpgSlnI7gh-MDnfZNNR8WeAqZ0KMQsIE4oDh8&usqp=CAU",
        thumbnailImageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq9VIvY8t3XOPidSQkOF7j9ofHNWx3wdHpgSlnI7gh-MDnfZNNR8WeAqZ0KMQsIE4oDh8&usqp=CAU",
        alt: "Description for Image 2",
        title: "Title 1"
    },
    {
        itemImageSrc: url,
        thumbnailImageSrc: url,
        alt: "Description for Image 3",
        title: "Title 1"
    },
    {
        itemImageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq9VIvY8t3XOPidSQkOF7j9ofHNWx3wdHpgSlnI7gh-MDnfZNNR8WeAqZ0KMQsIE4oDh8&usqp=CAU",
        thumbnailImageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq9VIvY8t3XOPidSQkOF7j9ofHNWx3wdHpgSlnI7gh-MDnfZNNR8WeAqZ0KMQsIE4oDh8&usqp=CAU",
        alt: "Description for Image 2",
        title: "Title 1"
    },
    {
        itemImageSrc: url,
        thumbnailImageSrc: url,
        alt: "Description for Image 3",
        title: "Title 1"
    },
    
]
*/

export default class GalleriaAutoPlayDemo extends Component {

    constructor(props) {
        super(props);

        this.state = {
           
        };

       // this.galleriaService = new PhotoService();
        this.itemTemplate = this.itemTemplate.bind(this);
        this.thumbnailTemplate = this.thumbnailTemplate.bind(this);

        this.responsiveOptions = [
            {
                breakpoint: '1024px',
                numVisible: 5
            },
            {
                breakpoint: '768px',
                numVisible: 3
            },
            {
                breakpoint: '560px',
                numVisible: 1
            }
        ];
    }

  

    itemTemplate(item) {
       // return <img src={item.itemImageSrc} alt={item.alt}
            //style={{ width: '100%', display: 'block' }} />;

        return <Image
            height={250}
            style={{ width: '100%', display: 'block' }}
            src={item.itemImageSrc} alt={item.alt}
        />
    }

    thumbnailTemplate(item) {
        return <img src={item.thumbnailImageSrc} alt={item.alt}
            style={{
                display: 'block', width: '50px', height: '50px', margin:'30px'
               
            }} />;
    }

    render() {

        var images = []

        images.push({
            itemImageSrc: atob(this.props.value.img1),
            thumbnailImageSrc: atob(this.props.value.img1),
            alt: "Description for Image 1",
            title: "Title 1"
        })
        images.push({
            itemImageSrc: atob(this.props.value.img2),
            thumbnailImageSrc: atob(this.props.value.img2),
            alt: "Description for Image 1",
            title: "Title 1"
        })
        images.push({
            itemImageSrc : atob(this.props.value.img3),
            thumbnailImageSrc : atob(this.props.value.img3),
            alt: "Description for Image 1",
            title: "Title 1"
        })
        images.push({
            itemImageSrc: atob(this.props.value.img4),
            thumbnailImageSrc: atob(this.props.value.img4),
            alt: "Description for Image 1",
            title: "Title 1"
        })
        images.push({
            itemImageSrc: atob(this.props.value.img5),
            thumbnailImageSrc: atob(this.props.value.img5),
            alt: "Description for Image 1",
            title: "Title 1"
        }) 

            

        return (
            <div>
                <div className="card">
                    <Galleria value={images}
                        responsiveOptions={this.responsiveOptions}
                        numVisible={5} style={{ maxWidth: '648px' }}
                        item={this.itemTemplate} thumbnail={this.thumbnailTemplate}
                        circular autoPlay transitionInterval={2000} />
                </div>
            </div>
        );
    }
}


