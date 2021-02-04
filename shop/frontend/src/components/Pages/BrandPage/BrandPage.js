import React, {Component, Fragment} from 'react';
import classes from './BrandPage.module.css';
import ProductsBrand from '../../Layout/ProductsBrand/ProductsBrand';

class BrandPage extends Component {
    render() {
        return (
            <div className={classes.brandpage}>
                <ProductsBrand brand={this.props.match.params.brand} title={this.props.match.params.brand}/>
            </div>
        )
    }
}

export default BrandPage;