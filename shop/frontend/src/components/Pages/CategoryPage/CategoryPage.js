import React, {Component, Fragment} from 'react';
import classes from './CategoryPage.module.css';
import ProductsCat from '../../Layout/ProductsCat/ProductsCat';

class CategoryPage extends Component {
    render() {
        return (
            <div className={classes.categorypage}>
                <ProductsCat category={this.props.match.params.category} title={this.props.match.params.category}/>
            </div>
        )
    }
}

export default CategoryPage;