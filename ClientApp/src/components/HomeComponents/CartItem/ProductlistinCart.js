import React, { Component, Fragment } from 'react';
import demoImg from '../images-com/NewFolder/shoes.jpg';

import DeleteIcon from '@material-ui/icons/Delete';
import { InputNumber } from 'antd';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { cartUpdate } from '../../../actions/cartItem';
import { Collapse } from 'antd';
//import { fetchProducts } from '../../actions/Products';
//import { fetchProducts } from '../../../actions/Products';
import IncDec from '../NewFolder/IncDecButton';
import addToCart from '../NewFolder/cartItemStore';
import { notification } from 'antd';
import SimpleBackdrop from '../../../components/spinner/SimpleBackdrop';

import './CustomizeProduct.scss';

const { Panel } = Collapse;

class ProductlistinCart extends Component {

    increase = (id,price) => {
       
       
        addToCart(id, 1, '', '', price);
        this.props.cartUpdate();
        //this.setState({ cartQuantity: this.state.cartQuantity + 1 })

    }

    decrease = (id,price, quantity) => {
        

        if (quantity === 1) {

           // let titleN = this.props.value.title;
            notification['warning']({
                message: 'Please order minimum 1 item',
                description:
                    '',
                placement: 'bottomRight',
                duration: 2
            })
        }

        else {
           
            addToCart(id, -1, '','', price);
            this.props.cartUpdate();
        }

    }

   deleteItem = (id) => {

        var all_cart_data = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
        let unmatchCart = all_cart_data.filter(item => {
            return item.id != id
        })
        localStorage.setItem('cart', JSON.stringify(unmatchCart));
        this.props.cartUpdate();

    }

    componentDidMount() {

      /*  let { allProducts, fetchProducts } = this.props;
        if (allProducts.isLoading === undefined) {
            fetchProducts();
        } else {
                

        }*/
       

    } 

    render() {
        let { CartData, allProducts, cartUpdate, fetchProducts } = this.props;
      
        let count = 0;
        let products = [];
        let Quantity = [];

        try {

            if (CartData.Count > 0) {
                count = CartData.Count;

               
                if (allProducts.isLoading === false && allProducts.isLoading !== undefined) {
                    allProducts.data.map(item => CartData.List.some(item2 => {

                        if (item.id === item2.id && item2.quantity>0) {
                            products.push({

                                id: item2.id,
                                quantity: item2.quantity,
                                title: item.title,
                                Img: item.img.img1,
                                price: item.price,
                                description:item.description
                            })
                        }
                    }

                    ))
                }

            } else {
                count = 0;
            }
        } catch{
           
            cartUpdate();
        }

        return (
            <Fragment>
                    
                { allProducts.isLoading == false ?

                    (products.map(item =>
                        <div className="row product-back" style={{ marginBottom: '15px', marginLeft: '0px' }}>

                            <div className="col-md com-sm" style={{ paddingLeft: '0px', paddingRight: '0px' }}>
                                <img src={atob(item.Img)} className="rounded float-left cart-image" alt="..." />
                            </div>
                            <div className="col-md-6 sol-sm d-flex flex-column justify-content-around">


                                <div style={{ fontSize: '1rem' }}>
                                    {item.title}
                                </div>

                                <Collapse className="card-footer" style={{ margin: '0px', padding: '0px', border: 'none' }}
                                >
                                    <Panel className="description-text card-footer" header="DESCRIPTION" key="1">
                                        <div>{item.description}</div>
                                    </Panel>
                                </Collapse>

                                <div style={{ fontSize: '.8rem' }}>
                                    {item.quantity} x {item.price} = {item.quantity * item.price}

                                </div>

                            </div>

                            <div className="col-md-3 d-flex flex-column justify-content-around">
                                <IncDec style={{ height: '30px' }} increase={() => this.increase(item.id, item.price)} decrease={() => this.decrease(item.id, item.price, item.quantity)} onChange={item.quantity} />
                                <Button
                                    onClick={() => this.deleteItem(item.id)}
                                    style={{ height: '30px', backgroundColor: '#3f51b5', color: 'white' }}
                                    variant="contained"
                                    startIcon={<DeleteIcon />}
                                >
                                    Delete
                                </Button>

                            </div>

                        </div>


                    )
                    ) : <SimpleBackdrop  />
                }

            </Fragment>
        );
    }
}

const mapStateToProps = (state) => ({

    CartData: state.cartUpdate.data,
    allProducts: state.products

});

const mapDispatchToProps = {
    cartUpdate,
   // fetchProducts
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductlistinCart);