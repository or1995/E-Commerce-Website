import axios from 'axios';
import {
    GET_PRODUCTS,
    FETCH_NUM,
    GET_PRODUCTS_OFFERS,
    GET_PRODUCTS_OFFERS_ERROR,
    GET_CURRENT_PRODUCT,
    CLEAR_CURRENT_PRODUCT, 
    GET_CURRENT_PRODUCT_SPECS, 
    GET_SEARCH_SMALL, 
    SMALL_SEARCH_RESET, 
    RESET_PRODUCTS, 
    GET_LATEST_PRODUCTS,
    GET_MOST_VIEWS_PRODUCTS,
    ADD_ITEM_TO_LOCAL_CART,
    REMOVE_ITEM_FROM_LOCAL_CART,
    ADD_ITEM_TO_DB_CART,
    ORDER_SUCCESS,
    GET_CURRENT_PRODUCT_ERROR,
    ORDER_RESET,
    GET_PRODUCTS_ERROR
} from './types';


//get the products
export const getProducts = (num, order) => dispatch => {
    axios.get(`/product/api/products/?ordertype=${order}&datanum=${num}`)
    .then(res => {
        dispatch({
            type: GET_PRODUCTS,
            products: res.data
        });
        dispatch({
            type: FETCH_NUM
        });
    })
    .catch(err => {
        dispatch({
            type: GET_PRODUCTS_ERROR,
            error: err
        })
    })
}

//reset products 
export const resetProducts = () => dispatch => {
    dispatch({
        type: RESET_PRODUCTS
    });
}

export const getSmallSearch = (key) => dispatch => {
    dispatch({
        type: SMALL_SEARCH_RESET
    })
    axios.get(`/product/api/products/?keylatest=${key}`)
    .then(res => {
        dispatch({
            type: GET_SEARCH_SMALL,
            searched: res.data
        });
    })
    .catch(err => {
        console.log(err);
    })
}

export const getCurrentProduct = (id) => dispatch => {
    axios.get(`/product/api/productdetails/?productid=${id}`)
    .then(res => {
        dispatch({
            type: GET_CURRENT_PRODUCT,
            product: res.data
        });
        axios.get(`/product/api/productsp/?specid=${res.data[0].specifications}`)
        .then(specres => {
            dispatch({
                type: GET_CURRENT_PRODUCT_SPECS,
                specs: specres.data[0]
            })
        })
    })
    .catch(err => {
        dispatch({
            type: GET_CURRENT_PRODUCT_ERROR,
            error: err
        })
    })
}

export const clearCurrentProduct = () => dispatch => {
        dispatch({
            type: CLEAR_CURRENT_PRODUCT
    })
}

export const getproductsoffers = () => dispatch => {
    axios.get("/product/api/offers/")
    .then(res => {
        dispatch({
            type: GET_PRODUCTS_OFFERS,
            offers: res.data
        });
    })
    .catch(err => {
        dispatch({
            type: GET_PRODUCTS_OFFERS_ERROR,
            error: err
        })
    })
}

export const getLatestProducts = () => dispatch => {
    axios.get("/product/api/products/?latestproducts")
    .then(res => {
        dispatch({
            type: GET_LATEST_PRODUCTS,
            latest: res.data
        });
    })
    .catch(err => {
    })
}


export const getPopularProducts = () => dispatch => {
    axios.get("/product/api/products/?mostviews")
    .then(res => {
        dispatch({
            type: GET_MOST_VIEWS_PRODUCTS,
            views: res.data
        });
    })
    .catch(err => {
    })
}

// add a view count
export const addProductView = (id, viewcount) => dispatch => {
    const config = {
        headers: {
            'content-type': 'application/json'
        }
    }
    axios.patch(`/product/api/products/${id}/`, viewcount, config)
    .then(res => {
    })
    .catch(err => {
        console.log(err.response);
    })
}

// add item to local cart
export const addtoLocalCart = (item) => dispatch => {
    dispatch({
        type: ADD_ITEM_TO_LOCAL_CART,
        cartItem: item
    });
}

// remove item from local cart
export const removeFromLocalCart = (id) => dispatch => {
    dispatch({
        type: REMOVE_ITEM_FROM_LOCAL_CART,
        cartItemId: id
    });
}

export const getDbCart = (id) => dispatch => {
    
}

// ADD ITEM TO DB CART
export const addtoDBCart = (item) => (dispatch, getState) => {
    let dbcart = getState().products.dbCart;
    let cartid = getState().products.dbCartId;
    // Headers
    const config = {
        headers: {
            'content-type': 'application/json'
        }
    }

    const body = JSON.stringify({ cartProduct: [ ...dbcart ,item ]});

    axios.patch(`/product/api/carts/${cartid}/`, body, config)
    .then(res => {
        console.log(res.data.cartProduct);
        dispatch({
            type: ADD_ITEM_TO_DB_CART,
            cartItems: res.data.cartProduct
        });
    })
    .catch(err => {
        console.log(err.response);
    })
}

export const addOrder = (order) => (dispatch,getState) => {
    // Get token from state
    const token = getState().auth.token;

    // Headers
    const config = {
        headers: {
            'content-type': 'application/json'
        }
    }

    // if token add to headers config USES THE TOKEN TO GET THE LOGGED IN USER
    if (token) {
        config.headers['Authorization'] = `Token ${token}`;
    }

    axios.post('/product/api/orders/', order, config)
    .then(res => {
        dispatch({
            type: ORDER_SUCCESS
        })
    })
    .catch(err => {
        console.log(err.response.data)
    })
}

export const orderReset = () => dispatch => {
    dispatch({
        type: ORDER_RESET
    })
}
