import React, { Component, Fragment } from 'react';
import Tabs from './HomeComponents/ScrollableTabsButtonForce';


import './HomeComponents/Home.scss';
//import { fetchProducts } from '../actions/Products';
import { connect } from 'react-redux';
import { fetchProducts } from '../actions/Products';

class MainHome extends Component {

    componentDidMount = () => {

        const { fetchProducts } = this.props;
        fetchProducts();

        const { TempData, isLoading } = this.props;
        console.log(isLoading);
        if (isLoading === false) {
            console.log("Data  " + TempData.data[0].title);
        }
        
       // this.RenderData();
      
    };
  /*  async RenderData() {
        const { Data } = this.props;
        var x = Data.data[0].title;
        console.log("Data Title  " + x);
    }*/

    render() {
        const { TempData, isLoading } = this.props;
        console.log(isLoading);
        if (isLoading === false) {

        const allproducts=   
           
          //  console.log("Data 2  " + console.log(JSON.stringify(TempData)));
           
        }
        return (
            <Fragment>

                {
                    isLoading ? null : (<Tabs TempData={this.props.TempData} />)
                   
                }
                
            </Fragment>
               );
    }
}
const mapStateToProps = (state) => ({

    TempData: state.products,
    isLoading: state.products.isLoading

});


const mapDispatchToProps = {
    fetchProducts
};

export default connect(mapStateToProps, mapDispatchToProps)(MainHome);
