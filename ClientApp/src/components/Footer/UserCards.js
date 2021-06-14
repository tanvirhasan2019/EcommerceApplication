import React, { Component } from "react";
import './styles.css'
import Typography from '@material-ui/core/Typography';


class UserCards extends Component {
    state = {
        data: [],
      
    };

  

    render() {
        return (
            <div className="clearfix">
                <div className="row d-flex justify-content-center">
                    
                        <div className="col-md-4 animated fadeIn" >
                            <div className="card">
                                <div className="card-body">
                                    <div className="avatar">
                                        <img
                                            src='https://scontent.fdac13-1.fna.fbcdn.net/v/t1.6435-9/54256012_2168051783302237_2802293382695616512_n.jpg?_nc_cat=100&ccb=1-3&_nc_sid=174925&_nc_ohc=1XHa_HJbFjsAX9ifEjy&_nc_ht=scontent.fdac13-1.fna&oh=15464b3f173d1598109f61013c80a585&oe=60CC45A3'
                                            className="card-img-top"
                                            alt="image"
                                        />
                                    </div>
                                    <h5 className="card-title">
                                       <Typography  variant="h4" gutterBottom>
										   Atikul Hamid 
							          </Typography>
                                    </h5>
                                    <p className="card-text">
                                        <Typography  variant="body1" gutterBottom>
										   Kandirpar cumilla 3500
							            </Typography>
                                        <br />
                                        <span className="phone">01xxxxxxx</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    
                </div>
                
                
            </div>
        );
    }
}

export default UserCards;
