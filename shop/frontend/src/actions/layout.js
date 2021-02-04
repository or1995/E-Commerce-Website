import {ON_TOP, NOT_ON_TOP} from './types';

export const onTop = () => dispatch => {
    dispatch({
        type: ON_TOP
    });
}

export const notOnTop = () => dispatch => {
    dispatch({
        type: NOT_ON_TOP
    });
}