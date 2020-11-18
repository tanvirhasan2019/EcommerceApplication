import React, { Component, Fragment } from 'react';
import '../HomeComponents/MenItems.scss';
import img3 from './images-com/NewFolder/gents.jpg';
import RadioButtonGrp from './NewFolder/RadioButtonGrp';
import RadioColor from './NewFolder/RadioButtonColor';
import ModelMenProduct from './NewFolder/ModalMenProduct';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

export class MenItems extends Component {

    handleSubmit(event) {

        

    }
    render() {
        return (
            <div className="col-sm-6 col-md-4 card-items">
                <div className="card shadow mb-5 bg-white rounded">
                    <img className="card-img-top" src={img3} alt="Card image cap" />
                    <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
                    </div>

                    <div className="card-footer">
                        <p className="price-text">BDT: 200</p>
                    </div>


                    <div className="card-footer">
                        <div className="row d-flex justify-content-around">
                            <div className="size-text align-items-center">SIZE</div>
                            <RadioButtonGrp className="align-items-center" />
                        </div>
                    </div>

                    <div className="card-footer">
                        <div className="d-flex justify-content-around">
                            <div className="align-self-center color-text">COLOR</div>
                            <RadioColor className="align-self-center" />
                        </div>
                    </div>

                    <div className="card-footer" style={{ margin: '0px', padding: '0px' }}>

                        <button type="button" class="cart-btn"><span><i><ShoppingCartIcon style={{ textAlign: 'center', marginRight: '10px' }} /></i></span>ADD TO CART</button>

                    </div>

                    <div className="card-footer" style={{ margin: '0px', padding: '0px' }}>

                        <ModelMenProduct className="view-btn" />
                    </div>


                </div>
            </div>

        );
    }
}
