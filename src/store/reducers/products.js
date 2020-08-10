import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';


const initalState = {
    error:null,
    loading: false,
    product: null,
    features: null

};
const getProductsStart = (state,action) => {
    return updateObject(state,{error:null, loading: true});
};
const getProductsSuccess = (state,action) => {

    return updateObject(state,{
        error:null,
        loading: false,
        products: action.products
    });
};
const getProductsFail = (state,action) => {
    return updateObject(state,{
        error: action.error,
        loading: false
    });
};
const getFeaturesStart = (state,action) => {
    return updateObject(state,{error:null, loading: true});
};
const getFeaturesSuccess = (state,action) => {

    return updateObject(state,{
        error:null,
        loading: false,
        features: action.features
    });
};
const getFeaturesFail = (state,action) => {
    return updateObject(state,{
        error: action.error,
        loading: false
    });
};

const reducer = (state=initalState , action) => {
    switch (action.type) {
        case actionTypes.GET_PRODUCTS_START: return getProductsStart(state,action);
        case actionTypes.GET_PRODUCTS_SUCCESS: return getProductsSuccess(state,action);
        case actionTypes.GET_PRODUCTS_FAIL: return getProductsFail(state,action);
        case actionTypes.GET_FEATURES_START: return getFeaturesStart(state,action);
        case actionTypes.GET_FEATURES_SUCCESS: return getFeaturesSuccess(state,action);
        case actionTypes.GET_FEATURES_FAIL: return getFeaturesFail(state,action);
        default: return state;
    }
}

export default reducer;