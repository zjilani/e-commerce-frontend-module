import * as actionTypes from './actionTypes';
import axios from 'axios';

export const getProductsSuccess = (products) => {
    return {
        type: actionTypes.GET_PRODUCTS_SUCCESS,
        products: products
    }
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

export const getProducts = (params) => {
    return dispatch =>{
        dispatch(getProductsStart());
        axios.post('http://localhost:3001/getProducts',{mainCategory: params.main ,subCategory: params.sub})
            .then( response => {
                console.log(response.data.data)
                dispatch(getProductsSuccess(response.data.data));
            })
            .catch( err => {
                console.log(err)
                dispatch(getProductsFail( err ));
            })
        
    };
};

export const getFeaturesSuccess = (features) => {
    return {
        type: actionTypes.GET_PRODUCTS_SUCCESS,
        features: features
    }
};

export const getFeaturesFail = (error) => {
    return {
        type: actionTypes.GET_PRODUCTS_FAIL,
        error: error
        
    }
};

export const getFeaturesStart = () => {
    return {
        type: actionTypes.GET_PRODUCTS_START
    };
};

export const getFeatures = (params) => {
    return dispatch =>{
        dispatch(getFeaturesStart());
        axios.post('http://localhost:3001/getFeatures',{mainCategory: params.main ,subCategory: params.sub})
            .then( response => {
                console.log(response.data.data)
                dispatch(getFeaturesSuccess(response.data.data));
            })
            .catch( err => {
                console.log(err)
                dispatch(getFeaturesFail( err ));
            })
        
    };
};