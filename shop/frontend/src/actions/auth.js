import axios from 'axios';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    CART_CREATED,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    GET_USER_CART,
    LOGOUT_SUCCESS,
    ERROR_CLEAR,
    LOGIN_LOADING
} from './types';

export const register = (username, email, password) => dispatch => {
    // Headers
    const config = {
        headers: {
            'content-type': 'application/json'
        }
    }

    const body = JSON.stringify({ username, email, password})
    axios.post('/users/api/auth/register', body, config)
        .then(res => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            })
            console.log(res.data);

            const cartbody = JSON.stringify({ cartUser: res.data.user.id})
            axios.post('/product/api/carts/', cartbody, config )
            .then(rescart => {
                dispatch({
                    type: CART_CREATED,
                    cart: rescart.data.cartProduct,
                    cartid: rescart.data.id
                })
            })
        }).catch(err => {
            dispatch({
                type: REGISTER_FAIL,
                error: err.response.data
            });
        })
}

// LOGIN USER
export const login = (username, password) => dispatch => {
    dispatch({
        type: LOGIN_LOADING
    })
    // Headers
    const config = {
        headers: {
            'content-type': 'application/json'
        }
    }

    const body = JSON.stringify({ username, password})

    axios.post('/users/api/auth/login', body, config)
        .then(res => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
            console.log(res.data.user.id);
            axios.get(`/product/api/carts/?cartuser=${res.data.user.id}`)
            .then(rescart => {
                console.log(rescart.data);
                dispatch({
                    type: GET_USER_CART,
                    cart: rescart.data[0].cartProduct,
                    cartid: rescart.data[0].id
                })
            })
        }).catch(err => {
            dispatch({
                type: LOGIN_FAIL,
                error: err.response.data
            });
        })
}

//CHECK TOKEN AND LOAD USER
export const loadUser = () => (dispatch, getState) => {
    // user loading
    dispatch({ type: USER_LOADING});

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

    axios.get('/users/api/auth/user', config)
        .then(res => {
            dispatch({
                type: USER_LOADED,
                user: res.data
            })

            console.log(res.data.id);
            axios.get(`/product/api/carts/?cartuser=${res.data.id}`)
            .then(rescart => {
                console.log(rescart.data);
                dispatch({
                    type: GET_USER_CART,
                    cart: rescart.data[0].cartProduct,
                    cartid: rescart.data[0].id
                })
            })
        }).catch(err => {
            dispatch({
                type: AUTH_ERROR
            });
        })

}

// LOGOUT USER
export const logout = () => (dispatch,getState) => {

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
    
    axios.post('/users/api/auth/logout/',null, config) // DISTROY THE TOKEN , null is important won't work without it
        .then(res => {
            dispatch({
                type: LOGOUT_SUCCESS
            })
        }).catch(err => {
            console.log(err);
        })
}


export const clearError = () => dispatch => {
    dispatch({
        type: ERROR_CLEAR
    })
}