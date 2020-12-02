import React, { Component, Fragment } from 'react';
import '.././MenItems.scss'
import img3 from '../images-com/NewFolder/phone.jpg';
import ModelMenProduct from './ModalMenProduct';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Collapse } from 'antd';
import addToCart from '../NewFolder/cartItemStore';

const { Panel } = Collapse;
class ElectronicItem extends Component {

    render() {
        let titleImage = " ";
        if (this.props.value.img !== null) {
            titleImage = atob(this.props.value.img[0].img1);
        } else {
            titleImage = require('../images-com/NewFolder/rice.jpg');
        }
        return (
            <div className="col-sm-6 col-md-4 card-items">
                <div className="card shadow mb-5 bg-white rounded">
                    <img className="card-img-top" src={titleImage} alt="NO IMAGE" />
                    <div className="card-body">
                        <h5 className="card-title">{this.props.value.title}</h5>
                        
                    </div>
                    <Collapse className="card-footer" style={{ margin: '0px', padding: '0px', border: 'none' }}
                    >
                        <Panel className="description-text card-footer" header="DESCRIPTION" key="1">
                            <div>{this.props.value.description}</div>
                        </Panel>
                    </Collapse>
                    <div className="card-footer">
                        <p className="price-text">BDT : {this.props.value.price} /-</p>
                    </div>


                    <div className="card-footer" style={{ margin: '0px', padding: '0px' }}>

                        <button onClick={() => addToCart(this.props.value.id, 1)}
                            type="button" class="cart-btn"><span><i><ShoppingCartIcon
                                style={{ textAlign: 'center', marginRight: '10px' }} /></i></span>ADD TO CART
                        </button>

                    </div>

                    <div className="card-footer" style={{ margin: '0px', padding: '0px' }}>

                        <ModelMenProduct className="view-btn" />
                    </div>


                </div>
            </div>

        );
    }
}
export default ElectronicItem
