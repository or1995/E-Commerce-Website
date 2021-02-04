import React, {Component, Fragment} from 'react';
import classes from './ProductHeader.module.css';
import { connect } from 'react-redux';
import { addtoLocalCart, removeFromLocalCart } from '../../../../actions/products';

class ProductHeader extends Component {
    state = {
        inCart: false
    }

    componentDidMount() {
        let item;
        for(item in this.props.localCart) {
            if(this.props.productinfo.id === item.id) {
                this.setState({
                    inCart: true
                })
            }
        }
    }

    componentDidUpdate(prevProps) {
        if(this.props.localCart !== prevProps.localCart) {
            let item;
            for(item of this.props.localCart) {
                if(this.props.productinfo.id === item.id) {
                    this.setState({
                        inCart: true
                    })
                    return;
                }
            }
            this.setState({
                inCart: false
            }) 
        }
    }

    addtocart = () => {
        if(this.state.inCart) {
            this.props.removeFromLocalCart(this.props.productinfo.id);
            this.setState({
                inCart: false
            })
        } else {
            this.props.addtoLocalCart(this.props.productinfo);
            this.setState({
                inCart: true
            })
        }
    }

    render() {
        return (
            <div className={classes.ProductHeader}>
                <div className={classes.desc}>
                    <div className={classes.title}>
                        <h3>{this.props.productinfo.price}$</h3>
                        <h1>{this.props.productinfo.name}</h1>
                    </div>
                    <button onClick={this.addtocart} className={classes.cartbutton}>{this.state.inCart ? 'REMOVE FROM CART' : 'ADD TO CART'}</button>
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