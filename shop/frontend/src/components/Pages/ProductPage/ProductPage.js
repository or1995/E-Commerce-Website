import React, {Component, Fragment} from 'react';
import classes from './ProductPage.module.css';
import {withRouter, Link} from 'react-router-dom';
import { getCurrentProduct, clearCurrentProduct, addProductView } from '../../../actions/products';
import ProductHeader from './ProductHeader/ProductHeader';
import ProductMovingHeader from './ProductMovingHeader/ProductMovingHeader';
import ProductDesc from './ProductDesc/ProductDesc';
import ProductSpecs from './ProductSpecs/ProductSpecs';
import { connect } from 'react-redux';
import Spinner from '../../Layout/Spinner/Spinner';


class ProductPage extends Component {
    state = {
        id: this.props.match.params.productId,
    }

    componentDidMount() {
        this.props.getCurrentProduct(this.state.id);
    }

    componentWillUnmount() {
        this.props.clearCurrentProduct()
    }

    render() {
        if(this.props.currentProduct) {
            console.log(this.props.currentProduct[0].views);
            this.props.addProductView(this.state.id, {views: this.props.currentProduct[0].views + 1})
        }
        
        return (
            <Fragment>
            {this.props.currentProduct ?
            <div className={classes.ProductPage}>
                <ProductMovingHeader productinfo={this.props.currentProduct[0]}/>
                <ProductHeader productinfo={this.props.currentProduct[0]}/>
                <ProductDesc left img={this.props.currentProduct[0].picture2} desc={this.props.currentProduct[0].description}/>
                <ProductDesc img={this.props.currentProduct[0].picture3} desc={this.props.currentProduct[0].description2}/>
                <ProductSpecs specs={this.props.currentSpecs}/>
            </div>
            : <div className={classes.spinnerdiv}><Spinner/></div>}
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    currentProduct: state.products.currentProduct,
    currentSpecs: state.products.currentSpecs
})

export default connect(mapStateToProps, {getCurrentProduct, clearCurrentProduct, addProductView})(ProductPage);