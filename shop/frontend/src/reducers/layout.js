import { ON_TOP, NOT_ON_TOP } from '../actions/types.js';

const initialState = {
    top: true
}

export default function(state = initialState, action) {
    switch(action.type) {
        case ON_TOP:
            return {
                ...state,
                top: true
            }
        case NOT_ON_TOP:
            return {
                ...state,
                top: false
            }
        default:
            return state;
    }
}