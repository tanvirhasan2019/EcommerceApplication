import React, { Component, Fragment } from 'react';
import './footerstylecss.css';
import Typography from '@material-ui/core/Typography';
import CallIcon from '@material-ui/icons/Call';
import PinDropIcon from '@material-ui/icons/PinDrop';
import InfoIcon from '@material-ui/icons/Info';
import HelpIcon from '@material-ui/icons/Help';
import AppleIcon from '@material-ui/icons/Apple';
import { Link } from 'react-router-dom';


export default class FooterLayout extends Component {

    render() {
		return (
			<section id="footer" style={{width:'100%' , bottom : '0px'}}>
				<div className="container">
					<div className="row text-center text-xs-center d-flex justify-content-center">
						<div className="col-xs-12 col-sm-6 col-md-6">
														
							<ul className="list-unstyled quick-links">
								<li>
									<button type="submit" class="btn btn-outline-light mb-4">
										<CallIcon /> &nbsp;01815588449
                                    </button>
								</li>
								<li>
									<Link to="/location">
										<button type="submit" class="btn btn-outline-light mb-4">
										<PinDropIcon /> &nbsp;Find our store 
                                    </button> </Link>
								</li>
								
								<li>
									<Typography style={{ color: '#E66767', fontStyle:'italic' }} variant="h6" gutterBottom>
										tanshen technology
							        </Typography>
								</li>
								
							</ul>
						</div>


						<div className="col-xs-12 col-sm-6 col-md-6">

							
							<ul className="list-unstyled quick-links">
						
								<li>
									<Link to="/contact-us">
										<button type="submit" class="btn btn-outline-light mb-4">
											Contact Us
                                    </button> </Link>
								</li>
								<li>
									<Link to="/aboutus">
										<button type="submit" class="btn btn-outline-light mb-4">
											about us
                                    </button> </Link>
								</li>
								
								<li>
									<Link to="/brands">
										<button type="submit" class="btn btn-outline-light mb-4">
											Brands
                                    </button> </Link>
								</li>
								

							

							
															
							</ul>
						</div>


					</div>
					<div className="row">
						<div className="col-xs-12 col-sm-12 col-md-12 mt-2 mt-sm-5">
							<ul className="list-unstyled list-inline social text-center">
								<li className="list-inline-item"><a href=""><i style={{ color: '#E66767' }} className="fa fa-facebook"></i></a></li>
								<li className="list-inline-item"><a href="https://www.fiverr.com/share/qb8D02"><i style={{ color: '#E66767' }} className="fa fa-twitter"></i></a></li>
								<li className="list-inline-item"><a href="https://www.fiverr.com/share/qb8D02"><i style={{ color: '#E66767' }} className="fa fa-instagram"></i></a></li>
								<li className="list-inline-item"><a href="https://www.fiverr.com/share/qb8D02"><i style={{ color: '#E66767' }} className="fa fa-google-plus"></i></a></li>
								
							</ul>
						</div>
						<hr></hr>
			        </div>


						<div className="row">
							<div className="col-xs-12 col-sm-12 col-md-12 mt-2 mt-sm-2 text-center text-white">
								
							<p style={{ color: '#E66767' }} className="h6">©All right Reserved:<a className="text-green ml-2" style={{ color: '#E66767' }}  >Md. Tanvir Hasan Tanshen</a></p>
							</div>
						<hr></hr>
			            </div>



			     </div>
	        </section>


        );
    }
}
