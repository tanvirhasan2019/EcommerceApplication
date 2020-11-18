import React, { Component, Fragment } from 'react';

import ControlledCarousel from './HomeComponents/ControlledCarousel';
import Tabs from './HomeComponents/ScrollableTabsButtonForce';
import CustomVideo from './HomeComponents/customVideo';
import PaginationExampleCompact from './HomeComponents/PaginationExampleCompact';
import FooterLayout from './FooterLayout';
import Layout from './Layout';
import './HomeComponents/Home.scss';



import men from "./HomeComponents/images-com/men.mp4";
import women from "./HomeComponents/images-com/videoWomen.mp4";
import electronic from "./HomeComponents/images-com/electronics.mp4";


export class Home extends Component {
    static displayName = Home.name;
   

    render() {

        const text1 = "Chase the vision, not the money, the money will end up following you";
        const text2 = "If you are a queen, you are powerless, so I had probably demote myself and go shopping.Read more at";
        const text3 = "Technology is anything that was not around when you were born";

        return (
            <Layout>
             
              
              <div className="row carousel-div">
                    <div className="col-12">
                        <ControlledCarousel/>
                    </div>
               
              </div>


             <div className="video-content">

                  <CustomVideo p_text={text1}
                      v_video={men} css_class={"d-flex flex-row category"} />

                  <CustomVideo p_text={text2}
                      v_video={women} css_class={"d-flex flex-row-reverse category"} />

                  <CustomVideo p_text={text3}
                      v_video={electronic} css_class={"d-flex flex-row category"} />

              </div>


              <div className="row">
                  <div className="col-12 tab-content">
                      <Tabs />
                  </div>
              </div>


              
              <div className="row">
                  <PaginationExampleCompact />
              </div>

              <div className="row">
                  <FooterLayout />
                </div>
            </Layout>
        
    );
  }
}
