import React, {Component, Fragment} from 'react';
import classes from './ProductHeader.module.css';
import { connect } from 'react-redux';
import { addtoLocalCart, removeFromLocalCart } from '../../../../actions/products';

class ProductHeader extends Component {
    addtocart = () => {
        this.props.addtoLocalCart(this.props.productinfo);
    }

    render() {
        return (
            <div className={classes.ProductHeader}>
                <div className={classes.desc}>
                    <div className={classes.title}>
                        <h3>{this.props.productinfo.price}$</h3>
                        <h1>{this.props.productinfo.name}</h1>
                    </div>
                    <button onClick={this.addtocart} className={classes.cartbutton}>ADD TO CART</button>
                </div>
                <div className={classes.img}>
                    <img src={this.props.productinfo.picture1}/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    localCart: state.products.localCart,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps ,{ addtoLocalCart, removeFromLocalCart })(ProductHeader);