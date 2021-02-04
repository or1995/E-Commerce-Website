import React, {Component, Fragment} from 'react';
import classes from './ProductCard.module.css';
import {Link} from 'react-router-dom';


class ProductCard extends Component {
    render() {
        return (
            <Link to={`/products/${this.props.id}`} className={classes.productcard}>
                <div className={classes.productcardtop}>
                    <img src={this.props.img}/>
                </div>
                <div className={classes.cardoverlay}></div>
                <div className={classes.productcarddesc}>
                    <h2 className={classes.cardprice}>{this.props.price}$</h2>
                    <h2 className={classes.cardtitle}>{this.props.title}</h2>
                    <div>
                        <div>MORE &raquo;</div>
                    </div>
                </div>
            </Link>
        )
    }
}

export default ProductCard;