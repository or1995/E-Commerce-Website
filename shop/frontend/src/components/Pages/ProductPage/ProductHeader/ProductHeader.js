import React, {Component, Fragment} from 'react';
import classes from './ProductHeader.module.css';
import { connect } from 'react-redux';
import { addtoLocalCart, removeFromLocalCart } from '../../../../actions/products';

class ProductHeader extends Component {
    state = {
        currentcart: {}
    }

    componentDidMount() {
        let foundcart = this.props.localCart.find(cartitem => cartitem.id === this.props.productinfo.id);
        console.log(foundcart);
        if(foundcart) {
            this.setState({
                currentcart: foundcart
            })
        } else {
            this.setState({
                currentcart: {amount: 0}
            })            
        }
    }

    componentDidUpdate(prevprops) {
        if(prevprops.localCart !== this.props.localCart) {
            let foundcart = this.props.localCart.find(cartitem => cartitem.id === this.props.productinfo.id);
            console.log(foundcart);
            if(foundcart) {
                this.setState({
                    currentcart: foundcart
                })
            } else {
                this.setState({
                    currentcart: {amount: 0}
                })            
            }            
        }
    }

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
                    <div className={classes.buttonandcart}>
                        <button onClick={this.addtocart} className={classes.cartbutton}>ADD TO CART</button>
                        <h3>&nbsp;&nbsp;{this.state.currentcart.amount}&nbsp;in&nbsp;Cart</h3>
                    </div>
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