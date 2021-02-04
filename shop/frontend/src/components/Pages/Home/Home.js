import React, {Component, Fragment} from 'react';
import classes from './Home.module.css';
import { connect } from 'react-redux';
import { getLatestProducts, getPopularProducts } from '../../../actions/products';
import Carousel from '../../Layout/Carousel/Carousel';
import ProductsMain from './ProductsMain/ProductsMain';
import Scroll from '../../Layout/Scroll/Scroll';
import ProductCard from '../../Layout/ProductCard/ProductCard';



class Home extends Component {
    
    componentDidMount() {
        this.props.getLatestProducts();
        this.props.getPopularProducts();
    }

    render() {
        if(this.props.user) {
            console.log(this.props.user);
        }

        if(this.props.dbCart) {
            console.log(this.props.dbCart);
        }

        let latestProductsarr = [];
        if(this.props.latestProducts) {
            latestProductsarr = this.props.latestProducts.map(product => <ProductCard key={product.id} id={product.id} price={product.price} title={product.name} img={product.picture1}/>)
        }

        let popularProductsarr = [];
        if(this.props.latestProducts) {
            popularProductsarr = this.props.mostViewedProducts.map(product => <ProductCard key={product.id} id={product.id} price={product.price} title={product.name} img={product.picture1}/>)
        }

        return (
            <div className={classes.home}>
                <Carousel/>
                <h2 className={classes.title}>LATEST</h2>
                <Scroll>
                    {latestProductsarr}
                </Scroll>
                <h2 className={classes.title}>POPULAR</h2>
                <Scroll>
                    {popularProductsarr}
                </Scroll>
                <ProductsMain/>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    latestProducts: state.products.latestProducts,
    mostViewedProducts: state.products.mostViewedProducts,
    user: state.auth.user,
    dbCart: state.products.dbCart
})

export default connect(mapStateToProps, { getLatestProducts, getPopularProducts })(Home);