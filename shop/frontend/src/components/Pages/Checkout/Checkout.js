import React, {Component, Fragment} from 'react';
import classes from './Checkout.module.css';
import { connect } from 'react-redux';
import { removeFromLocalCart, addOrder, orderReset } from '../../../actions/products';

class Checkout extends Component {
    addOrderToDb = () => {
        let idsArr = this.props.localCart.map(item => item.id)
        let order = {
            orderProducts: idsArr
        }

        this.props.addOrder(order);
    } 

    componentWillUnmount() {
        this.props.orderReset();
    }

    render() {
        let sum = 0;
        let cartArr;
        if(this.props.localCart) {
            cartArr = this.props.localCart.map(item => {
                sum = sum + parseFloat(item.price);
                return (
                    <div key={item.id} className={classes.cartcard}>
                        <div className={classes.cartleft}>
                            <img src={item.picture1}/>
                        </div>
                        <div className={classes.cartright}>
                            <h3>{item.price}$</h3>
                            <div>
                                <h2>{item.name}</h2>
                                <button onClick={() => this.props.removeFromLocalCart(item.id)}>REMOVE</button>
                            </div>
                        </div>
                    </div>
                )
            })
        }

        return (
            <div className={classes.checkout}>
               <div className={classes.items}>
               {cartArr.length > 0 ? cartArr : 
                    <div className={classes.nocartitems}>
                        <h2>No Added Products</h2>
                    </div>
                }
               </div>
               <div className={classes.order}>
                    <div className={classes.total}>
                        <h3>TOTAL:</h3>
                        <h3>{sum}$</h3>
                    </div>
                    {this.props.orderSuccess ? <div className={classes.ordersuccess}>Order Placed</div> :
                    <div onClick={this.addOrderToDb} className={classes.orderbutton}>ORDER</div>}
               </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    localCart: state.products.localCart,
    orderSuccess: state.products.orderSuccess
})

export default connect(mapStateToProps, {removeFromLocalCart, addOrder, orderReset})(Checkout);