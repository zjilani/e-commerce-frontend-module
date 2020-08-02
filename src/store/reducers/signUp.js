import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';


const initalState = {
    error:null,
    loading: false,
    form: null,
    customerId: null,

};
const signUpStart = (state,action) => {
    return updateObject(state,{error:null, loading: true});
};
const signUpSuccess = (state,action) => {

    return updateObject(state,{
        error:null,
        loading: false,
        form: action.formData,
        customerId: action.customerId
    });
};
const signUpFail = (state,action) => {
    return updateObject(state,{
        error: action.error,
        loading: false
    });
};

const reducer = (state=initalState , action) => {
    switch (action.type) {
        case actionTypes.SIGN_UP_START: return signUpStart(state,action);
        case actionTypes.SIGN_UP_SUCCESS: return signUpSuccess(state,action);
        case actionTypes.SIGN_UP_FAIL: return signUpFail(state,action);
        default: return state;
    }
}

export default reducer;