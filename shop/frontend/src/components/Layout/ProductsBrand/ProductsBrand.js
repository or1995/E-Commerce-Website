import React, {Component, Fragment} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import classes from './ProductsBrand.module.css';
import Spinner from '../Spinner/Spinner';
import ProductCard from '../ProductCard/ProductCard';
import axios from 'axios';


class ProductsBrand extends Component {
    state = {
        order: '-pub_date',
        products: [],
        currentdatafetch: 9,
        hasMore: true
    }

    fetchData = () => {
        axios.get(`/product/api/products/?ordertype=${this.state.order}&brand=${this.props.brand}&datanumbrand=${this.state.currentdatafetch}`)
        .then(res => {
            this.setState({
                hasMore: this.state.products.length === this.state.products.concat(res.data).length ? false : true,
                products: this.state.products.concat(res.data),
                currentdatafetch: this.state.currentdatafetch + 9
            })
        })
    }

    componentDidMount() {
        axios.get(`/product/api/products/?ordertype=${this.state.order}&brand=${this.props.brand}&datanumbrand=0`)
            .then(res => {
                this.setState({
                    hasMore: this.state.products.length === this.state.products.concat(res.data).length ? false : true,
                    products: this.state.products.concat(res.data)
                })
            })
    }

    componentDidUpdate(prevProps) {
        if(prevProps.brand !== this.props.brand) {
            this.setState({
                order: '-pub_date',
                products: [],
                currentdatafetch: 9,
                hasMore: true
            })
            
            axios.get(`/product/api/products/?ordertype=${this.state.order}&brand=${this.props.brand}&datanumbrand=0`)
            .then(res => {
                this.setState({
                    hasMore: this.state.products.length === this.state.products.concat(res.data).length ? false : true,
                    products: this.state.products.concat(res.data)
                })
            })
        }
    }

    dateorder = () => {
        this.setState({
            products: [],
            currentdatafetch: 9,
            hasMore: true
        })
        
        if(this.state.order === '-pub_date') {
            this.setState({
                order: 'pub_date'
            })
            axios.get(`/product/api/products/?ordertype=pub_date&brand=${this.props.brand}&datanumbrand=0`)
            .then(res => {
                this.setState({
                    hasMore: this.state.products.length === this.state.products.concat(res.data).length ? false : true,
                    products: res.data
                })
            })
        } else if(this.state.order === 'pub_date') {
            this.setState({
                order: '-pub_date'
            })
            axios.get(`/product/api/products/?ordertype=-pub_date&brand=${this.props.brand}&datanumbrand=0`)
            .then(res => {
                this.setState({
                    hasMore: this.state.products.length === this.state.products.concat(res.data).length ? false : true,
                    products: res.data
                })
            })
        } else {
            this.setState({
                order: '-pub_date'
            })
            axios.get(`/product/api/products/?ordertype=-pub_date&brand=${this.props.brand}&datanumbrand=0`)
            .then(res => {
                this.setState({
                    hasMore: this.state.products.length === this.state.products.concat(res.data).length ? false : true,
                    products: res.data
                })
            })
        }
        
    }

    priceorder = () => {
        this.setState({
            products: [],
            currentdatafetch: 9,
            hasMore: true
        })
        if(this.state.order === '-price') {
            this.setState({
                order: 'price'
            })
            axios.get(`/product/api/products/?ordertype=price&brand=${this.props.brand}&datanumbrand=0`)
            .then(res => {
                this.setState({
                    hasMore: this.state.products.length === this.state.products.concat(res.data).length ? false : true,
                    products: res.data
                })
            })
        } else if(this.state.order === 'price') {
            this.setState({
                order: '-price'
            })
            axios.get(`/product/api/products/?ordertype=-price&brand=${this.props.brand}&datanumbrand=0`)
            .then(res => {
                this.setState({
                    hasMore: this.state.products.length === this.state.products.concat(res.data).length ? false : true,
                    products: res.data
                })
            })
        } else {
            this.setState({
                order: '-price'
            })
            axios.get(`/product/api/products/?ordertype=-price&brand=${this.props.brand}&datanumbrand=0`)
            .then(res => {
                this.setState({
                    hasMore: this.state.products.length === this.state.products.concat(res.data).length ? false : true,
                    products: res.data
                })
            })
        }
    }

    nameorder = () => {
        this.setState({
            products: [],
            currentdatafetch: 9,
            hasMore: true
        })
        if(this.state.order === '-name') {
            this.setState({
                order: 'name'
            })
            axios.get(`/product/api/products/?ordertype=name&brand=${this.props.brand}&datanumbrand=0`)
            .then(res => {
                this.setState({
                    hasMore: this.state.products.length === this.state.products.concat(res.data).length ? false : true,
                    products: res.data
                })
            })
        } else if(this.state.order === 'name') {
            this.setState({
                order: '-name'
            })
            axios.get(`/product/api/products/?ordertype=-name&brand=${this.props.brand}&datanumbrand=0`)
            .then(res => {
                this.setState({
                    hasMore: this.state.products.length === this.state.products.concat(res.data).length ? false : true,
                    products: res.data
                })
            })
        } else {
            this.setState({
                order: '-name'
            })
            axios.get(`/product/api/products/?ordertype=-name&brand=${this.props.brand}&datanumbrand=0`)
            .then(res => {
                this.setState({
                    hasMore: this.state.products.length === this.state.products.concat(res.data).length ? false : true,
                    products: res.data
                })
            })
        }
    }

    viewsorder = () => {
        this.setState({
            products: [],
            currentdatafetch: 9,
            hasMore: true
        })
        
        if(this.state.order === '-views') {
            this.setState({
                order: 'views'
            })
            axios.get(`/product/api/products/?ordertype=views&brand=${this.props.brand}&datanumbrand=0`)
            .then(res => {
                this.setState({
                    hasMore: this.state.products.length === this.state.products.concat(res.data).length ? false : true,
                    products: res.data
                })
            })
        } else if(this.state.order === 'views') {
            this.setState({
                order: '-views'
            })
            axios.get(`/product/api/products/?ordertype=-views&brand=${this.props.brand}&datanumbrand=0`)
            .then(res => {
                this.setState({
                    hasMore: this.state.products.length === this.state.products.concat(res.data).length ? false : true,
                    products: res.data
                })
            })
        } else {
            this.setState({
                order: '-views'
            })
            axios.get(`/product/api/products/?ordertype=-views&brand=${this.props.brand}&datanumbrand=0`)
            .then(res => {
                this.setState({
                    hasMore: this.state.products.length === this.state.products.concat(res.data).length ? false : true,
                    products: res.data
                })
            })
        }
    }

    render() {
        return (
            <div className={classes.productsBrand}>
                <div className={classes.productstitle}>
                    <h2>{this.props.title}</h2>
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
                        dataLength={this.state.products.length} //This is important field to render the next data
                        next={this.fetchData}
                        hasMore={this.state.hasMore}
                        loader={<div className={classes.spinnercontainer}><Spinner/></div>}
                        endMessage={<p className={classes.endMessage}>No More Products</p>}
                        scrollableTarget={"body"}
                        >
                        {this.state.products.map(product => 
                            <ProductCard key={product.id} id={product.id} price={product.price} title={product.name} img={product.picture1}/>   
                        )}
                    </InfiniteScroll>
                </div>
            </div>
        )
    }
}

export default ProductsBrand;