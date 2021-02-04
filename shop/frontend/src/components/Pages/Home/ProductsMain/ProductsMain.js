import React, {Component, Fragment} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import {connect} from 'react-redux';
import { getProducts, resetProducts } from '../../../../actions/products';
import classes from './ProductsMain.module.css';
import Spinner from '../../../Layout/Spinner/Spinner';
import ProductCard from '../../../Layout/ProductCard/ProductCard';


class ProductsMain extends Component {
    state = {
        order: '-pub_date'
    }

    fetchData = () => {
        this.props.getProducts(this.props.currentdatafetch, this.state.order);
    }

    dateorder = () => {
        this.props.resetProducts();
        if(this.state.order === '-pub_date') {
            this.setState({
                order: 'pub_date'
            })
        } else if(this.state.order === 'pub_date') {
            this.setState({
                order: '-pub_date'
            })
        } else {
            this.setState({
                order: '-pub_date'
            })
        }
    }

    priceorder = () => {
        this.props.resetProducts();
        if(this.state.order === '-price') {
            this.setState({
                order: 'price'
            })
        } else if(this.state.order === 'price') {
            this.setState({
                order: '-price'
            })
        } else {
            this.setState({
                order: '-price'
            })
        }
    }

    nameorder = () => {
        this.props.resetProducts();
        if(this.state.order === '-name') {
            this.setState({
                order: 'name'
            })
        } else if(this.state.order === 'name') {
            this.setState({
                order: '-name'
            })
        } else {
            this.setState({
                order: '-name'
            })
        }
    }

    viewsorder = () => {
        this.props.resetProducts();
        if(this.state.order === '-views') {
            this.setState({
                order: 'views'
            })
        } else if(this.state.order === 'views') {
            this.setState({
                order: '-views'
            })
        } else {
            this.setState({
                order: '-views'
            })
        }
    }

    render() {
        return (
            <div className={classes.productsmain}>
                <div className={classes.productstitle}>
                    <h2>ALL PRODUCTS</h2>
                    <div className={classes.sortingdiv}>
                        <h3>Sort by:</h3>
                        <div onClick={this.dateorder} className={this.state.order === '-pub_date' || this.state.order === 'pub_date' ? [classes.sortingitem, classes.sortingitemactive].join(' ') : classes.sortingitem}>
                            <h3 className={classes.sortname}>Date</h3>
                            <h3 className={this.state.order === 'pub_date' ? [classes.sortdirection, classes.sortdirectionreverse].join(' ') : classes.sortdirection}>&#8250;</h3>
                        </div>
                        <div onClick={this.priceorder} className={this.state.order === '-price' || this.state.order === 'price' ? [classes.sortingitem, classes.sortingitemactive].join(' ') : classes.sortingitem}>
                            <h3 className={classes.sortname}>Price</h3>
                            <h3 className={this.state.order === 'price' ? [classes.sortdirection, classes.sortdirectionreverse].join(' ') : classes.sortdirection}>&#8250;</h3>
                        </div>
                        <div onClick={this.nameorder} className={this.state.order === '-name' || this.state.order === 'name' ? [classes.sortingitem, classes.sortingitemactive].join(' ') : classes.sortingitem}>
                            <h3 className={classes.sortname}>Name</h3>
                            <h3 className={this.state.order === 'name' ? [classes.sortdirection, classes.sortdirectionreverse].join(' ') : classes.sortdirection}>&#8250;</h3>
                        </div>
                        <div onClick={this.viewsorder} className={this.state.order === '-views' || this.state.order === 'views' ? [classes.sortingitem, classes.sortingitemactive].join(' ') : classes.sortingitem}>
                            <h3 className={classes.sortname}>Popularity</h3>
                            <h3 className={this.state.order === 'views' ? [classes.sortdirection, classes.sortdirectionreverse].join(' ') : classes.sortdirection}>&#8250;</h3>
                        </div>
                    </div>
                </div>
                <div className={classes.productsgrid}>
                    <InfiniteScroll
                        dataLength={this.props.products.length} //This is important field to render the next data
                        next={this.fetchData}
                        hasMore={this.props.hasMore}
                        loader={<div className={classes.spinnercontainer}><Spinner/></div>}
                        endMessage={<p className={classes.endMessage}>No More Products</p>}
                        >
                        {this.props.products.map(product => 
                            <ProductCard key={product.id} id={product.id} price={product.price} title={product.name} img={product.picture1}/>   
                        )}
                    </InfiniteScroll>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    products: state.products.products, 
    currentdatafetch: state.products.currentdatafetch,
    hasMore: state.products.hasMore
})

export default connect(mapStateToProps, { getProducts, resetProducts })(ProductsMain);