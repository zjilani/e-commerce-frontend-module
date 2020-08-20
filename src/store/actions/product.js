import * as actionTypes from './actionTypes';
import axios from 'axios';

export const getProductSuccess = (data) => {
    return {
        type: actionTypes.GET_PRODUCT_SUCCESS,
        data: data   
    };
};

export const getProductFail = (error) => {
    return {
        type: actionTypes.GET_PRODUCT_FAIL,
        error: error 
    };
};

export const getProductsStart = () => {
    return {
        type: actionTypes.GET_PRODUCT_START
    };
};

export const getProduct = (productId) => {
    return dispatch => {
        dispatch(getProductsStart());

        axios.get("http://localhost:3001/getVariants?productId="+productId)
            .then( response => {
                console.log(response.data.data)
                // if(response.data.status === 'failure'){
                //     dispatch(getProductFail(response.data.data))
                // }else if(response.data.status === 'success'){
                    dispatch(getProductSuccess(response.data.data))
                // }
            })
            .catch( error => {
                console.log(error)
                dispatch(getProductFail(error))
            })
    };
};

