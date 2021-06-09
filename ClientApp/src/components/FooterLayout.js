import React, { Component, Fragment } from 'react';
import './footerstylecss.css';
import Typography from '@material-ui/core/Typography';


export default class FooterLayout extends Component {

    render() {
		return (
			<section id="footer" style={{width:'100%' , bottom : '0px'}}>
				<div className="container">
					<div className="row text-center text-xs-center d-flex justify-content-center">
						<div className="col-12">
							
							<Typography style={{color:'white'}} variant="h6" gutterBottom>
								Quick Links
							</Typography>
							<ul className="list-unstyled quick-links">
								<li><a href="https://www.fiverr.com/share/qb8D02"><i className="fa fa-angle-double-right"></i>Home</a></li>
								<li><a href="https://www.fiverr.com/share/qb8D02"><i className="fa fa-angle-double-right"></i>About</a></li>
								<li><a href="https://www.fiverr.com/share/qb8D02"><i className="fa fa-angle-double-right"></i>FAQ</a></li>
								<li><a href="https://www.fiverr.com/share/qb8D02"><i className="fa fa-angle-double-right"></i>Get Started</a></li>
								<li><a href="https://wwwe.sunlimetech.com" title="Design and developed by"><i className="fa fa-angle-double-right"></i>Imprint</a></li>
							</ul>
						</div>
					</div>
					<div className="row">
						<div className="col-xs-12 col-sm-12 col-md-12 mt-2 mt-sm-5">
							<ul className="list-unstyled list-inline social text-center">
								<li className="list-inline-item"><a href="https://www.fiverr.com/share/qb8D02"><i className="fa fa-facebook"></i></a></li>
								<li className="list-inline-item"><a href="https://www.fiverr.com/share/qb8D02"><i className="fa fa-twitter"></i></a></li>
								<li className="list-inline-item"><a href="https://www.fiverr.com/share/qb8D02"><i className="fa fa-instagram"></i></a></li>
								<li className="list-inline-item"><a href="https://www.fiverr.com/share/qb8D02"><i className="fa fa-google-plus"></i></a></li>
								<li className="list-inline-item"><a href="https://www.fiverr.com/share/qb8D02" target="_blank"><i className="fa fa-envelope"></i></a></li>
							</ul>
						</div>
						<hr></hr>
			        </div>


						<div className="row">
							<div className="col-xs-12 col-sm-12 col-md-12 mt-2 mt-sm-2 text-center text-white">
								
								<p className="h6">© All right Reversed-<a className="text-green ml-2"  >Md. Tanvir Hasan Tanshen</a></p>
							</div>
						<hr></hr>
			            </div>



			     </div>
	        </section>


        );
    }
}
