import * as actionTypes from './actionTypes';
import axios from 'axios';

export const getProductsSuccess = (formData) => {
    return {
        type: actionTypes.GET_PRODUCTS_SUCCESS,
        formData: formData    }
};

export const getProductsFail = (error) => {
    return {
        type: actionTypes.GET_PRODUCTS_FAIL,
        error: error
        
    }
};

export const getProductsStart = () => {
    return {
        type: actionTypes.GET_PRODUCTS_START
    };
};

export const getFilteredProducts = (formData) => {
    return dispatch =>{
        dispatch(getProductsStart());

        axios.post('http://localhost:3001/filterBrowse',formData)
            .then( response => {
                console.log(response.data.data)
                dispatch(getProductsSuccess(response.data.data));
            })
            .catch( err => {
                console.log(formData)
                console.log(err)
                dispatch(getProductsFail( err ));
            })
        
    };
};