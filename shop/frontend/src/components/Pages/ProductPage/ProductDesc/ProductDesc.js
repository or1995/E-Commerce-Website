import React, {Component, Fragment} from 'react';
import classes from './ProductDesc.module.css';


class ProductDesc extends Component {

    render() {
        return (
            <Fragment>
                {this.props.left? 
                    <div className={classes.ProductDesc}>
                        <div className={classes.imgleft}>
                            <div>
                                <img src={this.props.img}/>
                            </div>
                        </div>
                        <div className={classes.desc}>
                            <p>{this.props.desc}</p>
                        </div>
                    </div>:
                    <div className={classes.ProductDesc}>
                        <div className={classes.desc}>
                            <p>{this.props.desc}</p>
                        </div>
                        <div className={classes.imgright}>
                            <div>
                                <img src={this.props.img}/>
                            </div>
                        </div>
                    </div>}
            </Fragment>
        )
    }
}

export default ProductDesc;