import React, { Component, Fragment } from 'react';
import '.././MenItems.scss'
import img3 from '../images-com/NewFolder/ladies.jpg';
import CustomModal from '../NewFolder/CustomModal';
import ModelMenProduct from './ModalMenProduct';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import addToCart from '../NewFolder/cartItemStore';
import { Collapse } from 'antd';
import { connect } from 'react-redux';
import { cartUpdate } from '../../../actions/cartItem';
//import { cartWithId } from '../../../actions/cartItem';
import { ToastContainer } from 'react-toastify';
import IncDec from './IncDecButton';
import Typography from '@material-ui/core/Typography';

import { notification } from 'antd';


const { Panel } = Collapse;

class ProductsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 1,
            cartQuantity:0
        }

    }

    cartCall = () => {

        let img = '';
        if (this.props.value.img !== null) {
            img = atob(this.props.value.img.img1);
        }
        addToCart(this.props.value.id, 1, this.props.value.title, img, this.props.value.price);
        this.props.cartUpdate();



    }

    increase = () => {
      //  console.log("Increase button pressed " +ItemsFound);
        let img = '';
        if (this.props.value.img !== null) {
            img = atob(this.props.value.img.img1);
        }
        addToCart(this.props.value.id, 1, this.props.value.title, img, this.props.value.price);
        this.props.cartUpdate();
        this.setState({ cartQuantity: this.state.cartQuantity + 1 }) 

    }

    decrease = (ItemsFound) => {
        console.log("Decrease button pressed " +ItemsFound);

        if (ItemsFound === 0) {

            let titleN = this.props.value.title;
            notification['warning']({
                message: 'Please order minimun 1 item' + titleN,
                description:
                    '',
                placement: 'bottomRight',
                duration: 2
            })
        }

        else {
            let img = '';
            if (this.props.value.img !== null) {
                img = atob(this.props.value.img.img1);
            }
            addToCart(this.props.value.id, -1, this.props.value.title, img, this.props.value.price);
            this.props.cartUpdate();
        } 
      
    }


    render() {
        let { CartData } = this.props;
        let itemsQuantity = 0;
        let ItemsFound = 0;
        try {
            if (CartData.Count > 0) {
                itemsQuantity = CartData.List.find(x => x.id === this.props.value.id);
                ItemsFound = itemsQuantity.quantity;
            } else {
                itemsQuantity = 0;
            }
        } catch{
            //count = 0;
            //console.log("Layout Catch called");
            itemsQuantity = 0;

        }

      
        console.log("id across quantity-- " + JSON.stringify(itemsQuantity)); 

        let titleImage = " ";
        if (this.props.value.img !== null) {
            titleImage = atob(this.props.value.img.img1);
        } else {
            titleImage = require('../images-com/NewFolder/ladies.jpg');
        }
        return (
            <div className="col-sm-6 col-md-4 card-items">


                <ToastContainer
                    position="top-left"
                    autoClose={4000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />


                <div className="card shadow mb-5 bg-white rounded">
                    <img className="card-img-top" src={titleImage} alt="NO IMAGE" />
                    <div className="card-body">
                        
                        <Typography variant="h6" gutterBottom>
                            {this.props.value.title}
                        </Typography>

                    </div>

                    <Collapse className="card-footer" style={{margin: '0px', padding: '0px', border: 'none' }}
                    >
                        <Panel  className="description-text card-footer" header="DESCRIPTION" key="1">
                           
                            <Typography style={{ whiteSpace: 'pre-wrap' }} variant="body1" gutterBottom>
                                {this.props.value.description}
                             </Typography>
                        </Panel>
                    </Collapse>


                    <div className="card-footer">
                        <Typography style={{color:'black'}} className="price-text" variant="h6" gutterBottom>
                            BDT &nbsp;{this.props.value.price}&nbsp;/-
                        </Typography>
                       
                       
                    </div>


                    <div className="card-footer" style={{ margin: '0px', padding: '0px', backgroundColor:'rgb(63, 81, 181)', border:'none' }}>

                        {ItemsFound > 0 ? <IncDec increase={() => this.increase()} decrease={() => this.decrease(ItemsFound)} onChange={ItemsFound} /> : 

                            <button onClick={this.cartCall}
                            type="button" className="cart-btn"><span><i><ShoppingCartIcon
                                style={{ textAlign: 'center', marginRight: '10px' }} /></i></span>ADD TO CART

                            </button>
                        }
                    </div>

                    <div className="card-footer" style={{ margin: '0px', padding: '0px' }}>

                        <ModelMenProduct className="view-btn" data={this.props.value} header={this.props.value.title} />

                    </div>

                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => ({

   // Data: state.cartUpdate,
  //  Quan: state.cartWithId.quantity
  //  Quan:state
    CartData: state.cartUpdate.data

});
const mapDispatchToProps = {
    cartUpdate
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductsList);
//<h5 className="card-title">{this.props.value.title}</h5>