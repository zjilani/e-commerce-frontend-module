import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';


const initalState = {
    error:null,
    loading: false,
    data: null,
};
const categoryStart = (state,action) => {
    return updateObject(state,{error:null, loading: true});
};
const categorySuccess = (state,action) => {

    return updateObject(state,{
        error:null,
        loading: false,
        data: action.data
    });
};
const categoryFail = (state,action) => {
    return updateObject(state,{
        error: action.error,
        loading: false
    });
};

const reducer = (state=initalState , action) => {
    switch (action.type) {
        case actionTypes.CATEGORY_START: return categoryStart(state,action);
        case actionTypes.CATEGORY_SUCCESS: return categorySuccess(state,action);
        case actionTypes.CATEGORY_FAIL: return categoryFail(state,action);
        default: return state;
    }
}

export default reducer;