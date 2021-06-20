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
                                            src='https://scontent.fdac47-1.fna.fbcdn.net/v/t1.6435-9/76727088_751947125311225_4645863929354911744_n.jpg?_nc_cat=109&ccb=1-3&_nc_sid=8bfeb9&_nc_ohc=3Sn_OxOmivYAX8MW7rB&_nc_ht=scontent.fdac47-1.fna&oh=99c7f4add64d650d3b4718857f830187&oe=60D452B0'
                                            className="card-img-top"
                                            alt="image"
                                        />
                                    </div>
                                    <h5 className="card-title">
                                       <Typography  variant="h4" gutterBottom>
										   Md. Tanvir Hasan
							          </Typography>
                                    </h5>
                                    <p className="card-text">
                                        <Typography  variant="body1" gutterBottom>
										   New Market Kandirpar comilla
							            </Typography>
                                        <br />
                                        <span className="phone">01687339737</span>
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
