import { 
    GET_PRODUCTS, 
    FETCH_NUM, 
    GET_PRODUCTS_OFFERS, 
    GET_CURRENT_PRODUCT, 
    GET_CURRENT_PRODUCT_SPECS, 
    CLEAR_CURRENT_PRODUCT, 
    GET_SEARCH_SMALL, 
    SMALL_SEARCH_RESET, 
    RESET_PRODUCTS,
    GET_LATEST_PRODUCTS,
    GET_MOST_VIEWS_PRODUCTS,
    ADD_ITEM_TO_LOCAL_CART,
    REMOVE_ITEM_FROM_LOCAL_CART,
    CART_CREATED,
    GET_USER_CART,
    ADD_ITEM_TO_DB_CART,
    ORDER_SUCCESS,
    ORDER_RESET
} from '../actions/types.js';

const initialState = {
    products: [],
    latestProducts: [],
    mostViewedProducts: [],
    localCart: JSON.parse(localStorage.getItem("cart")), // when no user is signed in
    dbCart: [], // when user is signed in (not handled anymore)
    dbCartId: null,
    currentProduct: null,
    currentSpecs: null,
    currentSearchSmall: null,
    currentSearch: null,
    offers: [],
    currentdatafetch: 0,
    hasMore: true,
    orderSuccess: null
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_PRODUCTS:
            return {
                ...state,
                hasMore: state.products.length === state.products.concat(action.products).length ? false : true,
                products: state.products.concat(action.products)
            }
        case GET_CURRENT_PRODUCT:
            return {
                ...state,
                currentProduct: action.product
            }
        case GET_CURRENT_PRODUCT_SPECS:
            return {
                ...state,
                currentSpecs: action.specs
            }
        case CLEAR_CURRENT_PRODUCT:
            return {
                ...state,
                currentProduct: null
            }
        case GET_PRODUCTS_OFFERS:
            return {
                ...state,
                offers: action.offers
            }
        case GET_LATEST_PRODUCTS:
            return {
                ...state,
                latestProducts: action.latest
            }
        case GET_MOST_VIEWS_PRODUCTS:
            return {
                ...state,
                mostViewedProducts: action.views
            }
        case FETCH_NUM:
            return {
                ...state,
                currentdatafetch: state.currentdatafetch + 9
            }
        case GET_SEARCH_SMALL:
            return {
                ...state,
                currentSearchSmall: action.searched
            }
        case SMALL_SEARCH_RESET:
            return {
                ...state,
                currentSearchSmall: null
            }
        case RESET_PRODUCTS:
            return {
                ...state,
                products: [],
                currentdatafetch: 0,
                hasMore: true
            }
        case ADD_ITEM_TO_LOCAL_CART:
            // the problem is here. has to do with the cart not being defind in localstorage
            const localarr = JSON.parse(localStorage.getItem("cart"));
            if(localarr.find(prod => action.cartItem.id === prod.id)) {
                console.log('duplicate', localarr);
                for(let [prodIndex, prod] of localarr) {
                    if(prod.id === action.cartItem.id) {
                        localarr[prodIndex].amount = localarr[prodIndex].amount + 1;
                    }
                }
                localStorage.setItem("cart", JSON.stringify(newArr));
            } else {
                let newArr = [...localarr, {...action.cartItem, amount: 1}];
                localStorage.setItem("cart", JSON.stringify(newArr));
            }
            return {
                ...state,
                localCart: JSON.parse(localStorage.getItem("cart"))
            }
        case ADD_ITEM_TO_DB_CART:
            return {
                ...state,
                dbCart: action.cartItems
            }
        case REMOVE_ITEM_FROM_LOCAL_CART:
            let newLocalCartArr = state.localCart.filter(item => {
                return action.cartItemId !== item.id;
            })
            localStorage.setItem("cart", JSON.stringify(newLocalCartArr));
            return {
                ...state,
                localCart: JSON.parse(localStorage.getItem("cart"))
            }
        case CART_CREATED:
            return {
                ...state,
                dbCart: action.dbcart,
                dbCartId: action.cartid
            }  
        case GET_USER_CART:
            return {
                ...state,
                dbCart: action.cart,
                dbCartId: action.cartid
            } 
        case ORDER_SUCCESS:
            return {
                ...state,
                orderSuccess: true
            }  
        case ORDER_RESET:
            return {
                ...state,
                orderSuccess: null
            }
        default:
            return state;
    }
}