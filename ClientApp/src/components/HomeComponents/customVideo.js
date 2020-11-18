import React from 'react';
//import "../HomeComponents/customVideo.scss";
import '../HomeComponents/CustomVideo.scss';


const customVideo = (props) =>

    <div className={props.css_class}>
        <div className="col-md-6 col-sm-12 col-lg-6 category-header">
            <p className="video-p">{props.p_text}</p>
                <div className="overlay"></div>
                <video className='videoTag' autoPlay loop muted>
                    <source src={props.v_video} type='video/mp4' />
                </video>

            </div>

        </div>
   
export default customVideo;



