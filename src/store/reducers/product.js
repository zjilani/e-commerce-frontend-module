import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';


const initalState = {
    error:null,
    loading: false,
    data: null

};

const getProductStart = (state,action) => {
    return updateObject(state,{error:null, loading: true});
};
const getProductSuccess = (state,action) => {

    return updateObject(state,{
        error:null,
        loading: false,
        aata: action.data
    });
};
const getProductFail = (state,action) => {
    return updateObject(state,{
        error: action.error,
        loading: false
    });
};

const reducer = (state=initalState , action) => {
    switch (action.type) {
        case actionTypes.GET_PRODUCT_START: return getProductStart(state,action);
        case actionTypes.GET_PRODUCT_SUCCESS: return getProductSuccess(state,action);
        case actionTypes.GET_PRODUCT_FAIL: return getProductFail(state,action);
        default: return state;
    }
}

export default reducer;