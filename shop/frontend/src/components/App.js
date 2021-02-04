import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import classes from "./App.module.css";
import Header from './Layout/Header/Header';
import Footer from './Layout/Footer/Footer';
import Home from './Pages/Home/Home';
import PrivateRoute from './common/PrivateRoute';
import ProductPage from './Pages/ProductPage/ProductPage';
import CategoryPage from './Pages/CategoryPage/CategoryPage';
import BrandPage from './Pages/BrandPage/BrandPage'; 
import Register from './Pages/Auth/Register/Register';
import FullSearch from './Pages/FullSearch/FullSearch';
import Login from './Pages/Auth/Login/Login';
import Checkout from './Pages/Checkout/Checkout';
import ScrollToTop from './Layout/ScrollToTop/ScrollToTop';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { Provider } from "react-redux";
import store from "../store";

import { loadUser} from '../actions/auth';

class App extends Component {
    componentDidMount() {
        store.dispatch(loadUser());
        if(!localStorage.getItem("cart")) {
            localStorage.setItem("cart", JSON.stringify([]));
        }
    }

    render() {
        return (
            <Provider store={store}>
                <Router>
                    <ScrollToTop>
                        <Header/>
                        <Switch>
                            <Route exact path="/register" component={Register}/>
                            <Route exact path="/login" component={Login}/>
                            <Route exact path="/brand/:brand" component={BrandPage}/>
                            <Route exact path="/search/:key" component={FullSearch}/>
                            <Route exact path="/category/:category" component={CategoryPage}/>
                            <Route exact path="/products/:productId" component={ProductPage}/>
                            <Route exact path="/" component={Home}/>
                            <PrivateRoute exact path="/checkout" component={Checkout}/>
                        </Switch>
                        <Footer/>
                    </ScrollToTop>
                </Router>
            </Provider>
        )
    }
}

ReactDOM.render(<App />, document.getElementById("app"));