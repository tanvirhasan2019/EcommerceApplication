import React, { Component, Fragment } from 'react';
import '../HomeComponents/MenItems.scss';
import img3 from './images-com/NewFolder/gents.jpg';
import RadioButtonGrp from './NewFolder/RadioButtonGrp';
import RadioColor from './NewFolder/RadioButtonColor';
import ModelMenProduct from './NewFolder/ModalMenProduct';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Collapse } from 'antd';
import addToCart from '../HomeComponents/NewFolder/cartItemStore';
import { SettingOutlined } from '@ant-design/icons';

const { Panel } = Collapse;

/*const genExtra = () => (
    <SettingOutlined
        onClick={event => {
            // If you don't want click extra trigger collapse, you can prevent this:
            event.stopPropagation();
        }}
    />
);*/
export class MenItems extends Component {

    handleSubmit(event) {

        

    }
    render() {

        //const img11 = this.props.img
        var titleImage ='';
        if (this.props.value.img !== null) {
          

             titleImage = atob(this.props.value.img[0].img1);
          
            
        } else {
            titleImage = require('./images-com/NewFolder/gents.jpg');
        }
        


        return (
            <div className="col-sm-6 col-md-4 card-items">
                <div className="card shadow mb-5 bg-white rounded">
                    <img className="card-img-top" src={titleImage} alt="NO IMAGE" />
                    <div className="card-body">
                        <h5 className="card-title">{this.props.value.title}</h5>

                    </div>

                    
                    <Collapse className="card-footer" style={{ margin: '0px', padding: '0px', border:'none' }}
                          >
                        <Panel className="description-text card-footer" header="DESCRIPTION" key="1">
                            <div>{this.props.value.description}</div>
                        </Panel>
                        </Collapse>
                   

                    <div className="card-footer">
                        <p className="price-text">BDT : {this.props.value.price} /-</p>
                    </div>


                    <div className="card-footer" style={{ margin: '0px', padding: '0px' }}>

                        <button onClick={() =>addToCart(this.props.value.id, 1)}
                            type="button" class="cart-btn"><span><i>
                            <ShoppingCartIcon style={{ textAlign: 'center', marginRight: '10px' }} /></i>
                        </span>ADD TO CART</button>

                    </div>

                    <div className="card-footer" style={{ margin: '0px', padding: '0px' }}>

                        <ModelMenProduct className="view-btn" />
                    </div>


                </div>
            </div>

        );
    }
}
